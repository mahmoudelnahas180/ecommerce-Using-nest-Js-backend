import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { ICreateUserResponse } from './users.interface';
import { RolesGuard } from 'src/common/Guard/roles.guard';
import { AuthGuard } from 'src/common/Guard/GuardAuth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { CreateUserDto, UpdateUserDto } from './Dto/CreateUserDto';
import { FindOneParams } from './Dto/CheckParmsId.dto';
@UseInterceptors(TransformInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/')
  getAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<ICreateUserResponse[]> {
    return this.userService.getAllUsers(page || '1', limit || '10');
  }
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/cre ateuser')
  createUser(
    @Body()
    body: CreateUserDto,
  ): Promise<ICreateUserResponse> {
    return this.userService.createUser(body);
  }
  @Get(':id')
  getUserById(
    @Param()
    params: FindOneParams,
  ): Promise<ICreateUserResponse> {
    console.log({ idd: params });
    return this.userService.getuserById(params);
  }
  @Patch(':id')
  getUserAndUpdate(
    @Param()
    params: FindOneParams,
    @Body()
    body: UpdateUserDto,
  ): Promise<ICreateUserResponse> {
    return this.userService.updateUserById(params, body);
  }
  @Delete(':id')
  getUserAndDelete(
    @Param()
    params: FindOneParams,
  ): Promise<ICreateUserResponse> {
    return this.userService.deleteUserById(params);
  }
  @Patch(':id/activate')
  activateUser(
    @Param()
    params: FindOneParams,
  ): Promise<ICreateUserResponse> {
    return this.userService.softDeleteUserById(params);
  }
  @Patch(':id/deactivate')
  deactivateUser(
    @Param()
    params: FindOneParams,
  ): Promise<ICreateUserResponse> {
    return this.userService.restoreUserById(params);
  }
}
