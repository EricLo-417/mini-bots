import { createReducer } from '@reduxjs/toolkit';
import * as Actions from './shipment.actions';
import { ShipmentState } from './shipment.state';

const initialState = {
    labelId: '',
    shippingTrackingCode: '',
    shipments: [],
    total: 10,
    pageable: {
        currentPage: 0,
        numberPerPage: 25
    }
} as ShipmentState;


export default createReducer<ShipmentState>(initialState, builder => {
    builder.addCase(Actions.setLabelId, (state, action) => {
        return { ...state, labelId: action.payload.trim(), pageable: { ...state.pageable, currentPage: 0 } };
    }).addCase(Actions.setShippingTrackingCode, (state, action) => {
        return { ...state, shippingTrackingCode: action.payload.trim(), pageable: { ...state.pageable, currentPage: 0 } };
    }).addCase(Actions.fetchShipments.fulfilled, (state, action) => {
        console.log('HERE', action.payload.shipments, action.payload.total);
        return { ...state, shipments: action.payload.shipments, total: action.payload.total };
    }).addCase(Actions.setPage, (state, action) => {
        return { ...state, pageable: { ...state.pageable, currentPage: action.payload } };
    })
});