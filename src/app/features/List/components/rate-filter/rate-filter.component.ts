import { Component, output } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Store } from '@ngrx/store';
import { changeRateRange } from '@/app/store/actions/filterProducts.actions';

@Component({
  selector: 'app-rate-filter',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './rate-filter.component.html',
  styleUrl: './rate-filter.component.scss',
})
export class RateFilterComponent {
  minValue: number = 1;
  maxValue: number = 5;
  options: Options = {
    floor: 1,
    ceil: 5,
    combineLabels: (min) => min,
    autoHideLimitLabels: false,
  };

  constructor(private store: Store) {}

  onChangeRate({
    value,
    highValue,
  }: {
    value: number;
    highValue?: number;
    pointerType: 0 | 1;
  }): void {
    this.store.dispatch(changeRateRange({ value, highValue: highValue || 5 }));
  }
}
