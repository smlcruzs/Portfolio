import React, { useEffect, useState } from 'react';

const DepthMeter = () => {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calcula a profundidade: a cada 10px de scroll = 1 metro
      const scrollPosition = window.scrollY;
      const meters = Math.floor(scrollPosition / 10); 
      setDepth(meters);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
     
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none hidden lg:flex">
      {/* Marcador Superior */}
      <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-ocean-cyan/50"></div>
      
      {/* O Número (Profundidade) */}
      <div className="bg-ocean-deep/80 backdrop-blur border border-ocean-cyan/30 px-3 py-1 rounded text-ocean-cyan font-mono font-bold text-xl shadow-[0_0_15px_rgba(100,255,218,0.2)]">
        {depth}m
      </div>
        
      {/* Marcador Inferior (Régua) */}
      <div className="w-[1px] h-40 bg-gradient-to-b from-ocean-cyan/50 to-transparent relative">
        {/* Risquinhos da régua */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-ocean-cyan/50"></div>
        <div className="absolute top-2/4 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-ocean-cyan"></div>
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-ocean-cyan/50"></div>
      </div>

      <span className="text-[10px] text-ocean-slate uppercase tracking-widest rotate-90 mt-8">
        Profundidade
      </span>
    </div>
  );
};

export default DepthMeter;