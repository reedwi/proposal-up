import * as z from "zod"

export const userNameSchema = z.object({
  overview: z.string().min(10).max(5000),
})