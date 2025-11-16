import type { Metadata } from 'next';

import { Providers } from '@/providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Propery Connect - Digital Classified Platform',
  description: 'A modern digital classified platform for property listings',
  openGraph: {
    title: 'Propery Connect',
    description: 'A modern digital classified platform for property listings',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
