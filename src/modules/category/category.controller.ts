import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { createCategoryDto, CheckIDDto } from './Category.dt';
import { CategoryService } from './category.service';
/*POST   /categories
PATCH  /categories/:id
DELETE /categories/:id
  puplic 
  GET    /categories
GET    /categories/:id

*/

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('/create')
  createCategory(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: createCategoryDto,
  ) {
    return this.categoryService.createCategory(body);
  }
  @Put('/:id')
  updateCategory(
    @Param(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    id: CheckIDDto,
    @Body() body: createCategoryDto,
  ) {
    console.log(id.id);
    return this.categoryService.updateCategory(id, body);
  }
  @Delete('/:id')
  deleteCategory(
    @Param(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    id: CheckIDDto,
  ) {
    return this.categoryService.deleteCategory(id);
  }
  //public
  @Get('/all')
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }
  @Get('/:id')
  getCategoryById(
    @Param(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    id: CheckIDDto,
  ) {
    console.log(id);
    return this.categoryService.getCategoryById(id);
  }
}
