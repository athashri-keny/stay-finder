import z from "zod";

export const JWTpayloadSchema = z.object({
    purpose: z.string({message: "Purpose is requreid!"}),
    userId: z.string({message: "User Id requird!"}),
    email: z.string().optional()
})

export type JWTpayload = z.infer< typeof JWTpayloadSchema>
