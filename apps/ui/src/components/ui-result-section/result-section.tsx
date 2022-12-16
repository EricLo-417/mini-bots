import { Entities } from '@mini-bots/types';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import store from '../../features/store';
import { Actions, Selectors } from '../../features/shipment';
import './result-section.scss';
import { useEffect, useState } from 'react';

type AppDispatch = typeof store.dispatch;

function ResultHeader() {
  return (
    <thead>
      <tr>
        <th className="result-header__id">id</th>
        <th className="result-header__label-id">Label ID</th>
        <th className="result-header__tracking-code">Shipping Tracking Code</th>
      </tr>
    </thead>
  );
}

function ResultFooter({ currentPage, availablePages }: { currentPage: number; availablePages: number }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="result-footer">
      <div className="result-footer__total">
        Showing page {currentPage} out of {availablePages}
      </div>
      <div className="result-footer__controls">
        <button className="result-footer__back" onClick={() => dispatch(Actions.previousPage())}>
          {'<--'}
        </button>
        <button className="result-footer__forward" onClick={() => dispatch(Actions.nextPage())}>
          {'-->'}
        </button>
      </div>
    </div>
  );
}

const ShipmentRow = ({ shipment }: { shipment: Entities.Shipment }) => {
  return (
    <tr>
      <td>{shipment.id}</td>
      <td>{shipment.labelId}</td>
      <td>{shipment.shippingTrackingCode}</td>
    </tr>
  );
};

const ShipmentTable = ({ shipments }: { shipments: Entities.Shipment[] }) => (
  <table className="ui-result-section__table">
    <ResultHeader />
    <tbody>
      {shipments?.map((shipment) => (
        <ShipmentRow shipment={shipment} key={shipment.labelId}></ShipmentRow>
      ))}
    </tbody>
  </table>
);

export default function UiResultSection() {
  const [allShipments, setShipments] = useState([] as Entities.Shipment[]);
  const [currentPage, setCurrentPage] = useState(0);
  const [availablePages, setAvailablePages] = useState(0);

  store.subscribe(() => {
    const state = store.getState().shipment;
    setShipments([...state.shipments]);

    setCurrentPage(state.pageable.currentPage + 1);
    setAvailablePages(Math.ceil(state.total / state.pageable.numberPerPage));
  });

  if (allShipments?.length === 0) {
    return <div className="ui-result-section"></div>;
  }

  return (
    <div className="ui-result-section">
      <ShipmentTable shipments={allShipments}></ShipmentTable>
      <ResultFooter currentPage={currentPage} availablePages={availablePages}></ResultFooter>
    </div>
  );
}
