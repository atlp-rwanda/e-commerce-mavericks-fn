import { JwtPayload } from 'jwt-decode';

// types/Types.ts

export type Size = {
  id: string;
  size: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  expiryDate: string;
  productId: string;
  available: boolean;
  createdAt: string;
};

export type Product = {
  reviews: Review[];
  id: string;
  name: string;
  description: string;
  colors?: string[];
  images: string[];
  categoryId: string;
  sellerId: string;
  sizes: Size[];
  createdAt: string;
  updatedAt: string;
  manufacturer: string;
};

// Define the Response Type
export type ProductResponse = {
  ok: boolean;
  message: string;
  data: Product;
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
  image?: string;
  description: string;
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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photoUrl: string | null;
  gender: string;
  Role: {
    name: string;
  };
}

export interface Role {
  id: string;
  name: string;
}

type ChatUser = {
  firstName: string;
  lastName: string;
  photoUrl: string;
};

export type ChatMessage = {
  id: string;
  content: string;
  senderId: string;
  User: ChatUser;
}
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  sizeId: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  products: Product;
}

export interface Order {
  user: User;
  id: string;
  status: string;
  shippingAddress1: string;
  shippingAddress2: string | null;
  phone: string;
  zipCode: string | null;
  city: string;
  country: string;
  userId: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

export interface orderResponse{
  data:Order[];

}