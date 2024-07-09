import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss',
})
export class PriceFilterComponent {
  @Input() range: { min: number; max: number } = { min: 0, max: 0 };
}
