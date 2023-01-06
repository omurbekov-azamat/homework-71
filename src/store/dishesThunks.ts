import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {
  ApiDish,
  ApiDishesList,
  Dish,
  ApiBookingsList,
  OrderObject,
  OrderDish,
  GotOrders,
  AboutNewOrder, FixOrdersFromApi
} from "../types";
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

export const deleteDish = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'dishes/deleteDish',
  async (id, thunkAPI) => {
    await axiosApi.delete('/meals/' + id + '.json');
    thunkAPI.dispatch(fetchDishes());
  }
);

export const sendOrderToApi = createAsyncThunk<void, undefined, { state: RootState }>(
  'dishes/newOrder',
  async (arg, thunkAPI) => {
    const orders: OrderDish[] = thunkAPI.getState().dishes.orderDishes;

    const newOrders: OrderObject[] = orders.map((item) => {
      return {
        [item.dish.id]: item.amount,
      }
    });

    let completeOrders: OrderObject = {};

    newOrders.forEach((order: OrderObject) => {
      Object.keys(order).forEach(id => {
        completeOrders[id] = order[id];
      });
    });

    await axiosApi.post('/bookings.json', completeOrders);
  }
);

export const fetchOrders = createAsyncThunk<FixOrdersFromApi[], undefined, { state: RootState }>(
  'dishes/fetchAllOrders',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(fetchDishes());
    const ordersResponse = await axiosApi.get<ApiBookingsList | null>('/bookings.json');
    const orders = ordersResponse.data;
    const dishes = thunkAPI.getState().dishes.items;

    let newOrders: GotOrders[] = [];

    if (orders) {
      newOrders = Object.keys(orders).map(id => {

        const order = orders[id] as {};

        return {
          id,
          ...order,
        }
      });
    }

    return  newOrders.map((item)  => {

      const tryTest: AboutNewOrder[] = [];

      Object.keys(item).forEach(id => {
        dishes.forEach((dish) => {
          if(id === dish.id) {
            const amount = item[id] as number
            tryTest.push({
              name: dish.title,
              amount: item[id] as number,
              price: dish.price * amount,
            });
          }
        })
      });

      return {
        id: item.id as string,
        orders: tryTest,
      };
    });
  }
);

export const completeOrder = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'dishes/completeOrders',
  async (id, thunkAPI) => {
    await axiosApi.delete('/bookings/' + id + '.json');
    thunkAPI.dispatch(fetchOrders());
  }
);