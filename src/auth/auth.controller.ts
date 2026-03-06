import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from './CreateUserDto';
import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from './transform/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(200)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return req.user;
  }
}
