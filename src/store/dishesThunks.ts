import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {Dish} from "../types";

export const createDish = createAsyncThunk<void, Dish>(
  'dishes/create',
  async (dish) => {
    await axiosApi.post('/meals.json', dish);
  }
);