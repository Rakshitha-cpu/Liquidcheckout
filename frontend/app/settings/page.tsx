"use client";
import { useState } from "react";

export default function AISettings() {
  const [maxDiscount, setMaxDiscount] = useState(15);
  const [riskLevel, setRiskLevel] = useState("Moderate");
  const [enableFactoring, setEnableFactoring] = useState(true);
  const [enableSplit, setEnableSplit] = useState(true);
  const [enableDataDebt, setEnableDataDebt] = useState(true);
  const [haltHallucination, setHaltHallucination] = useState(true);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            AI Guardrails & Autonomy
          </h1>
          <p className="text-red-400 font-mono text-sm tracking-widest uppercase">
            Merchant Safety Controls
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Financial Limits */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-xl hover:border-gray-600 transition">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span>💰</span> Financial Boundaries
            </h2>
            
            <div className="mb-8">
              <label className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                <span>Max AI Discount</span>
                <span className="text-indigo-400">{maxDiscount}%</span>
              </label>
              <input 
                type="range" min="0" max="50" value={maxDiscount} 
                onChange={(e) => setMaxDiscount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
              />
              <p className="text-xs text-gray-500 mt-2">Gemini cannot offer a discount higher than this value during Data-for-Debt negotiations.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                Underwriting Risk Tolerance
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Strict', 'Moderate', 'Aggressive'].map(level => (
                  <button 
                    key={level}
                    onClick={() => setRiskLevel(level)}
                    className={`py-2 text-xs font-bold uppercase rounded-lg border transition ${riskLevel === level ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-950 border-gray-800 text-gray-500 hover:border-gray-600'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Dictates how lenient the AI is when approving EMI loans.</p>
            </div>
          </div>

          {/* Active Protocols */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-xl hover:border-gray-600 transition">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span>⚙️</span> Active Protocols
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-200">Agentic Factoring (EMI)</p>
                  <p className="text-xs text-gray-500">Allow AI to offer micro-loans for > ₹40k</p>
                </div>
                <button onClick={() => setEnableFactoring(!enableFactoring)} className={`w-12 h-6 rounded-full transition-colors relative ${enableFactoring ? 'bg-green-500' : 'bg-gray-800'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enableFactoring ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-200">Split Tender</p>
                  <p className="text-xs text-gray-500">Allow bill splitting for card limit bypass</p>
                </div>
                <button onClick={() => setEnableSplit(!enableSplit)} className={`w-12 h-6 rounded-full transition-colors relative ${enableSplit ? 'bg-yellow-500' : 'bg-gray-800'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enableSplit ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-200">Data-for-Debt</p>
                  <p className="text-xs text-gray-500">Allow fee waivers in exchange for surveys</p>
                </div>
                <button onClick={() => setEnableDataDebt(!enableDataDebt)} className={`w-12 h-6 rounded-full transition-colors relative ${enableDataDebt ? 'bg-purple-500' : 'bg-gray-800'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${enableDataDebt ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Controls */}
          <div className="md:col-span-2 bg-red-950/20 backdrop-blur-xl border border-red-900/50 rounded-3xl p-8 shadow-xl hover:border-red-500/50 transition">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
                  <span>🚨</span> Hallucination Kill-Switch
                </h2>
                <p className="text-sm text-gray-400 max-w-2xl">
                  If the system detects unexpected JSON schema deviations or out-of-bounds promises made by the Google Gemini model, the transaction is immediately halted and routed to a human agent.
                </p>
              </div>
              <button onClick={() => setHaltHallucination(!haltHallucination)} className={`shrink-0 w-16 h-8 rounded-full transition-colors relative ${haltHallucination ? 'bg-red-600' : 'bg-gray-800'}`}>
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${haltHallucination ? 'translate-x-9' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>

        </div>
        
        <div className="mt-10 text-right">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-indigo-600/20">
            Save Guardrails
          </button>
        </div>

      </div>
    </main>
  );
}