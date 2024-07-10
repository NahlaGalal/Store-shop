import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-brand-filter',
  standalone: true,
  imports: [],
  templateUrl: './brand-filter.component.html',
  styleUrl: './brand-filter.component.scss',
})
export class BrandFilterComponent {
  @Input() brands: { name: string; productsNum: number }[] = [];
  onToggleBrandEmit = output<{ brand: string; isChecked: boolean }>({
    alias: 'onToggleBrand',
  });

  onToggleBrand(event: Event, name: string): void {
    this.onToggleBrandEmit.emit({
      brand: name,
      isChecked: (event.currentTarget as HTMLInputElement).checked,
    });
  }
}
