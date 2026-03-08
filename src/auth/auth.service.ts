import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './User.schema';
import { User } from './User.schema';
import { CreateUserDto, SignInDto } from './CreateUserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const existUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existUser) {
      throw new Error('User already exists');
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashPassword,
    });
    return user;
  }
  async signIn(signInDto: SignInDto) {
    const user = await this.userModel.findOne({ email: signInDto.email });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordMatched = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new Error('vaild password');
    }
    const token = await this.jwtService.signAsync({
      email: user.email,
      role: user.role,
      id: user._id,
      name: user.name,
    });
    console.log(token);
    return { token };
  }
}
