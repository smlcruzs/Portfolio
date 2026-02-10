import React, { useState } from 'react';
import { Star, MessageSquare, Send, Calendar, CheckCircle } from 'lucide-react';

const casesData = [
  {
    id: 1,
    title: "Prescrição de Treino com GenAI & Validação Cruzada",
    tags: ["Python", "OpenAI API", "RAG", "Data Engineering"],
    description: "O desafio era escalar a personalização de treinos. Dados brutos (xlsx) com restrições de faixa etária e lesões precisavam virar rotinas seguras. Em vez de um ML tradicional (que carecia de dados históricos suficientes), desenhei uma arquitetura híbrida: Engenharia de Prompt com regras de especialistas para gerar o treino, seguido de um Agente Validador (outra camada de IA) que cruza o resultado com as restrições médicas do aluno. O loop se fecha com o feedback humano do professor, alimentando um Dataset proprietário para futuro Fine-Tuning.",
    date: "Atualizado em: 05 fev 2026"
  },
  {
    id: 2,
    title: "Sincronização de Colaboradores (Serverless ETL)",
    tags: ["AWS Lambda", "Google Drive API", "EventBridge", "Node.js"],
    description: "A gestão de acesso nas catracas era manual e propensa a falhas. A fonte da verdade vinha de um BI (DAX) exportado para o Google Drive. Desenvolvi um pipeline automatizado que monitora essa planilha diariamente. O sistema identifica colaboradores ativos/inativos e lida com a complexidade de 'Multi-Unidades' (funcionários que rodam em várias sedes). Migrei a solução de uma EC2 (custo fixo) para AWS Lambda (Serverless), reduzindo custos e garantindo execução por eventos (EventBridge).",
    date: "Atualizado em: 20 jan 2026"
  },
  {
    id: 3,
    title: "Roteamento Inteligente de Leads (Omnichannel)",
    tags: ["AWS API Gateway", "Lambda", "Integração"],
    description: "Com a implementação de um novo CRM, a empresa corria o risco de perder leads captados nas Landing Pages antigas. Criei um Middleware na AWS (API Gateway + Lambda) que atua como um hub central. Ele intercepta 100% dos prospects, sanitiza os dados e faz o roteamento inteligente: envia para a nova plataforma de vendas e, simultaneamente, mantém o setor de atendimento legado (CAV) alimentado, garantindo zero perda de oportunidades durante a transição.",
    date: "Atualizado em: 15 jan 2026"
  }
];

