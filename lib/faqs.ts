export interface FAQ {
  id: string
  question: {
    pt: string
    en: string
  }
  answer: {
    pt: string
    en: string
  }
  category: "accounts" | "cards" | "loans" | "payments"
}

export const faqs: FAQ[] = [
  // Accounts
  {
    id: "1",
    question: {
      pt: "Como posso verificar o saldo da minha conta?",
      en: "How do I check my account balance?",
    },
    answer: {
      pt: "Você pode verificar o saldo da sua conta fazendo login na sua conta bancária online, usando nosso aplicativo móvel, visitando qualquer um dos nossos caixas eletrônicos ou ligando para nossa linha de atendimento ao cliente em +258 21 123 4567.",
      en: "You can check your account balance by logging into your online banking account, using our mobile app, visiting any of our ATMs, or calling our customer service line at +258 21 123 4567.",
    },
    category: "accounts",
  },
  {
    id: "2",
    question: {
      pt: "Como abrir uma nova conta poupança?",
      en: "How do I open a new savings account?",
    },
    answer: {
      pt: "Para abrir uma nova conta poupança, você pode visitar qualquer uma de nossas agências com um documento válido e depósito inicial, ou iniciar o processo online através do nosso site. O depósito mínimo de abertura é 1.000 MT.",
      en: "To open a new savings account, you can visit any of our branches with a valid ID and initial deposit, or start the process online through our website. The minimum opening deposit is 1,000 MT.",
    },
    category: "accounts",
  },
  {
    id: "3",
    question: {
      pt: "Quais são as taxas de manutenção mensal?",
      en: "What are the monthly maintenance fees?",
    },
    answer: {
      pt: "As taxas de manutenção mensal variam por tipo de conta. Contas correntes têm uma taxa mensal de 150 MT (isenta com saldo mínimo de 10.000 MT), enquanto contas poupança têm uma taxa mensal de 75 MT (isenta com saldo mínimo de 5.000 MT).",
      en: "Monthly maintenance fees vary by account type. Checking accounts have a 150 MT monthly fee (waived with 10,000 MT minimum balance), while savings accounts have a 75 MT monthly fee (waived with 5,000 MT minimum balance).",
    },
    category: "accounts",
  },

  // Cards
  {
    id: "4",
    question: {
      pt: "Como reportar um cartão perdido ou roubado?",
      en: "How do I report a lost or stolen card?",
    },
    answer: {
      pt: "Reporte um cartão perdido ou roubado imediatamente ligando para nossa linha 24/7 em +258 84 567 8900, usando nosso aplicativo móvel ou fazendo login no internet banking. Bloquearemos seu cartão e enviaremos um substituto em 3-5 dias úteis.",
      en: "Report a lost or stolen card immediately by calling our 24/7 hotline at +258 84 567 8900, using our mobile app, or logging into online banking. We'll freeze your card and send a replacement within 3-5 business days.",
    },
    category: "cards",
  },
  {
    id: "5",
    question: {
      pt: "Como ativar meu novo cartão de crédito?",
      en: "How do I activate my new credit card?",
    },
    answer: {
      pt: "Ative seu novo cartão de crédito ligando para o número no adesivo de ativação, usando nosso aplicativo móvel ou fazendo login no internet banking. Você também pode visitar qualquer agência para assistência.",
      en: "Activate your new credit card by calling the number on the activation sticker, using our mobile app, or logging into online banking. You can also visit any branch location for assistance.",
    },
    category: "cards",
  },
  {
    id: "6",
    question: {
      pt: "O que devo fazer se vir cobranças não autorizadas?",
      en: "What should I do if I see unauthorized charges?",
    },
    answer: {
      pt: "Se notar cobranças não autorizadas, entre em contato conosco imediatamente em +258 82 345 6789. Investigaremos as cobranças, creditaremos temporariamente sua conta e emitiremos um novo cartão se necessário. Reporte fraude em até 60 dias para proteção total.",
      en: "If you notice unauthorized charges, contact us immediately at +258 82 345 6789. We'll investigate the charges, temporarily credit your account, and issue a new card if necessary. Report fraud within 60 days for full protection.",
    },
    category: "cards",
  },

  // Loans
  {
    id: "7",
    question: {
      pt: "Quais documentos preciso para um empréstimo pessoal?",
      en: "What documents do I need for a personal loan?",
    },
    answer: {
      pt: "Para uma solicitação de empréstimo pessoal, você precisará de: DIRE ou Bilhete de Identidade válido, comprovante de renda (recibos de salário ou declaração de rendimentos), extratos bancários, comprovante de emprego e informações sobre dívidas existentes.",
      en: "For a personal loan application, you'll need: valid DIRE or Identity Card, proof of income (salary receipts or income declaration), bank statements, employment verification, and information about existing debts.",
    },
    category: "loans",
  },
  {
    id: "8",
    question: {
      pt: "Quanto tempo leva a aprovação do empréstimo?",
      en: "How long does loan approval take?",
    },
    answer: {
      pt: "A aprovação de empréstimo pessoal normalmente leva 3-5 dias úteis após recebermos todos os documentos necessários. Empréstimos para veículos podem ser aprovados em 1-2 dias, enquanto financiamentos imobiliários podem levar 45-60 dias.",
      en: "Personal loan approval typically takes 3-5 business days after we receive all required documents. Auto loans can be approved in 1-2 days, while mortgage applications may take 45-60 days.",
    },
    category: "loans",
  },

  // Payments
  {
    id: "9",
    question: {
      pt: "Como configurar débito automático?",
      en: "How do I set up automatic bill pay?",
    },
    answer: {
      pt: 'Configure o débito automático através do internet banking ou nosso aplicativo móvel. Vá para a seção "Débito Automático", adicione seu beneficiário, insira os detalhes do pagamento e escolha sua programação de pagamento. Você pode modificar ou cancelar a qualquer momento.',
      en: 'Set up automatic bill pay through online banking or our mobile app. Go to "Bill Pay" section, add your payee, enter payment details, and choose your payment schedule. You can modify or cancel anytime.',
    },
    category: "payments",
  },
  {
    id: "10",
    question: {
      pt: "Quais são as taxas de transferência bancária?",
      en: "What are the wire transfer fees?",
    },
    answer: {
      pt: "Transferências bancárias domésticas custam 200 MT para envio e 100 MT para recebimento. Transferências bancárias internacionais custam 1.500 MT para envio e 500 MT para recebimento. Processamento no mesmo dia está disponível por 300 MT adicionais.",
      en: "Domestic wire transfers cost 200 MT for outgoing and 100 MT for incoming. International wire transfers cost 1,500 MT for outgoing and 500 MT for incoming. Same-day processing is available for an additional 300 MT.",
    },
    category: "payments",
  },
]

export const faqCategories = [
  { id: "accounts", count: faqs.filter((f) => f.category === "accounts").length },
  { id: "cards", count: faqs.filter((f) => f.category === "cards").length },
  { id: "loans", count: faqs.filter((f) => f.category === "loans").length },
  { id: "payments", count: faqs.filter((f) => f.category === "payments").length },
]
