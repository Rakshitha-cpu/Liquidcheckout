import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

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
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen flex`}>
        
        {/* Global Sidebar Navigation */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0 sticky top-0 h-screen">
          
          {/* Logo Area */}
          <div className="p-6 border-b border-gray-800">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition cursor-pointer">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30 text-xl">
                💧
              </div>
              <div>
                <h1 className="font-extrabold tracking-tight text-xl leading-none">Liquid</h1>
                <p className="text-xs text-gray-400 font-medium">Checkout 2.0</p>
              </div>
            </a>
          </div>

          {/* Links Area */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-3 mb-2 mt-2">Public</p>
            <a href="/" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition font-medium">
              <span>🏠</span> Home
            </a>
            <a href="/store" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition font-medium">
              <span>🛍️</span> Demo Store
            </a>
            <a href="/docs" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition font-medium">
              <span>📚</span> API Docs
            </a>

            <div className="my-6 border-t border-gray-800"></div>

            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-3 mb-2 mt-4">Merchant Admin</p>
            <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition font-medium">
              <span>📊</span> Dashboard
            </a>
            <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition font-medium">
              <span>⚙️</span> AI Settings
            </a>
            <a href="/support" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition font-medium">
              <span>💬</span> Agent Desk
            </a>
            <a href="/security" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition font-medium">
              <span>🛡️</span> Security & Trust
            </a>

          </div>

          {/* User Profile / Login Area */}
          <div className="p-4 border-t border-gray-800">
            <a href="/login" className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-lg transition shadow-lg shadow-indigo-600/20">
              Login
            </a>
          </div>
        </aside>

        {/* Page Content */}
        <div className="flex-1 w-full flex flex-col h-screen overflow-y-auto relative">
          {children}
        </div>

        {/* Global Floating AI Chat Bot */}
        <ChatWidget />

      </body>
    </html>
  );
}