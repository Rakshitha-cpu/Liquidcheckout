"use client";
import { useState } from "react";

export default function Storefront() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showLogs, setShowLogs] = useState(false);
  
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
    if (price > 0) simulateFailedPayment(price);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-10 lg:p-20">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Liquid Checkout Demo
        </h1>
        <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto">
          Experience how our AI Revenue Recovery Engine saves failed payments in real-time.
        </p>
      </div>

      {/* Instruction Guide for Judges */}
      <div className="w-full max-w-4xl bg-indigo-900/20 border border-indigo-500/30 rounded-3xl p-8 mb-12 shadow-2xl flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
            <span>ℹ️</span> How to test this demo:
          </h2>
          <ol className="space-y-4 text-gray-300 text-lg">
            <li><strong className="text-white">Step 1:</strong> Try to buy a product below.</li>
            <li><strong className="text-white">Step 2:</strong> The standard payment gateway will "fail" the transaction.</li>
            <li><strong className="text-white">Step 3:</strong> Watch our AI instantly intercept the failure and negotiate a recovery method based on the price.</li>
          </ol>
        </div>
        <div className="hidden md:block w-px h-32 bg-indigo-500/30"></div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">The 3 AI Rules:</p>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><span className="text-green-400 font-bold">&gt; ₹40,000</span> = Agentic Factoring (EMI)</li>
            <li><span className="text-yellow-400 font-bold">₹4,000 - ₹40,000</span> = Split Tender Links</li>
            <li><span className="text-purple-400 font-bold">&lt; ₹4,000</span> = Data-for-Debt (Survey)</li>
          </ul>
        </div>
      </div>

      {/* Dynamic Search & Buy Bar */}
      <div className="w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-3xl p-8 mb-12 shadow-2xl">
        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">🔍 Try a custom amount</h2>
        <form onSubmit={handleCustomBuy} className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            required
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Product Name (e.g., iPhone 15)" 
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl p-4 text-lg text-white focus:outline-none focus:border-indigo-500"
          />
          <div className="relative w-full md:w-64">
            <span className="absolute left-4 top-4 text-gray-400 text-lg">₹</span>
            <input 
              type="number" 
              required
              min="1"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder="Price" 
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 pl-10 text-lg text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl transition text-lg"
          >
            Buy Now
          </button>
        </form>
      </div>

      {/* Quick Demo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-4xl">

        {/* High Ticket */}
        <div className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center shadow-lg hover:ring-2 ring-indigo-500 transition cursor-pointer" onClick={() => simulateFailedPayment(96000)}>
          <span className="text-5xl mb-4">💻</span>
          <h2 className="text-xl font-bold text-center">MacBook Air</h2>
          <p className="text-indigo-400 text-2xl font-extrabold my-2">₹96,000</p>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl w-full transition font-bold mt-4">
            Trigger Factoring
          </button>
        </div>

        {/* Mid Ticket */}
        <div className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center shadow-lg hover:ring-2 ring-indigo-500 transition cursor-pointer" onClick={() => simulateFailedPayment(12000)}>
          <span className="text-5xl mb-4">👟</span>
          <h2 className="text-xl font-bold text-center">Nike Sneakers</h2>
          <p className="text-indigo-400 text-2xl font-extrabold my-2">₹12,000</p>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl w-full transition font-bold mt-4">
            Trigger Split Tender
          </button>
        </div>

        {/* Low Ticket */}
        <div className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center shadow-lg hover:ring-2 ring-indigo-500 transition cursor-pointer" onClick={() => simulateFailedPayment(1200)}>
          <span className="text-5xl mb-4">🎬</span>
          <h2 className="text-xl font-bold text-center">Netflix Sub</h2>
          <p className="text-indigo-400 text-2xl font-extrabold my-2">₹1,200</p>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl w-full transition font-bold mt-4">
            Trigger Data-for-Debt
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center text-indigo-300 my-10">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="animate-pulse text-xl font-bold">AI Intercepting Failed Payment...</p>
        </div>
      )}

      {/* Result Panel */}
      {result && !loading && (
        <div className="w-full max-w-4xl bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700 animate-fade-in-up">

          {/* Error State */}
          {result.error && (
            <div className="text-red-400 font-bold text-xl text-center">
              {result.error}
            </div>
          )}

          {/* Recovery Method Badge */}
          {result.recovery && (
            <div className="mb-8 border-b border-gray-700 pb-6 text-center md:text-left">
              <span className="bg-green-600/20 text-green-400 border border-green-500/50 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm">
                Active Protocol: {result.recovery.method?.replace(/_/g, " ")}
              </span>
            </div>
          )}

          {/* Layer 1: Factoring */}
          {result.recovery?.method === "factoring" && (
            <div className="text-green-400 mb-6">
              <p className="text-3xl font-extrabold mb-4">🎉 Lending AI Approved!</p>
              <div className="bg-green-900/20 p-6 rounded-2xl border border-green-800 text-lg">
                <p className="text-gray-200 mb-2">Merchant payout guaranteed: <strong className="text-green-400 text-2xl">₹{result.recovery.merchant_payout?.toLocaleString()}</strong></p>
                <p className="text-gray-200">Your new payment plan: <strong className="text-white text-2xl">6 EMIs of ₹{result.recovery.user_emi?.toLocaleString()}/month</strong></p>
                <button className="mt-8 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition text-lg shadow-lg shadow-green-900/50">
                  Accept & Complete Checkout
                </button>
              </div>
            </div>
          )}

          {/* Layer 2: Split Tender */}
          {result.recovery?.method === "split_tender" && (
            <div className="text-yellow-400 mb-6">
              <p className="text-3xl font-extrabold mb-4">⚡ Payment Split into 2 Links!</p>
              <p className="mb-6 text-lg text-gray-300">
                Your primary card limit was exceeded. Complete both payments below to bypass the limit and confirm your order.
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border border-gray-700 gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Part 1</p>
                    <p className="text-3xl font-bold text-white">₹{result.recovery.link1_amount?.toLocaleString()}</p>
                  </div>
                  <a href={result.recovery.link1_url} target="_blank" rel="noreferrer" className="w-full md:w-auto text-center bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-3 px-10 rounded-xl transition text-lg">
                    Pay Now
                  </a>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border border-gray-700 gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Part 2</p>
                    <p className="text-3xl font-bold text-white">₹{result.recovery.link2_amount?.toLocaleString()}</p>
                  </div>
                  <a href={result.recovery.link2_url} target="_blank" rel="noreferrer" className="w-full md:w-auto text-center bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-3 px-10 rounded-xl transition text-lg">
                    Pay Now
                  </a>
                </div>
              </div>

              <div className="mt-6 bg-red-900/20 border border-red-900 rounded-xl p-4 text-center">
                <p className="text-sm text-red-400 font-bold flex justify-center items-center gap-2">
                  <span>⚠️</span> Stopping Rule Active: Auto-refund triggered if Part 2 is not paid within 15 minutes.
                </p>
              </div>
            </div>
          )}

          {/* Layer 3: Data-for-Debt */}
          {result.recovery?.method === "data_for_debt" && (
            <div className="text-purple-400 mb-6">
              <p className="text-3xl font-extrabold mb-4">🤝 Data-for-Debt Offer!</p>
              <div className="bg-purple-900/20 p-6 rounded-2xl border border-purple-800 text-lg">
                <p className="text-gray-200">{result.recovery.task}</p>
                <button className="mt-8 w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition text-lg shadow-lg shadow-purple-900/50">
                  Start Survey — Waive ₹{result.recovery.amount_waived} Fee
                </button>
              </div>
            </div>
          )}

          {/* Hidden Compliance Audit Trail */}
          <div className="mt-10 pt-6 border-t border-gray-700 text-center md:text-left">
            <button 
              onClick={() => setShowLogs(!showLogs)}
              className="text-sm text-gray-500 hover:text-gray-300 transition flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest font-bold w-full md:w-auto"
            >
              {showLogs ? "▼ Hide AI Audit Logs" : "▶ View AI Audit Logs (Judges)"}
            </button>
            
            {showLogs && (
              <div className="mt-4 bg-gray-950 rounded-2xl p-6 text-sm text-green-300 font-mono max-h-80 overflow-y-auto border border-gray-800 text-left">
                <pre>{JSON.stringify(result.audit, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}