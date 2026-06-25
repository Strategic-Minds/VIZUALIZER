import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FloorVision Pro — See Your New Floor Before It\'s Installed',
  description: 'AI-powered floor visualizer. Upload your room photo, pick epoxy flakes, polished concrete, metallic, or stained concrete. Get an instant visual — then request your free digital bid in 24 hours.',
  openGraph: {
    title: 'FloorVision Pro by Xtreme Polishing Systems',
    description: 'See your new floor before it\'s installed. AI visualization + instant digital bid.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
