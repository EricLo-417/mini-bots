import { Entities } from '@mini-bots/types';
import { createSelector, Selector } from '@reduxjs/toolkit';
import { ShipmentState } from './shipment.state';

interface StoreState {
    shipment: ShipmentState
}

export const selectAvailablePages = createSelector<[Selector<StoreState, ShipmentState>], number>(
    (state) => state.shipment,
    ({ total, pageable }) => Math.ceil(total / pageable.numberPerPage)
);

export const selectCurrentPage = createSelector<[Selector<StoreState, ShipmentState>], number>(
    (state) => state.shipment,
    ({ pageable }) => pageable.currentPage + 1
);

export const selectShipments = createSelector<[Selector<StoreState, ShipmentState>], Entities.Shipment[]>(
    (state) => state.shipment,
    ({ shipments }) => shipments
);