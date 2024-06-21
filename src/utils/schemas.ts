import { z } from 'zod';

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
