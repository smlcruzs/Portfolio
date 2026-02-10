import React from 'react';
import { ShoppingBag, Star, TrendingUp, ChevronRight, Zap, Menu, CreditCard } from 'lucide-react';

// TELA 1: Landing Page (Foco em Conversão)
export const LandingPageScreen = () => (
  <div className="flex flex-col h-full bg-white font-sans text-slate-800">
    {/* Hero Section */}
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white pb-10 rounded-b-[2rem] shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold text-lg">Growth<span className="text-yellow-300">.io</span></div>
        <Menu size={20} />
      </div>
      <h2 className="text-2xl font-bold leading-tight mb-2">Aumente suas vendas em 3x</h2>
      <p className="text-indigo-100 text-xs mb-4">A solução definitiva para escalar seu negócio online.</p>
      <button className="bg-yellow-400 text-indigo-900 font-bold py-2 px-4 rounded-full text-xs w-full shadow-lg transform active:scale-95 transition-transform">
        COMEÇAR AGORA
      </button>
    </div>
    {/* Social Proof */}
    <div className="p-5">
      <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Empresas que confiam</p>
      <div className="flex justify-between opacity-50 grayscale">
         <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
         <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
         <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
         <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
    {/* Features */}
    <div className="px-5 space-y-3">
       <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><Zap size={16} /></div>
          <div>
            <h4 className="font-bold text-xs">Ultra Rápido</h4>
            <p className="text-[10px] text-gray-500">Score 100 no Google.</p>
          </div>
       </div>
    </div>
  </div>
);

// TELA 2: App SaaS (Dashboard)
export const AppDashboardScreen = () => (
  <div className="flex flex-col h-full bg-slate-900 text-white font-sans">
    <div className="p-5 pb-0">
      <h2 className="text-lg font-bold text-gray-400">Total Balance</h2>
      <h1 className="text-3xl font-bold mb-6">$14,235.00</h1>
      
      {/* Chart Fake */}
      <div className="flex items-end justify-between h-24 gap-2 mb-8">
         {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
           <div key={i} className="w-full bg-blue-500/20 rounded-t-sm relative group">
              <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm"></div>
           </div>
         ))}
      </div>
    </div>

    <div className="bg-slate-800 flex-1 rounded-t-3xl p-5 space-y-4">
       <div className="flex justify-between items-center mb-2">
         <span className="font-bold">Transactions</span>
         <span className="text-xs text-blue-400">View All</span>
       </div>
       <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><TrendingUp size={16}/></div>
             <div>
               <p className="text-sm font-bold">Freelance</p>
               <p className="text-[10px] text-gray-400">Upwork</p>
             </div>
          </div>
          <span className="text-green-400 font-mono text-sm">+$450</span>
       </div>
       <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-red-500/20 text-red-400 rounded-lg"><ShoppingBag size={16}/></div>
             <div>
               <p className="text-sm font-bold">Server Costs</p>
               <p className="text-[10px] text-gray-400">AWS</p>
             </div>
          </div>
          <span className="text-white font-mono text-sm">-$80</span>
       </div>
    </div>
  </div>
);

// TELA 3: E-commerce (Loja)
export const EcommerceScreen = () => (
  <div className="flex flex-col h-full bg-[#f3f3f3] text-black font-sans">
    <div className="p-5 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
      <Menu size={20} />
      <span className="font-bold tracking-widest uppercase text-xs">Urban Store</span>
      <ShoppingBag size={20} />
    </div>
    
    <div className="p-4 grid grid-cols-2 gap-3 overflow-y-auto">
       {/* Produto 1 */}
       <div className="bg-white p-2 rounded-xl shadow-sm">
          <div className="h-24 bg-gray-200 rounded-lg mb-2 relative">
             <span className="absolute top-1 right-1 bg-black text-white text-[8px] px-1 rounded">NEW</span>
          </div>
          <h3 className="text-xs font-bold mb-1">Nike Air Max</h3>
          <div className="flex justify-between items-center">
             <span className="text-xs font-bold">$129</span>
             <div className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">+</div>
          </div>
       </div>
       {/* Produto 2 */}
       <div className="bg-white p-2 rounded-xl shadow-sm">
          <div className="h-24 bg-gray-200 rounded-lg mb-2"></div>
          <h3 className="text-xs font-bold mb-1">Urban Hoodie</h3>
          <div className="flex justify-between items-center">
             <span className="text-xs font-bold">$89</span>
             <div className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px]">+</div>
          </div>
       </div>
       {/* Card Promo */}
       <div className="col-span-2 bg-black text-white p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-400">SUMMER SALE</p>
            <h3 className="font-bold text-lg">50% OFF</h3>
          </div>
          <button className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full">Shop</button>
       </div>
    </div>
  </div>
);