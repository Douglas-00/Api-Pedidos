import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Config Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Pedidos')
    .setDescription('Documentação da API de Pedidos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/pedidos', app, document);

  await app.listen(3000);
}
bootstrap();
