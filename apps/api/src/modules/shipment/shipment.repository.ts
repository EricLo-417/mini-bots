import { Repository } from 'typeorm';
import { Entities } from '@mini-bots/types';

export class ShipmentRepository extends Repository<Entities.Shipment> { }
