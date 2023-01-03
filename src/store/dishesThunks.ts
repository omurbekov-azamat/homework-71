import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ApiDish, ApiDishesList, Dish} from "../types";
import {AppDispatch, RootState} from "../app/store";

export const createDish = createAsyncThunk<void, Dish>(
  'dishes/create',
  async (dish) => {
    await axiosApi.post('/meals.json', dish);
  }
);

export const fetchDishes = createAsyncThunk<ApiDish[], undefined>(
  'dishes/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<ApiDishesList | null>('/meals.json');
    const dishes = dishesResponse.data;
    let newDishes: ApiDish[] = [];

    if (dishes) {
      newDishes = Object.keys(dishes).map(id => {
        const dish = dishes[id];
        return {
          ...dish,
          id,
        }
      });
    }

    return newDishes;
  }
);

export const fetchOneDish = createAsyncThunk<ApiDish, string>(
  'dishes/fetchOneDish',
  async (id) => {
    const response = await axiosApi.get<ApiDish | null>('/meals/' + id + '.json');
    const meal = response.data;

    if (meal === null) {
      throw new Error('Not found!');
    }

    return meal;
  }
);

interface UpdateDishParams {
  id: string;
  meal: Dish;
}

export const updateDish = createAsyncThunk<void, UpdateDishParams>(
  'dishes/update',
  async (params) => {
    await axiosApi.put('/meals/' + params.id + '.json', params.meal);
  }
);

export const deleteDish = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
  'dishes/deleteDish',
  async (id, thunkAPI) => {
    await axiosApi.delete('/meals/' + id + '.json');
    thunkAPI.dispatch(fetchDishes());
  }
);

export const sendOrderToApi = createAsyncThunk<void, undefined, {state: RootState}>(
  'dishes/newOrder',
  async (arg, thunkAPI) => {
    const orders = thunkAPI.getState().dishes.orderDishes;

    const newOrders = orders.map((item) => {
      return {
        [item.dish.id]: item.amount,
      }
    });

    const order = {
      ordersMeals: newOrders,
    };

    await axiosApi.post('/bookings.json', order);
  }
);