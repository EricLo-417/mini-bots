import { useDispatch } from 'react-redux';

import store from '../../features/store';
import { Actions } from '../../features/shipment';

import './search-section.scss';

type AppDispatch = typeof store.dispatch;

function BetterInput({ label, onChange }: { label: string; onChange: (event: string) => void }) {
  return (
    <div className="better-input">
      <label>{label}</label>
      <input onChange={(e) => onChange(e.target.value)}></input>
    </div>
  );
}

export default function UiSearchSection() {
  const dispatch = useDispatch<AppDispatch>();

  const handelLabelID = async (labelId: string) => {
    dispatch(Actions.setLabelId(labelId));

    dispatch(Actions.fetchShipments());
  };

  const handelTrackingCode = async (trackingCode: string) => {
    dispatch(Actions.setShippingTrackingCode(trackingCode));
    dispatch(Actions.fetchShipments());
  };

  return (
    <div className="ui-search-section">
      <BetterInput label="Label ID" onChange={(e: string) => handelLabelID(e)} />
      <BetterInput label="Shipment Tracking Code" onChange={(e) => handelTrackingCode(e)} />
    </div>
  );
}
