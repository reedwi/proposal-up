import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserOverviewForm } from "@/components/user-overview-form"
import prismadb from "@/lib/prismadb";

export const metadata = {
  title: "Settings",
  description: "Manage account and profile settings.",
}

export default async function SettingsPage() {
  const { userId } = await auth()

  if (!userId) {
    // redirectToSignIn();
    redirect('/');
  }

  const user = await prismadb.user.findFirst({
    where: {
      id: userId
    }
  });

  const overview = user?.overview || "";

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and profile settings."
      />
      <div className="grid gap-10">
        <UserOverviewForm overview={ overview } userId={ userId } />
      </div>
    </DashboardShell>
  )
}