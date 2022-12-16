import { Entities, Common } from "@mini-bots/types";

export interface ShipmentState {
    shipments: Entities.Shipment[],
    total: number,
    pageable: Common.Pageable,
    labelId: string,
    shippingTrackingCode: string,
}