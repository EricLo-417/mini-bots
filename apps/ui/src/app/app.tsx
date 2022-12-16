// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useDispatch } from 'react-redux';

import store from '../features/store';
import { UiSearchSection, UiResultSection } from '../components';
import { fetchShipments } from '../features/shipment/shipment.actions';

import './app.scss';

export function App() {
  const dispatch = useDispatch<typeof store.dispatch>();

  dispatch(fetchShipments());

  return (
    <div className="section-content">
      <UiSearchSection></UiSearchSection>
      <UiResultSection></UiResultSection>
    </div>
  );
}

export default App;
