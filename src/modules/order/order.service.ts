import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import type { Request, Response } from 'express';
import { Order } from './Schema/Order.Schema';
import { CashOrderDto } from './Dto/CashOrder.dto';
import { Product } from '../product/product.Schema';
import { Cart } from '../cart/Cart.Schema';
import { User } from '../auth/User.schema';
import Stripe from 'stripe';

type CartItemInput = {
  productId: string;
  quantity: number;
};

@Injectable()
export class OrderService {
  private stripe: Stripe;
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable');
    }

    this.stripe = new Stripe(stripeSecretKey);
  }

  // Helper method to validate cart items
  private async validateCartItems(CartItems: CartItemInput[]): Promise<void> {
    if (CartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    for (const item of CartItems) {
      const productId = String(item.productId ?? '').trim();

      if (!isValidObjectId(productId)) {
        throw new BadRequestException(`Invalid productId: ${item.productId}`);
      }

      const product = await this.productModel.findById(productId);
      if (!product) {
        throw new NotFoundException(
          `Product with ID ${productId} not found in database`,
        );
      }
      if (product.quantity < item.quantity) {
        throw new BadRequestException(
          `Product "${product.title}" has insufficient stock. Available: ${product.quantity}, Requested: ${item.quantity}`,
        );
      }
    }
  }

  async cashOrder(body: CashOrderDto, userId: string) {
    const {
      CartItems,
      totalPrice,
      totalPriceAfterDiscount,
      coupons,
      shipingAddress,
    } = body;

    // Validate cart items
    await this.validateCartItems(CartItems);

    const order = new this.orderModel({
      userId,
      CartItems,
      totalPrice,
      totalPriceAfterDiscount,
      coupons,
      shipingAddress,
      paymentMethod: 'cash',
    });
    await order.save();
    return order;
  }

  async stripeOrder(body: CashOrderDto, userId: string) {
    const {
      CartItems,
      totalPrice,
      totalPriceAfterDiscount,
      coupons,
      shipingAddress,
    } = body;

    // Validate cart items
    await this.validateCartItems(CartItems);

    const totalAmount = totalPriceAfterDiscount ?? totalPrice;

    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      throw new BadRequestException(
        'totalPrice or totalPriceAfterDiscount must be a number greater than 0',
      );
    }

    // Create order first
    const order = new this.orderModel({
      userId,
      CartItems,
      totalPrice,
      totalPriceAfterDiscount,
      coupons,
      shipingAddress,
      paymentMethod: 'card',
    });
    const savedOrder = await order.save();
    const orderId = String(savedOrder._id);

    // Create Stripe session
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Ecommerce Order',
              description: `Order #${orderId}`,
            },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cart`,
      metadata: { userId, orderId },
    });

    return { order: savedOrder, session };
  }

  // Helper method to send confirmation email
  private async sendConfirmationEmail(
    email: string,
    userName: string,
    orderId: string,
    totalPrice: number,
  ): Promise<void> {
    try {
      // TODO: Replace with actual email service (nodemailer, sendgrid, etc.)
      console.log('=== EMAIL CONFIRMATION ===');
      console.log(`To: ${email}`);
      console.log(`Name: ${userName}`);
      console.log(`Order ID: ${orderId}`);
      console.log(`Total Price: $${totalPrice}`);
      console.log(
        `Message: Payment successful! Your order has been confirmed.`,
      );
      console.log('========================\n');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      // Don't throw - email is not critical for order processing
    }
  }

  // Helper method to update product stock and clear cart
  private async finalizeOrderAfterPayment(
    userId: string,
    orderId: string,
  ): Promise<void> {
    try {
      // Get the order to access CartItems
      const order = await this.orderModel.findById(orderId);
      if (!order) {
        throw new NotFoundException('Order not found for stock update');
      }

      // Update product quantities (reduce stock)
      for (const item of order.CartItems) {
        await this.productModel.findByIdAndUpdate(
          item.productId,
          {
            $inc: {
              quantity: -item.quantity,
              sold: item.quantity,
            },
          },
          { new: true },
        );
        console.log(
          `Updated product ${item.productId}: reduced quantity by ${item.quantity}`,
        );
      }

      // Clear user's cart after successful payment
      await this.cartModel.findOneAndUpdate(
        { userId },
        { CartItems: [], totalPrice: 0, totalPriceAfterDiscount: 0 },
        { new: true },
      );
      console.log(`Cleared cart for user ${userId}`);
    } catch (error) {
      console.error('Error finalizing order after payment:', error);
      // Don't throw - order is already confirmed
    }
  }

  async handleWebhook(
    req: Request,
    res: Response,
    signature: string,
  ): Promise<Response> {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      console.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
      return res
        .status(500)
        .json({ error: 'Webhook secret is not configured' });
    }

    if (!signature) {
      console.error('Missing Stripe signature header');
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    if (!Buffer.isBuffer(req.body)) {
      console.error('Webhook body is not raw Buffer. Check body parser setup.');
      return res.status(400).json({ error: 'Invalid webhook payload format' });
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret,
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Webhook signature verification failed:', errorMessage);
      return res.status(400).json({ error: `Webhook Error: ${errorMessage}` });
    }

    console.log('Stripe webhook event received:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as unknown as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const orderId = session.metadata?.orderId;

      console.log('Stripe checkout.session.completed metadata:', {
        userId,
        orderId,
      });

      // Validate metadata
      if (!userId || !orderId) {
        console.error('Missing userId or orderId in webhook metadata', {
          userId,
          orderId,
        });
        return res.status(400).json({ error: 'Invalid metadata' });
      }

      // Validate orderId is valid ObjectId
      if (!isValidObjectId(orderId)) {
        console.error('Invalid orderId format:', orderId);
        return res.status(400).json({ error: 'Invalid orderId format' });
      }

      try {
        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id;

        // Update order payment status to paid
        const updatedOrder = await this.orderModel.findByIdAndUpdate(
          orderId,
          {
            paymentStatus: 'paid',
            orderStatus: 'processing',
            stripeSessionId: session.id,
            stripePaymentIntentId: paymentIntentId,
          },
          { new: true },
        );

        if (!updatedOrder) {
          console.error('Order not found:', orderId);
          return res.status(404).json({ error: 'Order not found' });
        }

        console.log('Order payment completed successfully:', orderId);

        // Get user info for email
        const user = await this.userModel.findById(userId);
        if (user) {
          // 1. Send confirmation email
          await this.sendConfirmationEmail(
            user.email,
            user.name,
            orderId,
            updatedOrder.totalPrice,
          );

          // 2. Update product stock and 3. Clear cart
          await this.finalizeOrderAfterPayment(userId, orderId);
        }
      } catch (error) {
        console.error('Error updating order after webhook:', error);
        return res.status(500).json({ error: 'Failed to update order' });
      }
    }

    return res.status(200).json({ received: true });
  }
}
