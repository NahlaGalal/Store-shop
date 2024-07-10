# Store Shop

This is the repository for the Store Shop application. This project is a responsive web application using Angular that allows users to search for and filter through a dataset of products.

I used the api from [Dummy JSON](https://dummyjson.com/docs/products) to get products list, and product details but for now I applied filters from front-end side because there isn't any request to apply filters and also I applied adding to cart from front-end side and saving cart state to localstorage.

You can find the app in [Live website](https://store-shop-gamma.vercel.app/)

## Table of Contents

- [Pages](#pages)
- [Installation](#installation)
- [Technologies](#technologies)
- [Screenshots](#screenshots)

## Pages

- `/` => The home page listing all products
- `/category/:category_name` => The category page listing all products in this category
- `/search/:search_key` => The search page listing all products matching the search key
- `/product/:product_id` => The product page with product details
- `/error` => 404 error page if the user enter wrong route or enter incorrect category name or product id
- `/error-default` => Default error page for any error returned from the API, for example no internet connection

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NahlaGalal/Store-shop.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. run the project locally:
   ```bash
   npm start
   ```
4. Open the project in `http://localhost:4200`

## Technologies

- Angular
- NGRX store
- Ng-icons

## Screenshots

- Home page
![Home page screenshot](https://github.com/NahlaGalal/Store-shop/assets/33041250/ba0b8dd7-ab6c-4490-943f-1d8630493799)

- Home page with filters
![Home page using filters screenshot](https://github.com/NahlaGalal/Store-shop/assets/33041250/1f13a9aa-f1fe-45de-ab34-a32be70edf02)

- Category page
![Category page screenshot](https://github.com/NahlaGalal/Store-shop/assets/33041250/3f2d9fc7-5c14-4897-b99c-be7643dfadf0)

- Search page
![Search page screenshot](https://github.com/NahlaGalal/Store-shop/assets/33041250/5d35d6b0-3467-475d-a319-869e3031f425)

- Product details page
![Product page screenshot](https://github.com/NahlaGalal/Store-shop/assets/33041250/91b6b4ab-b073-4219-b45e-093a55adbbe6)
