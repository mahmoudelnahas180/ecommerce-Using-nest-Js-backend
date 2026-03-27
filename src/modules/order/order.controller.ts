import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Headers,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/common/Guard/GuardAuth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CashOrderDto } from './Dto/CashOrder.dto';
import type { Request, Response } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  // if payment method is cashed
  @Roles('user')
  @UseGuards(AuthGuard)
  @Post('cash-order')
  async cashOrder(
    @Body() body: CashOrderDto,
    @Req() req: { user: { id: string } },
  ) {
    const userId = req.user.id;
    return await this.orderService.cashOrder(body, userId);
  }

  // stripe step 1 : create route to create payment intent if payment method is card
  @Roles('user')
  @UseGuards(AuthGuard)
  @Post('stripe-order')
  async stripeOrder(@Body() body: any, @Req() req: { user: { id: string } }) {
    const userId = req.user.id;
    return await this.orderService.stripeOrder(body, userId);
  }
  @Post('stripe-webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    return await this.orderService.handleWebhook(req, res, signature);
  }
}
