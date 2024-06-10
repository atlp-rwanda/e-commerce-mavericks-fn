// types/Types.ts
export type Product = {
  id: string;
  name: string;
  description: string;
  colors: any; // Adjust type based on expected data
  images: string[];
  categoryId: string;
  sellerId: string;
  sizes: any[]; // Adjust type based on expected data
  createdAt: string;
  updatedAt: string;
  manufacturer: string; // Add this field
};

// Define the Response Type
export type ProductResponse = {
  ok: boolean;
  message: string;
  data: Product[];
};
