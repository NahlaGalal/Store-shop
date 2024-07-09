import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CategoryFilterComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

}
