"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { JobTypeEnum, jobDescriptionSchema } from "@/lib/validations/proposal"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectLabel, SelectItem, SelectValue } from "./ui/select"
import { proposalViewSchema } from "@/lib/validations/propsal-view"

interface ProposalViewFormProps extends React.HTMLAttributes<HTMLFormElement> {
  jobDescription: string
  jobTitle: string
  timeline: string
  rate: number | null
  jobType: string
  userId: string | null
  id: string
}

type FormData = z.infer<typeof proposalViewSchema>

export function ProposalViewForm({ jobDescription, jobTitle, timeline, rate, jobType, userId, id, className, ...props }: ProposalViewFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(proposalViewSchema),
    defaultValues: {
      jobDescription: jobDescription || "",
      jobTitle: jobTitle || "",
      timeline: timeline || "",
      rate: rate || undefined,
      jobType: jobType || undefined
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/proposals/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobDescription: data.jobDescription,
        name: data.jobTitle,
        timeline: data.timeline,
        rate: data.rate,
        job_type: data.jobType,
        user_id: userId,
        id: id
      }),
    })

    const proposal = await response.json()

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      })
    }


    router.push(`/dashboard/proposals/${proposal.id}`)
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>
            Please enter a title for this proposal. This could be the job title or a name that makes sense to you for the job.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              className="w-full"
              {...register("jobTitle")}
              placeholder="Title"
            />
            {errors?.jobTitle && (
              <p className="px-1 text-xs text-red-600">{errors.jobTitle.message}</p>
            )}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
          <CardDescription>
            Please copy and paste the job description from the job posting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Job Description
            </Label>
            <Textarea
              id="jobDescription"
              className="w-full"
              {...register("jobDescription")}
              placeholder="Description"
            />
            {errors?.jobDescription && (
              <p className="px-1 text-xs text-red-600">{errors.jobDescription.message}</p>
            )}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Job Type</CardTitle>
          <CardDescription>
            Hourly or Fixed-Price?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Job Type
            </Label>
            <Select>
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Select a job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Job Type</SelectLabel>
                  <SelectItem value="Hourly">Hourly</SelectItem>
                  <SelectItem value="Fixed-Price">Fixed-Price</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors?.jobType && (
              <p className="px-1 text-xs text-red-600">{errors.jobType?.message}</p>
            )}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Expected Timeline</CardTitle>
          <CardDescription>
            Please enter the expected timeline for the project i.e. 2-4 weeks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Timeline
            </Label>
            <Input
              id="timeline"
              className="w-1/2"
              {...register("timeline")}
              placeholder="2-4 weeks"
            />
            {errors?.timeline && (
              <p className="px-1 text-xs text-red-600">{errors.timeline?.message}</p>
            )}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Rate</CardTitle>
          <CardDescription>
            Please enter your hourly rate or your proposed fixed-price amount.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Rate
            </Label>
            <Input
              id="rate"
              className="w-1/2"
              {...register("rate")}
              placeholder="50"
            />
            {errors?.rate && (
              <p className="px-1 text-xs text-red-600">{errors.rate?.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Generate</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}