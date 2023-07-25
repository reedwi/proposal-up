import * as z from "zod"

export const jobDescriptionSchema = z.object({
  jobDescription: z.string().min(10).max(10000),
})