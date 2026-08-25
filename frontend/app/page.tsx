"use client";
export default function About() {
  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <span className="bg-indigo-900/50 text-indigo-300 border border-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest mb-6">
          LIQUID CHECKOUT 2.0 IS LIVE
        </span>
        <h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Stop Losing Money to <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Failed Payments.
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-10">
          The world's first AI-powered Revenue Recovery Engine. We intercept failed transactions mid-air and dynamically negotiate with your customers to save the sale.
        </p>
        
        <div className="flex gap-4">
          <a href="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition text-lg">
            Start Recovering Revenue
          </a>
          <a href="/docs" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl transition text-lg border border-gray-700">
            Read the Docs
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">The 3-Layer Waterfall</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl hover:border-indigo-500/50 transition">
            <div className="w-14 h-14 bg-green-900/30 text-green-400 rounded-xl flex items-center justify-center text-2xl mb-6 border border-green-800">💸</div>
            <h3 className="text-xl font-bold mb-3">Agentic Factoring</h3>
            <p className="text-gray-400 leading-relaxed">
              For high-ticket items, our Gemini AI instantly analyzes risk, pays you upfront, and issues the buyer a flexible 6-month EMI plan.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl hover:border-indigo-500/50 transition">
            <div className="w-14 h-14 bg-yellow-900/30 text-yellow-400 rounded-xl flex items-center justify-center text-2xl mb-6 border border-yellow-800">⚡</div>
            <h3 className="text-xl font-bold mb-3">Fragmented Liquidity</h3>
            <p className="text-gray-400 leading-relaxed">
              When a buyer hits a card limit, we automatically split the bill across multiple Razorpay links to bypass the rejection.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl hover:border-indigo-500/50 transition">
            <div className="w-14 h-14 bg-purple-900/30 text-purple-400 rounded-xl flex items-center justify-center text-2xl mb-6 border border-purple-800">🤝</div>
            <h3 className="text-xl font-bold mb-3">Data-for-Debt</h3>
            <p className="text-gray-400 leading-relaxed">
              Don't lose low-ticket users. If they can't pay, we barter the cost in exchange for high-value product feedback surveys.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
