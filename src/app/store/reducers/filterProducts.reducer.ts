import { SelectedFilter } from '@/app/features/List/interfaces/selected-filter';
import { createReducer, on } from '@ngrx/store';
import * as FilterProductsActions from '@/app/store/actions/filterProducts.actions';
import { ProductListItem } from '@/app/features/List/interfaces/product-list-item';

export interface IState {
  selectedFilters: SelectedFilter;
  products: ProductListItem[];
  filteredProducts: ProductListItem[];
}

const initialState: IState = {
  selectedFilters: {
    brands: [],
    categories: [],
    rate: {
      value: 1,
      highValue: 5,
    },
    price: { min: 0, max: 0 },
  },
  products: [],
  filteredProducts: [],
};

const applyFilters = (state: IState): ProductListItem[] => {
  const filteredProducts = state.products.filter((product) => {
    // Check for price range and rating range
    let isTrue =
      state.selectedFilters.price.min <= product.price &&
      state.selectedFilters.price.max >= product.price &&
      state.selectedFilters.rate.value <= product.rating &&
      state.selectedFilters.rate.highValue >= product.rating;

    // Check for brands only if one brand or more are selected
    if (state.selectedFilters.brands.length) {
      // Restore general text to undefined
      const selectedBrands = state.selectedFilters.brands.map((brand) =>
        brand === 'General' ? undefined : brand
      );

      isTrue = isTrue && selectedBrands.includes(product.brand);
    }

    // Check for categories only if one category or more are selected
    if (state.selectedFilters.categories.length) {
      isTrue =
        isTrue && state.selectedFilters.categories.includes(product.category);
    }

    return isTrue;
  });

  return filteredProducts;
};

export const filterProductsReducer = createReducer(
  initialState,
  on(FilterProductsActions.setProducts, (state, { products }) => {
    return {
      ...state,
      products,
      filteredProducts: products,
    };
  }),
  on(FilterProductsActions.toggleBrands, (state, { brand, isChecked }) => {
    // Deep copy of current state => we can also do it with JSON.parse(JSON.stringify(state.selectedFilters))
    let selectedFilters = {
      ...state.selectedFilters,
      brands: [...state.selectedFilters.brands],
    };

    // When check one brand => Add it to the selected list
    if (isChecked) {
      selectedFilters.brands.push(brand);
    } else {
      // When uncheck one brand => Remove it from the selected list
      const brandIndex = state.selectedFilters.brands.indexOf(brand);

      selectedFilters.brands.splice(brandIndex, 1);
    }

    return {
      ...state,
      selectedFilters,
      filteredProducts: applyFilters({ ...state, selectedFilters }),
    };
  }),
  on(
    FilterProductsActions.toggleCategroies,
    (state, { category, isChecked }) => {
      // Deep copy of current state => we can also do it with JSON.parse(JSON.stringify(state.selectedFilters))
      let selectedFilters = {
        ...state.selectedFilters,
        categories: [...state.selectedFilters.categories],
      };

      if (isChecked) {
        // When check one category, add it to the selected filters
        selectedFilters.categories.push(category);
      } else {
        // When uncheck one category, remove it from the selected filters
        const categoryIndex =
          state.selectedFilters.categories.indexOf(category);

        selectedFilters.categories.splice(categoryIndex, 1);
      }

      return {
        ...state,
        selectedFilters,
        filteredProducts: applyFilters({ ...state, selectedFilters }),
      };
    }
  ),
  on(FilterProductsActions.changeRateRange, (state, { value, highValue }) => {
    // Deep copy of current state => we can also do it with JSON.parse(JSON.stringify(state.selectedFilters))
    // Add current rate to selected filters
    let selectedFilters = {
      ...state.selectedFilters,
      rate: { value, highValue },
    };

    return {
      ...state,
      selectedFilters,
      filteredProducts: applyFilters({ ...state, selectedFilters }),
    };
  }),
  on(FilterProductsActions.changePriceRange, (state, { min, max }) => {
    // Deep copy of current state => we can also do it with JSON.parse(JSON.stringify(state.selectedFilters))
    // Add current price range to selected filters
    let selectedFilters = {
      ...state.selectedFilters,
      price: { min, max },
    };

    return {
      ...state,
      selectedFilters,
      filteredProducts: applyFilters({ ...state, selectedFilters }),
    };
  }),
  on(FilterProductsActions.resetFilters, (state) => ({
    ...state,
    filteredProducts: [...state.products],
    selectedFilters: { ...initialState.selectedFilters },
  }))
);
