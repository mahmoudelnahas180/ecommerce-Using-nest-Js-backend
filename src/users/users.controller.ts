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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
