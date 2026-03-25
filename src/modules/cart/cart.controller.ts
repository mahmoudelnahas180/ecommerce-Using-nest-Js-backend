import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './Dto/Addcart.dto';
import { UpdateCartQuantityDto } from './Dto/Updatecart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post()
  addToCart(@Body() cartBody: AddToCartDto) {
    return this.cartService.create(cartBody);
  }
  @Get('/:id')
  getCart(@Param('id') id: string) {
    {
      return this.cartService.getCartOne(id);
    }
  }
  @Get()
  getAllProductInCart() {
    return this.cartService.getAllProductInCart();
  }

  @Patch('/:id')
  updateCart(@Param('id') id: string, @Body() cartBody: UpdateCartQuantityDto) {
    return this.cartService.updateCart(id, cartBody);
  }
}
