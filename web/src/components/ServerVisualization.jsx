import React from 'react';
import { Server, Database, Activity } from 'lucide-react';

const ServerVisualization = ({ isActive, responseData }) => {
  return (
    <div className="relative w-full max-w-sm">
      {/* 1. O Ícone do Servidor (Físico) */}
      <div className={`relative z-10 bg-ocean-light border-2 ${isActive ? 'border-ocean-cyan shadow-[0_0_30px_rgba(100,255,218,0.3)]' : 'border-ocean-surface'} rounded-xl p-6 transition-all duration-500`}>
        
        {/* Cabeçalho do Servidor */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Server size={20} className={isActive ? "text-ocean-cyan" : "text-ocean-slate"} />
            <span className="font-mono text-sm font-bold text-ocean-white">API Gateway</span>
          </div>
          {/* Luz de Status */}
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-xs font-mono text-ocean-slate">{isActive ? 'PROCESSING' : 'IDLE'}</span>
          </div>
        </div>

        {/* 2. O Console de Logs (Onde aparece o JSON) */}
        <div className="bg-ocean-deep rounded-lg p-4 font-mono text-xs overflow-hidden min-h-[120px] relative border border-ocean-surface">
          {!responseData ? (
            <div className="text-ocean-slate/50 flex flex-col items-center justify-center h-full gap-2">
              <Activity size={16} />
              <span>Aguardando requisição...</span>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-gray-500 mb-2">// 200 OK - Resposta enviada</div>
              <pre className="text-ocean-cyan">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          )}
          
          {/* Efeito de Scanline (Retro) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ocean-cyan/5 pointer-events-none"></div>
        </div>

        {/* Tags da Stack */}
        <div className="flex gap-2 mt-4 justify-end">
          <span className="text-[10px] px-2 py-1 bg-ocean-deep rounded text-ocean-slate border border-ocean-surface">Node.js</span>
          <span className="text-[10px] px-2 py-1 bg-ocean-deep rounded text-ocean-slate border border-ocean-surface">PostgreSQL</span>
        </div>
      </div>

      {/* Brilho de fundo quando ativo */}
      {isActive && (
        <div className="absolute -inset-4 bg-ocean-cyan/10 blur-xl rounded-full z-0 transition-all duration-500"></div>
      )}
    </div>
  );
};

export default ServerVisualization;