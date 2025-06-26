export type Language = "pt" | "en"

export interface Translations {
  // Navigation
  nav: {
    home: string
    chat: string
    faq: string
    support: string
  }

  // Landing Page
  landing: {
    title: string
    subtitle: string
    startChat: {
      title: string
      description: string
    }
    browseFaq: {
      title: string
      description: string
    }
    contactSupport: {
      title: string
      description: string
    }
    getStarted: string
    stats: {
      support247: string
      avgResponse: string
      satisfaction: string
      faqTopics: string
    }
  }

  // Chat
  chat: {
    title: string
    subtitle: string
    placeholder: string
    typing: string
  }

  // FAQ
  faq: {
    title: string
    subtitle: string
    searchPlaceholder: string
    categories: {
      accounts: string
      cards: string
      loans: string
      payments: string
      digital: string
      investment: string
      general: string
    }
    noResults: string
    clearFilters: string
    wasHelpful: string
    cantFind: {
      title: string
      description: string
      startChat: string
      submitRequest: string
    }
  }

  // Support
  support: {
    title: string
    subtitle: string
    form: {
      fullName: string
      email: string
      category: string
      message: string
      submit: string
      submitting: string
      selectCategory: string
      categories: {
        account: string
        card: string
        login: string
        other: string
      }
      fullNamePlaceholder: string
      emailPlaceholder: string
      messagePlaceholder: string
      validation: {
        nameRequired: string
        emailRequired: string
        emailInvalid: string
        categoryRequired: string
        messageRequired: string
        messageMinLength: string
      }
      success: string
    }
    contact: {
      title: string
      phone: {
        title: string
        availability: string
      }
      email: {
        title: string
        availability: string
      }
      chat: {
        title: string
        availability: string
      }
    }
    businessHours: {
      title: string
      weekdays: string
      saturday: string
      sunday: string
    }
    sendMessage: string
  }

  // Common
  common: {
    loading: string
    error: string
    retry: string
    close: string
    open: string
    characters: string
  }
}

