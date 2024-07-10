import { ProductListItem } from '@/app/features/List/interfaces/product-list-item';
import { createAction, props } from '@ngrx/store';

export const setProducts = createAction(
  '[List pages] Set products',
  props<{ products: ProductListItem[] }>()
);
export const toggleBrands = createAction(
  '[List Pages] Toggle brands',
  props<{ brand: string; isChecked: boolean }>()
);
export const toggleCategroies = createAction(
  '[List Pages] Toggle categories',
  props<{ category: string; isChecked: boolean }>()
);
export const changeRateRange = createAction(
  '[List Pages] Change rate range',
  props<{ value: number; highValue: number }>()
);
export const changePriceRange = createAction(
  '[List Pages] Change price range',
  props<{ min: number; max: number }>()
);
export const resetFilters = createAction('[List Pages] Reset filters');
