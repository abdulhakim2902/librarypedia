import { MinLength, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ name: 'username', default: 'johndoe', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({ name: 'password', default: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
