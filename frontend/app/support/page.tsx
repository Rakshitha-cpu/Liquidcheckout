"use client";
import { useState } from "react";

export default function Support() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I noticed your $150 payment for the Nike Sneakers failed. I'm the Liquid Checkout AI Assistant. Do you have any questions or need help exploring payment options?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      let aiResponse = "I can definitely help with that! Let me analyze your options...";
      
      const userText = input.toLowerCase();
      if (userText.includes("why")) {
        aiResponse = "Your bank declined the charge due to 'Insufficient Limits'. But don't worry, I can split this $150 bill across two different cards for you. Would you like to do $75 on each?";
      } else if (userText.includes("split") || userText.includes("yes")) {
        aiResponse = "Great! I have generated two Razorpay links for you. [Link A: $75] and [Link B: $75]. Once both are paid, your order is confirmed!";
      } else if (userText.includes("discount") || userText.includes("waive")) {
        aiResponse = "I can't offer a cash discount, but if you complete a quick 5-minute feedback survey, I can waive $15 off your total right now. Want to try the Data-for-Debt option?";
      }

      setMessages([...newMessages, { sender: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Panel: Transaction Context */}
        <div className="col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-6 border-b border-gray-800 pb-4">Transaction Context</h2>
          
          <div className="mb-4">
            <p className="text-gray-400 text-sm">User ID</p>
            <p className="font-mono text-indigo-300">U101 (Guest Checkout)</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Attempted Purchase</p>
            <p className="font-bold text-lg">Nike Sneakers</p>
            <p className="text-red-400 font-bold">$150.00</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-400 text-sm">Error Code</p>
            <p className="font-mono text-yellow-400 text-sm bg-gray-800 p-2 rounded mt-1">ERR_INSUFFICIENT_FUNDS</p>
          </div>

          <button className="w-full bg-red-900/50 hover:bg-red-900 text-red-300 py-3 rounded-xl border border-red-800 transition text-sm font-bold">
            ⚠️ Escalate to Human Admin
          </button>
        </div>

        {/* Right Panel: Chat Interface */}
        <div className="col-span-2 bg-gray-900 border border-gray-800 rounded-2xl flex flex-col h-[75vh]">
          
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-800/50 rounded-t-2xl">
            <div>
              <h2 className="text-xl font-bold text-indigo-400">AI Recovery Assistant</h2>
              <p className="text-xs text-green-400">● Online | Conversational Mode</p>
            </div>
            <a href="/" className="text-sm text-gray-400 hover:text-white underline">Back to Store</a>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] p-4 rounded-2xl ${
                  msg.sender === "user" 
                    ? "bg-indigo-600 text-white rounded-tr-none" 
                    : "bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-400 p-4 rounded-2xl rounded-tl-none border border-gray-700 flex gap-2 items-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-gray-800">
            <form onSubmit={handleSend} className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your failed payment (e.g. 'Why did it fail?' or 'Can I split this?')" 
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500"
              />
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 rounded-xl transition"
              >
                Send
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}