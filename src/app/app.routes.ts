import { Routes } from '@angular/router';
import { HomeComponent } from './features/List/home/home.component';
import { SearchComponent } from './features/List/search/search.component';
import { CategoryProductsComponent } from './features/List/category-products/category-products.component';
import { ProductComponent } from './features/Details/product/product.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search/:handle',
    component: SearchComponent,
  },
  {
    path: 'categories/:handle',
    component: CategoryProductsComponent,
  },
  {
    path: 'product/:handle',
    component: ProductComponent,
  },
  { path: '*', redirectTo: '', pathMatch: 'full' },
];
