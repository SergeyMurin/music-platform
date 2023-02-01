import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

const start = async () => {
  try {
    const PORT = process.env.SERVER_PORT;
    const app = await NestFactory.create(AppModule, {
      rawBody: true,
    });
    app.use(
      cors({
        origin: process.env.SERVER_CORS_ORIGIN,
        methods: process.env.SERVER_CORS_METHODS,
        allowedHeaders: process.env.SERVER_CORS_ALLOW_HEADERS,
      }),
    );
    //app.enableCors();
    await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start().then();
