const { GoogleSpreadsheet } = require('google-spreadsheet');

const SHEET_ID     = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY  = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

async function feedbackHandler(req, res) {
  const { rating, feedback, caseTitle } = req.body;

  console.log('📩 [FEEDBACK] Requisição recebida:', { rating, feedback, caseTitle });

  if (!rating) {
    console.log('⚠️ [FEEDBACK] Rating ausente, rejeitando...');
    return res.status(400).json({ error: 'Rating obrigatório' });
  }

  try {
    console.log('🔐 [FEEDBACK] Iniciando auth com Google...');
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    console.log('✅ [FEEDBACK] Auth OK');

    console.log('📄 [FEEDBACK] Carregando planilha...');
    await doc.loadInfo();
    console.log('✅ [FEEDBACK] Planilha:', doc.title);

    const sheet = doc.sheetsByIndex[0];
    console.log('📋 [FEEDBACK] Aba:', sheet.title);

    const row = [
      new Date().toLocaleString('pt-BR', { timeZone: 'America/Bahia' }),
      caseTitle || 'Desconhecido',
      rating    || '',
      feedback  || 'Sem feedback textual',
    ];
    console.log('➕ [FEEDBACK] Inserindo linha:', row);

    await sheet.addRow(row);
    console.log('✅ [FEEDBACK] Linha salva com sucesso!');

    return res.status(200).json({ message: 'Feedback salvo!' });

  } catch (error) {
    console.error('❌ [FEEDBACK] ERRO:', error.message);
    console.error('❌ [FEEDBACK] STACK:', error.stack);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = feedbackHandler;