export interface ProductListItem {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  thumbnail: string;
}
