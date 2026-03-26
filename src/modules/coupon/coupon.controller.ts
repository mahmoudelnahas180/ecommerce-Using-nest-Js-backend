import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './DTo/create-coupon.dto';
import { UpdateCouponDto } from './DTo/updateCoupon.dto';

@Controller('coupons')
export class CouponController {
  constructor(private couponService: CouponService) {}
  @Post()
  createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }
  @Patch(':id')
  updateCoupon(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponService.update(id, updateCouponDto);
  }
  @Get()
  findAllCoupons() {
    return this.couponService.findAll();
  }
  @Get('/:id')
  findOneCoupon(@Param('id') id: string) {
    return this.couponService.findOne(id);
  }
  @Delete('/:id')
  deleteCoupon(@Param('id') id: string) {
    return this.couponService.delete(id);
  }
}
