import { DTOs, Entities } from "@mini-bots/types";
import { Controller, Get, Query, Res } from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ShipmentService } from "./shipment.service";
import { Response } from 'express'

@ApiTags('Shipment')
@Controller('v1/shipment')
export class ShipmentController {

    constructor(private readonly shipmentService: ShipmentService) { }

    @Get()
    @ApiQuery({ name: "labelId", type: String, description: "Label id of shipment", required: false })
    @ApiQuery({ name: "shippingTrackingCode", type: String, description: "Shipping Tracking Code of shipment", required: false })
    @ApiQuery({ name: "isFuzzy", type: Boolean, description: "Shipping Tracking Code of shipment. Defaults to true", required: false })
    @ApiQuery({ name: "page", type: Number, description: "Current page index (zero based). Defaults to 0", required: false })
    @ApiQuery({ name: "pageLimit", type: Number, description: "How many items to show per page. Defaults to 25", required: false })
    @ApiResponse({ status: 201, description: 'Shipments matching query', type: DTOs.SearchShipmentDTO, isArray: true })
    async find(@Res({ passthrough: true }) response: Response, @Query('labelId') labelId: string, @Query('shippingTrackingCode') shippingTrackingCode: string, @Query('isFuzzy') isFuzzy = true, @Query('page') page = 0, @Query('pageLimit') pageLimit = 25): Promise<Entities.Shipment[]> {
        const searchModel = { labelId, shippingTrackingCode, isFuzzy, pageable: { numberPerPage: pageLimit, currentPage: page } } as DTOs.SearchShipmentDTO;

        response.header('X-TOTAL-COUNT', `${await this.shipmentService.count(searchModel)}`);

        return this.shipmentService.find(searchModel);
    }
}