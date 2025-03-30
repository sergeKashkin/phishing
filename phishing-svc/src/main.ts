import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { PhishingModule } from './phishing.module';

async function bootstrap() {
  const app = await NestFactory.create(PhishingModule);

  // swagger setup
  const config = new DocumentBuilder()
  .setTitle('Phishing Svc')
  .setDescription('The Phishing API description')
  .setVersion('1.0')
  .addTag('phishing')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // validation
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
