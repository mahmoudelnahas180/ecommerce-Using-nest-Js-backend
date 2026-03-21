import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.Schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './Product.Dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async createProduct(body: CreateProductDto) {
    const exsitProduct = await this.productModel.findOne({ title: body.title });
    if (exsitProduct) {
      throw new ConflictException('Product with this title already exists');
    }
    return await this.productModel.create(body);
  }
  async updateProduct(id: string, body: Partial<CreateProductDto>) {
    const product = await this.productModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!product) {
      throw new ConflictException('Product not found');
    }
    return product;
  }
  async deleteProduct(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new ConflictException('Product not found');
    }
    return product;
  }
  async getAllProducts() {
    return this.productModel.find();
  }
  async getProductById(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new ConflictException('Product not found');
    }
    return product;
  }
  async getProductsByPagination(query: { page: number; limit: number }) {
    const { page = 1, limit = 5 } = query;
    const skip = (page - 1) * limit;
    const totalProducts = await this.productModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    if (page > totalPages) {
      throw new NotFoundException('Page not found');
    }

    return this.productModel.find().skip(skip).limit(limit);
  }
}
