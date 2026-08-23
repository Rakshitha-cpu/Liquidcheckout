"use client";
import { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <div className="flex gap-6 mb-8 border-b border-gray-800 pb-4">
          <a href="/dashboard" className="text-gray-400 hover:text-white">Analytics</a>
          <a href="/settings" className="text-indigo-400 font-bold border-b-2 border-indigo-400 pb-4 -mb-4">AI Rules Engine</a>
          <a href="/" className="text-gray-400 hover:text-white">Storefront (User View)</a>
        </div>

        <h1 className="text-3xl font-bold mb-2">AI Boundary Controls</h1>
        <p className="text-gray-400 mb-8">Configure the exact limits, thresholds, and stopping rules for the Liquid Checkout Orchestrator.</p>

        <div className="space-y-6">
          
          {/* Layer 1 Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4">Layer 1: Agentic Factoring</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Minimum Cart Value to Trigger ($)</label>
                <input type="number" defaultValue={500} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Minimum Acceptable Risk Score (0-100)</label>
                <input type="number" defaultValue={65} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
          </div>

          {/* Layer 2 Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">Layer 2: Fragmented Liquidity</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Maximum Number of Split Links</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500">
                  <option>2 Links</option>
                  <option>3 Links</option>
                  <option>4 Links</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Stopping Rule: Auto-Refund Timeout (Minutes)</label>
                <input type="number" defaultValue={15} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
          </div>

          {/* Layer 3 Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Layer 3: Data-for-Debt</h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Active Micro-Task Assignment</label>
              <textarea defaultValue={"Complete a 5-minute product feedback survey regarding our latest feature release."} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 h-24"></textarea>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Maximum Value Waived ($)</label>
              <input type="number" defaultValue={50} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500" />
            </div>
          </div>

        </div>

        {/* Save Button */}
        <div className="mt-8 flex items-center gap-4">
          <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition">
            Save AI Rules
          </button>
          {saved && <span className="text-green-400 font-bold">✅ Rules securely updated.</span>}
        </div>

      </div>
    </main>
  );
}