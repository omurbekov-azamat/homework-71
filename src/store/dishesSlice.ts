import {createSlice} from "@reduxjs/toolkit";
import {createDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from "./dishesThunks";
import {RootState} from "../app/store";
import {ApiDish} from "../types";

interface DishesState {
  items: ApiDish[];
  createLoading: boolean;
  fetchDishesLoading: boolean;
  oneDish: null | ApiDish;
  fetchOneDishLoading: boolean;
  deleteLoading: false | string;
}
const initialState: DishesState = {
  items: [],
  createLoading: false,
  fetchDishesLoading: false,
  oneDish: null,
  fetchOneDishLoading: false,
  deleteLoading: false,
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
    builder.addCase(fetchOneDish.pending, (state) => {
      state.fetchOneDishLoading = true;
      state.oneDish = null;
    });
    builder.addCase(fetchOneDish.fulfilled, (state, {payload: meal}) => {
      state.fetchOneDishLoading = false;
      state.oneDish = meal;
    });
    builder.addCase(fetchOneDish.rejected, (state) => {
      state.fetchOneDishLoading = false;
    });
    builder.addCase(updateDish.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(updateDish.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(updateDish.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(deleteDish.pending, (state,{meta}) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const selectSendLoading = (state: RootState) => state.dishes.createLoading;
export const selectFetchDishesLoading = (state: RootState) => state.dishes.fetchDishesLoading;
export const selectDishes = (state: RootState) => state.dishes.items;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;
export const selectDeleteLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectFetchOneDishLoading = (state: RootState) => state.dishes.fetchOneDishLoading;