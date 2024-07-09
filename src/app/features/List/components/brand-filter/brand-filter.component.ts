import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brand-filter',
  standalone: true,
  imports: [],
  templateUrl: './brand-filter.component.html',
  styleUrl: './brand-filter.component.scss',
})
export class BrandFilterComponent {
  @Input() brands: {name: string, productsNum: number}[] = [];
}
