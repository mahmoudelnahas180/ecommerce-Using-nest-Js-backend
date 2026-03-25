import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './User.schema';
import { SignInDto, SignUpDto } from './CreateUserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const existUser = await this.userModel.findOne({
      email: signUpDto.email,
    });
    if (existUser) {
      throw new BadRequestException('User already exists');
    }
    const matchedPassword = signUpDto.password === signUpDto.confirmPassword;
    if (!matchedPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }
    const hashPassword = await bcrypt.hash(signUpDto.password, 10);
    const user = await this.userModel.create({
      name: signUpDto.name,
      email: signUpDto.email,
      password: hashPassword,
    });
    return user;
  }
  async signIn(signInDto: SignInDto) {
    const user = await this.userModel.findOne({ email: signInDto.email });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    if (!user.active) {
      throw new ForbiddenException('User not active');
    }
    const isPasswordMatched = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new ForbiddenException('vaild password');
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
