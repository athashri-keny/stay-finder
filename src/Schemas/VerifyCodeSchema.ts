import {z} from  'zod'

export const VerifyCodeSchema = z.object({
    // name: z.string({message: "Name is required!"}),
    code: z.string().length(6 , "Verification must be 6 digit ")
})