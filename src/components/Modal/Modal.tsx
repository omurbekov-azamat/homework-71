import React from 'react';
import Backdrop from "../Backdrop/Backdrop";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {closeCheckOrder, selectCheckOrder, selectOrderDishes} from "../../store/dishesSlice";

const Modal = () => {
  const orderDishes = useAppSelector(selectOrderDishes);
  const showModal = useAppSelector(selectCheckOrder);
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(closeCheckOrder());
  };

  const total = orderDishes.reduce((sum, order) => {
    return sum + order.amount * order.dish.price;
  }, 150);

  return (
    <>
      <Backdrop show={showModal}/>
      <div className='modal show'
           style={{display: showModal ? 'block' : 'none'}}
      >
        <div className='modal-dialog' onClick={e => e.stopPropagation()}>
          <div className='modal-content'>
            <div className='text-center'>
              <h1 className='modal-title fs-5'>Your order</h1>
            </div>
            <div>
              {orderDishes.map((item) => (
                <div
                  key={item.dish.id}
                  className='d-flex justify-content-between p-2 align-items-center'
                >
                  <p className='text-capitalize'>{item.dish.title} x {item.amount}</p>
                  <div className='d-flex flex-row align-items-center'>
                    <p className='m-0'>{item.dish.price * item.amount} kgs</p>
                    <button className='ms-3 btn btn-danger'>Delete</button>
                  </div>
                </div>
              ))}
              <div className='p-2'>Delivery 150kgs</div>
              <div className='p-2'>Total: {total}</div>
            </div>
            <div className='text-center mb-3'>
              <button
                className='btn btn-primary'
                onClick={close}
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;