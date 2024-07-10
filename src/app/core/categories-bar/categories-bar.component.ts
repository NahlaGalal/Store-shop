import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '@/app/shared/services/categories.service';
import { Category } from '@/app/shared/interfaces/category';

@Component({
  selector: 'app-categories-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories-bar.component.html',
  styleUrl: './categories-bar.component.scss',
})
export class CategoriesBarComponent {
  categories: Category[] = [];
  private categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => (this.categories = data.slice(0, 10)),
      error: (err) => console.log(err),
    });
  }
}
