import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entities, DTOs } from '@mini-bots/types';
import { ShipmentRepository } from './shipment.repository';
import { Like } from 'typeorm';

@Injectable()
export class ShipmentService {

    constructor(
        @InjectRepository(Entities.Shipment)
        private readonly shipmentRepository: ShipmentRepository,
    ) { }

    async findAll(): Promise<Entities.Shipment[]> {
        return this.shipmentRepository.find();
    }

    async create(createModel: DTOs.CreateShipmentDTO) {
        return this.shipmentRepository.save({ labelId: createModel.labelId, shippingTrackingCode: createModel.shippingTrackingCode });
    }

    async count(searchModel: DTOs.SearchShipmentDTO) {
        return this.shipmentRepository.count({
            where: this.buildWhere(searchModel)
        });
    }

    async find(searchModel: DTOs.SearchShipmentDTO) {
        return this.shipmentRepository.find({
            where: this.buildWhere(searchModel),
            take: searchModel.pageable.numberPerPage,
            skip: searchModel.pageable.currentPage * searchModel.pageable.numberPerPage
        });
    }

    private buildWhere(searchModel: DTOs.SearchShipmentDTO) {
        const where = {} as any;

        if (searchModel.labelId) {
            where.labelId = searchModel.isFuzzy ? Like(`%${searchModel.labelId}%`) : searchModel.labelId;
        }

        if (searchModel.shippingTrackingCode) {
            where.shippingTrackingCode = searchModel.isFuzzy ? Like(`%${searchModel.shippingTrackingCode}%`) : searchModel.shippingTrackingCode;
        }

        return where;
    }
}
