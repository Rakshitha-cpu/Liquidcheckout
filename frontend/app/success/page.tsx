"use client";
import { useEffect, useState } from "react";

export default function Success() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-[80vh] bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <div className="bg-gray-900 border border-green-900/50 rounded-3xl p-10 max-w-lg text-center shadow-2xl shadow-green-900/20">
        
        {/* Success Animation Ring */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          <div className="relative w-full h-full bg-green-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-green-500/50">
            ✓
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-green-400">Payment Recovered!</h1>
        <p className="text-gray-300 mb-8 text-lg">
          Your transaction was successful. The Liquid Checkout AI engine has secured the revenue.
        </p>

        <div className="bg-gray-800 rounded-xl p-4 mb-8 text-left border border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Transaction Receipt</p>
          <div className="flex justify-between font-mono text-sm mb-1">
            <span className="text-gray-300">Status:</span>
            <span className="text-green-400">PAID</span>
          </div>
          <div className="flex justify-between font-mono text-sm">
            <span className="text-gray-300">Gateway:</span>
            <span className="text-indigo-300">Razorpay Test Net</span>
          </div>
        </div>

        {/* Corrected Link to /store instead of / */}
        <a 
          href="/store" 
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition w-full"
        >
          Return to Storefront
        </a>
      </div>
    </main>
  );
}