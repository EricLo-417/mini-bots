import { IsBoolean, IsString } from "class-validator";
import { Pageable } from "../common/pageable";

export class CreateShipmentDTO {
    @IsString()
    labelId: string;

    @IsString()
    shippingTrackingCode: string;
}

export class SearchShipmentDTO {
    @IsString()
    labelId: string;

    @IsString()
    shippingTrackingCode: string;

    @IsBoolean()
    isFuzzy: boolean;

    pageable: Pageable;
}