import React, {useState} from 'react';
import {Dish, DishMutation} from "../../types";
import {useAppSelector} from "../../app/hook";
import {selectSendLoading} from "../../store/dishesSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  onSubmit: (meal: Dish) => void;
}

const MainForm: React.FC<Props> = ({onSubmit}) => {
  const loading = useAppSelector(selectSendLoading);
  const [dish, setDish] = useState<DishMutation>({
    title: '',
    price: '',
    image: '',
  });

  const onDishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setDish(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...dish,
      price: parseFloat(dish.price),
    });
    setDish({
      title: '',
      price: '',
      image: '',
    });
  };


  return (
    <div className='border border-dark'>
      <form onSubmit={onFormSubmit}>
        <div className='text-center p-5'>
          <div className='mb-3'>
            <input
              className='form-control'
              type="text"
              placeholder='dish'
              id='title'
              name='title'
              value={dish.title}
              onChange={onDishChange}
            />
          </div>
          <div className='mb-3'>
            <input
              className='form-control'
              type="number"
              placeholder='price'
              id='price'
              name='price'
              value={dish.price}
              onChange={onDishChange}
            />
          </div>
          <div className='mb-3'>
            <input
              className='form-control'
              type="text"
              placeholder='image'
              id='image'
              name='image'
              value={dish.image}
              onChange={onDishChange}
            />
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={loading}
          >
            {loading && <ButtonSpinner/>}
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainForm;