import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';

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
