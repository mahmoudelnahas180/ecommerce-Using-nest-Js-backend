import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateUser, ICreateUserResponse, IUsers } from './users.interface';
import { CreateUserDto, UpdateUserDto } from './Dto/CreateUserDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/auth/User.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FindOneParams } from './Dto/CheckParmsId.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUsers>,
  ) {}
  private users: IUsers[] = [];

  async getAllUsers(
    page: string,
    limit: string,
  ): Promise<ICreateUserResponse[]> {
    const users = await this.userModel
      .find()
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
    return users;
  }
  async createUser(body: CreateUserDto): Promise<ICreateUserResponse> {
    const user = await this.userModel.findOne({ email: body.email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userModel.create(body);
    return newUser;
  }
  async getuserById(params: FindOneParams) {
    const user = await this.userModel.findById(params.id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }
  async updateUserById(params: FindOneParams, body: UpdateUserDto) {
    try {
      const { name, role, age, avatar, phoneNumber, address, active, gender } =
        body;
      const updatedUser = await this.userModel.findByIdAndUpdate(
        params.id,
        { name, role, age, avatar, phoneNumber, address, active, gender },
        { returnDocument: 'after' },
      );
      if (!updatedUser) {
        throw new NotFoundException('Not found user');
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteUserById(params: FindOneParams) {
    const user = await this.userModel.findByIdAndDelete(params.id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }
  async softDeleteUserById(params: FindOneParams) {
    const user = await this.userModel.findByIdAndUpdate(params.id, {
      active: false,
    });
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }
  async restoreUserById(params: FindOneParams) {
    const user = await this.userModel.findByIdAndUpdate(params.id, {
      active: true,
    });
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }
}
