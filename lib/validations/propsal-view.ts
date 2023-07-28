import * as z from "zod"


export const proposalViewSchema = z.object({
  jobDescription: z.string().min(10).max(10000),
  jobTitle: z.string().min(1).max(100),
  rate: z.number().min(0),
  timeline: z.string().min(1).max(100),
  jobType: z.string()
})

