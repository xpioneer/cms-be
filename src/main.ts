// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/constant'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
