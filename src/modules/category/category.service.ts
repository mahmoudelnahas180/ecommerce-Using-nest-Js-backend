import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './Category.Schema';
import { Model } from 'mongoose';
import { createCategoryDto, CheckIDDto } from './Category.dt';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async createCategory(body: createCategoryDto) {
    const category = await this.categoryModel.findOne({ name: body.name });
    if (category) {
      throw new ConflictException('this category alwardy foud');
    }
    const createCategory = await this.categoryModel.create(body);
    return createCategory;
  }
  async getAllCategory() {
    const category = await this.categoryModel.find().populate('subCategories');
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }
  async getCategoryById(id: CheckIDDto) {
    const category = await this.categoryModel.findById(id.id);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }
  async updateCategory(id: CheckIDDto, body: createCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(id.id, body);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }
  async deleteCategory(id: CheckIDDto) {
    const category = await this.categoryModel.findByIdAndDelete(id.id);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }
}
