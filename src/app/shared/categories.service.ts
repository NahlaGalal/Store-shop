import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from './category';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    console.log('hello');
    
    return this.http.get<Category[]>('https://dummyjson.com/products/categories');    
  }
}
