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