import React, { useEffect, useState } from 'react';
import { Cpu, Server, Database, Cloud, Bot, Code2, Github, ExternalLink, Download, Globe, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import FishBackground from './components/FishBackground';
import { translations } from './translations';
import DepthMeter from './components/DepthMeter';
import ThreeMobileShowcase from './components/ThreeMobileShowcase';
import StudyCasesSection from './components/StudyCasesSection';

// --- PROJECT CARD ---
const ProjectCard = ({ project, t, lang }) => {
  const isWip = project.status === 'wip';
  const title = lang === 'en' ? project.title : project.titlePt;
  const description = lang === 'en' ? project.description : project.descriptionPt;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-ocean-light/40 backdrop-blur-md border rounded-xl overflow-hidden group transition-all duration-300 flex flex-col h-full shadow-lg ${isWip ? 'border-pink-400/40 hover:border-pink-400/70' : 'border-ocean-surface hover:border-ocean-cyan/50'}`}
    >
      <div className="relative h-56 overflow-hidden bg-ocean-deep">
        <div className="absolute inset-0 bg-ocean-deep/40 group-hover:bg-transparent transition-all z-10" />
        {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.image || "/placeholder.png"}
              alt={title}
              onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/0a192f/64ffda?text=Project"; }}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            />
          )}
        {isWip && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-white/90 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-pink-200 shadow-md">
            <span>🔨</span> {t.wipBadge}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className={`text-xl font-bold mb-2 font-mono transition-colors ${isWip ? 'text-pink-300 group-hover:text-pink-200' : 'text-ocean-white group-hover:text-ocean-cyan'}`}>
          {title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.stack || []).map((tech, i) => (
            <span key={i} className={`text-xs font-mono px-2 py-1 rounded-full border ${isWip ? 'bg-pink-400/10 text-pink-300 border-pink-400/20' : 'bg-ocean-cyan/10 text-ocean-cyan border-ocean-cyan/20'}`}>
              {tech}
            </span>
          ))}
        </div>
        <p className="text-ocean-slate text-sm mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        <div className="flex gap-4 mt-auto">
          {isWip ? (
            <span className="flex items-center gap-2 text-sm font-mono text-pink-400/60 cursor-not-allowed select-none">
              <Github size={16} /> {t.comingSoon}
            </span>
          ) : (
            <>
              <a href={project.github || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-ocean-white hover:text-ocean-cyan transition-colors">
                <Github size={16} /> Code
              </a>
              {project.link && project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-ocean-white hover:text-ocean-cyan transition-colors">
                  <ExternalLink size={16} /> Demo
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

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

const projectsList = [
  {
    id: 1,
    title: "AutoU - AI Email Classifier",
    titlePt: "AutoU - Classificador de E-mails com IA",
    description: "Intelligent system that revolutionizes the inbox. Uses NLP and OpenAI to read, interpret and classify incoming emails in real time, automatically deciding what is useful (leads, support) and what is noise.",
    descriptionPt: "Sistema inteligente que revoluciona a caixa de entrada. Utiliza NLP e OpenAI para ler, interpretar e classificar e-mails recebidos em tempo real, decidindo automaticamente o que é útil (leads, suporte) e o que é ruído.",
    stack: ["Python", "OpenAI API", "Automation"],
    image: "/AutoU.png",
    link: "https://projects-autou.teq4ty.easypanel.host/",
    github: "https://github.com/smlcruzs/AutoU-Mail-Assistant",
    status: "done"
  },
  {
    id: 2,
    title: "Library Manager REST API",
    titlePt: "Library Manager API Rest",
    description: "Complete Backend infrastructure for managing library collections. RESTful API with clean architecture covering book registration, inventory control, loan management and user authentication.",
    descriptionPt: "Infraestrutura de Backend completa para gestão de acervos bibliotecários. API RESTful com arquitetura limpa cobrindo cadastro de livros, controle de estoque, gestão de empréstimos e autenticação de usuários.",
    stack: ["Python", "Django REST", "Swagger", "SQLite"],
    image: "/Biblioteca.png",
    link: "https://projects-biblioteca-api.teq4ty.easypanel.host/",
    github: "https://github.com/smlcruzs/biblioteca-api",
    status: "done"
  },
  { 
    id: 3,
    title: "PDF Conversion Tool",
    titlePt: "PDF Conversion Tool",
    description: "Flask tool to transform image-readable PDFs into editable and copyable PDFs using Tesseract OCR. Ideal for digitizing physical documents.",
    descriptionPt: "Ferramenta Flask para transformar PDFs legíveis por imagem em PDFs editáveis e copiáveis usando OCR Tesseract. Ideal para digitalização de documentos físicos.",
    stack: ["Python", "Flask", "Tesseract OCR", "PyMuPDF"],
    image: "https://placehold.co/800x450/0a192f/64ffda?text=PDF+Conversion+Tool&font=roboto",
    link: "#",
    github: "https://github.com/smlcruzs/pdf-conversion-tool",
    status: "done"
  },
  {
    id: 4,
    title: "Price Scraper",
    titlePt: "Scraper de Preços",
    description: "Bot that monitors competitor prices on e-commerce sites and generates automatic reports on Telegram. Runs in the background with periodic scheduling.",
    descriptionPt: "Bot que monitora preços de concorrentes em e-commerces e gera relatórios automáticos no Telegram. Roda em background com agendamento periódico.",
    stack: ["Python", "BeautifulSoup", "Telegram API"],
    image: "https://placehold.co/800x450/112240/64ffda?text=Price+Scraper&font=roboto",
    link: "#",
    github: "#",
    status: "wip"
  },
  {
    id: 5,
    title: "Roblox Social Hub",
    titlePt: "Roblox Social Hub",
    description: "Multiplayer Roblox game where people meet and get to know each other. I built the full infrastructure: Party system for groups, friend requests, custom profile editor, portal to other games in party, virtual currency sales system and DataStore for profile persistence across sessions.",
    descriptionPt: "Jogo multiplayer no Roblox onde pessoas se encontram e se conhecem. Desenvolvi toda a infraestrutura: sistema de Party para grupos, adição de amigos, editor de perfil personalizado, portal para outros jogos em party, sistema de vendas com moedas virtuais e DataStore para persistência de perfis entre sessões.",
    stack: ["Lua", "Roblox Studio", "DataStore", "RemoteEvents"],
    image: "/Roblox.png",
    link: "#",
    github: "#",
    status: "wip"
  },
  {
    id: 6,
    title: "Blender Attack Animations",
    titlePt: "Animações de Ataque no Blender",
    description: "Studying animation mechanics in Blender. Developing 4 attack animations for a combat system in Roblox — each attack needs fluidity and dynamic flow between them so transitions feel natural and polished in gameplay.",
    descriptionPt: "Estudando mecânicas de animação no Blender. Desenvolvendo 4 animações de ataque para um sistema de luta no Roblox — cada ataque precisa ter fluidez e dinamismo entre si para que as transições fiquem naturais e bem acabadas durante o gameplay.",
    stack: ["Blender", "Roblox Studio", "3D Animation"],
    video: "/RobloxAnimation.mp4",
    image: "https://placehold.co/800x450/1a0a2e/c084fc?text=Blender+Animations&font=roboto",
    link: "#",
    github: "#",
    status: "wip"
  }
];

function App() {
  const [data, setData] = useState(null);
  const [lang, setLang] = useState('pt');
  const t = translations[lang];

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => console.error("Erro API:", err));
  }, []);

  if (!data) return (
    <div className="bg-ocean-deep h-screen flex items-center justify-center text-ocean-cyan font-mono text-xl">
      Iniciando Sistemas...
    </div>
  );

  const iconMap = { Server, Brain: Cpu, Cpu, Bot, Cloud, Database };
  const myGithubProfile = "https://github.com/smlcruzs";
  const toggleLanguage = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');

  return (
    <div className="min-h-screen bg-transparent text-ocean-slate font-sans selection:bg-ocean-cyan selection:text-ocean-deep relative">

      <FishBackground />
      <DepthMeter />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative pt-20 pb-20 flex gap-12">

        {/* COLUNA ESQUERDA: FOTO */}
        <div className="hidden lg:block w-80 relative z-30">
          <div className="sticky top-32 flex flex-col items-center">
            <div className="relative w-64 h-64 mb-6 group cursor-pointer">
              <div className="absolute inset-0 rounded-full border-2 border-ocean-cyan/30 group-hover:border-ocean-cyan transition-colors duration-500 animate-pulse"></div>
              <img
                src="/Profile.png"
                alt={data.header.name}
                onError={(e) => e.target.style.display = 'none'}
                className="rounded-full w-full h-full object-cover border-4 border-ocean-light shadow-[0_0_30px_rgba(100,255,218,0.2)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* TAG DE IDENTIDADE */}
            <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-2xl bg-ocean-light/20 border border-ocean-cyan/20 backdrop-blur-sm shadow-[0_0_16px_rgba(100,255,218,0.07)] text-xs font-mono w-full max-w-[220px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ocean-cyan shadow-[0_0_6px_#64ffda] animate-pulse"></span>
                <span className="text-ocean-white font-bold tracking-wide">{t.tagRole}</span>
              </div>
              <div className="w-full h-px bg-ocean-cyan/15"></div>
              <div className="flex flex-col items-center gap-1.5 text-ocean-slate">
                <span>📍 Salvador / BA</span>
                <span>🏢 {t.tagCeo} <span className="text-ocean-cyan font-semibold">Kally</span></span>
                <span className="text-center italic text-ocean-cyan/70 leading-snug mt-1">
                  {t.tagQuote}
                </span>
              </div>
            </div>

            {/* BOTÃO DE IDIOMA */}
            <button
              onClick={toggleLanguage}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full border border-ocean-cyan/30 bg-ocean-light/20 hover:bg-ocean-cyan/10 hover:border-ocean-cyan transition-all duration-300 group"
            >
              <Globe size={14} className="text-ocean-cyan" />
              <span className="font-mono text-xs font-bold text-ocean-white tracking-widest">
                {lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
              </span>
              <span className="text-ocean-slate/50 text-xs font-mono">→</span>
              <span className="font-mono text-xs text-ocean-slate group-hover:text-ocean-cyan transition-colors">
                {lang === 'pt' ? 'EN' : 'PT'}
              </span>
            </button>

            <div className="w-[1px] h-[45vh] bg-gradient-to-b from-ocean-cyan/20 to-transparent mt-6"></div>
          </div>
        </div>

        {/* COLUNA CENTRAL */}
        <main className="flex-1 max-w-4xl mx-auto flex flex-col gap-32">

          {/* HERO */}
          <section className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-ocean-cyan font-mono mb-4 text-lg drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              {t.greeting}
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              {data.header.name}.
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-ocean-cyan mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {t.role}
            </h2>
            <p className="text-white/90 text-lg max-w-2xl leading-relaxed mb-10 lg:mx-0 mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]">
              {lang === 'en' ? data.header.summaryEn : data.header.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start">
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="#projects" className="bg-ocean-cyan/10 text-ocean-cyan px-8 py-4 rounded border border-ocean-cyan hover:bg-ocean-cyan hover:text-ocean-deep transition-all font-mono font-bold">
                  {t.btnProject}
                </a>
                <a href="/CurriculoSamuelCruzSE.pdf" download className="flex items-center gap-2 text-ocean-white px-8 py-4 rounded border border-ocean-surface hover:border-ocean-cyan transition-all font-mono">
                  <Download size={20} /> {t.btnCv}
                </a>
              </div>
              <div className="flex items-center gap-4 border-l border-ocean-surface pl-6 ml-2">
                <button onClick={toggleLanguage} className="flex items-center gap-2 text-ocean-slate hover:text-ocean-white transition-colors font-mono text-sm">
                  <Globe size={16} /> {lang.toUpperCase()}
                </button>
                <a href={myGithubProfile} target="_blank" rel="noopener noreferrer" className="text-ocean-slate hover:text-ocean-cyan transition-colors">
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
            <div className="bg-ocean-deep/60 p-8 rounded-2xl border border-ocean-cyan/20 backdrop-blur-sm text-lg leading-relaxed text-white font-medium shadow-[inset_0_1px_0_rgba(100,255,218,0.08)]">
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
                <ProjectCard key={project.id} project={project} t={t} lang={lang} />
              ))}
            </div>
          </section>

          {/* MULTI-PLATAFORMA */}
          <section className="scroll-mt-32 mb-24">
            <div className="flex items-center gap-4 mb-16 justify-center">
              <div className="h-[1px] w-12 bg-ocean-surface/50"></div>
              <h2 className="text-3xl font-bold text-ocean-white text-center">
                {t.multiTitle} <span className="text-ocean-cyan">{t.multiHighlight}</span>
              </h2>
              <div className="h-[1px] w-12 bg-ocean-surface/50"></div>
            </div>
            <p className="text-ocean-slate text-center mb-16 max-w-2xl mx-auto">
              {t.multiDesc}
            </p>
            <ThreeMobileShowcase t={t} />
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

          {/* EXPERIÊNCIA */}
          <section id="experience" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-2xl text-ocean-cyan font-mono">05.</span>
              <h2 className="text-3xl font-bold text-ocean-white">{t.experience}</h2>
              <div className="h-[1px] flex-grow bg-ocean-surface/50"></div>
            </div>
            <div className="space-y-16 border-l-2 border-ocean-surface ml-4 pl-8 md:pl-12">

              <div className="relative">
                <div className="absolute -left-[43px] md:-left-[59px] top-1 w-6 h-6 rounded-full bg-ocean-deep border-4 border-ocean-cyan shadow-[0_0_10px_#64ffda]"></div>
                <h3 className="text-2xl font-bold text-ocean-white">{t.expRole1}</h3>
                <span className="text-ocean-cyan font-mono mb-4 block text-sm">{t.expCompany1}</span>
                <div className="text-ocean-slate text-base leading-relaxed space-y-3">
                  <p className="mb-4">{t.expIntro1}</p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-ocean-cyan">
                    <li><strong className="text-ocean-white">{t.expLabel1a}</strong> {t.expItem1a}</li>
                    <li><strong className="text-ocean-white">{t.expLabel1b}</strong> {t.expItem1b}</li>
                    <li><strong className="text-ocean-white">{t.expLabel1c}</strong> {t.expItem1c}</li>
                    <li><strong className="text-ocean-white">{t.expLabel1d}</strong> {t.expItem1d}</li>
                    <li><strong className="text-ocean-white">{t.expLabel1e}</strong> {t.expItem1e}</li>
                  </ul>
                </div>
              </div>

              <div className="relative opacity-80 hover:opacity-100 transition-opacity">
                <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-ocean-surface border-2 border-ocean-slate"></div>
                <h3 className="text-xl font-bold text-ocean-white">{t.expRole2}</h3>
                <span className="text-ocean-slate font-mono mb-4 block text-sm">{t.expCompany2}</span>
                <div className="text-ocean-slate text-sm leading-relaxed space-y-4">
                  <div>
                    <strong className="text-ocean-cyan block mb-1">{t.expSub2a}</strong>
                    <p>{t.expDesc2a}</p>
                  </div>
                  <div>
                    <strong className="text-ocean-cyan block mb-1">{t.expSub2b}</strong>
                    <p>{t.expDesc2b}</p>
                  </div>
                </div>
              </div>

              <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-ocean-surface"></div>
                <h3 className="text-lg font-bold text-ocean-white">{t.expRole3}</h3>
                <span className="text-ocean-slate font-mono mb-2 block text-sm">{t.expCompany3}</span>
                <p className="text-ocean-slate text-sm">{t.expDesc3}</p>
              </div>

              <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-ocean-surface"></div>
                <h3 className="text-lg font-bold text-ocean-white">{t.expRole4}</h3>
                <span className="text-ocean-slate font-mono mb-2 block text-sm">{t.expCompany4}</span>
                <p className="text-ocean-slate text-sm">{t.expDesc4}</p>
              </div>

              <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-ocean-surface"></div>
                <h3 className="text-lg font-bold text-ocean-white">{t.expRole5}</h3>
                <span className="text-ocean-slate font-mono mb-2 block text-sm">{t.expCompany5}</span>
                <p className="text-ocean-slate text-sm">{t.expDesc5}</p>
              </div>

            </div>
          </section>

          {/* STUDY CASES */}
          <section id="study-cases" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-2xl text-ocean-cyan font-mono">06.</span>
              <h2 className="text-3xl font-bold text-ocean-white">{t.studyCases}</h2>
              <div className="h-[1px] flex-grow bg-ocean-surface/50"></div>
            </div>
            <p className="text-ocean-slate mb-12 max-w-3xl leading-relaxed">
              {t.studyCasesDesc}
              <br />
              <span className="text-xs text-ocean-cyan italic">{t.studyCasesNote}</span>
            </p>
            <StudyCasesSection t={t} />
          </section>

          {/* FINALIZAÇÃO */}
          <section className="py-24 text-center">
            <h2 className="text-5xl font-bold text-ocean-white mb-8">{t.finalization}</h2>
            <p className="text-ocean-slate text-xl max-w-2xl mx-auto mb-12">{t.finalizationDesc}</p>
            <a href="https://wa.me/5571981895293" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-ocean-deep border border-ocean-cyan text-ocean-cyan px-10 py-5 rounded hover:bg-ocean-cyan/10 transition-all font-mono font-bold text-xl">
              <Send size={24} /> {t.contactBtn}
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