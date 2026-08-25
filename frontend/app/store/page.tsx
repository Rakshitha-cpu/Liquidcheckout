"use client";
import { useState } from "react";

export default function Storefront() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const simulateFailedPayment = async (amount: number) => {
    setLoading(true);
    setResult(null);
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

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-2 text-indigo-400">
        Liquid Checkout
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-md">
        AI Revenue Recovery Engine — No failed payment goes unrecovered.
      </p>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-3xl">

        {/* High Ticket */}
        <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-3xl mb-2">💻</span>
          <h2 className="text-lg font-semibold">MacBook Air</h2>
          <p className="text-indigo-400 text-xl font-bold my-2">₹96,000</p>
          <p className="text-xs text-gray-400 mb-4">Triggers: Factoring AI</p>
          <button
            onClick={() => simulateFailedPayment(96000)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl w-full transition"
          >
            Buy Now
          </button>
        </div>

        {/* Mid Ticket */}
        <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-3xl mb-2">👟</span>
          <h2 className="text-lg font-semibold">Nike Sneakers</h2>
          <p className="text-indigo-400 text-xl font-bold my-2">₹12,000</p>
          <p className="text-xs text-gray-400 mb-4">Triggers: Split Tender</p>
          <button
            onClick={() => simulateFailedPayment(12000)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl w-full transition"
          >
            Buy Now
          </button>
        </div>

        {/* Low Ticket */}
        <div className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-3xl mb-2">🎬</span>
          <h2 className="text-lg font-semibold">Netflix Monthly</h2>
          <p className="text-indigo-400 text-xl font-bold my-2">₹1,200</p>
          <p className="text-xs text-gray-400 mb-4">Triggers: Data-for-Debt</p>
          <button
            onClick={() => simulateFailedPayment(1200)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl w-full transition"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-indigo-300 animate-pulse text-lg">
          AI Analyzing Recovery Options...
        </div>
      )}

      {/* Result Panel */}
      {result && !loading && (
        <div className="w-full max-w-3xl bg-gray-800 rounded-2xl p-6 shadow-xl">

          {/* Error State */}
          {result.error && (
            <div className="text-red-400 font-semibold">
              {result.error}
            </div>
          )}

          {/* Recovery Method Badge */}
          {result.recovery && (
            <div className="mb-4">
              <span className="bg-green-600 text-white text-sm px-4 py-1 rounded-full font-semibold uppercase">
                Recovery Method: {result.recovery.method?.replace(/_/g, " ")}
              </span>
            </div>
          )}

          {/* Layer 1: Factoring */}
          {result.recovery?.method === "factoring" && (
            <div className="text-green-400 mb-4">
              <p className="text-lg font-bold">Lending AI Approved!</p>
              <p>
                Merchant receives:{" "}
                <strong>₹{result.recovery.merchant_payout?.toLocaleString()}</strong> instantly.
              </p>
              <p>
                User gets: <strong>6 EMIs of ₹{result.recovery.user_emi?.toLocaleString()}/month</strong>
              </p>
            </div>
          )}

          {/* Layer 2: Split Tender */}
          {result.recovery?.method === "split_tender" && (
            <div className="text-yellow-400 mb-4">
              <p className="text-lg font-bold">Payment Split into 2 Links!</p>
              <p className="mb-3 text-sm text-gray-300">
                Your card limit was exceeded. Complete both payments to confirm your order.
              </p>

              <div className="bg-gray-700 rounded-xl p-4 mb-2 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Payment Link A</p>
                  <p className="text-xl font-bold text-white">
                    ₹{result.recovery.link1_amount?.toLocaleString()}
                  </p>
                </div>
                <a
                  href={result.recovery.link1_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-xl transition"
                >
                  Pay Now
                </a>
              </div>

              <div className="bg-gray-700 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Payment Link B</p>
                  <p className="text-xl font-bold text-white">
                    ₹{result.recovery.link2_amount?.toLocaleString()}
                  </p>
                </div>
                <a
                  href={result.recovery.link2_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-xl transition"
                >
                  Pay Now
                </a>
              </div>

              <p className="text-xs text-red-400 mt-3">
                Stopping Rule Active: Auto-refund triggered if Part B is not paid within 15 minutes.
              </p>
            </div>
          )}

          {/* Layer 3: Data-for-Debt */}
          {result.recovery?.method === "data_for_debt" && (
            <div className="text-purple-400 mb-4">
              <p className="text-lg font-bold">Data-for-Debt Offer!</p>
              <p className="text-sm text-gray-300 mt-1">{result.recovery.task}</p>
              <button className="mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-xl transition">
                Start Survey — Waive ₹{result.recovery.amount_waived} Fee
              </button>
            </div>
          )}

          {/* Compliance Audit Trail */}
          <div className="mt-4">
            <h3 className="text-gray-300 font-semibold mb-2 text-sm uppercase tracking-widest">
              Compliance Audit Trail
            </h3>
            <div className="bg-gray-950 rounded-xl p-4 text-xs text-green-300 font-mono max-h-60 overflow-y-auto">
              <pre>{JSON.stringify(result.audit, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}