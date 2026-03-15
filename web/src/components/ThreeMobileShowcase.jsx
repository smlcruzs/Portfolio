import React from 'react';
import MobileSimulator from './MobileSimulator';
import { LandingPageScreen, AppDashboardScreen, EcommerceScreen } from './mobile-screens/ShowcaseScreens';
import { Code2, Layout, Smartphone, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const getShowcaseData = (t) => [
  {
    id: 1,
    titlePt: "Landing Pages",
    titleEn: "Landing Pages",
    subtitlePt: "Alta Conversão",
    subtitleEn: "High Conversion",
    stacks: ["Next.js", "Tailwind", "Analytics"],
    icon: Layout,
    descriptionPt: "Crio páginas otimizadas para performance máxima (Score 100) e SEO técnico. Foco total em transformar visitantes em leads qualificados com design persuasivo.",
    descriptionEn: "I build pages optimized for maximum performance (Score 100) and technical SEO. Full focus on converting visitors into qualified leads with persuasive design.",
    component: <LandingPageScreen />
  },
  {
    id: 2,
    titlePt: "SaaS & Dashboards",
    titleEn: "SaaS & Dashboards",
    subtitlePt: "App Mobile Nativo",
    subtitleEn: "Native Mobile App",
    stacks: ["React Native", "Expo", "Node.js"],
    icon: Smartphone,
    descriptionPt: "Desenvolvimento de aplicativos robustos para iOS e Android. Integração com APIs complexas, gráficos em tempo real e experiência de usuário fluida (60fps).",
    descriptionEn: "Robust app development for iOS and Android. Integration with complex APIs, real-time charts and smooth user experience (60fps).",
    component: <AppDashboardScreen />
  },
  {
    id: 3,
    titlePt: "E-commerce",
    titleEn: "E-commerce",
    subtitlePt: "PWA & Web",
    subtitleEn: "PWA & Web",
    stacks: ["React", "Stripe", "PostgreSQL"],
    icon: Globe,
    descriptionPt: "Lojas virtuais completas com carrinho, checkout seguro e painel administrativo. Arquitetura escalável para suportar alto tráfego e múltiplas vendas simultâneas.",
    descriptionEn: "Full online stores with cart, secure checkout and admin panel. Scalable architecture to handle high traffic and simultaneous sales.",
    component: <EcommerceScreen />
  }
];

const ThreeMobileShowcase = ({ t }) => {
  const lang = t?.greeting === "Hi, my name is" ? 'en' : 'pt';
  const showcaseData = getShowcaseData(t);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 w-full max-w-6xl">
        {showcaseData.map((item) => (
          <div key={item.id} className="flex flex-col items-center group relative">

            {/* CELULAR */}
            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
              <MobileSimulator>
                {item.component}
              </MobileSimulator>
            </div>

            {/* INFORMAÇÕES */}
            <div className="mt-8 text-center relative w-full px-4">
              <div className="transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center justify-center gap-2 text-ocean-cyan mb-2">
                  <item.icon size={18} />
                  <span className="font-mono text-xs uppercase tracking-widest">
                    {lang === 'en' ? item.subtitleEn : item.subtitlePt}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-ocean-white mb-3">
                  {lang === 'en' ? item.titleEn : item.titlePt}
                </h3>
                <div className="flex justify-center gap-2">
                  {item.stacks.map((stack, i) => (
                    <span key={i} className="px-2 py-1 bg-ocean-light border border-ocean-surface rounded text-[10px] font-mono text-ocean-slate">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {/* TOOLTIP DE EXPERIÊNCIA */}
              <div className="absolute top-0 left-0 w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-ocean-deep/90 backdrop-blur-md border border-ocean-cyan/30 p-6 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-2 mb-3 text-ocean-cyan border-b border-ocean-cyan/20 pb-2">
                    <Code2 size={16} />
                    <span className="font-bold text-xs uppercase">Dev Experience</span>
                  </div>
                  <p className="text-sm text-ocean-white leading-relaxed text-left">
                    {lang === 'en' ? item.descriptionEn : item.descriptionPt}
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