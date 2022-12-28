import {createSlice} from "@reduxjs/toolkit";
import {createDish, fetchDishes} from "./dishesThunks";
import {RootState} from "../app/store";
import {ApiDish} from "../types";

interface DishesState {
  items: ApiDish[];
  createLoading: boolean;
  fetchDishesLoading: boolean;
}
const initialState: DishesState = {
  items: [],
  createLoading: false,
  fetchDishesLoading: false,
}

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder.addCase(createDish.pending, (state) => {
     state.createLoading = true;
   });
    builder.addCase(createDish.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createDish.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchDishesLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
      state.fetchDishesLoading = false;
      state.items = dishes;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchDishesLoading = false;
    });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const selectSendLoading = (state: RootState) => state.dishes.createLoading;
export const selectFetchDishesLoading = (state: RootState) => state.dishes.fetchDishesLoading;
export const selectDishes = (state: RootState) => state.dishes.items;