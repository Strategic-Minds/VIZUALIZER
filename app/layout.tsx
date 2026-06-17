import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vizual-X | Vizzy AI Floor Visualizer',
  description: 'Speak or type to Vizzy, discover epoxy styles, and render them onto your own floor photo.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
