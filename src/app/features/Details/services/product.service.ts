import { Product } from '@/app/shared/interfaces/product';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProductDetails(id: number): Observable<Product> {
    return this.http.get<Product>(
      `https://dummyjson.com/products/${id}?select=title,description,category,price,rating,stock,sku,reviews,images,thumbnail`
    );
  }
}
