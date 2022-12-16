import axios from 'axios';
import { DTOs, Entities } from '@mini-bots/types';
import { ShipmentModels } from '../models/api';

class ShipmentService {
    private readonly BASE_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/shipment`;

    public async find(searchModel: DTOs.SearchShipmentDTO): Promise<ShipmentModels.SearchShipmentModel> {
        const response = await axios.get<Entities.Shipment[]>(this.BASE_URL, { params: { ...searchModel, page: searchModel?.pageable?.currentPage, pageLimit: searchModel?.pageable?.numberPerPage } });

        // Handle errors, for now just return empty array
        if (response.status !== 200) {
            console.error(response.data);
            return { shipments: [], total: +(response.headers['x-total-count'] ?? 0) };
        }

        return { shipments: response.data, total: +(response.headers['x-total-count'] ?? 0) };
    }
}

const service = new ShipmentService();

Object.freeze(service);

export { service };