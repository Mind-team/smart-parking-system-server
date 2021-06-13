import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config: ConfigService = app.get('ConfigService');
  await app.listen(config.get('PORT') ?? 5000);
}
bootstrap();
