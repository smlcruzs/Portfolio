import React, { useState } from 'react';
import { Star, MessageSquare, Send, Calendar, CheckCircle } from 'lucide-react';

// Usa variável de ambiente se existir, senão cai no localhost para dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const casesData = [
  {
    id: 1,
    titlePt: "Prescrição de Treino com GenAI & Validação Cruzada",
    titleEn: "Workout Prescription with GenAI & Cross-Validation",
    tags: ["Python", "OpenAI API", "RAG", "Data Engineering"],
    descriptionPt: "O desafio era escalar a personalização de treinos. Dados brutos (xlsx) com restrições de faixa etária e lesões precisavam virar rotinas seguras. Em vez de um ML tradicional (que carecia de dados históricos suficientes), desenhei uma arquitetura híbrida: Engenharia de Prompt com regras de especialistas para gerar o treino, seguido de um Agente Validador (outra camada de IA) que cruza o resultado com as restrições médicas do aluno. O loop se fecha com o feedback humano do professor, alimentando um Dataset proprietário para futuro Fine-Tuning.",
    descriptionEn: "The challenge was scaling workout personalization. Raw data (xlsx) with age and injury restrictions needed to become safe routines. Instead of traditional ML (which lacked sufficient historical data), I designed a hybrid architecture: Prompt Engineering with expert rules to generate the workout, followed by a Validator Agent (another AI layer) that cross-references the result with the student's medical restrictions. The loop closes with human teacher feedback, feeding a proprietary Dataset for future Fine-Tuning.",
    datePt: "Atualizado em: 05 fev 2026",
    dateEn: "Updated: Feb 05, 2026"
  },
  {
    id: 2,
    titlePt: "Sincronização de Colaboradores (Serverless ETL)",
    titleEn: "Employee Sync (Serverless ETL)",
    tags: ["AWS Lambda", "Google Drive API", "EventBridge", "Node.js"],
    descriptionPt: "A gestão de acesso nas catracas era manual e propensa a falhas. A fonte da verdade vinha de um BI (DAX) exportado para o Google Drive. Desenvolvi um pipeline automatizado que monitora essa planilha diariamente. O sistema identifica colaboradores ativos/inativos e lida com a complexidade de 'Multi-Unidades' (funcionários que rodam em várias sedes). Migrei a solução de uma EC2 (custo fixo) para AWS Lambda (Serverless), reduzindo custos e garantindo execução por eventos (EventBridge).",
    descriptionEn: "Turnstile access management was manual and error-prone. The source of truth came from a BI (DAX) exported to Google Drive. I built an automated pipeline that monitors this spreadsheet daily. The system identifies active/inactive employees and handles the complexity of 'Multi-Units' (staff working across multiple locations). I migrated the solution from EC2 (fixed cost) to AWS Lambda (Serverless), reducing costs and ensuring event-driven execution (EventBridge).",
    datePt: "Atualizado em: 20 jan 2026",
    dateEn: "Updated: Jan 20, 2026"
  },
  {
    id: 3,
    titlePt: "Roteamento Inteligente de Leads (Omnichannel)",
    titleEn: "Intelligent Lead Routing (Omnichannel)",
    tags: ["AWS API Gateway", "Lambda", "Integração"],
    descriptionPt: "Com a implementação de um novo CRM, a empresa corria o risco de perder leads captados nas Landing Pages antigas. Criei um Middleware na AWS (API Gateway + Lambda) que atua como um hub central. Ele intercepta 100% dos prospects, sanitiza os dados e faz o roteamento inteligente: envia para a nova plataforma de vendas e, simultaneamente, mantém o setor de atendimento legado (CAV) alimentado, garantindo zero perda de oportunidades durante a transição.",
    descriptionEn: "With a new CRM rollout, the company risked losing leads captured on legacy Landing Pages. I built a Middleware on AWS (API Gateway + Lambda) acting as a central hub. It intercepts 100% of prospects, sanitizes data and performs intelligent routing: sends to the new sales platform while simultaneously keeping the legacy support team (CAV) fed — guaranteeing zero opportunity loss during the transition.",
    datePt: "Atualizado em: 15 jan 2026",
    dateEn: "Updated: Jan 15, 2026"
  }
];

