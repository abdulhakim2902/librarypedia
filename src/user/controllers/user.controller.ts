import { Body, Controller, Get, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiFoundResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from '../user.service';
import { User } from '../user.entity';
import { UserProfile } from 'src/decorators';
import { UpdateUserDto } from '../dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiFoundResponse({ type: User, description: 'UserFound' })
  @ApiNotFoundResponse({ description: 'UserNotFound' })
  @ApiUnauthorizedResponse({ description: 'UnauthorizedUser' })
  @Get('/me')
  async me(@UserProfile('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @ApiNoContentResponse({ description: 'UserUpdated' })
  @ApiBadRequestResponse({ description: 'InvalidData' })
  @Put('/update')
  async update(@UserProfile('id') id: number, @Body() data: UpdateUserDto) {
    return this.userService.updateById(id, data);
  }
}
