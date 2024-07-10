export interface SelectedFilter {
  brands: string[];
  categories: string[];
  rate: {
    value: number;
    highValue: number;
  };
  price: { min: number; max: number };
}
