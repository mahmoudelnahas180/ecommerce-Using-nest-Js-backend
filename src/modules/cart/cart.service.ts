import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './Cart.Schema';
import { AddToCartDto } from './Dto/Addcart.dto';
import { UpdateCartQuantityDto } from './Dto/Updatecart.dto';
import { console } from 'inspector';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}
  async getAllProductInCart(): Promise<Cart[]> {
    return this.cartModel
      .find()
      .populate({ path: 'CartItems.productId', model: 'Product' })
      .exec();
  }
  async create(cartBody: AddToCartDto, userId: string) {
    const exisstProductIdInCArt = await this.cartModel.findOne({
      userId: userId,
    });
    console.log(55);
    if (exisstProductIdInCArt) {
      console.log('exisstProductIdInCArt', exisstProductIdInCArt);
      return 0;
    } else {
      console.log('cartBody', cartBody);
      return 1;
    }
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
