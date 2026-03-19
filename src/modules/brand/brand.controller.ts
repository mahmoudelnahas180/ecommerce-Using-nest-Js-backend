import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
/*
## 5) Brands
### POST /brands (Admin)
- **Body:**
{
  "name": "Apple",
  "logo": "https://example.com/apple.png"
}
### PATCH /brands/:id (Admin)
- **Body:**
{
  "name": "Apple Inc."
}
### DELETE /brands/:id (Admin)
- **Path Params:** `id`
### GET /brands (Public)
- **Response:** قائمة البراندات.
### GET /brands/:id (Public)
- **Response:** براند واحدة.
*/
import { BrandService } from './brand.service';
import { CreateBrandDto, CheckIDDto } from './brand.dto';
@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}
  @Post('/')
  createService(@Body() body: CreateBrandDto) {
    return this.brandService.createBrand(body);
  }
  @Get('/')
  getAllBrands() {
    return this.brandService.getAllBrands();
  }
  @Get('/:id')
  getBrandById(@Param() id: CheckIDDto) {
    return this.brandService.getBrandById(id);
  }
  @Patch('/:id')
  updateBrand(@Param() id: CheckIDDto, @Body() body: Partial<CreateBrandDto>) {
    return this.brandService.updateBrand(id, body);
  }
  @HttpCode(204)
  @Delete('/:id')
  deleteBrand(@Param() id: CheckIDDto) {
    return this.brandService.deleteBrand(id);
  }
}
