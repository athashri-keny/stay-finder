import {z} from  'zod'

export const VerifyCodeSchema = z.object({
    code: z.string().length(7 , "Verification must be 6 digit ")
})