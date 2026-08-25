"use client";
import { useState } from "react";

const generateBatch = () => {
  const batch = [];
  const methods = ["factoring", "split_tender", "data_for_debt"];
  const items = ["MacBook", "Sneakers", "SaaS Sub", "Headphones", "Office Chair"];
  
  for (let i = 1; i <= 100; i++) {
    const amount = Math.floor(Math.random() * 100000) + 1200;
    let method = "data_for_debt";
    if (amount > 40000) method = "factoring";
    else if (amount > 4000) method = "split_tender";

    const isSuccess = Math.random() > 0.15; 
    let recovered = 0;
    
    if (isSuccess) {
      if (method === "factoring") recovered = amount * 0.95;
      else recovered = amount;
    }

    batch.push({
      id: `U1${i.toString().padStart(3, '0')}`,
      item: items[i % 5],
      amount: amount,
      method: method,
      recovered: recovered,
      status: isSuccess ? "success" : "stopped"
    });
  }
  return batch;
};

const mockSessions = generateBatch();

const methodColors: Record<string, string> = {
  factoring: "bg-green-600",
  split_tender: "bg-yellow-500 text-black",
  data_for_debt: "bg-purple-600",
};

const methodLabels: Record<string, string> = {
  factoring: "Agentic Factoring",
  split_tender: "Split Tender",
  data_for_debt: "Data-for-Debt",
};

export default function Dashboard() {
  const [sessions] = useState(mockSessions);

  const totalFailed = sessions.reduce((s, r) => s + r.amount, 0);
  const totalRecovered = sessions.reduce((s, r) => s + r.recovered, 0);
  const totalLost = totalFailed - totalRecovered;
  const recoveryRate = ((totalRecovered / totalFailed) * 100).toFixed(1);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 mb-1">
          Merchant Dashboard
        </h1>
        <p className="text-gray-400 mb-8">
          Live Revenue Recovery Analytics — Liquid Checkout Engine
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-800 rounded-2xl p-5 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Failed</p>
            <p className="text-2xl font-bold text-red-400">₹{totalFailed.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-5 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Recovered</p>
            <p className="text-2xl font-bold text-green-400">₹{totalRecovered.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-5 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Revenue Lost</p>
            <p className="text-2xl font-bold text-yellow-400">₹{totalLost.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-5 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Recovery Rate</p>
            <p className="text-2xl font-bold text-indigo-400">{recoveryRate}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {["factoring", "split_tender", "data_for_debt"].map((method) => {
            const methodSessions = sessions.filter((s) => s.method === method);
            const recovered = methodSessions.reduce((s, r) => s + r.recovered, 0);
            return (
              <div key={method} className="bg-gray-800 rounded-2xl p-5">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${methodColors[method]}`}>
                  {methodLabels[method]}
                </span>
                <p className="text-2xl font-bold text-white mt-3">₹{recovered.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">{methodSessions.length} transactions recovered</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-200 uppercase tracking-widest text-sm">
            Compliance Audit Log — All Sessions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left border-b border-gray-700">
                  <th className="pb-3 pr-4">User</th>
                  <th className="pb-3 pr-4">Item</th>
                  <th className="pb-3 pr-4">Failed Amount</th>
                  <th className="pb-3 pr-4">Strategy Used</th>
                  <th className="pb-3 pr-4">Recovered</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="py-3 pr-4 font-mono text-indigo-300">{s.id}</td>
                    <td className="py-3 pr-4">{s.item}</td>
                    <td className="py-3 pr-4 text-red-400">₹{s.amount.toLocaleString()}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${methodColors[s.method]}`}>
                        {methodLabels[s.method]}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-green-400 font-bold">
                      ₹{s.recovered.toLocaleString()}
                    </td>
                    <td className="py-3">
                      {s.status === "success" ? (
                        <span className="text-green-400 font-bold">Recovered</span>
                      ) : (
                        <span className="text-red-400 font-bold">Stopped (Refunded)</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}