export const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      home: "Início",
      chat: "Chat",
      faq: "FAQ",
      support: "Suporte",
    },
    landing: {
      title: "Bem-vindo ao Centro de Ajuda do Standard Bank Moçambique",
      subtitle:
        "Estamos aqui para ajudá-lo com todas as suas necessidades bancárias em Moçambique. Escolha como gostaria de obter suporte hoje.",
      startChat: {
        title: "Iniciar Chat",
        description: "Obtenha ajuda instantânea do nosso assistente de chat com IA",
      },
      browseFaq: {
        title: "Navegar FAQ",
        description: "Encontre respostas para perguntas frequentes sobre serviços bancários",
      },
      contactSupport: {
        title: "Contatar Suporte",
        description: "Envie uma solicitação de suporte para ajuda personalizada",
      },
      getStarted: "Começar",
      stats: {
        support247: "Suporte Disponível",
        avgResponse: "Resposta Média",
        satisfaction: "Satisfação do Cliente",
        faqTopics: "Tópicos FAQ",
      },
    },
    chat: {
      title: "Chat de Suporte Standard Bank",
      subtitle: "Normalmente respondemos instantaneamente",
      placeholder: "Digite sua mensagem...",
      typing: "IA está digitando...",
    },
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Encontre respostas rápidas para questões bancárias comuns em Moçambique",
      searchPlaceholder: "Pesquisar FAQ...",
      categories: {
        accounts: "Contas",
        cards: "Cartões",
        loans: "Empréstimos",
        payments: "Pagamentos",
        digital: "Digital",
        investment: "Investimentos",
        general: "Geral",
      },
      noResults: "Nenhuma FAQ encontrada com seus critérios de pesquisa.",
      clearFilters: "Limpar pesquisa e filtros",
      wasHelpful: "Isso foi útil?",
      cantFind: {
        title: "Não consegue encontrar o que procura?",
        description:
          "Nossa equipe de suporte em Moçambique está aqui para ajudar com qualquer pergunta não coberta em nossas FAQs.",
        startChat: "Iniciar Chat ao Vivo",
        submitRequest: "Enviar Solicitação de Suporte",
      },
    },
    support: {
      title: "Contatar Atendimento ao Cliente",
      subtitle: "Estamos aqui para ajudar. Envie-nos uma mensagem e responderemos o mais rápido possível.",
      form: {
        fullName: "Nome Completo",
        email: "Endereço de Email",
        category: "Categoria do Problema",
        message: "Mensagem",
        submit: "Enviar Solicitação de Suporte",
        submitting: "Enviando...",
        selectCategory: "Selecione uma categoria de problema",
        categories: {
          account: "Problemas de Conta",
          card: "Problemas de Cartão",
          login: "Problemas de Login",
          other: "Outro",
        },
        fullNamePlaceholder: "Digite seu nome completo",
        emailPlaceholder: "Digite seu endereço de email",
        messagePlaceholder: "Por favor, descreva seu problema em detalhes...",
        validation: {
          nameRequired: "Nome completo é obrigatório",
          emailRequired: "Email é obrigatório",
          emailInvalid: "Por favor, digite um endereço de email válido",
          categoryRequired: "Por favor, selecione uma categoria",
          messageRequired: "Mensagem é obrigatória",
          messageMinLength: "Mensagem deve ter pelo menos 10 caracteres",
        },
        success: "Obrigado pela sua mensagem! Entraremos em contato em até 24 horas.",
      },
      contact: {
        title: "Outras Formas de nos Contatar",
        phone: {
          title: "Suporte por Telefone",
          availability: "Disponível 24/7",
        },
        email: {
          title: "Suporte por Email",
          availability: "Resposta em até 24 horas",
        },
        chat: {
          title: "Chat ao Vivo",
          availability: "Disponível 24/7",
        },
      },
      businessHours: {
        title: "Horário de Funcionamento das Agências",
        weekdays: "Segunda - Sexta:",
        saturday: "Sábado:",
        sunday: "Domingo:",
      },
      sendMessage: "Envie-nos uma Mensagem",
    },
    common: {
      loading: "Carregando...",
      error: "Erro",
      retry: "Tentar Novamente",
      close: "Fechar",
      open: "Abrir",
      characters: "caracteres",
    },
  },
  en: {
    nav: {
      home: "Home",
      chat: "Chat",
      faq: "FAQ",
      support: "Support",
    },
    landing: {
      title: "Welcome to Standard Bank Mozambique Help Center",
      subtitle:
        "We're here to help you with all your banking needs in Mozambique. Choose how you'd like to get support today.",
      startChat: {
        title: "Start Chat",
        description: "Get instant help from our AI-powered chat assistant",
      },
      browseFaq: {
        title: "Browse FAQs",
        description: "Find answers to commonly asked banking questions",
      },
      contactSupport: {
        title: "Contact Support",
        description: "Submit a support request for personalized help",
      },
      getStarted: "Get Started",
      stats: {
        support247: "Support Available",
        avgResponse: "Average Response",
        satisfaction: "Customer Satisfaction",
        faqTopics: "FAQ Topics",
      },
    },
    chat: {
      title: "Standard Bank Support Chat",
      subtitle: "We typically reply instantly",
      placeholder: "Type your message...",
      typing: "AI is typing...",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find quick answers to common banking questions in Mozambique",
      searchPlaceholder: "Search FAQs...",
      categories: {
        accounts: "Accounts",
        cards: "Cards",
        loans: "Loans",
        payments: "Payments",
        digital: "Digital",
        investment: "Investments",
        general: "General",
      },
      noResults: "No FAQs found matching your search criteria.",
      clearFilters: "Clear search and filters",
      wasHelpful: "Was this helpful?",
      cantFind: {
        title: "Can't find what you're looking for?",
        description: "Our support team in Mozambique is here to help with any questions not covered in our FAQs.",
        startChat: "Start Live Chat",
        submitRequest: "Submit Support Request",
      },
    },
    support: {
      title: "Contact Customer Support",
      subtitle: "We're here to help. Send us a message and we'll respond as soon as possible.",
      form: {
        fullName: "Full Name",
        email: "Email Address",
        category: "Issue Category",
        message: "Message",
        submit: "Submit Support Request",
        submitting: "Submitting...",
        selectCategory: "Select an issue category",
        categories: {
          account: "Account Issues",
          card: "Card Issues",
          login: "Login Problems",
          other: "Other",
        },
        fullNamePlaceholder: "Enter your full name",
        emailPlaceholder: "Enter your email address",
        messagePlaceholder: "Please describe your issue in detail...",
        validation: {
          nameRequired: "Full name is required",
          emailRequired: "Email is required",
          emailInvalid: "Please enter a valid email address",
          categoryRequired: "Please select a category",
          messageRequired: "Message is required",
          messageMinLength: "Message must be at least 10 characters long",
        },
        success: "Thank you for your message! We'll get back to you within 24 hours.",
      },
      contact: {
        title: "Other Ways to Reach Us",
        phone: {
          title: "Phone Support",
          availability: "24/7 Available",
        },
        email: {
          title: "Email Support",
          availability: "Response within 24 hours",
        },
        chat: {
          title: "Live Chat",
          availability: "Available 24/7",
        },
      },
      businessHours: {
        title: "Branch Business Hours",
        weekdays: "Monday - Friday:",
        saturday: "Saturday:",
        sunday: "Sunday:",
      },
      sendMessage: "Send us a Message",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      retry: "Retry",
      close: "Close",
      open: "Open",
      characters: "characters",
    },
  },
}
