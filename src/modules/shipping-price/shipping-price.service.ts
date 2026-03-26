import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateShippingPriceDto,
  ShippingPriceIdDto,
  UpdateShippingPriceDto,
} from './shipping-price.dto';
import { ShippingPrice } from './shipping-price.schema';

@Injectable()
export class ShippingPriceService {
  constructor(
    @InjectModel(ShippingPrice.name)
    private readonly shippingPriceModel: Model<ShippingPrice>,
  ) {}

  async create(createShippingPriceDto: CreateShippingPriceDto) {
    const existingRegion = await this.shippingPriceModel.findOne({
      region: createShippingPriceDto.region,
    });

    if (existingRegion) {
      throw new ConflictException('Region already exists');
    }

    return this.shippingPriceModel.create(createShippingPriceDto);
  }

  async findAll() {
    return this.shippingPriceModel.find().sort({ region: 1 });
  }

  async findOne(params: ShippingPriceIdDto) {
    const shippingPrice = await this.shippingPriceModel.findById(params.id);

    if (!shippingPrice) {
      throw new NotFoundException('Shipping price not found');
    }

    return shippingPrice;
  }

  async update(params: ShippingPriceIdDto, updateDto: UpdateShippingPriceDto) {
    if (updateDto.region) {
      const duplicateRegion = await this.shippingPriceModel.findOne({
        region: updateDto.region,
        _id: { $ne: params.id },
      });

      if (duplicateRegion) {
        throw new ConflictException('Region already exists');
      }
    }

    const updated = await this.shippingPriceModel.findByIdAndUpdate(
      params.id,
      updateDto,
      { new: true, runValidators: true },
    );

    if (!updated) {
      throw new NotFoundException('Shipping price not found');
    }

    return updated;
  }

  async remove(params: ShippingPriceIdDto) {
    const deleted = await this.shippingPriceModel.findByIdAndDelete(params.id);

    if (!deleted) {
      throw new NotFoundException('Shipping price not found');
    }

    return { message: 'Shipping price deleted successfully' };
  }
}
