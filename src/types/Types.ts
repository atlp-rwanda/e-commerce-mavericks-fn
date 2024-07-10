import { JwtPayload } from 'jwt-decode';

// types/Types.ts
export type Product = {
  reviews: Review[];
  id: string;
  name: string;
  description: string;
  colors: any;
  images: string[];
  categoryId: string;
  sellerId: string;
  sizes: any[];
  createdAt: string;
  updatedAt: string;
  manufacturer: string;
};

// Define the Response Type
export type ProductResponse = {
  ok: boolean;
  message: string;
  data: Product[];
};

export interface Review {
  createdAt: string;
  feedback: string;
  feedbackImage: string;
  id: string;
  productId: string;
  rating: number;
}
export interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export type Category = {
  id: string;
  name: string;
  image?:string;
};

export type CategoryResponse = {
  ok: boolean;
  message: string;
  data: Category[];
};
export interface NotificationProps {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
}
