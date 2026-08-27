"use client";
import { useState } from "react";

export default function Storefront() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showLogs, setShowLogs] = useState(false);

  const simulateFailedPayment = async (amount: number) => {
    // Reset state for "n number of trials"
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

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 relative overflow-hidden flex flex-col items-center">
      
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px]"></div>
      
      <div className="w-full max-w-5xl z-10 relative">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">The Liquid Storefront</h1>
          <p className="text-gray-400">Test our AI-Powered Payment Recovery in action</p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1 */}
          <div className="bg-gray-950/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:border-indigo-500/50 transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition"></div>
            <span className="text-5xl mb-4 relative z-10">💻</span>
            <h2 className="text-lg font-bold text-gray-200 relative z-10">MacBook Air</h2>
            <p className="text-white text-2xl font-extrabold my-2 relative z-10">₹96,000</p>
            <button 
              onClick={() => simulateFailedPayment(96000)}
              className="mt-6 w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-medium py-2.5 rounded-full transition relative z-10"
            >
              Pay Now
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-950/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:border-indigo-500/50 transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition"></div>
            <span className="text-5xl mb-4 relative z-10">👟</span>
            <h2 className="text-lg font-bold text-gray-200 relative z-10">Nike Sneakers</h2>
            <p className="text-white text-2xl font-extrabold my-2 relative z-10">₹12,000</p>
            <button 
              onClick={() => simulateFailedPayment(12000)}
              className="mt-6 w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-medium py-2.5 rounded-full transition relative z-10"
            >
              Pay Now
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-950/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:border-indigo-500/50 transition relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition"></div>
            <span className="text-5xl mb-4 relative z-10">🎬</span>
            <h2 className="text-lg font-bold text-gray-200 relative z-10">Netflix Sub</h2>
            <p className="text-white text-2xl font-extrabold my-2 relative z-10">₹1,200</p>
            <button 
              onClick={() => simulateFailedPayment(1200)}
              className="mt-6 w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-medium py-2.5 rounded-full transition relative z-10"
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* Loading Bar */}
        {loading && (
          <div className="flex flex-col items-center text-center my-16 animate-fade-in-up">
            <p className="text-gray-300 font-medium mb-4">Simulating Payment Failure...</p>
            <p className="text-xs text-indigo-400 mb-6">AI is analyzing the failure and crafting the best recovery option.</p>
            <div className="w-96 h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 w-full animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </div>
        )}

        {/* Results Panel */}
        {result && !loading && (
          <div className="bg-gray-950/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 shadow-2xl animate-fade-in-up">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">AI Recovery Options</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Option 1: EMI (Highlights if selected) */}
              <div className={`rounded-2xl p-6 border transition ${result.recovery?.method === 'factoring' ? 'bg-green-900/10 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'bg-gray-900/50 border-gray-800 opacity-50'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-200">EMI Loan Offer</h3>
                  {result.recovery?.method === 'factoring' && <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider font-bold">Recommended</span>}
                </div>
                {result.recovery?.method === 'factoring' ? (
                  <>
                    <p className="text-sm text-gray-400 mb-1">Get this for as low as</p>
                    <p className="text-2xl font-extrabold text-white mb-1">₹{result.recovery.user_emi?.toLocaleString()} / month</p>
                    <p className="text-xs text-gray-500 mb-6">via our lending partners</p>
                    <button className="w-full bg-transparent border border-green-500 text-green-400 hover:bg-green-500/10 font-medium py-2 rounded-lg transition">Accept EMI Offer</button>
                  </>
                ) : (
                  <p className="text-sm text-gray-500 mt-4 text-center">Not eligible</p>
                )}
              </div>

              {/* Option 2: Split Tender (Highlights if selected) */}
              <div className={`rounded-2xl p-6 border transition ${result.recovery?.method === 'split_tender' ? 'bg-yellow-900/10 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.1)]' : 'bg-gray-900/50 border-gray-800 opacity-50'}`}>
                <h3 className="font-bold text-gray-200 mb-4">Split Tender</h3>
                {result.recovery?.method === 'split_tender' ? (
                  <>
                    <p className="text-sm text-gray-400 mb-1">Pay in 2 parts via Razorpay</p>
                    <p className="text-xl font-extrabold text-white mt-3">₹{result.recovery.link1_amount?.toLocaleString()} now</p>
                    <p className="text-sm font-medium text-gray-400 mb-6">+ ₹{result.recovery.link2_amount?.toLocaleString()} later</p>
                    <button className="w-full bg-transparent border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 font-medium py-2 rounded-lg transition">Choose Split Tender</button>
                  </>
                ) : (
                  <p className="text-sm text-gray-500 mt-4 text-center">Not eligible</p>
                )}
              </div>

              {/* Option 3: Data for Debt (Highlights if selected) */}
              <div className={`rounded-2xl p-6 border transition ${result.recovery?.method === 'data_for_debt' ? 'bg-purple-900/10 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.1)]' : 'bg-gray-900/50 border-gray-800 opacity-50'}`}>
                <h3 className="font-bold text-gray-200 mb-4">Data-for-Debt Waiver</h3>
                {result.recovery?.method === 'data_for_debt' ? (
                  <>
                    <p className="text-sm text-gray-400 mb-4">Answer a quick survey & get 100% of the fee waived.</p>
                    <div className="h-6"></div>
                    <button className="mt-5 w-full bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500/10 font-medium py-2 rounded-lg transition">Take Survey</button>
                  </>
                ) : (
                  <p className="text-sm text-gray-500 mt-4 text-center">Not eligible</p>
                )}
              </div>

            </div>

            {/* Audit Log Toggle */}
            <div className="mt-10 pt-6 border-t border-gray-800 text-center">
              <button 
                onClick={() => setShowLogs(!showLogs)}
                className="text-xs text-gray-500 hover:text-gray-300 transition uppercase tracking-widest font-bold"
              >
                {showLogs ? "Hide Audit Logs (JSON)" : "Show Audit Logs (JSON)"}
              </button>
              
              {showLogs && (
                <div className="mt-4 bg-black rounded-xl p-6 text-xs text-green-400 font-mono max-h-60 overflow-y-auto border border-gray-800 text-left">
                  <pre>{JSON.stringify(result.audit, null, 2)}</pre>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  );
}