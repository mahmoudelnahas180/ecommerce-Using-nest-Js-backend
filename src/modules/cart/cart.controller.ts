import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Req,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './Dto/Addcart.dto';
import { UpdateCartQuantityDto } from './Dto/Updatecart.dto';
import { ApplyCouponDto } from './Dto/Applycoupon.dto';
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
  // @Roles('user')
  // @UseGuards(AuthGuard)
  // @Patch('/cartitems/:id')
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

  @Patch('/items/:itemId')
  @Roles('user')
  @UseGuards(AuthGuard)
  updateCartItemByItemId(
    @Param('itemId') itemId: string,
    @Body() cartBody: UpdateCartQuantityDto,
    @Req() req: any,
  ) {
    const userId: string = req.user.id;
    return this.cartService.updateCartItemByItemId(userId, itemId, cartBody);
  }

  @Delete('/items/:itemId')
  @Roles('user')
  @UseGuards(AuthGuard)
  deleteCartItemByItemId(@Param('itemId') itemId: string, @Req() req: any) {
    const userId: string = req.user.id;
    return this.cartService.deleteCartItemByItemId(userId, itemId);
  }

  @Patch('/apply-coupon')
  @Roles('user')
  @UseGuards(AuthGuard)
  applyCoupon(@Body() couponBody: ApplyCouponDto, @Req() req: any) {
    const userId: string = req.user.id;
    return this.cartService.applyCoupon(userId, couponBody);
  }

  @Patch('/:id')
  updateCart(@Param('id') id: string, @Body() cartBody: UpdateCartQuantityDto) {
    return this.cartService.updateCart(id, cartBody);
  }
}
