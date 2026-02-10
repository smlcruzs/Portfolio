import React from 'react';
import MobileSimulator from './MobileSimulator';
import { LandingPageScreen, AppDashboardScreen, EcommerceScreen } from './mobile-screens/ShowcaseScreens';
import { Code2, Layout, Smartphone, Zap, Database, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const showcaseData = [
  {
    id: 1,
    title: "Landing Pages",
    subtitle: "Alta Conversão",
    stacks: ["Next.js", "Tailwind", "Analytics"],
    icon: Layout,
    description: "Crio páginas otimizadas para performance máxima (Score 100) e SEO técnico. Foco total em transformar visitantes em leads qualificados com design persuasivo.",
    component: <LandingPageScreen />
  },
  {
    id: 2,
    title: "SaaS & Dashboards",
    subtitle: "App Mobile Nativo",
    stacks: ["React Native", "Expo", "Node.js"],
    icon: Smartphone,
    description: "Desenvolvimento de aplicativos robustos para iOS e Android. Integração com APIs complexas, gráficos em tempo real e experiência de usuário fluida (60fps).",
    component: <AppDashboardScreen />
  },
  {
    id: 3,
    title: "E-commerce",
    subtitle: "PWA & Web",
    stacks: ["React", "Stripe", "PostgreSQL"],
    icon: Globe,
    description: "Lojas virtuais completas com carrinho, checkout seguro e painel administrativo. Arquitetura escalável para suportar alto tráfego e múltiplas vendas simultâneas.",
    component: <EcommerceScreen />
  }
];

const ThreeMobileShowcase = () => {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Grid Responsivo (1 col mobile, 3 cols desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 w-full max-w-6xl">
        
        {showcaseData.map((item) => (
          <div key={item.id} className="flex flex-col items-center group relative">
            
            {/* 1. O CELULAR (Escala um pouco no hover) */}
            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
              <MobileSimulator>
                {item.component}
              </MobileSimulator>
            </div>

            {/* 2. INFORMAÇÕES (Abaixo do celular) */}
            <div className="mt-8 text-center relative w-full px-4">
              
              {/* Cabeçalho Visível */}
              <div className="transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center justify-center gap-2 text-ocean-cyan mb-2">
                  <item.icon size={18} />
                  <span className="font-mono text-xs uppercase tracking-widest">{item.subtitle}</span>
                </div>
                <h3 className="text-2xl font-bold text-ocean-white mb-3">{item.title}</h3>
                
                {/* Stacks (Ícones/Tags) */}
                <div className="flex justify-center gap-2">
                  {item.stacks.map((stack, i) => (
                    <span key={i} className="px-2 py-1 bg-ocean-light border border-ocean-surface rounded text-[10px] font-mono text-ocean-slate">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. A CAIXA TRANSPARENTE (TOOLTIP DE EXPERIÊNCIA) */}
              {/* Ela fica absoluta e aparece com fade/slide up no hover */}
              <div className="absolute top-0 left-0 w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-ocean-deep/90 backdrop-blur-md border border-ocean-cyan/30 p-6 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-2 mb-3 text-ocean-cyan border-b border-ocean-cyan/20 pb-2">
                     <Code2 size={16} />
                     <span className="font-bold text-xs uppercase">Dev Experience</span>
                  </div>
                  <p className="text-sm text-ocean-white leading-relaxed text-left">
                    {item.description}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ThreeMobileShowcase;