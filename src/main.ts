import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = isNaN(parseInt(process.env.PORT)) ? 3000 : +process.env.PORT;

  await initSwagger(app);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(port, () => {
    console.log(`Server is listening on localhost:${port}`);
  });
}

async function initSwagger(app: INestApplication) {
  const authConfig = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Auth API description')
    .build();

  const authDocument = SwaggerModule.createDocument(app, authConfig, {
    include: [AuthModule],
  });

  SwaggerModule.setup('explorer/auth', app, authDocument);

  const userConfig = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('User API description')
    .addBearerAuth()
    .build();

  const userDocument = SwaggerModule.createDocument(app, userConfig, {
    include: [UserModule],
  });

  SwaggerModule.setup('explorer/user', app, userDocument);
}

bootstrap();
