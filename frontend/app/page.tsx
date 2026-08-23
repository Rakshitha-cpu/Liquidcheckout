"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SecurePortal() {
  const router = useRouter();
  const [step, setStep] = useState("splash"); // splash, auth, otp
  const [mode, setMode] = useState("login"); // login, signup
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  
  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    if (step === "splash") {
      const timer = setTimeout(() => setStep("auth"), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending an email/SMS OTP
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate verifying the OTP code
    setTimeout(() => {
      router.push("/store");
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  if (step === "splash") {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="z-10 text-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center font-bold text-5xl mx-auto mb-6 shadow-2xl shadow-indigo-600/50">💧</div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
            Liquid <span className="text-indigo-400">Checkout</span>
          </h1>
          <p className="text-gray-400 tracking-widest uppercase text-sm">Security & Auth Layer</p>
        </div>
      </main>
    );
  }

  if (step === "otp") {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30 text-green-400">📱</div>
            <h2 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h2>
            <p className="text-gray-400 text-sm">We sent a 6-digit security code to {email || "your device"}.</p>
          </div>

          <form onSubmit={handleOtpSubmit}>
            <div className="flex justify-between gap-2 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-14 bg-gray-800 border border-gray-700 rounded-xl text-center text-2xl text-white focus:outline-none focus:border-indigo-500"
                />
              ))}
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition flex justify-center"
            >
              {loading ? "Verifying Code..." : "Verify & Enter"}
            </button>
          </form>
          <button onClick={() => setStep("auth")} className="w-full text-center mt-6 text-gray-500 text-sm hover:text-white transition">
            Didn't receive a code? Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 w-full max-w-md shadow-2xl">
        
        {/* Toggle Login / Signup */}
        <div className="flex bg-gray-800 p-1 rounded-xl mb-8">
          <button 
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${mode === "login" ? "bg-gray-700 text-white shadow" : "text-gray-400 hover:text-white"}`}
          >
            Login
          </button>
          <button 
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${mode === "signup" ? "bg-gray-700 text-white shadow" : "text-gray-400 hover:text-white"}`}
          >
            Create Account
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === "login" ? "Welcome Back" : "Create a Secure Account"}
          </h2>
          <p className="text-gray-400 text-sm">Level 4 Authorization Required</p>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input type="text" required className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500" placeholder="Jane Doe" />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email or Phone Number</label>
            <input 
              type="text" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
              placeholder="+1 (555) 000-0000" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input type="password" required className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500" placeholder="••••••••••••" />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition mt-4"
          >
            {loading ? "Sending Security Code..." : (mode === "login" ? "Login Securely" : "Create Account")}
          </button>
        </form>
      </div>
    </main>
  );
}