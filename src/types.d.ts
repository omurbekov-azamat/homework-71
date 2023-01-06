export interface DishMutation {
  title: string;
  price: string;
  image: string;
}

export interface Dish {
  title: string;
  price: number;
  image: string;
}

export interface ApiDish extends Dish {
  id: string;
}

export interface ApiDishesList {
  [id: string]: Dish;
}

export interface OrderDish {
  dish: ApiDish;
  amount: number;
}

export interface OrderObject {
  [id: string]: number;
}

export interface ApiBookingsList {
  [id: string]: OrderObject;
}

export interface GotOrders{
  [id: string]: number | string;
}

export interface AboutNewOrder {
  name: string;
  amount: number;
  price: number;
}

export interface FixOrdersFromApi {
  id: string,
  orders: Item[],
}
