import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './Brand.Schema';
import { Model } from 'mongoose';
import { CreateBrandDto, CheckIDDto } from './brand.dto';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandSchema: Model<Brand>) {}
  async createBrand(body: CreateBrandDto) {
    const exsistingBrand = await this.brandSchema.findOne({ name: body.name });
    if (exsistingBrand) {
      throw new NotFoundException('Brand already exists');
    }
    const newBrand = this.brandSchema.create(body);
    return newBrand;
  }
  async getAllBrands() {
    const brands = await this.brandSchema.find();
    return brands;
  }
  async getBrandById(id: CheckIDDto) {
    console.log(id);
    const brand = await this.brandSchema.findById(id.id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }
  async updateBrand(id: CheckIDDto, body: Partial<CreateBrandDto>) {
    console.log(id, body);
    const brand = await this.brandSchema.findById(id.id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    Object.assign(brand, body);
    return brand.save();
  }
  async deleteBrand(id: CheckIDDto) {
    const brand = await this.brandSchema.findByIdAndDelete(id.id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return { message: 'Brand deleted successfully' };
  }
}
