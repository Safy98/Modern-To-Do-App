import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
    private JwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignupDto): Promise<AuthResponseDto> {
    const { name, email, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPAssword = await bcrypt.hash(password, salt);
    const user = this._userRepository.create({
      name,
      email,
      password: hashedPAssword,
      created_at: new Date(),
    });

    try {
      const result = await this._userRepository.save(user);
      const { password, ...userWithoutPassword } = result;
      return {
        success: true,
        message: 'User created successfully',
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ user; accessToken: string }> {
    const { email, password } = signInDto;

    const user: User | null = await this._userRepository.findOne({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = this.JwtService.sign(payload);
      return { user, accessToken };
    } else {
      throw new UnauthorizedException();
    }
  }
}
