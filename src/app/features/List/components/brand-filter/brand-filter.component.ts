import { toggleBrands } from '@/app/store/actions/filterProducts.actions';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-brand-filter',
  standalone: true,
  imports: [],
  templateUrl: './brand-filter.component.html',
  styleUrl: './brand-filter.component.scss',
})
export class BrandFilterComponent {
  @Input() brands: { name: string; productsNum: number }[] = [];

  constructor(private store: Store) {}

  onToggleBrand(event: Event, name: string): void {
    this.store.dispatch(
      toggleBrands({
        brand: name,
        isChecked: (event.currentTarget as HTMLInputElement).checked,
      })
    );
  }
}
