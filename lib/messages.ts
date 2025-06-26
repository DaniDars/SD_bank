export interface Message {
  id: string
  content: {
    pt: string
    en: string
  }
  sender: "user" | "bot"
  timestamp: Date
}

export const mockMessages: Message[] = [
  {
    id: "1",
    content: {
      pt: "Olá! Bem-vindo ao Centro de Ajuda do SecureBank Moçambique. Como posso ajudá-lo hoje?",
      en: "Hello! Welcome to SecureBank Mozambique Help Center. How can I assist you today?",
    },
    sender: "bot",
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
  },
  {
    id: "2",
    content: {
      pt: "Oi, preciso de ajuda com o saldo da minha conta",
      en: "Hi, I need help with my account balance",
    },
    sender: "user",
    timestamp: new Date(Date.now() - 240000), // 4 minutes ago
  },
  {
    id: "3",
    content: {
      pt: "Ficarei feliz em ajudá-lo com o saldo da sua conta. Você pode verificar seu saldo de várias maneiras:\n\n1. Internet banking ou aplicativo móvel\n2. Qualquer um dos nossos caixas eletrônicos em Maputo, Beira e Nampula\n3. Ligue para nosso atendimento ao cliente em +258 21 123 4567\n\nGostaria que eu o orientasse através de alguma dessas opções?",
      en: "I'd be happy to help you with your account balance. You can check your balance in several ways:\n\n1. Online banking or mobile app\n2. Any of our ATMs in Maputo, Beira and Nampula\n3. Call our customer service at +258 21 123 4567\n\nWould you like me to guide you through any of these options?",
    },
    sender: "bot",
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
  },
  {
    id: "4",
    content: {
      pt: "Sim, pode me ajudar com o aplicativo móvel?",
      en: "Yes, can you help me with the mobile app?",
    },
    sender: "user",
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
  },
  {
    id: "5",
    content: {
      pt: "Aqui está como verificar seu saldo em nosso aplicativo móvel:\n\n1. Abra o aplicativo SecureBank Moçambique\n2. Faça login com suas credenciais\n3. Seu saldo da conta será exibido no painel principal em Meticais (MT)\n4. Toque em qualquer conta para ver o histórico detalhado de transações\n\nSe você ainda não baixou o aplicativo, pode encontrá-lo na Google Play Store. Há mais alguma coisa em que posso ajudá-lo?",
      en: "Here's how to check your balance on our mobile app:\n\n1. Open the SecureBank Mozambique app\n2. Log in with your credentials\n3. Your account balance will be displayed on the main dashboard in Meticais (MT)\n4. Tap on any account to see detailed transaction history\n\nIf you haven't downloaded the app yet, you can find it in the Google Play Store. Is there anything else I can help you with?",
    },
    sender: "bot",
    timestamp: new Date(Date.now() - 60000), // 1 minute ago
  },
]
