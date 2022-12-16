import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Shipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "label_id", type: 'varchar' })
    labelId: string;

    @Column({ name: "shipping_tracking_code", type: 'varchar' })
    shippingTrackingCode: string;
}