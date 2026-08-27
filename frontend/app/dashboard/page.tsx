"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [sessions, setSessions] = useState<any[]>([]);

  // Fetch real-time data from the actual database
  const fetchStats = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/stats");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (err) {
      console.error("Failed to fetch live stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh the live dashboard every 3 seconds to show new interceptions!
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalFailed = sessions.reduce((s, r) => s + r.amount, 0);
  const totalRecovered = sessions.reduce((s, r) => s + r.recovered, 0);
  const recoveryRate = totalFailed ? ((totalRecovered / totalFailed) * 100).toFixed(1) : "0.0";

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Command Center
            </h1>
            <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase">
              Live AI Interception Feed
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">System Status</p>
            <div className="flex items-center gap-2 bg-green-900/30 border border-green-800 px-4 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Gemini Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* Circular Recovery Rate (Takes up 1 column) */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Total Recovery Rate</h2>
            <div className="relative w-48 h-48 rounded-full border-8 border-gray-800 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-indigo-500 border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="text-center z-10 bg-gray-950 w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-4xl font-extrabold text-white">{recoveryRate}%</span>
                <span className="text-xs text-indigo-400 mt-1 uppercase tracking-widest">Saved</span>
              </div>
            </div>
          </div>

          {/* Metric Cards (Takes up 2 columns) */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-red-500/50 transition">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition"></div>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Total Abandoned</p>
              <p className="text-4xl font-extrabold text-white mt-4 tracking-tight">₹{totalFailed.toLocaleString()}</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-900/40 to-gray-950 border border-indigo-500/30 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-indigo-400 transition">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/30 transition"></div>
              <p className="text-indigo-300 text-sm uppercase tracking-widest font-bold">AI Recovered</p>
              <p className="text-4xl font-extrabold text-white mt-4 tracking-tight">₹{totalRecovered.toLocaleString()}</p>
            </div>

            {/* Performance Breakdown */}
            <div className="col-span-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-3xl p-6 flex justify-between items-center">
              <div className="text-center w-full border-r border-gray-800">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Factoring</p>
                <p className="text-green-400 font-bold text-xl">{sessions.filter(s => s.method === 'factoring' && s.status === 'success').length} Won</p>
              </div>
              <div className="text-center w-full border-r border-gray-800">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Split Tender</p>
                <p className="text-yellow-400 font-bold text-xl">{sessions.filter(s => s.method === 'split_tender' && s.status === 'success').length} Won</p>
              </div>
              <div className="text-center w-full">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Data-for-Debt</p>
                <p className="text-purple-400 font-bold text-xl">{sessions.filter(s => s.method === 'data_for_debt' && s.status === 'success').length} Won</p>
              </div>
            </div>
          </div>

        </div>

        {/* Live Interception Ticker */}
        <div className="bg-black border border-gray-800 rounded-3xl p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
            <span>📡</span> Live AI Interceptions
          </h2>
          
          <div className="space-y-3 h-80 overflow-y-auto pr-2 custom-scrollbar">
            {sessions.map((s, idx) => (
              <div key={idx} className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-600 transition">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${s.status === 'success' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-mono text-sm text-gray-300"><span className="text-gray-500">USER:</span> {s.id} <span className="text-gray-500 mx-2">|</span> {s.item}</p>
                    <p className="text-xs text-gray-500 mt-1">Failed Amount: ₹{s.amount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">AI Protocol</p>
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md ${
                      s.method === 'factoring' ? 'bg-green-900/30 text-green-400 border border-green-800' :
                      s.method === 'split_tender' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800' :
                      'bg-purple-900/30 text-purple-400 border border-purple-800'
                    }`}>
                      {s.method.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right w-24">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Result</p>
                    {s.status === 'success' ? (
                      <span className="text-green-400 font-bold">₹{s.recovered.toLocaleString()}</span>
                    ) : (
                      <span className="text-red-400 font-bold">Lost</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}