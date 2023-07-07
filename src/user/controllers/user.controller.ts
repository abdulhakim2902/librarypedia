import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from '../user.service';
import { User } from '../user.entity';
import { UserProfile } from 'src/decorators';

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
}
