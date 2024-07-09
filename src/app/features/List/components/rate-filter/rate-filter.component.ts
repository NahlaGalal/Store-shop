import { Component } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-rate-filter',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './rate-filter.component.html',
  styleUrl: './rate-filter.component.scss',
})
export class RateFilterComponent {
  minValue: number = 1;
  maxValue: number = 3;
  options: Options = {
    floor: 1,
    ceil: 5,
    combineLabels: (min) => min,
    autoHideLimitLabels: false
  };
}
