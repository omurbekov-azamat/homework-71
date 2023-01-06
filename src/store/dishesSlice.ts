import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  completeOrder,
  createDish,
  deleteDish,
  fetchDishes,
  fetchOneDish,
  fetchOrders,
  sendOrderToApi,
  updateDish
} from "./dishesThunks";
import {RootState} from "../app/store";
import {ApiDish, FixOrdersFromApi, OrderDish} from "../types";

interface DishesState {
  items: ApiDish[];
  createLoading: boolean;
  fetchDishesLoading: boolean;
  oneDish: null | ApiDish;
  fetchOneDishLoading: boolean;
  deleteLoading: false | string;
  orderDishes: OrderDish[];
  showCheckOrder: boolean;
  fetchOrdersLoading: boolean;
  orders: FixOrdersFromApi[];
  completeOrder: false | string;
}

const initialState: DishesState = {
  items: [],
  createLoading: false,
  fetchDishesLoading: false,
  oneDish: null,
  fetchOneDishLoading: false,
  deleteLoading: false,
  orderDishes: [],
  showCheckOrder: false,
  fetchOrdersLoading: false,
  orders: [],
  completeOrder: false,
}

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<ApiDish>) => {
      const existingIndex = state.orderDishes.findIndex(item => {
        return item.dish.id === dish.id;
      });

      if (existingIndex !== -1) {
        state.orderDishes[existingIndex].amount++;
      } else {
        state.orderDishes.push({dish, amount: 1});
      }
    },
    resetDish: (state) => {
      state.orderDishes = [];
    },
    showCheckOrder: (state) => {
      state.showCheckOrder = true;
    },
    closeCheckOrder: (state) => {
      state.showCheckOrder = false;
    },
    deleteOneOrder: (state, {payload: id}: PayloadAction<string>) => {
      state.orderDishes = state.orderDishes.filter(n => n.dish.id !== id);
    },
  },
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
    builder.addCase(sendOrderToApi.pending, (state) => {
      state.createLoading = true;
      state.showCheckOrder = true;
    });
    builder.addCase(sendOrderToApi.fulfilled, (state) => {
      state.orderDishes = [];
      state.createLoading = false;
      state.showCheckOrder = false;
    });
    builder.addCase(sendOrderToApi.rejected, (state) => {
      state.showCheckOrder = false;
      state.createLoading = false;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.fetchOrdersLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, {payload: orders}) => {
      state.fetchOrdersLoading = false;
      state.orders = orders;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.fetchOrdersLoading = false;
    });
    builder.addCase(completeOrder.pending, (state, action) => {
      state.completeOrder = action.meta.arg;
    });
    builder.addCase(completeOrder.fulfilled, (state) => {
      state.completeOrder = false;
    });
    builder.addCase(completeOrder.rejected, (state) => {
      state.completeOrder = false;
    });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const {addDish, resetDish, showCheckOrder, closeCheckOrder, deleteOneOrder} = dishesSlice.actions;
export const selectSendLoading = (state: RootState) => state.dishes.createLoading;
export const selectFetchDishesLoading = (state: RootState) => state.dishes.fetchDishesLoading;
export const selectDishes = (state: RootState) => state.dishes.items;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;
export const selectDeleteLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectFetchOneDishLoading = (state: RootState) => state.dishes.fetchOneDishLoading;
export const selectOrderDishes = (state: RootState) => state.dishes.orderDishes;
export const selectCheckOrder = (state: RootState) => state.dishes.showCheckOrder;
export const selectOrdersLoadings = (state: RootState) => state.dishes.fetchOrdersLoading;
export const selectOrders = (state: RootState) => state.dishes.orders;
export const selectCompleteOrderLoading = (state: RootState) => state.dishes.completeOrder;