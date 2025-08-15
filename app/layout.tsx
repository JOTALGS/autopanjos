import type { Metadata } from 'next'
import './globals.css'
import { Arimo } from 'next/font/google'

const arimo = Arimo({ subsets: ['latin'], variable: '--font-arimo' })

export const metadata: Metadata = {
  title: 'Autodiagnostico Panjos',
  description: 'Created with v0',
  generator: 'v0.dev',
  icons: {
    icon: '/placeholder-logo.svg',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
