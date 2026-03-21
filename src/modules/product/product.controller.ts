import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './Product.Dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('')
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }
  @Patch('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDto>,
  ) {
    return this.productService.updateProduct(id, body);
  }
  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
  @Get('')
  getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
    if (!page && !limit) {
      return this.productService.getAllProducts();
    }

    return this.productService.getProductsByPagination({
      page: Number(page) || 1,
      limit: Number(limit) || 5,
    });
  }
  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
}
