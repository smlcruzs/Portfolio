import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, Server, Database, Cloud, Bot, Code2, Briefcase, Github, ExternalLink, Download, Globe, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import FishBackground from './components/FishBackground';
import { translations } from './translations';
import MobileIntegrationDemo from './components/MobileIntegrationDemo';
import DepthMeter from './components/DepthMeter';
import ThreeMobileShowcase from './components/ThreeMobileShowcase';
import StudyCasesSection from './components/StudyCasesSection';
// --- COMPONENTES VISUAIS (Cards) ---
const ProjectCard = ({ project }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-ocean-light/40 backdrop-blur-md border border-ocean-surface rounded-xl overflow-hidden hover:border-ocean-cyan/50 group transition-all duration-300 flex flex-col h-full shadow-lg"
  >
    <div className="relative h-56 overflow-hidden bg-ocean-deep">
      <div className="absolute inset-0 bg-ocean-deep/40 group-hover:bg-transparent transition-all z-10" />
      <img 
        src={project.image || "/placeholder.png"} 
        alt={project.title}
        onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/0a192f/64ffda?text=Project"; }}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-ocean-white mb-2 font-mono group-hover:text-ocean-cyan transition-colors">
        {project.title || "Project"}
      </h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {(project.stack || []).map((tech, i) => (
          <span key={i} className="text-xs font-mono px-2 py-1 rounded-full bg-ocean-cyan/10 text-ocean-cyan border border-ocean-cyan/20">
            {tech}
          </span>
        ))}
      </div>
      <p className="text-ocean-slate text-sm mb-6 flex-grow leading-relaxed">
        {project.description || "..."}
      </p>
      <div className="flex gap-4 mt-auto">
        <a href={project.github || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-ocean-white hover:text-ocean-cyan transition-colors">
          <Github size={16} /> Code
        </a>
        <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-ocean-white hover:text-ocean-cyan transition-colors">
          <ExternalLink size={16} /> Demo
        </a>
      </div>
    </div>
  </motion.div>
);

const SkillCard = ({ title, techs, icon: Icon }) => (
  <div className="bg-ocean-light/30 backdrop-blur border border-ocean-surface p-6 rounded-lg hover:border-ocean-cyan transition-all duration-300 hover:shadow-[0_0_15px_rgba(100,255,218,0.1)] group h-full">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-ocean-deep rounded text-ocean-cyan group-hover:text-ocean-white transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-ocean-white font-mono font-bold text-lg">{title}</h3>
    </div>
    <p className="text-ocean-slate text-sm leading-relaxed">{techs}</p>
  </div>
);

const StudyCaseCard = ({ title, desc }) => (
  <div className="bg-ocean-light/20 border-l-4 border-ocean-cyan p-6 hover:bg-ocean-light/40 transition-all cursor-pointer group rounded-r-xl">
    <h3 className="text-xl font-bold text-ocean-white group-hover:text-ocean-cyan transition-colors mb-2">{title}</h3>
    <p className="text-ocean-slate text-sm leading-relaxed">{desc}</p>
    <span className="text-ocean-cyan text-xs font-mono mt-4 inline-flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
      Ler análise técnica <ExternalLink size={12} />
    </span>
  </div>
);

function App() {
  const [data, setData] = useState(null);
  const [lang, setLang] = useState('pt');
  const t = translations[lang];

  useEffect(() => {
    fetch('http://localhost:3001/api/profile')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => console.error("Erro API:", err));
  }, []);

  if (!data) return <div className="bg-ocean-deep h-screen flex items-center justify-center text-ocean-cyan font-mono text-xl">Iniciando Sistemas...</div>;

  const iconMap = { Server, Brain: Cpu, Cpu, Bot, Cloud, Database };
  const projectsList = [
    {
      id: 1,
      title: "AutoU - Classificador de E-mails com IA",
      description: "Sistema inteligente que revoluciona a caixa de entrada. Utiliza Processamento de Linguagem Natural (NLP) e OpenAI para ler, interpretar e classificar e-mails recebidos em tempo real. O sistema decide automaticamente o que é útil (leads, suporte) e o que é ruído, priorizando o fluxo de trabalho.",
      stack: ["Python", "OpenAI API", "Automation"],
      // Placeholder representando IA/Análise
      image: "https://placehold.co/800x450/0a192f/64ffda?text=AutoU+AI+Analysis&font=roboto", 
      link: "#",
      github: "#"
    },
    {
      id: 2,
      title: "Library Manager API Rest",
      description: "Uma infraestrutura de Backend completa para gestão de grandes acervos bibliotecários. API RESTful com arquitetura limpa, cobrindo todo o ciclo de vida: cadastro de livros, controle de estoque, gestão de empréstimos e autenticação de usuários. Focada em performance e integridade de dados.",
      stack: ["Python", "Django REST", "Swagger", "SQLite"],
      // Placeholder representando Dados/Estrutura
      image: "https://placehold.co/800x450/112240/64ffda?text=REST+API+Architecture&font=roboto",
      link: "#",
      github: "#"
    }
  ];
  const myGithubProfile = "https://github.com/SEU_USUARIO"; 
  const toggleLanguage = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');

  return (
    <div className="min-h-screen bg-transparent text-ocean-slate font-sans selection:bg-ocean-cyan selection:text-ocean-deep relative">
      
      {/* 1. FUNDO DO MAR COM PEIXE */}
      <FishBackground />

      {/* 2. MEDIDOR DE PROFUNDIDADE (Lateral Direita Fixa) */}
      <DepthMeter />

      {/* REMOVI A BARRA DE NAVEGAÇÃO SUPERIOR AQUI */}

      {/* CONTAINER PRINCIPAL */}
      {/* Ajustei o padding-top (pt-20) para dar um ar de superfície sem a barra */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative pt-20 pb-20 flex gap-12">

        {/* --- COLUNA ESQUERDA: FOTO "MERGULHADORA" (Sticky) --- */}
        {/* MUDANÇA 1: Aumentei w-48 para w-80 para caber a foto maior */}
        <div className="hidden lg:block w-80 relative z-30">
          <div className="sticky top-32 flex flex-col items-center">
             
             {/* Foto com Glow */}
             {/* MUDANÇA 2: Aumentei w-32 h-32 para w-64 h-64 */}
             <div className="relative w-64 h-64 mb-8 group cursor-pointer">
                <div className="absolute inset-0 rounded-full border-2 border-ocean-cyan/30 group-hover:border-ocean-cyan transition-colors duration-500 animate-pulse"></div>
                <img 
                  src="/Profile.png" 
                  alt={data.header.name}
                  onError={(e) => e.target.style.display = 'none'} 
                  className="rounded-full w-full h-full object-cover border-4 border-ocean-light shadow-[0_0_30px_rgba(100,255,218,0.2)] transition-transform duration-500 group-hover:scale-105"
                />
             </div>
             
             {/* Mini Info que desce junto */}
             <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-ocean-white font-bold text-xl">{data.header.name}</h3>
                <span className="text-sm text-ocean-cyan font-mono">Engenheiro Fullstack</span>
             </div>

             {/* Linha que conecta a foto ao fundo (cabo de mergulho) */}
             <div className="w-[1px] h-[50vh] bg-gradient-to-b from-ocean-cyan/20 to-transparent mt-6"></div>
          </div>
        </div>

        {/* --- COLUNA CENTRAL: CONTEÚDO (Larga e Espaçosa) --- */}
        <main className="flex-1 max-w-4xl mx-auto flex flex-col gap-32">
          
          {/* HEADER / HERO (Texto Grande) */}
          <section className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-ocean-cyan font-mono mb-4 text-lg">Olá, meu nome é</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-ocean-white mb-6 tracking-tight">
              {data.header.name}.
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-ocean-slate mb-8">
              {t.role}
            </h2>
            <p className="text-ocean-slate text-lg max-w-2xl leading-relaxed mb-10 lg:mx-0 mx-auto">
              {data.header.summary}
            </p>
            
            {/* BOTÕES DE AÇÃO */}
            <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start">
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="#projects" className="bg-ocean-cyan/10 text-ocean-cyan px-8 py-4 rounded border border-ocean-cyan hover:bg-ocean-cyan hover:text-ocean-deep transition-all font-mono font-bold">
                  {t.btnProject}
                </a>
                <a href="/curriculo.pdf" download className="flex items-center gap-2 text-ocean-white px-8 py-4 rounded border border-ocean-surface hover:border-ocean-cyan transition-all font-mono">
                  <Download size={20} /> CV
                </a>
              </div>

              {/* Movi as utilidades (Idioma/Github) para cá discretamente */}
              <div className="flex items-center gap-4 border-l border-ocean-surface pl-6 ml-2">
                <button onClick={toggleLanguage} className="flex items-center gap-2 text-ocean-slate hover:text-ocean-white transition-colors font-mono text-sm">
                   <Globe size={16} /> {lang.toUpperCase()}
                </button>
                <a href={myGithubProfile} target="_blank" className="text-ocean-slate hover:text-ocean-cyan transition-colors">
                   <Github size={20} />
                </a>
              </div>
            </div>
          </section>

          {/* SOBRE MIM */}
          <section id="about" className="scroll-mt-32">
             <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl text-ocean-cyan font-mono">01.</span>
                <h2 className="text-3xl font-bold text-ocean-white">{t.about}</h2>
                <div className="h-[1px] flex-grow bg-ocean-surface/50"></div>
             </div>
             <div className="bg-ocean-light/20 p-8 rounded-2xl border border-ocean-surface/50 backdrop-blur-sm text-lg leading-loose text-ocean-slate">
               {t.aboutText}
             </div>
          </section>

          {/* PROJETOS */}
          <section id="projects" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-12">
                <span className="text-2xl text-ocean-cyan font-mono">02.</span>
                <h2 className="text-3xl font-bold text-ocean-white">{t.projects}</h2>
                <div className="h-[1px] flex-grow bg-ocean-surface/50"></div>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsList.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          {/* --- NOVA SEÇÃO: SOLUÇÕES (3 CELULARES) --- */}
          <section className="scroll-mt-32 mb-24">
             <div className="flex items-center gap-4 mb-16 justify-center">
                <div className="h-[1px] w-12 bg-ocean-surface/50"></div>
                <h2 className="text-3xl font-bold text-ocean-white text-center">
                  Domínio <span className="text-ocean-cyan">Multi-Plataforma</span>
                </h2>
                <div className="h-[1px] w-12 bg-ocean-surface/50"></div>
             </div>
             
             <p className="text-ocean-slate text-center mb-16 max-w-2xl mx-auto">
               Do design à implementação. Passe o mouse sobre os projetos abaixo para entender minha abordagem técnica em cada tipo de solução.
             </p>

             <ThreeMobileShowcase />
          </section>

          {/* SKILLS */}
          <section id="skills" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-12">
                <span className="text-2xl text-ocean-cyan font-mono">04.</span>
                <h2 className="text-3xl font-bold text-ocean-white">{t.skills}</h2>
                <div className="h-[1px] flex-grow bg-ocean-surface/50"></div>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.hardSkills.map((skill, idx) => (
                <SkillCard 
                  key={idx}
                  title={skill.category}
                  techs={skill.techs}
                  icon={iconMap[skill.icon] || Code2}
                />
              ))}
            </div>
          </section>

          {/* JORNADA */}
{/* JORNADA (EXPERIÊNCIA) */}
          <section id="experience" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-12">
                <span className="text-2xl text-ocean-cyan font-mono">05.</span>
                <h2 className="text-3xl font-bold text-ocean-white">{t.experience}</h2>
                <div className="h-[1px] flex-grow bg-ocean-surface/50"></div>
             </div>
             
             <div className="space-y-16 border-l-2 border-ocean-surface ml-4 pl-8 md:pl-12">
               
               {/* 1. ATUAL: REDE ALPHA FITNESS */}
               <div className="relative">
                 {/* Bolinha Pulsante (Destaque Atual) */}
                 <div className="absolute -left-[43px] md:-left-[59px] top-1 w-6 h-6 rounded-full bg-ocean-deep border-4 border-ocean-cyan shadow-[0_0_10px_#64ffda]"></div>
                 
                 <h3 className="text-2xl font-bold text-ocean-white">Engenheiro de Software Júnior</h3>
                 <span className="text-ocean-cyan font-mono mb-4 block text-sm">@ Rede Alpha Fitness | Desenvolvimento e Automação</span>
                 
                 <div className="text-ocean-slate text-base leading-relaxed space-y-3">
                    <p className="mb-4">
                      Atuo no desenvolvimento de soluções que reduzem processos manuais e aumentam a eficiência do time. Principais entregas:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-ocean-cyan">
                      <li><strong className="text-ocean-white">Arquitetura Serverless:</strong> Projetei e implantei ecossistema na AWS (Lambda, Gateway, S3) com 25+ endpoints.</li>
                      <li><strong className="text-ocean-white">Inovação com IA:</strong> Implementei algoritmos de Machine Learning para personalização de treinos baseados em histórico.</li>
                      <li><strong className="text-ocean-white">Eficiência Operacional:</strong> Automatizei 100% da gestão de dados de colaboradores.</li>
                      <li><strong className="text-ocean-white">Aceleração de Vendas:</strong> Otimização do SLA comercial via automação de fluxo de leads.</li>
                      <li><strong className="text-ocean-white">Observabilidade:</strong> Redução do MTTR com API centralizada de logs.</li>
                    </ul>
                 </div>
               </div>

               {/* 2. FREELANCER (Múltiplas Plataformas) */}
               <div className="relative opacity-80 hover:opacity-100 transition-opacity">
                 <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-ocean-surface border-2 border-ocean-slate"></div>
                 
                 <h3 className="text-xl font-bold text-ocean-white">Desenvolvedor Fullstack Freelancer</h3>
                 <span className="text-ocean-slate font-mono mb-4 block text-sm">@ Freelancer.com / GetNinjas / VintePila</span>
                 
                 <div className="text-ocean-slate text-sm leading-relaxed space-y-4">
                    <div>
                      <strong className="text-ocean-cyan block mb-1">Freelancer.com (Internacional)</strong>
                      <p>Atuação em projeto gringo (pago em Dólar) com reuniões 100% em inglês. Entreguei um CRUD de verificação de e-mail inteligente com integrações complexas.</p>
                    </div>
                    <div>
                      <strong className="text-ocean-cyan block mb-1">GetNinjas & VintePila</strong>
                      <p>Desenvolvimento de Landing Pages dinâmicas de alta conversão, E-commerces completos e sistemas específicos, como um Gerador de QR Code feito com JavaScript Puro (Vanilla).</p>
                    </div>
                 </div>
               </div>

               {/* 3. CISCO ACADEMY */}
               <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                 <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-ocean-surface"></div>
                 
                 <h3 className="text-lg font-bold text-ocean-white">Programming Essentials in C</h3>
                 <span className="text-ocean-slate font-mono mb-2 block text-sm">@ Cisco Networking Academy</span>
                 <p className="text-ocean-slate text-sm">
                   Uma jornada intensa de lógica e persistência. O foco não foi apenas o certificado, mas a bateria de provas que solidificou minha base em lógica de programação e me deu profundidade na linguagem C.
                 </p>
               </div>

               {/* 4. ESTÁCIO */}
               <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                 <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-ocean-surface"></div>
                 
                 <h3 className="text-lg font-bold text-ocean-white">Ciência da Computação</h3>
                 <span className="text-ocean-slate font-mono mb-2 block text-sm">@ Estácio</span>
                 <p className="text-ocean-slate text-sm">
                   Construindo as bases teóricas avançadas de algoritmos, estrutura de dados e computação.
                 </p>
               </div>

               {/* 5. SENAI */}
               <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                 <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-ocean-surface"></div>
                 
                 <h3 className="text-lg font-bold text-ocean-white">Técnico em Desenvolvimento de Sistemas</h3>
                 <span className="text-ocean-slate font-mono mb-2 block text-sm">@ SENAI</span>
                 <p className="text-ocean-slate text-sm">
                   Formação completa cobrindo PHP, Java e SQL. Foco total no ciclo de vida do software: da concepção e modelagem de banco de dados até a implementação e manutenção, seguindo padrões de qualidade e segurança.
                 </p>
               </div>

             </div>
          </section>

         {/* STUDY CASES (Agora Dinâmico e Real) */}
          <section id="study-cases" className="scroll-mt-32">
             <div className="flex items-center gap-4 mb-12">
                <span className="text-2xl text-ocean-cyan font-mono">06.</span>
                <h2 className="text-3xl font-bold text-ocean-white">Estudos de Caso Reais</h2>
                <div className="h-[1px] flex-grow bg-ocean-surface/50"></div>
             </div>
             
             <p className="text-ocean-slate mb-12 max-w-3xl leading-relaxed">
               Abaixo estão desafios reais que ja enfrentei<strong className="text-ocean-white"></strong>. 
               O foco não é apenas o código, mas como a arquitetura resolveu dores de negócio.
               <br/>
               <span className="text-xs text-ocean-cyan italic">Sinta-se livre para avaliar tecnicamente a solução.</span>
             </p>

             {/* Componente Novo */}
             <StudyCasesSection />
             
          </section>

          {/* FINALIZAÇÃO */}
          <section className="py-24 text-center">
             <h2 className="text-5xl font-bold text-ocean-white mb-8">{t.finalization}</h2>
             <p className="text-ocean-slate text-xl max-w-2xl mx-auto mb-12">{t.finalizationDesc}</p>
             <a href="mailto:email@exemplo.com" className="inline-flex items-center gap-3 bg-ocean-deep border border-ocean-cyan text-ocean-cyan px-10 py-5 rounded hover:bg-ocean-cyan/10 transition-all font-mono font-bold text-xl">
               <Send size={24} /> Entrar em Contato
             </a>
          </section>

          <footer className="text-center text-ocean-slate font-mono text-xs pb-12">
            <p>{t.footer}</p>
          </footer>

        </main>
      </div>
    </div>
  );
}

export default App;

