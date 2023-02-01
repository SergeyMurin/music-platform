import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import * as process from 'process';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule, {
      rawBody: true,
    });
    app.use(
      cors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
      }),
    );
    //app.enableCors();
    await app.listen(PORT, () =>
      console.log(
        `[${new Date().toLocaleDateString()}] Server started on ${PORT}`,
      ),
    );
  } catch (error) {
    console.error(error);
  }
};

start().then();
