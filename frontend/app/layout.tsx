import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liquid Checkout | AI Revenue Recovery",
  description: "No failed payment goes unrecovered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-950 text-white min-h-screen flex flex-col`}
      >
        {/* Global SaaS Navigation Bar */}
        <nav className="w-full bg-gray-900 border-b border-gray-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">💧</div>
            <span className="font-bold text-xl tracking-tight text-white">Liquid Checkout</span>
          </div>
          
          <div className="flex gap-6 text-sm font-medium">
            <a href="/" className="text-gray-300 hover:text-white transition">🛍️ Storefront</a>
            <a href="/support" className="text-gray-300 hover:text-white transition">💬 User Support</a>
            <div className="w-px h-5 bg-gray-700 mx-2"></div> {/* Divider */}
            <a href="/dashboard" className="text-indigo-400 hover:text-indigo-300 transition">📊 Merchant Dashboard</a>
            <a href="/settings" className="text-indigo-400 hover:text-indigo-300 transition">⚙️ AI Rules Engine</a>
          </div>
        </nav>

        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}