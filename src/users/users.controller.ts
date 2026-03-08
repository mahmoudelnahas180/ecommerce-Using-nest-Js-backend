import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { ICreateUser, ICreateUserResponse } from './users.interface';
import { RolesGuard } from 'src/auth/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/auth/roles.decorator';
import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../auth/transform/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Roles('admin', 'user')
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/')
  getUsers(): any {
    return this.userService.getUsers();
  }
  @Post('/')
  createUser(@Body() body: ICreateUser): ICreateUserResponse {
    if (!body?.username || !body?.email || !body?.password) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.createUser(body);
  }
}
