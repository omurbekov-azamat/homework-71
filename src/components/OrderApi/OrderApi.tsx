import React from 'react';
import {AboutNewOrder} from "../../types";

interface Props{
  item: AboutNewOrder;
}

const OrderApi: React.FC<Props> = ({item}) => {
  return (
    <div
      className='d-flex justify-content-between text-capitalize'
    >
      <p>{item.amount} x {item.name}</p>
      <p>Price: {item.price} som</p>
    </div>
  );
};

export default OrderApi;