const StudyCasesSection = ({ t }) => {
  const [ratings, setRatings]     = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [sent, setSent]           = useState({});

  const lang = t.greeting === "Hi, my name is" ? 'en' : 'pt';

  const sendToSheet = async (caseId, rating, text) => {
    const project = casesData.find(c => c.id === caseId);
    try {
      await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          feedback: text || "",
          caseTitle: project ? (lang === 'en' ? project.titleEn : project.titlePt) : "Unknown"
        }),
      });
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
    }
  };

  const handleRate = (caseId, rate) => {
    setRatings(prev => ({ ...prev, [caseId]: rate }));
    if (rate > 3) {
      sendToSheet(caseId, rate, "");
      setSent(prev => ({ ...prev, [caseId]: true }));
    } else {
      setSent(prev => ({ ...prev, [caseId]: false }));
    }
  };

  const handleFeedbackChange = (caseId, text) => {
    setFeedbacks(prev => ({ ...prev, [caseId]: text }));
  };

  const submitFeedback = (caseId) => {
    sendToSheet(caseId, ratings[caseId], feedbacks[caseId]);
    setSent(prev => ({ ...prev, [caseId]: true }));
  };

  return (
    <div className="flex flex-col gap-12">
      {casesData.map((studyCase) => (
        <div key={studyCase.id} className="bg-ocean-light/10 border border-ocean-surface/50 rounded-2xl p-8 backdrop-blur-sm hover:border-ocean-cyan/30 transition-all duration-300 group">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-ocean-white group-hover:text-ocean-cyan transition-colors">
                {lang === 'en' ? studyCase.titleEn : studyCase.titlePt}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {studyCase.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-ocean-deep/50 text-ocean-cyan border border-ocean-cyan/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-ocean-slate text-xs opacity-60">
              <Calendar size={14} />
              {lang === 'en' ? studyCase.dateEn : studyCase.datePt}
            </div>
          </div>

          <p className="text-ocean-slate leading-relaxed mb-8 text-sm md:text-base border-l-2 border-ocean-cyan/20 pl-4">
            {lang === 'en' ? studyCase.descriptionEn : studyCase.descriptionPt}
          </p>

          <div className="bg-ocean-deep/40 rounded-xl p-4 border border-ocean-surface/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-ocean-white">{t.scRatingLabel}</span>
              {ratings[studyCase.id] && (
                <span className={`text-xs font-mono ${ratings[studyCase.id] <= 3 ? 'text-red-400' : 'text-green-400'}`}>
                  {ratings[studyCase.id] <= 3 ? t.scRatingBad : t.scRatingGood}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => handleRate(studyCase.id, star)} className="transition-transform hover:scale-110 focus:outline-none">
                  <Star
                    size={24}
                    className={`${ratings[studyCase.id] >= star ? 'fill-yellow-400 text-yellow-400' : 'text-ocean-slate hover:text-yellow-200'} transition-colors`}
                  />
                </button>
              ))}
            </div>

            {ratings[studyCase.id] && ratings[studyCase.id] <= 3 && !sent[studyCase.id] && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-xs text-ocean-slate mb-2 flex items-center gap-2">
                  <MessageSquare size={12} /> {t.scFeedbackPrompt}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t.scFeedbackPlaceholder}
                    className="flex-1 bg-ocean-deep border border-ocean-surface rounded px-3 py-2 text-sm text-white focus:border-ocean-cyan outline-none"
                    onChange={(e) => handleFeedbackChange(studyCase.id, e.target.value)}
                  />
                  <button onClick={() => submitFeedback(studyCase.id)} className="bg-ocean-cyan text-ocean-deep px-4 py-2 rounded font-bold hover:bg-white transition-colors">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

            {sent[studyCase.id] && (
              <div className="mt-4 text-green-400 text-sm flex items-center gap-2 animate-in fade-in">
                <CheckCircle size={16} /> {t.scThanks}
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="text-center mt-8 pt-8 border-t border-ocean-surface/30">
        <p className="text-ocean-slate text-sm font-mono opacity-70">
          {t.scLastUpdate} <span className="text-ocean-cyan">{t.scMonth}</span>.
          <br />
          {t.scLgpd}
        </p>
      </div>
    </div>
  );
};

export default StudyCasesSection;