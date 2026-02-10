const profileData = {
  header: {
    name: "Samuel Cruz", 
    role: " Desenvolvedor de Software | Especialista em IA, APIs e Automação",
    summary: "Transformo complexidade em código. Com forte domínio em Python, AWS, Node.js e Docker, desenvolvo soluções Full Stack integradas a IA Generativa (OpenAI/LangChain). Do front-end com React à automação de fluxos via RPA, meu foco é entregar inovação técnica e performance.",
  },
    // --- NOVA SEÇÃO DE PROJETOS ---
  projects: [
    {
      id: 1,
      title: "Chatbot IA Corporativo",
      description: "Assistente virtual integrado ao Slack da empresa para responder dúvidas de RH automaticamente usando OpenAI e LangChain.",
      image: "/IA_ajuda.png", // Foto do Projeto
      stack: ["Python", "LangChain", "OpenAI", "AWS Lambda"],
      link: "#",
      github: "https://github.com/smlcruzs/AutoU-Mail-Assistant"
    },
    {
      id: 2,
      title: "Pdf Conversion Tool",
      description: "Uma ferramenta Flask para transformar PDFs legíveis por imagem em PDFs editáveis ​​e copiáveis ​​usando o OCR Tesseract.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80",
      stack: ["Python", "ReportLab", "Tesseract OCR", "PyMuPDF"],
      link: "#",
      github: "https://github.com/smlcruzs/pdf-conversion-tool"
    },
    {
      id: 3,
      title: "Biblioteca de API REST do Django",
      description: "Este projeto é uma API simples para gerenciar livros e usuários de uma biblioteca, construída com o Django REST Framework.",
      image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=500&q=80",
      stack: ["Node.js", "Express", "Redis", "Docker"],
      link: "#",
      github: "https://github.com/smlcruzs/biblioteca-api"
    },
    {
      id: 4,
      title: "Scraper de Preços",
      description: "Bot que monitora preços de concorrentes em e-commerces e gera relatórios automáticos no Telegram.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80",
      stack: ["Python", "BeautifulSoup", "Telegram API"],
      link: "#",
      github: "#"
    },
    {
      id: 5,
      title: "Portfolio V1",
      description: "Versão antiga deste portfólio feita apenas com HTML e CSS para praticar fundamentos.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80",
      stack: ["HTML", "CSS", "Javascript"],
      link: "#",
      github: "#"
    }
  ],
  // -----------------------------
hardSkills: [
    { category: "Frontend Moderno", techs: "React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind", icon: "Layout" },
    { category: "Backend & APIs", techs: "Node.js, Python (FastAPI, Django), Java, Swagger", icon: "Server" },
    { category: "IA Generativa (LLMs)", techs: "OpenAI, Grok, LangChain, Agentes Autônomos", icon: "Brain" },
    { category: "Machine Learning", techs: "TensorFlow, Keras, Scikit-learn, Modelos Preditivos", icon: "Cpu" },
    { category: "Automação (RPA)", techs: "n8n, Selenium, Playwright, PyAutoGUI", icon: "Bot" },
    { category: "Cloud & DevOps", techs: "AWS (Lambda, Beanstalk, CloudFormation), Docker, CI/CD", icon: "Cloud" },
    { category: "Dados", techs: "PostgreSQL, MySQL, Firebase, SQL Server", icon: "Database" }
  ],
  softSkills: [
    { title: "Visão Full Stack", desc: "Capacidade de integrar Front, Back e IA em soluções coesas." },
    { title: "Clean Code", desc: "Código legível, manutenível e escalável." },
    { title: "Resolução de Problemas", desc: "Foco em automação para eliminar ineficiências operacionais." }
  ],
  experience: {
    company: "Rede Alpha Fitness",
    role: "Desenvolvedor de Software",
    description: "Atuo no desenvolvimento de soluções inteligentes que otimizam operações internas e elevam a experiência do usuário. Trabalho colaborativo com equipes multidisciplinares e metodologias ágeis."
  }
};

module.exports = profileData;