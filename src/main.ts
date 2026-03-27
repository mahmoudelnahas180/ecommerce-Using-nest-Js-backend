import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  console.log(process.env.MONGO_URL);
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Stripe webhook must receive raw body for signature verification.
  app.use('/order/stripe-webhook', express.raw({ type: '*/*' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  console.log(process.env.PORT + ' is running');
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
