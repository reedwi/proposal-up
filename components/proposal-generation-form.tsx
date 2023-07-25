"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { jobDescriptionSchema } from "@/lib/validations/proposal"
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

interface ProposalGenerationFormProps extends React.HTMLAttributes<HTMLFormElement> {
  jobDescription: string
  userId: string | null
}

type FormData = z.infer<typeof jobDescriptionSchema>

export function ProposalGenerationForm({ jobDescription, userId, className, ...props }: ProposalGenerationFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobDescriptionSchema),
    defaultValues: {
      jobDescription: jobDescription || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/proposals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_description: data.jobDescription,
        user_id: userId
      }),
    })

    setIsSaving(false)

    // if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your name was not updated. Please try again.",
    //     variant: "destructive",
    //   })
    // }


    // router.push()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
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
            />
            {errors?.jobDescription && (
              <p className="px-1 text-xs text-red-600">{errors.jobDescription.message}</p>
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