import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from './coupon.Schema';
import { UpdateCouponDto } from './DTo/updateCoupon.dto';

@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}
  async create(createCouponDto: any): Promise<Coupon> {
    const existingCoupon = await this.couponModel.findOne({
      name: createCouponDto.name,
    });
    if (existingCoupon) {
      throw new NotFoundException('Coupon already exists');
    }
    const createdCoupon = await this.couponModel.create(createCouponDto);
    return createdCoupon;
  }
  async findAll(): Promise<Coupon[]> {
    return await this.couponModel.find();
  }
  async findOne(id: string): Promise<Coupon> {
    const coupon = await this.couponModel.findById(id);
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }
  async update(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    const updatedCoupon = await this.couponModel.findOneAndUpdate(
      { _id: id },
      updateCouponDto,
      { new: true },
    );
    if (!updatedCoupon) {
      throw new NotFoundException('Coupon not found');
    }
    return updatedCoupon;
  }
  async delete(id: string) {
    const deletedCoupon = await this.couponModel.findOneAndDelete({ _id: id });
    if (!deletedCoupon) {
      throw new NotFoundException('Coupon not found');
    }
    return 'Coupon deleted successfully';
  }
}
