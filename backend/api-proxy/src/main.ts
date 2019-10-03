import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import bodyParser = require('body-parser');

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  const port: number = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
}
bootstrap();
