import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HTTPLoggerInterceptor } from './interceptors/http-logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalInterceptors(new HTTPLoggerInterceptor());

  const APP_VERSION = process.env.npm_package_version;

  const config = new DocumentBuilder()
    .setTitle('SPS: Server')
    .setDescription('SPS: Server API description')
    .setVersion(APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
