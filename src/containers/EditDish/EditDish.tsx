import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectFetchOneDishLoading, selectOneDish} from "../../store/dishesSlice";
import {fetchOneDish, updateDish} from "../../store/dishesThunks";
import MainForm from "../../components/MainForm/MainForm";
import Spinner from "../../components/Spinner/Spinner";
import {Dish} from "../../types";

const EditDish = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const oneDish = useAppSelector(selectOneDish);
  const fetchLoading = useAppSelector(selectFetchOneDishLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [id, dispatch]);

  const onEdit = async (meal: Dish) => {
    await dispatch(updateDish({
      id: id,
      meal: meal,
    }));
    navigate('/admin');
  };

  const existingDish = oneDish && {
    ...oneDish,
    price: oneDish.price.toString(),
  };

  return (
    <div>
      {fetchLoading && <Spinner/>}
      {existingDish && (
        <MainForm
          onSubmit={onEdit}
          existingDish={existingDish}
        />
      )}
    </div>
  );
};

export default EditDish;