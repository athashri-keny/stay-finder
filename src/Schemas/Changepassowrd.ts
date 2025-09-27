import z from "zod";

export const ChangePasswordSchema = z.object({
    NewPassword: z.string({message: "new password is required!"}),
    Oldpassword: z.string({message: "Old passsword is required@"}),
    confirmPassword: z.string({message: "Please confirm your password"})
})
.refine((data) => data.NewPassword === data.confirmPassword , {
    path: ['confirmPassword'],
    message: "passwords does not match",
})
