import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './Cart.Schema';
import { AddToCartDto } from './Dto/Addcart.dto';
import { UpdateCartQuantityDto } from './Dto/Updatecart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}
  async getAllProductInCart(): Promise<Cart[]> {
    return this.cartModel
      .find()
      .populate({ path: 'CartItems.productId', model: 'Product' })
      .exec();
  }
  async create(cartBody: AddToCartDto) {
    const exisstProductIdInCArt = await this.cartModel.findOne({
      'CartItems.productId': cartBody.productId,
    });
    if (exisstProductIdInCArt) {
      throw new NotFoundException('Product already exists in cart');
    }
    const newCart = await this.cartModel.updateOne(
      { _id: cartBody.productId },
      {
        $push: {
          CartItems: {
            productId: cartBody.productId,
            quantity: cartBody.quantity,
          },
        },
      },
    );

    console.log(newCart);
    console.log(exisstProductIdInCArt);
    console.log(cartBody.productId);
    console.log(newCart);
    return newCart;
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
}
