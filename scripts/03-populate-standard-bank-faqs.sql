-- Populate Standard Bank Mozambique FAQs
INSERT INTO faqs (question_pt, question_en, answer_pt, answer_en, category, views) VALUES

-- ACCOUNTS
('Quais são os requisitos para abrir uma conta?', 'What are the requirements to open an account?', 
'Para abrir uma conta no Standard Bank Moçambique, você precisa de: DIRE ou Bilhete de Identidade válido, comprovante de residência (conta de luz, água ou telefone), comprovante de rendimentos (recibo de salário ou declaração), depósito inicial mínimo de 1.000 MT para conta poupança ou 2.500 MT para conta corrente.', 
'To open an account at Standard Bank Mozambique, you need: valid DIRE or Identity Card, proof of residence (electricity, water or phone bill), proof of income (salary receipt or declaration), minimum initial deposit of 1,000 MT for savings account or 2,500 MT for current account.', 
'accounts', 245),

('É possível abrir uma conta sem ter declaração de rendimentos?', 'Is it possible to open an account without income declaration?', 
'Não, a declaração de rendimentos é um requisito legal obrigatório que visa fundamentar a origem dos fundos que irão movimentar a conta. Isso é parte das regulamentações anti-lavagem de dinheiro do Banco de Moçambique.', 
'No, income declaration is a mandatory legal requirement that aims to substantiate the origin of funds that will move through the account. This is part of the Bank of Mozambique anti-money laundering regulations.', 
'accounts', 189),

('Como posso verificar o saldo da minha conta?', 'How can I check my account balance?', 
'Você pode verificar seu saldo através de: Standard Bank App (disponível 24/7), Internet Banking, caixas eletrônicos Standard Bank, SMS Banking (*144#), ou visitando qualquer agência durante o horário de funcionamento.', 
'You can check your balance through: Standard Bank App (available 24/7), Internet Banking, Standard Bank ATMs, SMS Banking (*144#), or by visiting any branch during business hours.', 
'accounts', 892),

-- CARDS
('Como reportar um cartão perdido ou roubado?', 'How do I report a lost or stolen card?', 
'Reporte imediatamente através de: Linha 24h: +258 21 481 200, Standard Bank App (função "Bloquear Cartão"), Internet Banking, ou visite qualquer agência. Bloqueamos seu cartão imediatamente e enviamos um substituto em 3-5 dias úteis.', 
'Report immediately through: 24h Hotline: +258 21 481 200, Standard Bank App ("Block Card" function), Internet Banking, or visit any branch. We block your card immediately and send a replacement within 3-5 business days.', 
'cards', 334),

('Como ativar meu novo cartão de débito/crédito?', 'How do I activate my new debit/credit card?', 
'Ative seu cartão através de: Standard Bank App (menu "Cartões" > "Ativar Cartão"), qualquer caixa eletrônico Standard Bank usando seu PIN, ligando para +258 21 481 200, ou visitando uma agência com documento de identidade.', 
'Activate your card through: Standard Bank App ("Cards" menu > "Activate Card"), any Standard Bank ATM using your PIN, calling +258 21 481 200, or visiting a branch with identification document.', 
'cards', 267),

('Quais são os limites de levantamento nos caixas eletrônicos?', 'What are the ATM withdrawal limits?', 
'Limites diários: Cartão de Débito - 50.000 MT, Cartão de Crédito - conforme limite aprovado. Limite por transação: 20.000 MT. Você pode ajustar estes limites através do Standard Bank App ou numa agência.', 
'Daily limits: Debit Card - 50,000 MT, Credit Card - according to approved limit. Per transaction limit: 20,000 MT. You can adjust these limits through the Standard Bank App or at a branch.', 
'cards', 445),

-- LOANS
('Quais documentos preciso para um empréstimo pessoal?', 'What documents do I need for a personal loan?', 
'Documentos necessários: DIRE ou BI válido, últimos 3 recibos de salário, declaração de rendimentos, extratos bancários dos últimos 6 meses, comprovante de residência, lista de bens (se aplicável). Para funcionários públicos: declaração de vencimentos da instituição empregadora.', 
'Required documents: valid DIRE or ID, last 3 salary receipts, income declaration, bank statements from last 6 months, proof of residence, asset list (if applicable). For civil servants: salary declaration from employing institution.', 
'loans', 523),

