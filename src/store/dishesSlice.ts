import {createSlice} from "@reduxjs/toolkit";
import {createDish} from "./dishesThunks";
import {RootState} from "../app/store";

interface DishesState {
  createLoading: boolean;
}
const initialState: DishesState = {
  createLoading: false,
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
  },
});

export const dishesReducer = dishesSlice.reducer;
export const selectSendLoading = (state: RootState) => state.dishes.createLoading;