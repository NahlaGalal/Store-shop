import { Component, inject, Input, output } from '@angular/core';
import { Category } from '@/app/shared/interfaces/category';
import { CategoriesService } from '@/app/shared/services/categories.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toggleCategroies } from '@/app/store/actions/filterProducts.actions';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];

  private categoriesService = inject(CategoriesService);
  private router = inject(Router);
  filteredCategories: Category[] = [];
  allCategories: Category[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
        this.filteredCategories = data.filter((category) =>
          this.categories.includes(category.slug)
        );
      },
      error: () =>
        this.router.navigate(['error-default'], { replaceUrl: true }),
    });
  }

  ngOnChanges(): void {
    this.filteredCategories = this.allCategories.filter((category) =>
      this.categories.includes(category.slug)
    );
  }

  onToggleCategory(event: Event, name: string): void {
    this.store.dispatch(
      toggleCategroies({
        category: name,
        isChecked: (event.currentTarget as HTMLInputElement).checked,
      })
    );
  }
}
