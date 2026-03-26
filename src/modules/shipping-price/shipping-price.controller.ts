import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/Guard/GuardAuth/auth.guard';
import { RolesGuard } from 'src/common/Guard/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  CreateShippingPriceDto,
  ShippingPriceIdDto,
  UpdateShippingPriceDto,
} from './shipping-price.dto';
import { ShippingPriceService } from './shipping-price.service';

@Controller('shipping-price')
@Roles('admin')
@UseGuards(AuthGuard, RolesGuard)
export class ShippingPriceController {
  constructor(private readonly shippingPriceService: ShippingPriceService) {}

  @Get('/')
  findAll() {
    return this.shippingPriceService.findAll();
  }

  @Get('/:id')
  findOne(@Param() params: ShippingPriceIdDto) {
    return this.shippingPriceService.findOne(params);
  }

  @Post('/')
  create(@Body() createShippingPriceDto: CreateShippingPriceDto) {
    return this.shippingPriceService.create(createShippingPriceDto);
  }

  @Patch('/:id')
  update(
    @Param() params: ShippingPriceIdDto,
    @Body() updateShippingPriceDto: UpdateShippingPriceDto,
  ) {
    return this.shippingPriceService.update(params, updateShippingPriceDto);
  }

  @Delete('/:id')
  remove(@Param() params: ShippingPriceIdDto) {
    return this.shippingPriceService.remove(params);
  }
}
