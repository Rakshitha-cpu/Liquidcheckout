"use client";
export default function Docs() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-6 hidden md:block shrink-0">
        <h3 className="text-indigo-400 font-bold mb-6 text-xl">Liquid Docs</h3>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className="text-white font-bold cursor-pointer">Quick Start</li>
          <li className="hover:text-white cursor-pointer transition">Authentication</li>
          <li className="hover:text-white cursor-pointer transition">Recovery API</li>
          <li className="hover:text-white cursor-pointer transition">Webhooks</li>
          <li className="hover:text-white cursor-pointer transition">Compliance Logs</li>
          <li className="hover:text-white cursor-pointer transition">Error Codes</li>
        </ul>
      </aside>

      {/* Content */}
      <div className="flex-1 p-10 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Quick Start Guide</h1>
        <p className="text-gray-400 text-lg mb-10">
          Integrate the Liquid Checkout Revenue Recovery Engine into your existing payment flow in under 5 minutes.
        </p>

        <h2 className="text-2xl font-bold mb-4">1. Initialize the SDK</h2>
        <p className="text-gray-400 mb-4">Install our lightweight NPM package to wrap your checkout button.</p>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-10 font-mono text-sm text-green-400">
          npm install @liquidcheckout/sdk
        </div>

        <h2 className="text-2xl font-bold mb-4">2. The Recovery API Endpoint</h2>
        <p className="text-gray-400 mb-4">
          When your primary gateway (Stripe, Razorpay) throws a declined error, instantly forward the payload to our recovery endpoint. Our Gemini AI will intercept and negotiate.
        </p>
        
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10 font-mono text-sm overflow-x-auto">
          <p className="text-purple-400 mb-2">POST https://api.liquidcheckout.com/v1/recover</p>
          <pre className="text-gray-300">
{`{
  "user_id": "usr_99823",
  "amount_inr": 12000,
  "currency": "INR",
  "original_error": "ERR_INSUFFICIENT_LIMIT"
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold mb-4">3. Handle the Webhook Response</h2>
        <p className="text-gray-400 mb-4">
          Our system will return a strict JSON response dictating the recovery method (Factoring, Split Tender, or Data-for-Debt).
        </p>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono text-sm overflow-x-auto">
          <pre className="text-indigo-300">
{`{
  "success": true,
  "method": "split_tender",
  "recovery_urls": [
    "https://rzp.io/l/split_a",
    "https://rzp.io/l/split_b"
  ],
  "audit_id": "log_88214"
}`}
          </pre>
        </div>
      </div>
    </main>
  );
}
