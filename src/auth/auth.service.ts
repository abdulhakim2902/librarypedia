import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterUserDto) {
    try {
      const user = this.userRepository.create(data);
      await this.userRepository.insert(user);
      return user;
    } catch (e) {
      if (['23502', '23503', '23505'].includes(e.code)) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(data: LoginUserDto) {
    const { username, password } = data;
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new HttpException('UserNotFound', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: { id: user.id, username: user.fullName },
      token: { accessToken },
    };
  }
}
