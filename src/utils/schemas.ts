import { z } from 'zod';

export const addressSchema = z.object({
  shippingAddress: z
    .string()
    .trim().nonempty("This field is required")
    .min(5, { message: "Address must be at least 5 characters" }),
  country: z
    .string()
    .trim()
    .nonempty("Country is required"),
  city: z
    .string()
    .trim()
    .nonempty("City is required")
    .min(5, { message: "City must be at least 5 character" }),
  phone: z
    .string()
    .trim()
    .nonempty("Phone is required")
    .regex(/^0\d{9}/, { message: 'It must start with 0, and be 10 characters' })
})

const schema = z
  .object({
    firstName: z.string().min(2).trim(),
    lastName: z.string().min(2).trim(),
    email: z.string().email().toLowerCase().trim(),
    phoneNumber: z.string().regex(/^0\d{9}/, { message: 'It must start with 0, and be 10 characters' }),
    password: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Password must contain at least one letter, one number and one special charcter',
    }),
    gender: z.enum(['male', 'female'], { message: 'Gender was not selected' }),
  })
  .required();
export const extendedSchema = schema
  .extend({
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type Formfields = z.infer<typeof extendedSchema>;
export type AddressFields = z.infer<typeof addressSchema>

export interface ExtendedFormFields extends Formfields {
  confirmPassword: string;
}

interface ErrorData {
  ok: boolean;
  error: string;
  message?: string;
}
export interface QueryErrorData {
  status: number | undefined;
  data: ErrorData;
}
export const loginSchema = z.object({
  email: z.string().email({ message: 'A valid email is required' }),
  password: z.string().min(5, { message: 'Password must be 5 characters or more' }),
});
export const emailSchema = z.object({
  email: z.string().email({ message: 'Please Provide a valid email address' }),
});
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one digit')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    passwordConfirm: z.string().min(8, { message: 'Password confirmation must be at least 8 characters long' }),
  })
  .refine(data => data.newPassword === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

export type LoginData = z.infer<typeof loginSchema>;

export interface Size {
  id: string;
  size: string;
  price: number;
  quantity: number;
  discount: number;
  expiryDate: Date;
  productId: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  colors: string[] | null;
  images: string[];
  sellerId: string;
  categoryId: string;
  sizes: Size[];
  reviews: Review[];
}

export interface IProductData {
  data: Product;
  message: string;
}

export interface ICart {
  productId: string | null | undefined;
  sizeId: string | null | undefined;
  quantity?: number;
}
export type DeleteCartQueryParams = Pick<ICart, 'productId' | 'sizeId'>;

export interface ISize {
  price: number;
  size: string | null;
  id: string;
}
export interface ICartProduct {
  id: string;
  name: string;
  sizes: ISize[];
  sellerId: string;
  image: string;
  quantity: number;
  createdAt: string;
}
export interface ICartsResponse {
  ok: boolean;
  cartId: string;
  cartProducts: ICartProduct[];
  data?: string[];
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: string | undefined;
}
export interface ICartsHookResponse {
  data?: ICartsResponse;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: string | undefined;
}

export interface IError extends Error {
  data: any;
  message: string;
}

interface FeedbackUser {
  photoUrl: string | null;
  firstName: string;
}

export interface Review {
  id: string;
  userId?: string;
  productId: string;
  rating: number;
  feedback: string;
  feedbackImage: string;
  createdAt: string;
  updatedAt?: string;
  user?: FeedbackUser;
}

interface wishListData {
  id: string;
  image: string;
  name: string;
  price: number;
  productId: string;
}
export interface ApiResponse<> {
  ok: boolean;
  message: string;
  data: wishListData[];
}
// chat related schema

export const chatSchema = z.object({
  content: z.string().min(2).max(255),
});

export type ChatData = z.infer<typeof chatSchema>;

