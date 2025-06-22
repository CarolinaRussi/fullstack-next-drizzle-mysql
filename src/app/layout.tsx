import Link from "next/link";
import "./globals.css";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Empresa Licenças",
  description: "Sistema de gestão de empresas e licenças ambientais",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-teal-700 text-white px-4 py-3 shadow">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-lg font-semibold">Empresa Licenças</h1>
            <nav className="space-x-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/company/create" className="hover:underline">
                Nova Empresa
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </main>
      </body>
    </html>
  );
}
