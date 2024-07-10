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

## Techologies used

- Angular
- NGRX store
- Ng-icons

## Screenshots

- Home page
![alt text](image-1.png)

- Home page with filters
![alt text](image-2.png)

- Category page
![alt text](image-3.png)

- Search page
![alt text](image-4.png)

- Product details page
![alt text](image-5.png)