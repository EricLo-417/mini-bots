import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from '@mini-bots/types';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Entities.Shipment])],
    providers: [ShipmentService],
    controllers: [ShipmentController],
    exports: [ShipmentService],
})
export class ShipmentModule { }
