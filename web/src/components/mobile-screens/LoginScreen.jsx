import React, { useState } from 'react';
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';

// Recebe a função 'onLogin' para avisar o site principal que o botão foi clicado
const LoginScreen = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col h-full p-6 bg-white">
      {/* Logo do App */}
      <div className="mt-12 mb-8">
        <div className="w-12 h-12 bg-red-600 rounded-xl mb-4 flex items-center justify-center shadow-lg shadow-red-200">
           {/* Logo Simbólico Alpha */}
           <span className="text-white font-bold text-xl">A</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Bem-vindo</h2>
        <p className="text-gray-400 text-sm">Acesse seu treino.</p>
      </div>

      {/* Formulário */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              value="samuel.dev@alpha.com" // Hardcoded para demo
              readOnly
              className="w-full bg-gray-100 border-none rounded-lg py-3 pl-10 text-sm text-gray-700 font-medium focus:ring-2 focus:ring-red-500 transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">Senha</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="password" 
              value="********"
              readOnly
              className="w-full bg-gray-100 border-none rounded-lg py-3 pl-10 text-sm text-gray-700 font-medium outline-none"
            />
          </div>
        </div>
      </div>

      {/* Botão de Ação (O Gatilho da Animação) */}
      <div className="mt-auto mb-8">
        <button 
          onClick={onLogin}
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Conectando...
            </>
          ) : (
            <>
              Entrar <ArrowRight size={20} />
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          Alpha Fitness App v2.4.0
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;