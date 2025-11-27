import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { RunGenerationProvider } from '@/context/RunGenerationContext';

export const metadata: Metadata = {
  title: 'DeliverX',
  description: 'Plan routes fast. Deliver faster!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>
          <RunGenerationProvider>
            {children}
            <Toaster />
          </RunGenerationProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
