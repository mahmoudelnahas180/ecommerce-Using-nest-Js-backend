import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory } from './SubCategory.schema';
import { CreateSubCategoryDto } from './sub-Category.dto';
import { Model } from 'mongoose';
@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name) private SubCategoryModel: Model<SubCategory>,
  ) {}
  async createSubCategory(subCategoryDto: CreateSubCategoryDto) {
    const exsistSubCategory = await this.SubCategoryModel.findOne({
      name: subCategoryDto.name,
    });
    if (exsistSubCategory) {
      throw new BadRequestException('this SubCategory alwardy found');
    }
    if (!subCategoryDto.CategoryId) {
      throw new BadRequestException('CategoryId is required');
    }
    const createSubCategory = await this.SubCategoryModel.create({
      name: subCategoryDto.name,
      categoryId: subCategoryDto.CategoryId,
    });
    return createSubCategory;
  }
  async getAllSubCategory() {
    const SubCategory =
      await this.SubCategoryModel.find().populate('categoryId');
    return SubCategory;
  }
  async getSubCategoryById(id: string) {
    const SubCategory = await this.SubCategoryModel.findById(id);
    if (!SubCategory) {
      throw new BadRequestException('SubCategory not found');
    }
    return SubCategory;
  }
  async updateSubCategory(id: string) {
    const SubCategory = await this.SubCategoryModel.findById(id);
    if (!SubCategory) {
      throw new BadRequestException('SubCategory not found');
    }
    return SubCategory;
  }
  async deleteSubCategory(id: string) {
    const SubCategory = await this.SubCategoryModel.findByIdAndDelete(id);
    if (!SubCategory) {
      throw new BadRequestException('SubCategory not found');
    }
    return SubCategory;
  }
}
