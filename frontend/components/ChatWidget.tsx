"use client";
import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi there! 👋 I'm the Liquid AI Assistant. Do you need help with a payment issue?" }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { sender: "ai", text: "I can definitely help with that! Our engine can split your payment into smaller chunks or set up an EMI plan. Would you like me to scan your last transaction?" }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* The Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-sm">Liquid AI Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300 font-bold">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-950">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.sender === "user" 
                    ? "bg-indigo-600 text-white rounded-br-none" 
                    : "bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-400 p-3 rounded-xl rounded-bl-none border border-gray-700 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-gray-900 border-t border-gray-800">
            <form onSubmit={handleSend} className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg transition font-bold text-sm">
                ➤
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/40 flex items-center justify-center text-2xl transition hover:scale-110 ml-auto"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}
