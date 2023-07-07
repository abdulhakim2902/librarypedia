import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthService } from './auth.service';
import { User } from 'src/user';
import { Public } from 'src/decorators';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiAcceptedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiCreatedResponse({ type: User, description: 'UserCreated' })
  @ApiBadRequestResponse({ description: 'InvalidData' })
  @ApiConflictResponse({ description: 'DuplicateData' })
  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() data: RegisterUserDto): Promise<User> {
    return this.authService.register(data);
  }

  @Public()
  @ApiAcceptedResponse({
    description: 'UserAccepted',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'UserNotFound' })
  @ApiUnauthorizedResponse({ description: 'UnauthorizedUser' })
  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }
}
