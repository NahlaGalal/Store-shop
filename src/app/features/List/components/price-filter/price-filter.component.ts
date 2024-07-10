import { Component, Input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss',
})
export class PriceFilterComponent {
  @Input() range: { min: number; max: number } = { min: 0, max: 0 };
  onChangePriceEmit = output<{ min: number; max: number }>({
    alias: 'onChangePrice',
  });
  minPrice: number = 0;
  maxPrice: number = 0;

  ngOnChanges() {
    this.minPrice = this.range.min;
    this.maxPrice = this.range.max;
  }

  onChangeMinPrice(event: Event) {
    const value = +(event.currentTarget as HTMLInputElement).value;

    if (value >= this.maxPrice) {
      (event.currentTarget as HTMLInputElement).value = `${this.maxPrice - 1}`;
      this.minPrice = this.maxPrice - 1;
    } else {
      this.minPrice = value;
    }

    this.onChangePriceEmit.emit({ min: this.minPrice, max: this.maxPrice });
  }

  onChangeMaxPrice(event: Event) {
    const value = +(event.currentTarget as HTMLInputElement).value;

    if (value <= this.minPrice) {
      (event.currentTarget as HTMLInputElement).value = `${this.minPrice + 1}`;
      this.maxPrice = this.minPrice + 1;
    } else {
      this.maxPrice = value;
    }

    this.onChangePriceEmit.emit({ min: this.minPrice, max: this.maxPrice });
  }
}
