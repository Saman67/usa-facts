import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('The Star Wars API documentation')
    .setVersion('1.0')
    .addTag('films', 'Star Wars films endpoints')
    .addTag('people', 'Star Wars characters endpoints')
    .addTag('planets', 'Star Wars planets endpoints')
    .addTag('species', 'Star Wars species endpoints')
    .addTag('starships', 'Star Wars starships endpoints')
    .addTag('vehicles', 'Star Wars vehicles endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3010);
  console.log('Backend server is running: http://localhost:3010');
  console.log('Swagger documentation: http://localhost:3010/api');
}
bootstrap();
