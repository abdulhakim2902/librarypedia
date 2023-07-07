import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
      });

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async updateById(id: number, data: UpdateUserDto) {
    const user = this.userRepository.create(data);
    await this.userRepository.update({ id }, user);
  }
}
