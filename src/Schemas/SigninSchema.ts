import * as z from 'zod'

export const SignInSchema = z.object({
  name: z.string({message: "Name is required!"}),
   email: z.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Invalid email address!",
    }),
    password: z.string()
})