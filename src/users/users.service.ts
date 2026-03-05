import { Injectable } from '@nestjs/common';
import { ICreateUser, ICreateUserResponse, IUsers } from './users.interface';

@Injectable()
export class UsersService {
  private users: IUsers[] = [];
  getUsers(): any {
    return {
      message: 'Users fetched successfully',
      data: [],
    };
  }
  createUser(body: ICreateUser): ICreateUserResponse {
    return {
      message: 'User created successfully',
      data: { ...body, id: Date.now().toString() },
    };
  }
}
