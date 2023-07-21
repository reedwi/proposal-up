import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Proposal Up',
  description: 'Application to use ChatGPT to generate proposals for Upwork',
  keywords: [
    "Upwork",
    "Upwork.com",
    "Proposals",
    "Open AI",
    "ChatGPT",
    "Proposal Generation",
    "Upwork Proposal Generation"
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
