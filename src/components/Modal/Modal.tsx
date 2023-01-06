import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {sendOrderToApi} from "../../store/dishesThunks";
import {
  closeCheckOrder,
  deleteOneOrder,
  selectCheckOrder,
  selectOrderDishes,
  selectSendLoading
} from "../../store/dishesSlice";
import {DELIVERY} from "../../constants";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import Backdrop from "../Backdrop/Backdrop";

const Modal = () => {
  const orderDishes = useAppSelector(selectOrderDishes);
  const loading = useAppSelector(selectSendLoading);
  const showModal = useAppSelector(selectCheckOrder);
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(closeCheckOrder());
  };

  const deleteOrder = (id: string) => {
    dispatch(deleteOneOrder(id));
  };

  const total = orderDishes.reduce((sum, order) => {
    return sum + order.amount * order.dish.price;
  }, DELIVERY);

  const sendOrder = async () => {
    await dispatch(sendOrderToApi());
  };

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
                    <button
                      onClick={() => deleteOrder(item.dish.id)}
                      className='ms-3 btn btn-danger'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            <div className='p-2'>Delivery {DELIVERY} kgs</div>
              <div className='p-2'>Total: {total} kgs</div>
            </div>
            <div className='text-center mb-3'>
              <button
                className='btn btn-primary me-3'
                onClick={close}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className='btn btn-success'
                onClick={sendOrder}
                disabled={loading}
              >
                {loading && <ButtonSpinner/>}
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;