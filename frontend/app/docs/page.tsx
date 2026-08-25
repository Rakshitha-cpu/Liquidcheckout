"use client";
import { useEffect, useState } from "react";

export default function Docs() {
  const [activeSection, setActiveSection] = useState("quickstart");

  return (
    <main className="flex-1 w-full flex justify-center bg-gray-950 text-white scroll-smooth">
      
      <div className="w-full max-w-7xl flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 p-8 hidden md:block shrink-0 min-h-[90vh] sticky top-0 h-screen overflow-y-auto">
          <h3 className="text-indigo-400 font-bold mb-8 text-xl">Liquid Docs</h3>
          <ul className="space-y-5 text-sm text-gray-400">
            <li><a href="#quickstart" onClick={() => setActiveSection("quickstart")} className={`transition hover:text-white ${activeSection === "quickstart" ? "text-white font-bold" : ""}`}>Quick Start</a></li>
            <li><a href="#authentication" onClick={() => setActiveSection("authentication")} className={`transition hover:text-white ${activeSection === "authentication" ? "text-white font-bold" : ""}`}>Authentication</a></li>
            <li><a href="#recovery-api" onClick={() => setActiveSection("recovery-api")} className={`transition hover:text-white ${activeSection === "recovery-api" ? "text-white font-bold" : ""}`}>Recovery API</a></li>
            <li><a href="#webhooks" onClick={() => setActiveSection("webhooks")} className={`transition hover:text-white ${activeSection === "webhooks" ? "text-white font-bold" : ""}`}>Webhooks</a></li>
            <li><a href="#compliance" onClick={() => setActiveSection("compliance")} className={`transition hover:text-white ${activeSection === "compliance" ? "text-white font-bold" : ""}`}>Compliance Logs</a></li>
            <li><a href="#error-codes" onClick={() => setActiveSection("error-codes")} className={`transition hover:text-white ${activeSection === "error-codes" ? "text-white font-bold" : ""}`}>Error Codes</a></li>
          </ul>
        </aside>

        {/* Content */}
        <div className="flex-1 p-10 md:p-16 max-w-4xl h-screen overflow-y-auto scroll-smooth">
          
          {/* QUICK START */}
          <section id="quickstart" className="mb-24 pt-10">
            <h1 className="text-4xl font-extrabold mb-4 text-white">Quick Start Guide</h1>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Integrate the Liquid Checkout Revenue Recovery Engine into your existing payment flow in under 5 minutes.
            </p>
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">1. Initialize the SDK</h2>
            <p className="text-gray-400 mb-4">Install our lightweight NPM package to wrap your checkout button.</p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-12 font-mono text-sm text-green-400 shadow-inner">
              npm install @liquidcheckout/sdk
            </div>
          </section>

          {/* AUTHENTICATION */}
          <section id="authentication" className="mb-24 pt-10">
            <h1 className="text-4xl font-extrabold mb-4 text-white">Authentication</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Authenticate your API requests by including your secret API key in the Authorization header.
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono text-sm overflow-x-auto shadow-inner">
              <p className="text-gray-300">Authorization: Bearer <span className="text-pink-400">sk_test_51Nx...</span></p>
            </div>
            <p className="text-sm text-yellow-400 mt-4 font-bold">⚠️ Never share your secret keys or commit them to GitHub.</p>
          </section>

          {/* RECOVERY API */}
          <section id="recovery-api" className="mb-24 pt-10">
            <h1 className="text-4xl font-extrabold mb-4 text-white">Recovery API</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              When your primary gateway (Stripe, Razorpay) throws a declined error, instantly forward the payload to our recovery endpoint. Our Gemini AI will intercept and negotiate.
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-12 font-mono text-sm overflow-x-auto shadow-inner">
              <p className="text-purple-400 mb-4 font-bold">POST https://api.liquidcheckout.com/v1/recover</p>
              <pre className="text-gray-300">
{`{
  "user_id": "usr_99823",
  "amount_inr": 12000,
  "currency": "INR",
  "original_error": "ERR_INSUFFICIENT_LIMIT"
}`}
              </pre>
            </div>
          </section>

          {/* WEBHOOKS */}
          <section id="webhooks" className="mb-24 pt-10">
            <h1 className="text-4xl font-extrabold mb-4 text-white">Webhooks</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our system will asynchronously notify your server when a payment is successfully recovered via Split Tender or Factoring.
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono text-sm overflow-x-auto shadow-inner">
              <pre className="text-indigo-300">
{`{
  "event": "payment.recovered",
  "method": "split_tender",
  "recovery_urls": [
    "https://rzp.io/l/split_a",
    "https://rzp.io/l/split_b"
  ],
  "audit_id": "log_88214"
}`}
              </pre>
            </div>
          </section>

          {/* COMPLIANCE LOGS */}
          <section id="compliance" className="mb-24 pt-10">
            <h1 className="text-4xl font-extrabold mb-4 text-white">Compliance Logs</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Every AI decision is immutably logged. You can fetch the raw audit JSON for any transaction to prove compliance to auditors.
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono text-sm overflow-x-auto shadow-inner">
              <p className="text-green-400 mb-4 font-bold">GET https://api.liquidcheckout.com/v1/audit/log_88214</p>
            </div>
          </section>

          {/* ERROR CODES */}
          <section id="error-codes" className="mb-24 pt-10 pb-40">
            <h1 className="text-4xl font-extrabold mb-4 text-white">Error Codes</h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Standard HTTP response codes used by the Liquid Checkout API.
            </p>
            <ul className="space-y-4 font-mono text-sm">
              <li className="flex gap-4"><span className="text-red-400 font-bold w-12">400</span> <span className="text-gray-300">Bad Request - Invalid JSON payload</span></li>
              <li className="flex gap-4"><span className="text-red-400 font-bold w-12">401</span> <span className="text-gray-300">Unauthorized - Invalid API Key</span></li>
              <li className="flex gap-4"><span className="text-red-400 font-bold w-12">429</span> <span className="text-gray-300">Rate Limited - Too many requests</span></li>
              <li className="flex gap-4"><span className="text-red-400 font-bold w-12">500</span> <span className="text-gray-300">Server Error - Gemini AI timeout</span></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
