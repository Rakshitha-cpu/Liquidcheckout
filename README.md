# 💧 Liquid Checkout (AI Revenue Recovery Engine)

> **No failed payment goes unrecovered.**

![Recovery Dashboard](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![AI Engine](https://img.shields.io/badge/AI-Google_Gemini-blue)
![Payment Gateway](https://img.shields.io/badge/Payments-Razorpay-indigo)

## 📖 The Problem
When a customer’s payment fails due to limits or insufficient funds, 90% of merchants simply accept the loss. Revenue evaporates. 

## 🚀 Our Solution
**Liquid Checkout** intercepts failed payments mid-air and runs them through a conversational, 3-layer AI waterfall recovery system. It acts as an intelligent agent that negotiates with the user to secure the revenue.

### The 3-Layer Waterfall:
1. **Agentic Factoring Exchange:** (Cart > $500). Gemini AI instantly analyzes the user's risk. If approved, the AI buys the debt, pays the merchant, and gives the user a 6-month EMI plan.
2. **Fragmented Liquidity Assembler:** (Cart $50–$500). If factoring is rejected, the AI dynamically generates multiple Split-Tender Razorpay links, bypassing hard card limits.
3. **Data-for-Debt Exchange:** (Cart < $50). If the user has no cash, the AI trades the invoice cost for high-value user labor (e.g., product feedback surveys).

## 🛠️ Enterprise Features
- **Bounded & Gated:** Merchants have an AI Rules Engine to set risk thresholds and stopping rules (e.g., 15-minute auto-refund timeouts).
- **Compliance Audit Trail:** Every AI decision is logged in a strict JSON format.
- **Conversational UI:** Users can chat with the AI directly to understand why their payment failed and explore options.

## 💻 Tech Stack
- **Frontend:** Next.js 14, Tailwind CSS, React
- **Backend:** Python, FastAPI
- **AI/ML:** Google Gemini 1.5 Flash
- **Payments:** Razorpay API
- **DevOps:** Docker, PyTest

## ⚙️ Quick Start

**1. Clone and Configure**
```bash
git clone https://github.com/yourusername/liquid-checkout.git
cd liquid-checkout
# Rename .env.example to .env and add your keys
```

**2. Start Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**3. Start Frontend**
```bash
cd frontend
npm install
npm run dev
```
