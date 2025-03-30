import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger setup
  const config = new DocumentBuilder()
  .setTitle('Phishing Mgmt Svc')
  .setDescription('The Phishing MGMT API description')
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

  app.enableCors({
    origin: 'http://localhost:5173', // your React dev server
    credentials: true, // allow cookies if needed
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
