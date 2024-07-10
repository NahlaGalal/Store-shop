import { changePriceRange } from '@/app/store/actions/filterProducts.actions';
import { Component, Input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss',
})
export class PriceFilterComponent {
  @Input() range: { min: number; max: number } = { min: 0, max: 0 };
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(private store: Store) {}

  ngOnChanges() {
    this.minPrice = this.range.min;
    this.maxPrice = this.range.max;
  }

  onChangeMinPrice(event: Event) {
    const value = +(event.currentTarget as HTMLInputElement).value;

    // Check that min price can't be larger than max price
    if (value >= this.maxPrice) {
      (event.currentTarget as HTMLInputElement).value = `${this.maxPrice - 1}`;
      this.minPrice = this.maxPrice - 1;
    } else {
      this.minPrice = value;
    }

    this.store.dispatch(
      changePriceRange({ min: this.minPrice, max: this.maxPrice })
    );
  }

  onChangeMaxPrice(event: Event) {
    const value = +(event.currentTarget as HTMLInputElement).value;

    // Check that max price can't be lower than min price
    if (value <= this.minPrice) {
      (event.currentTarget as HTMLInputElement).value = `${this.minPrice + 1}`;
      this.maxPrice = this.minPrice + 1;
    } else {
      this.maxPrice = value;
    }

    this.store.dispatch(
      changePriceRange({ min: this.minPrice, max: this.maxPrice })
    ) ;
  }
}
