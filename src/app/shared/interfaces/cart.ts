import { Product } from './product';

export interface Cart {
  items: {
    product: Product;
    quantity: number;
    totalPrice: number;
  }[];
}
