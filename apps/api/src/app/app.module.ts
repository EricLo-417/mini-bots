import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from '../database';
import { ConfigModule } from '../modules/config';
import { ShipmentModule } from '../modules/shipment';
import { TaskModule } from '../modules/tasks';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, ShipmentModule, TaskModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptions,
    }),],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
