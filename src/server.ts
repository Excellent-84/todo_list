import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = procces.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
}

start();
