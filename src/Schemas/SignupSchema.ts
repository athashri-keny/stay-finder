import * as z from 'zod';

export const SignUpSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