('Quanto tempo leva a aprovação do empréstimo?', 'How long does loan approval take?', 
'Prazos de aprovação: Empréstimo pessoal - 5-7 dias úteis, Crédito habitação - 30-45 dias, Crédito automóvel - 7-10 dias úteis. O prazo pode variar dependendo da completude da documentação e verificações necessárias.', 
'Approval timeframes: Personal loan - 5-7 business days, Home loan - 30-45 days, Auto loan - 7-10 business days. Timeframe may vary depending on documentation completeness and required verifications.', 
'loans', 398),

-- PAYMENTS
('Como configurar débito automático?', 'How do I set up automatic debit?', 
'Configure através do Standard Bank App: Menu "Pagamentos" > "Débito Automático" > "Novo Débito". Ou visite uma agência com: documento de identidade, dados da empresa/serviço, valor e data preferida de débito. Ativação em 2-3 dias úteis.', 
'Set up through Standard Bank App: "Payments" menu > "Automatic Debit" > "New Debit". Or visit a branch with: identification document, company/service details, amount and preferred debit date. Activation in 2-3 business days.', 
'payments', 276),

('Quais são as taxas de transferência bancária?', 'What are the bank transfer fees?', 
'Taxas de transferência: Entre contas Standard Bank - Gratuito, Para outros bancos nacionais - 150 MT, Transferências internacionais - 2.500 MT + taxas correspondentes. SWIFT - 3.500 MT. Consulte tabela completa de preços nas agências.', 
'Transfer fees: Between Standard Bank accounts - Free, To other national banks - 150 MT, International transfers - 2,500 MT + correspondent fees. SWIFT - 3,500 MT. Check complete price table at branches.', 
'payments', 612),

-- DIGITAL
('Como baixar e usar o Standard Bank App?', 'How to download and use the Standard Bank App?', 
'Baixe na Google Play Store ou App Store procurando "Standard Bank Mozambique". Após instalação, use seu número de conta e PIN para primeiro acesso. Funcionalidades: consulta de saldo, transferências, pagamentos, bloqueio de cartão, localização de agências.', 
'Download from Google Play Store or App Store by searching "Standard Bank Mozambique". After installation, use your account number and PIN for first access. Features: balance inquiry, transfers, payments, card blocking, branch location.', 
'digital', 789),

('Como usar o Internet Banking?', 'How to use Internet Banking?', 
'Acesse www.standardbank.co.mz e clique em "Internet Banking". Use número de conta e senha (fornecida na agência). Primeira vez: ative com código SMS. Disponível 24/7 para consultas, transferências, pagamentos e gestão de conta.', 
'Access www.standardbank.co.mz and click "Internet Banking". Use account number and password (provided at branch). First time: activate with SMS code. Available 24/7 for inquiries, transfers, payments and account management.', 
'digital', 445),

-- INVESTMENT
('Que produtos de investimento estão disponíveis?', 'What investment products are available?', 
'Produtos disponíveis: Depósitos a Prazo (6-24 meses, taxa fixa), Bilhetes do Tesouro (91-364 dias), Obrigações do Tesouro (2-15 anos), Fundos de Investimento. Valor mínimo: 50.000 MT para depósitos a prazo. Consulte um gestor de relacionamento para mais detalhes.', 
'Available products: Fixed Deposits (6-24 months, fixed rate), Treasury Bills (91-364 days), Treasury Bonds (2-15 years), Investment Funds. Minimum amount: 50,000 MT for fixed deposits. Consult a relationship manager for more details.', 
'investment', 234),

-- GENERAL
('Quais são os horários de funcionamento das agências?', 'What are the branch operating hours?', 
'Horários padrão: Segunda a Sexta: 08:00-15:30, Sábado: 08:00-12:00 (agências selecionadas). Algumas agências em centros comerciais têm horários estendidos. Consulte horários específicos no Standard Bank App ou website.', 
'Standard hours: Monday to Friday: 08:00-15:30, Saturday: 08:00-12:00 (selected branches). Some branches in shopping centers have extended hours. Check specific hours on Standard Bank App or website.', 
'general', 567),

('Como posso contactar o atendimento ao cliente?', 'How can I contact customer service?', 
'Contactos: Linha de Atendimento: +258 21 481 200 (24h), Email: info@standardbank.co.mz, WhatsApp: +258 84 300 0000, Chat no website/app, ou visite qualquer agência. Para emergências com cartões: +258 84 300 0001 (24h).', 
'Contacts: Customer Line: +258 21 481 200 (24h), Email: info@standardbank.co.mz, WhatsApp: +258 84 300 0000, Chat on website/app, or visit any branch. For card emergencies: +258 84 300 0001 (24h).', 
'general', 823);
