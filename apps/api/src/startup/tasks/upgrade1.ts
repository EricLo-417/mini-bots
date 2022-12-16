import { INestApplication } from '@nestjs/common';
import { BaseTask } from '../BaseTask';
import { UpgradeTask } from '../decorators/task.decorator';
import { Entities } from '@mini-bots/types';

import * as dummyData from '../../assets/data.json';
import { ShipmentService } from '../../modules/shipment';

interface DummyField {
  id: number,
  label_id: string,
  shipping_tracking_code: string
}

export class Upgrade1 extends BaseTask {

  private shipmentService: ShipmentService;

  constructor(app: INestApplication) {
    super(app);

    this.shipmentService = app.get(ShipmentService);
  }

  @UpgradeTask('Seed Database', 'task to seed database, the lazy way')
  async executeTask(): Promise<void> {
    const shipments = (dummyData.data as DummyField[]).reduce((acc, data) => {
      const shipment = new Entities.Shipment();
      shipment.id = data.id;
      shipment.labelId = data.label_id;
      shipment.shippingTrackingCode = data.shipping_tracking_code;
      return acc.concat(shipment);
    }, [] as Entities.Shipment[]);

    for await (const shipment of shipments) {
      await this.shipmentService.create(shipment);
    }
  }
}
