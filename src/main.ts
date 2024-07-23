import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ToDo: список дел')
    .setDescription('Документация REST API')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();
