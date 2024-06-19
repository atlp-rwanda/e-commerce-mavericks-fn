import { JwtPayload } from 'jwt-decode';

// types/Types.ts
export type Product = {
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

export interface CustomJwtPayload extends JwtPayload {
  id: string;
}
