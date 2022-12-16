/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { TaskLoader } from './startup/TaskLoader';
import * as tasks from './startup/tasks';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ exposedHeaders: 'X-TOTAL-COUNT' });

  const options = new DocumentBuilder()
    .setTitle('Mini Bio Bots')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('mini-bio-bots')
    .build();


  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);


  // Run startup tasks
  await TaskLoader.loadTasks(tasks, app);
}

bootstrap();
