import { Component, inject } from '@angular/core';
import { Category } from '@/app/shared/category';
import { CategoriesService } from '@/app/shared/categories.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  categories: Category[] = [];
  private categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => (this.categories = data.slice(0, 10)),
      error: (err) => console.log(err),
    });
  }
}
