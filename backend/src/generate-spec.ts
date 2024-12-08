import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function generateSpec() {
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
  
  // Write the OpenAPI spec to a file
  fs.writeFileSync(
    path.join(process.cwd(), 'swagger-spec.json'),
    JSON.stringify(document, null, 2)
  );

  await app.close();
}

generateSpec(); 