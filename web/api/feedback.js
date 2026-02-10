import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { rating, feedback, caseTitle } = req.body;

  // CREDENCIAIS (Idealmente, coloque isso em variáveis de ambiente .env)
  const serviceAccountAuth = new JWT({
    email: "treinook@my-project-1-443713.iam.gserviceaccount.com",
    key: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAxN0SV+X6+NmQ\ncuKZDWHJNinIzknLxpleW9rzyCCXqL4MCf0TfEC87xvAtdp4LBXGjxDQRRiv/+fE\nX9uOAZGo08cAnFk/Zjx7YGoZ7Bhxubr3qcn/NiYeTyQ9odZX9M46o1KFpVGqGzyz\nqrRLe7drvojNVzR3tOOAVGmDfPJuqoQIbbtY53Oznct7Hnq1bsa2BeriIDhckL3Z\nwB39jSrXHWGH17/CLHvsYkt2B5Da6sx1KcyiYrysB05jH1WFR1cSG0QL5x9qNu4g\nKvhw/M65jfxaEtHNcm3dQ1XCiwsB0/ynOx5HvH3SabYq/A/Ll0DW5GtUAW9eYYCr\nDo4DEYmfAgMBAAECggEAF7fBGZIuDkCTCEZSYhF28BpVbssO4l8nnKgBmxALDo3p\nADM0a7LUhkqHKCFX5YRLE5ijsXRm8rSyUAOZUHIZ+WNBL26NPpM2Ktn0hAb8BPYc\nrn86BsgjTYRgSaMBa+YHf8h7jU0HbL4YLGT69PSeX0fcriMmJfpgKXh5WP/FFl92\n0In+hAEE/SZpGx3PzdFwKuRWB3NmH8U2wBs5pQ2sX/sc3tp7jf1w3WdWLuazcSxu\nYTxgaOi04oYVlxMhyNsl3wO/bdPqnB0Yhsk/wlG3qPSA+7XI/8mDeFnu7UXNBKHS\ngh7F0vxPhtOvDppnkwREZcuOsRFM9aNd4nAp/SleEQKBgQDo1JNaqbG2S+tEk9U/\n/gt6BIl/QYKVUqxdH+wp3+IvqW0INR3wbkhkiqzuJeotvqBBrzxmFVmcX2w6kVc9\n6iUD+Zdi9FqZJlrf2+3FBjFwk/Dn8W8E9ZTr1+/t2kuY7ph8EWbzcxwjT8qs8t9Y\ncZYIUSSR1y7KL6vdJsnxwxXyLwKBgQDT87ZXioIUAhth6or3U7012yOn0AB/bYnQ\n5bRXKSqcQ09ErBHBN3Hl/Jm9sTxQjstbn0AJN/aTdTJSPzGstfqqBEGTSoZ2a/+X\n2asMKJm/DV5pP5znej1xMtsCNjrE+KYHOvkTfNKwiv77bnM5UIRj75UyUITMXIcE\nHbx+PNwzkQKBgG1E3obtHucECD0d+DXZHz+7g2ACuaskqpnl0mrwlHFz3SS98PgW\neckdv/zgNGAVl5ZcDEeIe47ExcFS1pPLIGYWK/MX5LD9bCalS5hsyKUh+SyRhV3Z\nd3Ob2xFQoqv6RfvsGtnkSu9TkjXKogEbBaOPmU8MovvmlYzrmFjrCpCnAoGARxXJ\n5fpSPhumy2Q6T1EKeHGSt8mPIS2/twwTO9hWrin0//clzUOnM5dQiMpUjEAX/Bah\nB3Z5gGMiCWugYWh3NWZQB/JKvpTiGC+sqltDlUwKigoHuarJyJlh0pAVjdJG/M3O\nk7adgxBbDECy7FoQzOOhikpu/4tYzQycF0qaH8ECgYEA1fiekhvGPi5gDiBlfV2g\nLYYV5h1B+I4G72UleTq3qSqxLoSJqBBRdNGnrUKkIKJDkKwlMuttUHiUYNILkbEz\n8PohmMlPwYaoT8Ogiv63eYSJeKZd7V3zaw+OrfZZI+2VxToCmKluZtQgxYWZk4UG\nKnUZ45sMbRcASipqf8gyCN8=\n-----END PRIVATE KEY-----`,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  try {
    const doc = new GoogleSpreadsheet('1tO-2qOgC6frN51SdJx6WQ-FlO1CJvwR5VfG0cI3AguQ', serviceAccountAuth);

    // Carrega as informações da planilha
    await doc.loadInfo(); 
    
    // Pega a primeira aba (Sheet1)
    const sheet = doc.sheetsByIndex[0];

    // Adiciona a linha (Colunas: Respostas, Avaliações)
    // Adicionei Data e Título do Case para você saber de onde veio
    await sheet.addRow({
      'Avaliações': rating,
      'Respostas': feedback || 'Sem feedback textual',
      // Se quiser adicionar Data e Projeto na planilha, crie as colunas lá e descomente abaixo:
      // 'Data': new Date().toLocaleString('pt-BR'),
      // 'Projeto': caseTitle
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Erro no Google Sheets:', error);
    return res.status(500).json({ error: 'Erro ao salvar feedback' });
  }
}