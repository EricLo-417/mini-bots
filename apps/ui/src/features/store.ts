import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from './shipment/shipment.reducer';

export default configureStore({
    reducer: {
        shipment: shipmentReducer
    }
});
