import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  const port: number = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
}
bootstrap();
