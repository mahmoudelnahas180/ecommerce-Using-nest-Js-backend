import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ForbiddenException,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { ICreateUser, ICreateUserResponse } from './users.interface';
import { RolesGuard } from 'src/common/Guard/roles.guard';
import { AuthGuard } from 'src/common/Guard/GuardAuth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UseInterceptors, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { CreateUserDto, UpdateUserDto } from '../auth/CreateUserDto';
import { FindOneParams } from './Dto/CheckParmsId.dto';
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
  @Get('/allusers')
  getAllUsers(): any {
    return this.userService.getAllUsers();
  }
  @Post('/createuser')
  // @Roles('admin')
  // @UseGuards(AuthGuard, RolesGuard)
  createUser(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: CreateUserDto,
  ): Promise<ICreateUserResponse> {
    return this.userService.createUser(body);
  }
  @Get(':id')
  getUserById(
    @Param(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    params: FindOneParams,
  ): Promise<ICreateUserResponse> {
    console.log({ idd: params });
    return this.userService.getuserById(params);
  }
  @Patch(':id')
  getUserAndUpdate(
    @Param(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    params: FindOneParams,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: UpdateUserDto,
  ): Promise<ICreateUserResponse> {
    return this.userService.updateUserById(params, body);
  }
  @Delete(':id')
  getUserAndDelete(
    @Param(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    params: FindOneParams,
  ): Promise<ICreateUserResponse> {
    return this.userService.deleteUserById(params);
  }
}
