import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ name: 'firstName', default: 'John' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ name: 'lastName', default: 'Doe' })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ name: 'email', default: 'johndoe@mail.com' })
  @IsEmail()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({ name: 'profileImageURL', default: 'https://image.net' })
  @IsUrl()
  @IsOptional()
  @IsString()
  profileImageURL: string;

  @ApiProperty({ name: 'phoneNumber', default: '+6281200000000' })
  @IsPhoneNumber()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ name: 'address', default: 'Unknown address' })
  @IsOptional()
  @IsString()
  address: string;
}
