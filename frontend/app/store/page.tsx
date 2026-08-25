"use client";
import { useState } from "react";

export default function Storefront() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showLogs, setShowLogs] = useState(false);
  
  // Custom Product State
  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  const simulateFailedPayment = async (amount: number) => {
    setLoading(true);
    setResult(null);
    setShowLogs(false);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/recover?user_id=U101&amount=${amount}`,
        { method: "POST" }
      );
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Backend not reachable. Is uvicorn running?" });
    }
    setLoading(false);
  };

  const handleCustomBuy = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(customPrice);
    if (price > 0) {
      simulateFailedPayment(price);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-2 text-indigo-400">
        Liquid Checkout
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        AI Revenue Recovery Engine — No failed payment goes unrecovered.
      </p>

      {/* Dynamic Search & Buy Bar */}
      <div className="w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-8 shadow-2xl">
        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">🔍 Search & Buy Any Product</h2>
        <form onSubmit={handleCustomBuy} className="flex gap-4">
          <input 
            type="text" 
            required
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Product Name (e.g., iPhone 15)" 
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
          />
          <div className="relative w-40">
            <span className="absolute left-4 top-3 text-gray-400">₹</span>
            <input 
              type="number" 
              required
              min="1"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder="Price" 
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 pl-8 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 rounded-xl transition"
          >
            Buy Now
          </button>
        </form>
      </div>

      {/* Quick Demo Cards */}
      <div className="flex w-full max-w-3xl items-center gap-4 mb-4">
        <div className="h-px bg-gray-800 flex-1"></div>
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Or Quick Test Scenarios</p>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-3xl">

        {/* High Ticket */}
        <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:ring-2 ring-indigo-500 transition">
          <span className="text-3xl mb-2">💻</span>
          <h2 className="text-lg font-semibold text-center">MacBook Air</h2>
          <p className="text-indigo-400 text-xl font-bold my-2">₹96,000</p>
          <button
            onClick={() => simulateFailedPayment(96000)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-xl w-full transition text-sm"
          >
            Quick Buy
          </button>
        </div>

        {/* Mid Ticket */}
        <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:ring-2 ring-indigo-500 transition">
          <span className="text-3xl mb-2">👟</span>
          <h2 className="text-lg font-semibold text-center">Nike Sneakers</h2>
          <p className="text-indigo-400 text-xl font-bold my-2">₹12,000</p>
          <button
            onClick={() => simulateFailedPayment(12000)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-xl w-full transition text-sm"
          >
            Quick Buy
          </button>
        </div>

        {/* Low Ticket */}
        <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:ring-2 ring-indigo-500 transition">
          <span className="text-3xl mb-2">🎬</span>
          <h2 className="text-lg font-semibold text-center">Netflix Sub</h2>
          <p className="text-indigo-400 text-xl font-bold my-2">₹1,200</p>
          <button
            onClick={() => simulateFailedPayment(1200)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-xl w-full transition text-sm"
          >
            Quick Buy
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center text-indigo-300">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="animate-pulse text-lg">AI Intercepting Failed Payment...</p>
        </div>
      )}

      {/* Result Panel */}
      {result && !loading && (
        <div className="w-full max-w-3xl bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">

          {/* Error State */}
          {result.error && (
            <div className="text-red-400 font-semibold text-center">
              {result.error}
            </div>
          )}

          {/* Recovery Method Badge */}
          {result.recovery && (
            <div className="mb-6 border-b border-gray-700 pb-4">
              <span className="bg-green-600/20 text-green-400 border border-green-500/50 text-sm px-4 py-1.5 rounded-full font-bold uppercase tracking-wide">
                Recovery Method: {result.recovery.method?.replace(/_/g, " ")}
              </span>
            </div>
          )}

          {/* Layer 1: Factoring */}
          {result.recovery?.method === "factoring" && (
            <div className="text-green-400 mb-4">
              <p className="text-xl font-bold mb-2">🎉 Lending AI Approved!</p>
              <div className="bg-green-900/20 p-4 rounded-xl border border-green-800">
                <p className="text-gray-200">Merchant payout guaranteed: <strong className="text-green-400">₹{result.recovery.merchant_payout?.toLocaleString()}</strong></p>
                <p className="text-gray-200 mt-2">Your new payment plan: <strong className="text-white">6 EMIs of ₹{result.recovery.user_emi?.toLocaleString()}/month</strong></p>
                <button className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition">
                  Accept & Complete Checkout
                </button>
              </div>
            </div>
          )}

          {/* Layer 2: Split Tender */}
          {result.recovery?.method === "split_tender" && (
            <div className="text-yellow-400 mb-4">
              <p className="text-xl font-bold mb-2">⚡ Payment Split into 2 Links!</p>
              <p className="mb-4 text-sm text-gray-300">
                Your primary card limit was exceeded. Complete both payments below to confirm your order.
              </p>

              <div className="space-y-3">
                <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between border border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Part 1</p>
                    <p className="text-xl font-bold text-white">₹{result.recovery.link1_amount?.toLocaleString()}</p>
                  </div>
                  <a href={result.recovery.link1_url} target="_blank" rel="noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-xl transition">
                    Pay Now
                  </a>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between border border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Part 2</p>
                    <p className="text-xl font-bold text-white">₹{result.recovery.link2_amount?.toLocaleString()}</p>
                  </div>
                  <a href={result.recovery.link2_url} target="_blank" rel="noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-xl transition">
                    Pay Now
                  </a>
                </div>
              </div>

              <p className="text-xs text-red-400 mt-4 text-center">
                Stopping Rule Active: Auto-refund triggered if Part 2 is not paid within 15 minutes.
              </p>
            </div>
          )}

          {/* Layer 3: Data-for-Debt */}
          {result.recovery?.method === "data_for_debt" && (
            <div className="text-purple-400 mb-4">
              <p className="text-xl font-bold mb-2">🤝 Data-for-Debt Offer!</p>
              <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-800">
                <p className="text-gray-200">{result.recovery.task}</p>
                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition">
                  Start Survey — Waive ₹{result.recovery.amount_waived} Fee
                </button>
              </div>
            </div>
          )}

          {/* Hidden Compliance Audit Trail (For Judges) */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <button 
              onClick={() => setShowLogs(!showLogs)}
              className="text-xs text-gray-500 hover:text-gray-300 transition flex items-center gap-2 uppercase tracking-widest font-bold"
            >
              {showLogs ? "▼ Hide AI Audit Logs" : "▶ View AI Audit Logs (Judges)"}
            </button>
            
            {showLogs && (
              <div className="mt-3 bg-gray-950 rounded-xl p-4 text-xs text-green-300 font-mono max-h-60 overflow-y-auto border border-gray-800">
                <pre>{JSON.stringify(result.audit, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}