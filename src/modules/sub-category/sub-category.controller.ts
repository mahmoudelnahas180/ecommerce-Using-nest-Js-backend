import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './sub-Category.dto';
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('/create')
  createsubCategory(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    subCategoryDto: CreateSubCategoryDto,
  ) {
    return this.subCategoryService.createSubCategory(subCategoryDto);
  }
  @Get('/all')
  getAllSubCategory() {
    return this.subCategoryService.getAllSubCategory();
  }
  @Get('/:id')
  getSubCategoryById(@Param() id: string) {
    return this.subCategoryService.getSubCategoryById(id);
  }
  @Patch('/:id')
  updateSubCategory(@Param() id: string) {
    return this.subCategoryService.updateSubCategory(id);
  }
  @Delete('/:id')
  deleteSubCategory(@Param() id: string) {
    return this.subCategoryService.deleteSubCategory(id);
  }
}
