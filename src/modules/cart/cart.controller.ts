import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './Dto/Addcart.dto';
import { UpdateCartQuantityDto } from './Dto/Updatecart.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/Guard/GuardAuth/auth.guard';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post()
  @Roles('user')
  @UseGuards(AuthGuard)
  addToCart(@Body() cartBody: AddToCartDto, @Req() req: any) {
    const userId: string = req.user.id;
    console.log('dd', userId);
    return this.cartService.create(cartBody, userId);
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
