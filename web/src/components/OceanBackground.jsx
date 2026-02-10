import React from 'react';

const OceanBackground = () => {
  const bubbles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${10 + Math.random() * 20}s`, // Mais lento para não bugar o olho
    animationDelay: `${Math.random() * 5}s`,
    size: `${10 + Math.random() * 50}px`
  }));

  return (
    // MUDANÇA: z-[-1] garante que fique atrás de tudo
    // fixed inset-0 garante que ocupe a tela toda sem criar barra de rolagem
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-ocean-deep pointer-events-none">
      
      {/* Gradiente de fundo fixo */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-ocean-dark to-ocean-deep opacity-90" />

      {/* Luz solar no topo */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-ocean-cyan/5 to-transparent opacity-50" />
      
      {/* Bolhas */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-[-50px] rounded-full bg-ocean-cyan/10 border border-ocean-cyan/20 shadow-[0_0_15px_rgba(100,255,218,0.2)] animate-bubble backdrop-blur-[1px]"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: bubble.animationDuration,
            animationDelay: bubble.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default OceanBackground;