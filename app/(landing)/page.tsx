import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default async function LandingPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Create personalized Upwork proposals, fast <span role="img" aria-label="smoke">💨</span>.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Dynamically generate Upowrk proposals based on your personal information and job description following a proven proposal template.
          </p>
          <div className="space-x-4">
            <Link href="/pricing" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Built for Upworkers, by Upworkers. We want you to win more jobs, faster.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <Icons.user />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Personalization</h3>
                <p className="text-sm text-muted-foreground">
                  Use your Upwork overview as a starting point.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <Icons.page />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Proven Template</h3>
                <p className="text-sm text-muted-foreground">
                  Proposals built using a proven template by some of the leading Upworkers.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <Icons.add />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Job Proposal Context</h3>
                <p className="text-sm text-muted-foreground">
                  Proposals built specifically for the job you are applying for.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <Icons.flame />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Blazingly Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Create a personalized, proposal in under a minute.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <Icons.money />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">One Low Fee</h3>
                <p className="text-sm text-muted-foreground">
                  Create up to 50 proposals/mo for $9.99/mo
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex items-center h-[180px] flex-col justify-between rounded-md p-16">
              <div className="">
                <Link
                    href="/pricing"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                      "px-4"
                    )}
                  >
                    Get Started Today
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy is open source and powered by open source software. <br />{" "}
            The code is available on
          </p>
        </div>
      </section> */}
    </>
  )
}