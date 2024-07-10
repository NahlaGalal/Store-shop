import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductListItem } from '../interfaces/product-list-item';

@Injectable({
  providedIn: 'root',
})
export class ProductsListService {
  private http = inject(HttpClient);

  getProducts({
    search,
    category,
    skip = 0,
  }: {
    search?: string;
    category?: string;
    skip?: number;
  }): Observable<{
    products: ProductListItem[];
    limit: number;
    skip: number;
    total: number;
  }> {
    let apiURL: string = category
      ? `/products/category/${category}`
      : search
      ? '/products/search'
      : '/products';
    let queryString: string = `select=title,brand,category,price,rating,reviews,thumbnail&limit=20&skip=${skip}`;

    if (search) {
      queryString += `&q=${search}`;
    }

    return this.http.get<{
      products: ProductListItem[];
      limit: number;
      skip: number;
      total: number;
    }>(`https://dummyjson.com${apiURL}/?${queryString}`);
  }
}
