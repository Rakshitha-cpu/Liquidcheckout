"use client";
export default function Security() {
  return (
    <main className="flex-1 w-full flex justify-center bg-gray-950 text-white p-10">
      <div className="w-full max-w-5xl">
        
        <h1 className="text-4xl font-extrabold mb-2 text-white">Security & Compliance</h1>
        <p className="text-gray-400 text-lg mb-10">
          Bank-grade encryption and immutable audit trails for every AI decision.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Badge 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-green-900/30 text-green-400 rounded-xl flex items-center justify-center text-xl shrink-0">
              🔒
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">SOC-2 Type II Certified</h3>
              <p className="text-sm text-gray-400">Our infrastructure is annually audited by third-party security firms to ensure total data privacy.</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-900/30 text-indigo-400 rounded-xl flex items-center justify-center text-xl shrink-0">
              🛡️
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">AI Output Guardrails</h3>
              <p className="text-sm text-gray-400">Google Gemini 1.5 is constrained by strict financial JSON schemas. The AI cannot hallucinate loan terms.</p>
            </div>
          </div>
          
          {/* Badge 3 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-900/30 text-purple-400 rounded-xl flex items-center justify-center text-xl shrink-0">
              💳
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">PCI-DSS Compliant</h3>
              <p className="text-sm text-gray-400">We never store full credit card numbers. All payments are securely tokenized via Razorpay.</p>
            </div>
          </div>

          {/* Badge 4 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-900/30 text-yellow-400 rounded-xl flex items-center justify-center text-xl shrink-0">
              📜
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Immutable Audit Trails</h3>
              <p className="text-sm text-gray-400">Every single decision the AI makes is logged immutably for compliance and dispute resolution.</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-indigo-300 mb-4">Request Penetration Test Report</h2>
          <p className="text-gray-300 mb-6">
            Enterprise clients can request our latest Whitebox Penetration Test results conducted by Trail of Bits.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition">
            Download Report (PDF)
          </button>
        </div>

      </div>
    </main>
  );
}
