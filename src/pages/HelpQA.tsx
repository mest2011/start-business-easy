import React, { useState } from 'react';

interface QAItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: QAItem[] = [
  {
    id: 1,
    question: 'Qual é o montante ideal para separar para reinvestimento no meu negócio todo mês?',
    answer: 'Especialistas e planilhas de Business Model sugerem reservar pelo menos de 20% a 30% da Receita Líquida (Lucro) para fundos de Custeio e Reinvestimentos em Marketing de Expansão. Separar a Pessoa Jurídica da Física impede rupturas.'
  },
  {
    id: 2,
    question: 'Como devo interpretar os KPIs de Custo de Aquisição (CAC)?',
    answer: 'Se o CAC for superior ao Ticket Médio (ou LTV do cliente ao longo do tempo), você está pagando mais para atrair o usuário do que ele lhe traz de volta. Nesse caso o Marketing precisa ser revisado. Operações saudáveis exibem LTV equivalente a pelo menos 3 vezes o CAC.'
  },
  {
    id: 3,
    question: 'Se as postagens no Módulo Social já são o bastante para tração de Vendas?',
    answer: 'Orgânico é bom para branding e estabilidade a longo prazo. No entanto, negócios em fase de Setup ou "Growth" agressivo precisam usar o tracionamento Pago (Módulo Marketing - Ads) para acelerar a entrada de Leads no funil em um volume suficiente para gerar Cauda-Curta.'
  },
  {
    id: 4,
    question: 'Tráfego Direto representa qual porção do meu SEO?',
    answer: 'Tráfego direto comumente reflete o seu "Brand Awareness". São usuários que já gravaram sua URL ou que clicaram a partir de e-mails diretos ou links não rastreáveis do WhatsApp, ignorando completamente o buscador. Crescimento neste eixo reflete enorme fidelização.'
  }
];

const HelpQA: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <i className="fa-solid fa-question text-3xl"></i>
          </div>
          <h1 className="text-3xl lg:text-4xl text-neutral-900 font-bold mb-4">Central de Ajuda & Estratégia</h1>
          <p className="text-neutral-600 max-w-xl mx-auto">
            Consulte respostas para as dúvidas mais complexas sobre gerenciamento de negócios, métricas, SEO e inteligência comercial para solidificar sua tomada de ação no Dashboard.
          </p>
        </div>

        <div className="w-full space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className={`border-2 rounded-2xl transition-all duration-300 overflow-hidden ${
                isOpen ? 'border-neutral-900 bg-white shadow-md' : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-300'
              }`}>
                <button 
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg lg:text-xl pr-4 ${isOpen ? 'text-neutral-900' : 'text-neutral-700'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? 'bg-neutral-900 text-white rotate-180' : 'bg-neutral-200 text-neutral-600'}`}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-neutral-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between w-full shadow-lg">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Ainda com Dúvidas Estratégicas?</h3>
            <p className="text-neutral-400 text-sm">Contate nossa equipe de Suporte Especializado para mentoria direta.</p>
          </div>
          <a href="/dashboard/suporte" className="px-6 py-3 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition-colors whitespace-nowrap">
            Acessar Suporte Ao Vivo
          </a>
        </div>

      </div>
    </div>
  );
};

export default HelpQA;
