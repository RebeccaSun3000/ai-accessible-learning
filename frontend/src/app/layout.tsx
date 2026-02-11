import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Accessible Learning',
  description: 'Making AI education accessible for everyone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
