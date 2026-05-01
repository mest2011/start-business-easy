import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-2 border-neutral-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="text-neutral-900 text-lg pr-4">{question}</span>
        <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-neutral-400`}></i>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-neutral-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      
      {/* Header */}
      <header id="header" className="w-full border-b border-neutral-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center">
                <i className="fa-solid fa-rocket text-white text-xl"></i>
              </div>
              <span className="text-xl lg:text-2xl text-neutral-900 font-medium">EmpresaFácil</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#beneficios" className="text-neutral-600 hover:text-neutral-900 transition-colors">Benefícios</a>
              <a href="#como-funciona" className="text-neutral-600 hover:text-neutral-900 transition-colors">Como Funciona</a>
              <a href="#tipos-empresa" className="text-neutral-600 hover:text-neutral-900 transition-colors">Tipos de Empresa</a>
              <a href="#faq" className="text-neutral-600 hover:text-neutral-900 transition-colors">FAQ</a>
            </nav>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/onboarding')}
                className="hidden sm:block px-4 py-2 text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                Entrar
              </button>
              <button 
                onClick={() => navigate('/onboarding')}
                className="px-4 lg:px-6 py-2 lg:py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
              >
                Começar Agora
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="onboarding-screen" className="w-full min-h-screen bg-white">
        {/* Hero Section with Value Proposition */}
        <section id="hero-section" className="w-full flex items-center justify-center px-4 py-16 lg:py-20 border-b border-neutral-200">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full mb-6">
                    <i className="fa-solid fa-sparkles text-neutral-700"></i>
                    <span className="text-sm text-neutral-700">Copiloto IA para seu negócio</span>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl text-neutral-900 mb-6 leading-tight">
                  Simplifique seu negócio em uma plataforma
                </h1>
                
                <p className="text-lg lg:text-xl text-neutral-600 mb-8 leading-relaxed">
                  Gerencie mídias sociais, vendas, finanças e presença digital. Tudo em um só lugar, feito para MEIs e freelancers.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => navigate('/onboarding')}
                    className="px-8 py-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
                    Começar Agora
                  </button>
                  <button className="px-8 py-4 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors">
                    Pular Configuração
                  </button>
                </div>
                
                <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-neutral-900"></i>
                    <span>100% Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-neutral-900"></i>
                    <span>Suporte Especializado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-neutral-900"></i>
                    <span>Sem Burocracia</span>
                  </div>
                </div>

              </div>
              
              <div className="w-full lg:w-1/2">
                <div className="bg-neutral-200 rounded-2xl p-8 lg:p-12 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <i className="fa-solid fa-rocket text-8xl text-neutral-400 mb-4"></i>
                    <p className="text-neutral-500 text-lg">Plataforma Unificada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section id="beneficios" className="w-full py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4">
                Por Que Escolher a EmpresaFácil?
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Tudo o que você precisa para abrir e gerenciar sua empresa em um só lugar
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <div className="border-2 border-neutral-200 p-8 hover:border-neutral-900 transition-all rounded-xl">
                <div className="w-14 h-14 bg-neutral-900 rounded-lg flex items-center justify-center mb-6">
                  <i className="fa-solid fa-bolt text-white text-2xl"></i>
                </div>
                <h3 className="text-xl text-neutral-900 mb-3">Abertura Rápida</h3>
                <p className="text-neutral-600">
                  Processo 100% digital. Sua empresa pronta em até 48 horas úteis.
                </p>
              </div>
              
              <div className="border-2 border-neutral-200 p-8 hover:border-neutral-900 transition-all rounded-xl">
                <div className="w-14 h-14 bg-neutral-900 rounded-lg flex items-center justify-center mb-6">
                  <i className="fa-solid fa-shield-halved text-white text-2xl"></i>
                </div>
                <h3 className="text-xl text-neutral-900 mb-3">Segurança Total</h3>
                <p className="text-neutral-600">
                  Documentação validada por especialistas e criptografia de ponta.
                </p>
              </div>
              
              <div className="border-2 border-neutral-200 p-8 hover:border-neutral-900 transition-all rounded-xl">
                <div className="w-14 h-14 bg-neutral-900 rounded-lg flex items-center justify-center mb-6">
                  <i className="fa-solid fa-chart-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl text-neutral-900 mb-3">Gestão Completa</h3>
                <p className="text-neutral-600">
                  Dashboard intuitivo para acompanhar todas as métricas da sua empresa.
                </p>
              </div>
              
              <div className="border-2 border-neutral-200 p-8 hover:border-neutral-900 transition-all rounded-xl">
                <div className="w-14 h-14 bg-neutral-900 rounded-lg flex items-center justify-center mb-6">
                  <i className="fa-solid fa-headset text-white text-2xl"></i>
                </div>
                <h3 className="text-xl text-neutral-900 mb-3">Suporte Dedicado</h3>
                <p className="text-neutral-600">
                  Equipe especializada pronta para tirar todas as suas dúvidas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="como-funciona" className="w-full py-20 lg:py-28 bg-neutral-50 border-y border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4">
                Como Funciona
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Processo simples e guiado para abrir sua empresa
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              <div className="relative">
                <div className="bg-white border-2 border-neutral-200 p-8 rounded-xl z-10 relative">
                  <div className="w-12 h-12 bg-neutral-900 rounded-full text-white flex items-center justify-center text-xl mb-6">
                    1
                  </div>
                  <h3 className="text-xl text-neutral-900 mb-3">Escolha o Tipo</h3>
                  <p className="text-neutral-600">
                    Selecione entre MEI, ME, SLU ou LTDA conforme suas necessidades.
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-neutral-300 transform -translate-y-1/2 z-0"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white border-2 border-neutral-200 p-8 rounded-xl z-10 relative">
                  <div className="w-12 h-12 bg-neutral-900 rounded-full text-white flex items-center justify-center text-xl mb-6">
                    2
                  </div>
                  <h3 className="text-xl text-neutral-900 mb-3">Preencha os Dados</h3>
                  <p className="text-neutral-600">
                    Informe os dados básicos da empresa e dos sócios de forma simples.
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-neutral-300 transform -translate-y-1/2 z-0"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white border-2 border-neutral-200 p-8 rounded-xl z-10 relative">
                  <div className="w-12 h-12 bg-neutral-900 rounded-full text-white flex items-center justify-center text-xl mb-6">
                    3
                  </div>
                  <h3 className="text-xl text-neutral-900 mb-3">Envie Documentos</h3>
                  <p className="text-neutral-600">
                    Upload seguro de RG, CPF, comprovante de residência e outros documentos.
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-neutral-300 transform -translate-y-1/2 z-0"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white border-2 border-neutral-200 p-8 rounded-xl z-10 relative">
                  <div className="w-12 h-12 bg-neutral-900 rounded-full text-white flex items-center justify-center text-xl mb-6">
                    4
                  </div>
                  <h3 className="text-xl text-neutral-900 mb-3">Empresa Pronta</h3>
                  <p className="text-neutral-600">
                    Receba seu CNPJ e comece a empreender com toda a documentação em mãos.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <button 
                onClick={() => navigate('/onboarding')}
                className="px-8 py-4 bg-neutral-900 text-white rounded-lg text-lg hover:bg-neutral-800 transition-colors"
              >
                Iniciar Processo Agora
              </button>
            </div>
          </div>
        </section>

        {/* Tipos de Empresa */}
        <section id="tipos-empresa" className="w-full py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4">
                Escolha o Modelo Ideal
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Entenda as diferenças e escolha o tipo de empresa mais adequado
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-2 border-neutral-200 rounded-xl p-8 hover:border-neutral-900 transition-all flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl text-neutral-900">MEI</h3>
                  <i className="fa-solid fa-user text-neutral-400 text-2xl"></i>
                </div>
                <p className="text-sm text-neutral-500 mb-4">Microempreendedor Individual</p>
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Faturamento até R$ 81 mil/ano</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Sem sócios</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Impostos simplificados</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/onboarding')}
                  className="w-full py-3 border-2 border-neutral-900 rounded-lg text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  Abrir MEI
                </button>
              </div>
              
              <div className="border-2 border-neutral-200 rounded-xl p-8 hover:border-neutral-900 transition-all flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl text-neutral-900">ME</h3>
                  <i className="fa-solid fa-store text-neutral-400 text-2xl"></i>
                </div>
                <p className="text-sm text-neutral-500 mb-4">Microempresa</p>
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Faturamento até R$ 360 mil/ano</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Permite sócios</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Simples Nacional</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/onboarding')}
                  className="w-full py-3 border-2 border-neutral-900 rounded-lg text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  Abrir ME
                </button>
              </div>
              
              <div className="border-2 border-neutral-200 rounded-xl p-8 hover:border-neutral-900 transition-all flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl text-neutral-900">SLU</h3>
                  <i className="fa-solid fa-building text-neutral-400 text-2xl"></i>
                </div>
                <p className="text-sm text-neutral-500 mb-4">Sociedade Limitada Unipessoal</p>
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Sem limite de faturamento</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Sócio único</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Patrimônio separado</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/onboarding')}
                  className="w-full py-3 border-2 border-neutral-900 rounded-lg text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  Abrir SLU
                </button>
              </div>
              
              <div className="border-2 border-neutral-200 rounded-xl p-8 hover:border-neutral-900 transition-all flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl text-neutral-900">LTDA</h3>
                  <i className="fa-solid fa-users text-neutral-400 text-2xl"></i>
                </div>
                <p className="text-sm text-neutral-500 mb-4">Sociedade Limitada</p>
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Sem limite de faturamento</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Múltiplos sócios</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-neutral-900 mt-1"></i>
                    <span className="text-sm text-neutral-600">Responsabilidade limitada</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/onboarding')}
                  className="w-full py-3 border-2 border-neutral-900 rounded-lg text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  Abrir LTDA
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Goal Selection Section (Existing Content) */}
        <section id="goal-selection" className="w-full bg-neutral-50 px-4 py-16 lg:py-20 border-y border-neutral-200">
          <div className="w-full max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl text-neutral-900 mb-4">
                Qual é seu principal objetivo na gestão?
              </h2>
              <p className="text-lg text-neutral-600">
                Escolha uma opção para personalizar sua experiência no painel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-900 cursor-pointer transition-all group">
                <div className="w-14 h-14 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neutral-900 transition-colors">
                  <i className="fa-solid fa-chart-line text-2xl text-neutral-700 group-hover:text-white"></i>
                </div>
                <h3 className="text-xl text-neutral-900 mb-2">Vender Mais</h3>
                <p className="text-neutral-600">Aumente suas vendas com funil otimizado e estratégias de marketing</p>
              </div>
              
              <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-900 cursor-pointer transition-all group">
                <div className="w-14 h-14 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neutral-900 transition-colors">
                  <i className="fa-solid fa-wallet text-2xl text-neutral-700 group-hover:text-white"></i>
                </div>
                <h3 className="text-xl text-neutral-900 mb-2">Organizar Finanças</h3>
                <p className="text-neutral-600">Controle receitas, despesas e planeje seu crescimento financeiro</p>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-900 cursor-pointer transition-all group">
                <div className="w-14 h-14 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neutral-900 transition-colors">
                  <i className="fa-solid fa-globe text-2xl text-neutral-700 group-hover:text-white"></i>
                </div>
                <h3 className="text-xl text-neutral-900 mb-2">Melhorar Presença</h3>
                <p className="text-neutral-600">Fortaleça sua marca nas redes sociais e canais digitais</p>
              </div>
            </div>
          </div>
        </section>

        {/* Prova Social */}
        <section id="depoimentos" className="w-full py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4">
                Confiado por Milhares de Empreendedores
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Veja o que nossos clientes dizem sobre a experiência
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white border-2 border-neutral-200 rounded-xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                </div>
                <p className="text-neutral-600 mb-6">
                  "Processo super rápido e sem complicações. Em 2 dias minha empresa estava pronta e pude começar a faturar imediatamente."
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=42" alt="Avatar" className="w-12 h-12 bg-neutral-200 rounded-full" />
                  <div>
                    <p className="text-neutral-900">Marina Silva</p>
                    <p className="text-sm text-neutral-500">Designer Freelancer - MEI</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-2 border-neutral-200 rounded-xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                </div>
                <p className="text-neutral-600 mb-6">
                  "Excelente suporte! Tiraram todas minhas dúvidas sobre qual tipo de empresa abrir. Recomendo muito a plataforma."
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=87" alt="Avatar" className="w-12 h-12 bg-neutral-200 rounded-full" />
                  <div>
                    <p className="text-neutral-900">Carlos Mendes</p>
                    <p className="text-sm text-neutral-500">E-commerce - ME</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-2 border-neutral-200 rounded-xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                  <i className="fa-solid fa-star text-neutral-900"></i>
                </div>
                <p className="text-neutral-600 mb-6">
                  "A melhor decisão que tomei foi usar a EmpresaFácil. Dashboard completo e fácil de usar para gerenciar tudo."
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=153" alt="Avatar" className="w-12 h-12 bg-neutral-200 rounded-full" />
                  <div>
                    <p className="text-neutral-900">Ana Costa</p>
                    <p className="text-sm text-neutral-500">Consultoria - LTDA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t-2 border-neutral-200 pt-12">
              <p className="text-center text-sm text-neutral-500 mb-8">Empresas que confiam na EmpresaFácil</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                <div className="h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-400 font-bold">LOGO 1</span>
                </div>
                <div className="h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-400 font-bold">LOGO 2</span>
                </div>
                <div className="h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-400 font-bold">LOGO 3</span>
                </div>
                <div className="h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-400 font-bold">LOGO 4</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-20 lg:py-28 bg-neutral-50 border-t border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-neutral-600">
                Tire suas dúvidas sobre o processo
              </p>
            </div>
            
            <div className="space-y-4 bg-white rounded-xl overflow-hidden">
              <FAQItem 
                question="Quanto tempo leva para abrir minha empresa?" 
                answer="O processo completo leva em média 48 horas úteis após o envio de toda a documentação. Em alguns casos, dependendo da complexidade, pode levar até 5 dias úteis." 
              />
              <FAQItem 
                question="Quais documentos preciso enviar?" 
                answer="Geralmente, você precisará enviar seu RG/CNH, CPF e comprovante de residência atualizado. Se houver sócios, os mesmos documentos serão necessários para eles." 
              />
              <FAQItem 
                question="Posso mudar o tipo de empresa depois?" 
                answer="Sim, é perfeitamente possível realizar uma alteração contratual para mudar o tipo de empresa, por exemplo, de MEI para ME, à medida que seu negócio cresce." 
              />
              <FAQItem 
                question="Qual a diferença entre MEI e ME?" 
                answer="O MEI tem limite de faturamento menor, impostos fixos simplificados e restrição de atividades. A ME permite faturamento maior, sócios e mais funcionários, operando geralmente pelo Simples Nacional." 
              />
            </div>
          </div>
        </section>

        {/* Quick Profile Setup Section */}
        <section id="profile-setup" className="w-full px-4 py-16 lg:py-20 bg-white">
          <div className="w-full max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl text-neutral-900 mb-4">
                Configure seu perfil agora mesmo
              </h2>
              <p className="text-lg text-neutral-600">
                Dê o primeiro passo rumo à formalização preenchendo os dados básicos do seu negócio
              </p>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-2xl p-8 lg:p-10 shadow-sm">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/onboarding'); }}>
                <div>
                  <label className="block text-sm text-neutral-900 mb-2">
                    Nome do Negócio *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: Studio de Design Maria Silva"
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-900 mb-2">
                    Segmento de Atuação *
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors bg-white">
                    <option>Selecione seu segmento</option>
                    <option>E-commerce</option>
                    <option>Serviços Profissionais</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button type="submit" className="flex-1 px-8 py-4 bg-neutral-900 text-white rounded-lg text-lg hover:bg-neutral-800 transition-colors">
                    Continuar para o Onboarding
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section id="cta-final" className="w-full py-20 lg:py-28 bg-neutral-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6">
              Pronto para Começar a Empreender?
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de empreendedores que já abriram suas empresas de forma rápida e segura
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/onboarding')}
                className="px-8 py-4 bg-white text-neutral-900 rounded-lg text-lg font-medium hover:bg-neutral-100 transition-colors"
              >
                Criar Minha Empresa Agora
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg text-lg hover:bg-white hover:text-neutral-900 transition-colors">
                Falar com Especialista
              </button>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-halved"></i>
                <span>Dados 100% Seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-clock"></i>
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-certificate"></i>
                <span>Certificado Junta Comercial</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="w-full bg-white border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-rocket text-white text-xl"></i>
                  </div>
                  <span className="text-xl text-neutral-900 font-medium">EmpresaFácil</span>
                </div>
                <p className="text-neutral-600 text-sm mb-4">
                  Simplificando a abertura e gestão de empresas para empreendedores digitais em todo o Brasil.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                    <i className="fa-brands fa-linkedin text-xl"></i>
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                    <i className="fa-brands fa-instagram text-xl"></i>
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                    <i className="fa-brands fa-youtube text-xl"></i>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-neutral-900 font-medium mb-4">Empresa</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Sobre Nós</a></li>
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Como Funciona</a></li>
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Preços</a></li>
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-neutral-900 font-medium mb-4">Suporte</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Central de Ajuda</a></li>
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Contato</a></li>
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">FAQ</a></li>
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Status</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-neutral-900 font-medium mb-4">Legal</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Política de Privacidade</a></li>
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">Política de Cookies</a></li>
                  <li><a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">LGPD</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-neutral-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-neutral-500">© 2026 EmpresaFácil. Todos os direitos reservados.</p>
                <div className="flex items-center gap-6 text-sm text-neutral-500">
                  <span>CNPJ: 00.000.000/0001-00</span>
                  <span className="hidden sm:inline">|</span>
                  <span>contato@empresafacil.com.br</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default WelcomeScreen;
