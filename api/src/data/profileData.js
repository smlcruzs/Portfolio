const profileData = {
  header: {
    name: "Samuel Cruz",
    role: "Desenvolvedor de Software | Especialista em IA, APIs e Automação",
    summary: "Desenvolvedor com 4 anos de experiência em software, análise de dados, RPA/web scraping e IA (LLM/RAG). Já construí sistemas de geração de treino, monitoramento de colaboradores e 30+ APIs funcionais e escaláveis na AWS — otimizando múltiplos setores da maior rede de academias do Nordeste. Atuo com responsabilidade, arquitetura limpa, integrações robustas e entrega contínua.",
    summaryEn: "Developer with 4 years of experience in software, data analysis, RPA/web scraping and AI (LLM/RAG). I've built training generation systems, employee monitoring tools and 30+ functional, scalable APIs on AWS — optimizing multiple sectors of the largest gym network in Northeast Brazil. I work with clean architecture, robust integrations and continuous delivery.",
  },

  projects: [
    {
      id: 1,
      title: "AutoU - Classificador de E-mails com IA",
      description: "Sistema inteligente que revoluciona a caixa de entrada. Utiliza NLP e OpenAI para ler, interpretar e classificar e-mails recebidos em tempo real, decidindo automaticamente o que é útil (leads, suporte) e o que é ruído.",
      image: "/AutoU.png",
      stack: ["Python", "OpenAI API", "Automation"],
      link: "",
      github: "https://github.com/smlcruzs/AutoU-Mail-Assistant",
      status: "done"
    },
    {
      id: 2,
      title: "Library Manager API Rest",
      description: "Infraestrutura de Backend completa para gestão de acervos bibliotecários. API RESTful com arquitetura limpa cobrindo cadastro de livros, controle de estoque, gestão de empréstimos e autenticação de usuários.",
      image: "https://placehold.co/800x450/112240/64ffda?text=REST+API+Architecture&font=roboto",
      stack: ["Python", "Django REST", "Swagger", "SQLite"],
      link: "#",
      github: "https://github.com/smlcruzs/biblioteca-api",
      status: "done"
    },
    {
      id: 3,
      title: "PDF Conversion Tool",
      description: "Ferramenta Flask para transformar PDFs legíveis por imagem em PDFs editáveis e copiáveis usando OCR Tesseract. Ideal para digitalização de documentos físicos.",
      image: "https://placehold.co/800x450/0a192f/64ffda?text=PDF+Conversion+Tool&font=roboto",
      stack: ["Python", "Flask", "Tesseract OCR", "PyMuPDF"],
      link: "#",
      github: "https://github.com/smlcruzs/pdf-conversion-tool",
      status: "done"
    },
    {
      id: 4,
      title: "Scraper de Preços",
      description: "Bot que monitora preços de concorrentes em e-commerces e gera relatórios automáticos no Telegram. Roda em background com agendamento periódico.",
      image: "https://placehold.co/800x450/112240/64ffda?text=Price+Scraper&font=roboto",
      stack: ["Python", "BeautifulSoup", "Telegram API"],
      link: "#",
      github: "#",
      status: "wip"
    },
    {
      id: 5,
      title: "Roblox Social Hub",
      description: "Jogo multiplayer no Roblox onde pessoas se encontram e se conhecem. Desenvolvi toda a infraestrutura: sistema de Party para grupos, adição de amigos, editor de perfil personalizado, portal para outros jogos em party, sistema de vendas com moedas virtuais e DataStore para persistência de perfis entre sessões.",
      image: "/Roblox.png",
      stack: ["Lua", "Roblox Studio", "DataStore", "RemoteEvents"],
      link: "#",
      github: "#",
      status: "wip"
    }
  ],

  hardSkills: [
    { category: "Frontend Moderno",     techs: "React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind",      icon: "Layout"   },
    { category: "Backend & APIs",       techs: "Node.js, Python (FastAPI, Django), Java, Swagger",         icon: "Server"   },
    { category: "IA Generativa (LLMs)", techs: "OpenAI, Grok, LangChain, Agentes Autônomos",               icon: "Brain"    },
    { category: "Machine Learning",     techs: "TensorFlow, Keras, Scikit-learn, Modelos Preditivos",      icon: "Cpu"      },
    { category: "Automação (RPA)",      techs: "n8n, Selenium, Playwright, PyAutoGUI",                     icon: "Bot"      },
    { category: "Cloud & DevOps",       techs: "AWS (Lambda, Beanstalk, CloudFormation), Docker, CI/CD",   icon: "Cloud"    },
    { category: "Dados",                techs: "PostgreSQL, MySQL, Firebase, SQL Server",                   icon: "Database" }
  ],

  softSkills: [
    { title: "Visão Full Stack",       desc: "Capacidade de integrar Front, Back e IA em soluções coesas." },
    { title: "Clean Code",             desc: "Código legível, manutenível e escalável." },
    { title: "Resolução de Problemas", desc: "Foco em automação para eliminar ineficiências operacionais." }
  ],

  experience: {
    company:     "Rede Alpha Fitness",
    role:        "Engenheiro de Software Júnior",
    description: "Atuo no desenvolvimento de soluções inteligentes que otimizam operações internas e elevam a experiência do usuário. Trabalho colaborativo com equipes multidisciplinares e metodologias ágeis."
  }
};

module.exports = profileData;