const StudyCasesSection = () => {
  // Estado para armazenar as notas de cada case { 1: 5, 2: 3 ... }
  const [ratings, setRatings] = useState({});
  // Estado para armazenar o feedback de texto { 1: "Melhore X", ... }
  const [feedbacks, setFeedbacks] = useState({});
  // Estado para saber se o feedback foi enviado
  const [sent, setSent] = useState({});

  // --- LÓGICA DE ENVIO PARA API (Google Sheets) ---
  const sendToSheet = async (caseId, rating, text) => {
    // Encontra o título do projeto baseado no ID para salvar na planilha
    const project = casesData.find(c => c.id === caseId);
    
    try {
      // Chama a API Serverless que criamos na pasta /api
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: rating,
          feedback: text || "", // Se não tiver texto, manda vazio
          caseTitle: project ? project.title : "Desconhecido"
        }),
      });
      console.log("Feedback enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
    }
  };

  const handleRate = (caseId, rate) => {
    setRatings(prev => ({ ...prev, [caseId]: rate }));

    // Se a nota for maior que 3 (4 ou 5), enviamos direto para a planilha
    // pois não abrimos a caixa de texto para críticas.
    if (rate > 3) {
      sendToSheet(caseId, rate, "");
      setSent(prev => ({ ...prev, [caseId]: true }));
    } else {
      // Se for 3 ou menos, resetamos o "enviado" caso a pessoa mude a nota,
      // para dar chance dela escrever o feedback.
      setSent(prev => ({ ...prev, [caseId]: false }));
    }
  };

  const handleFeedbackChange = (caseId, text) => {
    setFeedbacks(prev => ({ ...prev, [caseId]: text }));
  };

  const submitFeedback = (caseId) => {
    // Pega os valores atuais do estado
    const currentRating = ratings[caseId];
    const currentText = feedbacks[caseId];

    // Envia para a API
    sendToSheet(caseId, currentRating, currentText);
    
    // Marca como enviado para mostrar a mensagem de sucesso
    setSent(prev => ({ ...prev, [caseId]: true }));
  };

  return (
    <div className="flex flex-col gap-12">
      {casesData.map((studyCase) => (
        <div key={studyCase.id} className="bg-ocean-light/10 border border-ocean-surface/50 rounded-2xl p-8 backdrop-blur-sm hover:border-ocean-cyan/30 transition-all duration-300 group">
          
          {/* Cabeçalho do Card */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-ocean-white group-hover:text-ocean-cyan transition-colors">
                {studyCase.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {studyCase.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-ocean-deep/50 text-ocean-cyan border border-ocean-cyan/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Data de atualização individual */}
            <div className="flex items-center gap-2 text-ocean-slate text-xs opacity-60">
              <Calendar size={14} /> {studyCase.date}
            </div>
          </div>

          {/* O Texto Humanizado */}
          <p className="text-ocean-slate leading-relaxed mb-8 text-sm md:text-base border-l-2 border-ocean-cyan/20 pl-4">
            {studyCase.description}
          </p>

          {/* Área de Avaliação */}
          <div className="bg-ocean-deep/40 rounded-xl p-4 border border-ocean-surface/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-ocean-white">O que achou desta solução?</span>
              {ratings[studyCase.id] && (
                <span className={`text-xs font-mono ${ratings[studyCase.id] <= 3 ? 'text-red-400' : 'text-green-400'}`}>
                  {ratings[studyCase.id] <= 3 ? "Poderia ser melhor" : "Solução Sólida"}
                </span>
              )}
            </div>

            {/* Estrelas */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(studyCase.id, star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star 
                    size={24} 
                    className={`${
                      ratings[studyCase.id] >= star 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-ocean-slate hover:text-yellow-200'
                    } transition-colors`} 
                  />
                </button>
              ))}
            </div>

            {/* Caixa de Feedback Condicional (<= 3 estrelas) */}
            {ratings[studyCase.id] && ratings[studyCase.id] <= 3 && !sent[studyCase.id] && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-xs text-ocean-slate mb-2 flex items-center gap-2">
                  <MessageSquare size={12} /> 
                  Que abordagem você usaria diferente? (Feedback técnico)
                </p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ex: Poderia usar Step Functions ao invés de..."
                    className="flex-1 bg-ocean-deep border border-ocean-surface rounded px-3 py-2 text-sm text-white focus:border-ocean-cyan outline-none"
                    onChange={(e) => handleFeedbackChange(studyCase.id, e.target.value)}
                  />
                  <button 
                    onClick={() => submitFeedback(studyCase.id)}
                    className="bg-ocean-cyan text-ocean-deep px-4 py-2 rounded font-bold hover:bg-white transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Mensagem de Obrigado */}
            {sent[studyCase.id] && (
              <div className="mt-4 text-green-400 text-sm flex items-center gap-2 animate-in fade-in">
                <CheckCircle size={16} /> Obrigado pelo seu feedback técnico!
              </div>
            )}
          </div>
        </div>
      ))}
      
      {/* Mensagem Final de Atualização Geral */}
      <div className="text-center mt-8 pt-8 border-t border-ocean-surface/30">
        <p className="text-ocean-slate text-sm font-mono opacity-70">
          Última atualização do Core dos Study Cases: <span className="text-ocean-cyan">Fevereiro de 2026</span>.
          <br/>
          *Todos os dados sensíveis foram ofuscados para conformidade com LGPD.
        </p>
      </div>
    </div>
  );
};

export default StudyCasesSection;