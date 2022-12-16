import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { service as ShipmentService } from '../../services/shipment.service';
import { StoreState } from '../store.state';
import { Actions } from './shipment.action.enum';


export const setLabelId = createAction<string>(Actions.SET_LABELID);

export const setShippingTrackingCode = createAction<string>(Actions.SET_SHIPPING_TRACKING_CODE);

export const setPage = createAction<number>(Actions.SET_PAGE);



export const fetchShipments = createAsyncThunk(Actions.FETCH_SHIPMENTS, async (_, { getState }) => {
    const { shipment: state } = getState() as StoreState;

    return ShipmentService.find({
        isFuzzy: true,
        labelId: state.labelId,
        shippingTrackingCode: state.shippingTrackingCode,
        pageable: {
            currentPage: state.pageable?.currentPage,
            numberPerPage: state.pageable?.numberPerPage
        }
    });

});


export const nextPage = createAsyncThunk(Actions.NEXT_PAGE, async (_, { getState, dispatch }) => {
    const { shipment: state } = getState() as StoreState;

    dispatch(setPage(state.pageable.currentPage + 1));

    dispatch(fetchShipments());
});

export const previousPage = createAsyncThunk(Actions.PREVIOUS_PAGE, async (_, { getState, dispatch }) => {
    const { shipment: state } = getState() as StoreState;

    dispatch(setPage(Math.max(state.pageable.currentPage - 1, 0)));

    dispatch(fetchShipments());
});