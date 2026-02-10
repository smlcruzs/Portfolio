import React from 'react';

const MobileSimulator = ({ children }) => {
  return (
    // Container que faz o celular flutuar levemente
    <div className="relative mx-auto w-[280px] h-[580px] animate-[float_6s_ease-in-out_infinite]">
      
      {/* 1. A Moldura Externa (Bezel) */}
      <div className="absolute inset-0 bg-gray-900 rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden">
        
        {/* 2. Botões Laterais (Detalhe de Design) */}
        <div className="absolute top-24 -left-[6px] w-1 h-8 bg-gray-700 rounded-l-md"></div>
        <div className="absolute top-40 -left-[6px] w-1 h-12 bg-gray-700 rounded-l-md"></div>
        <div className="absolute top-24 -right-[6px] w-1 h-16 bg-gray-700 rounded-r-md"></div>

        {/* 3. A Tela (Onde o App roda) */}
        <div className="relative w-full h-full bg-white overflow-hidden flex flex-col">
          
          {/* Barra de Status (Hora, Bateria) */}
          <div className="h-12 bg-white flex justify-between items-end px-6 pb-2 select-none z-20">
            <span className="text-xs font-bold text-black">9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-3 bg-black rounded-sm"></div>
            </div>
          </div>

          {/* Dynamic Island (O "Notch" moderno) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div> {/* Câmera */}
          </div>

          {/* 4. O CONTEÚDO DO APP (Children) */}
          <div className="flex-1 bg-gray-50 overflow-y-auto custom-scrollbar relative">
             {children}
          </div>

          {/* Barra de Home (iPhone style) */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-20"></div>
        </div>
      </div>
      
      {/* Reflexo na tela (Toque de realismo) */}
      <div className="absolute inset-0 rounded-[2.8rem] pointer-events-none bg-gradient-to-tr from-white/10 to-transparent opacity-50 z-40"></div>
    </div>
  );
};

export default MobileSimulator;