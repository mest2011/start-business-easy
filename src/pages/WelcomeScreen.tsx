import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main id="onboarding-screen" className="w-full min-h-screen bg-white">
      {/* Hero Section with Value Proposition */}
      <section id="hero-section" className="w-full flex items-center justify-center px-4 py-16 lg:py-20">
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
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
                  Começar Agora
                </button>
                <button className="px-8 py-4 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors">
                  Pular Configuração
                </button>
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

      {/* Goal Selection Section */}
      <section id="goal-selection" className="w-full bg-neutral-50 px-4 py-16 lg:py-20">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-neutral-900 mb-4">
              Qual é seu principal objetivo?
            </h2>
            <p className="text-lg text-neutral-600">
              Escolha uma opção para personalizar sua experiência
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
            
            {/* Added a representative subset of options here */}
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

      {/* Quick Profile Setup Section */}
      <section id="profile-setup" className="w-full px-4 py-16 lg:py-20">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-neutral-900 mb-4">
              Configure seu perfil
            </h2>
            <p className="text-lg text-neutral-600">
              Preencha as informações básicas do seu negócio
            </p>
          </div>

          <div className="bg-white border-2 border-neutral-200 rounded-2xl p-8 lg:p-10">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
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
                <button type="submit" className="flex-1 px-8 py-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
};

export default WelcomeScreen;
