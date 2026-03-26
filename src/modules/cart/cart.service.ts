import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './Cart.Schema';
import { AddToCartDto } from './Dto/Addcart.dto';
import { UpdateCartQuantityDto } from './Dto/Updatecart.dto';
import { Product } from '../product/product.Schema';
import { ApplyCouponDto } from './Dto/Applycoupon.dto';
import { Coupon } from '../coupon/coupon.Schema';
@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
  ) {}

  private recalculateCartTotals(cart: Cart, discountPercentage = 0) {
    cart.totalPrice = cart.CartItems.reduce(
      (total, item: any) => total + item.quantity * item.productId.price,
      0,
    );
    cart.totalPriceAfterDiscount =
      cart.totalPrice - cart.totalPrice * (discountPercentage / 100);
  }

  async getAllProductInCart(): Promise<Cart[]> {
    return this.cartModel
      .find()
      .populate({ path: 'CartItems.productId', model: 'Product' })
      .exec();
  }

  async create(cartBody: AddToCartDto, userId: string) {
    const product = await this.productModel.findById(cartBody.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let exisstUserCArt = await this.cartModel.findOne({
      userId: userId,
    });

    if (exisstUserCArt) {
      const isExistProduct = exisstUserCArt.CartItems.find(
        (item) =>
          item.productId.toString() === cartBody.productId &&
          item.color === (cartBody.color || ''),
      );

      if (isExistProduct) {
        throw new BadRequestException('Product already exists in cart');
      }

      exisstUserCArt.CartItems.push({
        productId: product._id as Types.ObjectId,
        quantity: cartBody.quantity || 1,
        color: cartBody.color || '',
      });

      await exisstUserCArt.save();

      const populatedCart = await exisstUserCArt.populate({
        path: 'CartItems.productId',
        model: 'Product',
      });

      this.recalculateCartTotals(populatedCart);

      await populatedCart.save();

      return populatedCart;
    }

    const newCart = new this.cartModel({
      userId: userId,
      CartItems: [
        {
          productId: product._id as Types.ObjectId,
          quantity: cartBody.quantity || 1,
          color: cartBody.color || '',
        },
      ],
    });

    await newCart.save();

    const populatedNewCart = await newCart.populate({
      path: 'CartItems.productId',
      model: 'Product',
    });

    this.recalculateCartTotals(populatedNewCart);

    await populatedNewCart.save();

    return populatedNewCart;
  }
  async getCartOne(id: string): Promise<Cart> {
    const exsistCart = await this.cartModel.findById(id).populate('user');
    if (!exsistCart) {
      throw new NotFoundException('Cart not found');
    }
    return exsistCart;
  }
  async updateCart(id: string, cartBody: UpdateCartQuantityDto): Promise<Cart> {
    const exsistCart = await this.cartModel.findById(id);
    if (!exsistCart) {
      throw new NotFoundException('Cart not found');
    }

    return exsistCart.save();
  }

  async updateCartItemByItemId(
    userId: string,
    itemId: string,
    cartBody: UpdateCartQuantityDto,
  ): Promise<Cart> {
    const exsistCart = await this.cartModel
      .findOne({ userId })
      .populate({ path: 'CartItems.productId', model: 'Product' });

    if (!exsistCart) {
      throw new NotFoundException('Cart not found');
    }

    const item = (exsistCart.CartItems as any).id(itemId);
    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    item.quantity = cartBody.quantity;
    this.recalculateCartTotals(exsistCart);

    await exsistCart.save();
    return exsistCart;
  }

  async deleteCartItemByItemId(userId: string, itemId: string): Promise<Cart> {
    const exsistCart = await this.cartModel
      .findOne({ userId })
      .populate({ path: 'CartItems.productId', model: 'Product' });

    if (!exsistCart) {
      throw new NotFoundException('Cart not found');
    }

    const oldLength = exsistCart.CartItems.length;
    exsistCart.CartItems = exsistCart.CartItems.filter(
      (item: any) => item._id.toString() !== itemId,
    );

    if (exsistCart.CartItems.length === oldLength) {
      throw new NotFoundException('Cart item not found');
    }

    this.recalculateCartTotals(exsistCart);

    await exsistCart.save();
    return exsistCart;
  }

  async applyCoupon(userId: string, couponBody: ApplyCouponDto): Promise<Cart> {
    const exsistCart = await this.cartModel
      .findOne({ userId })
      .populate({ path: 'CartItems.productId', model: 'Product' });

    if (!exsistCart) {
      throw new NotFoundException('Cart not found');
    }

    const couponName = couponBody.couponName.toUpperCase();
    const coupon = await this.couponModel.findOne({ name: couponName });

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    if (new Date(coupon.expireDate) < new Date()) {
      throw new BadRequestException('Coupon is expired');
    }

    this.recalculateCartTotals(exsistCart, coupon.discount);

    const couponExistsInCart = exsistCart.coupons.some(
      (cartCoupon: any) =>
        cartCoupon.couponId.toString() === coupon._id.toString(),
    );

    if (!couponExistsInCart) {
      exsistCart.coupons.push({
        name: coupon.name,
        couponId: coupon._id as Types.ObjectId,
      });
    }

    await exsistCart.save();
    return exsistCart;
  }
}
