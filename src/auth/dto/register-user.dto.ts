import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ name: 'username', default: 'johndoe', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({ name: 'firstName', default: 'John', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ name: 'lastName', default: 'Doe' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ name: 'email', default: 'johndoe@mail.com', required: true })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ name: 'password', default: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
