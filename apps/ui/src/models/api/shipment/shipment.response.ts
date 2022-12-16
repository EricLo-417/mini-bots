import { Entities } from "@mini-bots/types";

export interface SearchShipmentModel {
    shipments: Entities.Shipment[];
    total: number;
}