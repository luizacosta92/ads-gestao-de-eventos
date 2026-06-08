// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jani do Vale Cerimonial',
  description: 'Sistema de Gestão de Casamentos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <nav className="border-b bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-rose-600 text-xl">💍</span>
                <span className="font-semibold text-gray-800">Jani do Vale Cerimonial</span>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <a
                  href="/casamentos"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Casamentos
                </a>
                <a
                  href="/fornecedores"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Fornecedores
                </a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
