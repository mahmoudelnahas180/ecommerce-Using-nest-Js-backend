import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from './CreateUserDto';
import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { AuthGuard } from '../../common/Guard/GuardAuth/auth.guard';
@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(200)
  @Post('signup')
  async signUp(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.authService.signUp(createUserDto);
  }
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }
}
