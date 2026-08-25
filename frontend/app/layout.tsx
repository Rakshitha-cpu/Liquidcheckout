import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liquid Checkout | AI Revenue Recovery",
  description: "Stop losing money to failed payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen flex flex-col`}>
        
        {/* Professional Global Navigation Bar */}
        <nav className="w-full bg-gray-900/90 backdrop-blur-md border-b border-gray-800 p-4 sticky top-0 z-50">
          <div className="w-full flex justify-between items-center px-4 md:px-10">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
                💧
              </div>
              <span className="font-extrabold tracking-tight text-xl">Liquid</span>
            </div>

            {/* Links */}
            <div className="flex gap-6 text-sm font-bold items-center">
              <a href="/about" className="text-gray-300 hover:text-white hover:text-indigo-400 transition">Our Mission</a>
              <a href="/docs" className="text-gray-300 hover:text-white hover:text-indigo-400 transition">API Docs</a>
              <div className="w-px h-5 bg-gray-700 mx-2"></div>
              <a href="/store" className="text-gray-300 hover:text-white transition flex items-center gap-1">🛍️ Demo Store</a>
              <a href="/support" className="text-gray-300 hover:text-white transition flex items-center gap-1">💬 AI Support</a>
              <a href="/dashboard" className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/50 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition flex items-center gap-1">
                📊 Merchant Admin
              </a>
            </div>
            
          </div>
        </nav>

        {/* Page Content */}
        <div className="flex-1 w-full flex flex-col">
          {children}
        </div>

      </body>
    </html>
  );
}