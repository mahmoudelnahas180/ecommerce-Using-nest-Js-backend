import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.MONGO_URL);
  const app = await NestFactory.create(AppModule);

  console.log(process.env.PORT + ' is running');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
