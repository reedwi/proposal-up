import * as z from "zod"

const JobTypeEnum = z.enum(["Fixed-Price", "Hourly"])
export type JobTypeEnum = z.infer<typeof JobTypeEnum>;
export const jobDescriptionSchema = z.object({
  jobDescription: z.string().min(10).max(10000),
  jobTitle: z.string().min(1).max(100),
  rate: z.number().min(0),
  timeline: z.string().min(1).max(100),
  jobType: JobTypeEnum
})

