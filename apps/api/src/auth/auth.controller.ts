import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signupDto: SignupDto): Promise<AuthResponseDto> {
    return this.authService.signUp(signupDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ user; accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
