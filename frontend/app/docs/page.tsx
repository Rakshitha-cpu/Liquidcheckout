"use client";
export default function Docs() {
  return (
    <main className="flex-1 w-full flex justify-center bg-gray-950 text-white">
      
      <div className="w-full max-w-7xl flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 p-8 hidden md:block shrink-0 min-h-[90vh]">
          <h3 className="text-indigo-400 font-bold mb-8 text-xl">Liquid Docs</h3>
          <ul className="space-y-5 text-sm text-gray-400">
            <li className="text-white font-bold cursor-pointer">Quick Start</li>
            <li className="hover:text-white cursor-pointer transition">Authentication</li>
            <li className="hover:text-white cursor-pointer transition">Recovery API</li>
            <li className="hover:text-white cursor-pointer transition">Webhooks</li>
            <li className="hover:text-white cursor-pointer transition">Compliance Logs</li>
            <li className="hover:text-white cursor-pointer transition">Error Codes</li>
          </ul>
        </aside>

        {/* Content */}
        <div className="flex-1 p-10 md:p-16 max-w-4xl">
          <h1 className="text-4xl font-extrabold mb-4 text-white">Quick Start Guide</h1>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            Integrate the Liquid Checkout Revenue Recovery Engine into your existing payment flow in under 5 minutes.
          </p>

          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">1. Initialize the SDK</h2>
          <p className="text-gray-400 mb-4">Install our lightweight NPM package to wrap your checkout button.</p>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-12 font-mono text-sm text-green-400 shadow-inner">
            npm install @liquidcheckout/sdk
          </div>

          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">2. The Recovery API Endpoint</h2>
          <p className="text-gray-400 mb-4 leading-relaxed">
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

          <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">3. Handle the Webhook Response</h2>
          <p className="text-gray-400 mb-4 leading-relaxed">
            Our system will return a strict JSON response dictating the recovery method (Factoring, Split Tender, or Data-for-Debt).
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono text-sm overflow-x-auto shadow-inner">
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
      </div>
    </main>
  );
}
