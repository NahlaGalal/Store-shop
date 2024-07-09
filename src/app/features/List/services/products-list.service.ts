import { Product } from '@/app/shared/product';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    products: Product[];
    limit: number;
    skip: number;
    total: number;
  }> {
    let apiURL: string = category
      ? `/products/category/${category}`
      : search
      ? '/products/search'
      : '/products';
    let queryString: string = `select=title,description,category,price,rating,stock,sku,reviews,images,thumbnail&limit=20&skip=${skip}`;

    if (search) {
      queryString += `&q=${search}`;
    }

    return this.http.get<{
      products: Product[];
      limit: number;
      skip: number;
      total: number;
    }>(`https://dummyjson.com${apiURL}/?${queryString}`);
  }
}
