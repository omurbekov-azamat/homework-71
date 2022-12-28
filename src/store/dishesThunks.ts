import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ApiDish, ApiDishesList, Dish} from "../types";

export const createDish = createAsyncThunk<void, Dish>(
  'Meals/create',
  async (dish) => {
    await axiosApi.post('/meals.json', dish);
  }
);

export const fetchDishes = createAsyncThunk<ApiDish[], undefined>(
  'Meals/fetchAll',
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