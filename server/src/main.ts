import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

const start = async () => {
  try {
    const PORT = process.env.PORT || 4000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
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
