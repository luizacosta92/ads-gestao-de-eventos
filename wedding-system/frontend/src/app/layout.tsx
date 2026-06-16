// src/app/layout.tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';
import { Sidebar } from '@/components/layout/sidebar';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
});

export const metadata: Metadata = {
  title: 'Enlace — Gestão de Casamentos',
  description: 'Sistema de Gestão de Casamentos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${hanken.variable}`}>
      <body>
        <Providers>
          <div className="app">
            <Sidebar />
            <main className="main">{children}</main>
          </div>
        </Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
