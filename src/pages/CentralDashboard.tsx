import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { UserProfile } from '../types';
import { Link } from 'react-router-dom';
import { PageSkeleton } from '../components/ui/PageSkeleton';

const CentralDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const p = await api.user.getProfile();
      setProfile(p);
      setTimeout(() => setLoading(false), 800);
    }
    loadData();

    const listener = () => {
      api.user.getProfile().then(setProfile);
    };
    window.addEventListener('profileUpdated', listener);
    return () => window.removeEventListener('profileUpdated', listener);
  }, []);

  if (loading) return <PageSkeleton />;

  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full flex flex-col">
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
        
        {/* Welcome Section with Search */}
        <section id="welcome-search-section" className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl text-neutral-900 mb-2">
                Olá, {profile ? profile.name.split(' ')[0] : 'Empreendedor'} 👋
              </h1>
              <p className="text-neutral-600">
                Aqui está o resumo do seu negócio de {profile ? profile.segment : 'SaaS'} hoje.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:w-80">
                <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"></i>
                <input type="text" placeholder="Busca global..." className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-400 focus:outline-none" />
              </div>
              <button className="px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-plus mr-2"></i>Nova Ação
              </button>
            </div>
          </div>
        </section>

        {/* KPI Cards Grid - Fixed to mockup exactly */}
        <section id="kpi-cards-section" className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-users text-xl text-neutral-700"></i>
                </div>
                <span className="text-xs text-neutral-500">Este mês</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">247</div>
              <div className="text-sm text-neutral-600 mb-3">Novos Leads</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                <span className="text-neutral-700">+12%</span>
                <span className="text-neutral-500">vs mês anterior</span>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-shopping-bag text-xl text-neutral-700"></i>
                </div>
                <span className="text-xs text-neutral-500">Este mês</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">89</div>
              <div className="text-sm text-neutral-600 mb-3">Vendas Fechadas</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                <span className="text-neutral-700">+8%</span>
                <span className="text-neutral-500">vs mês anterior</span>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-chart-line text-xl text-neutral-700"></i>
                </div>
                <span className="text-xs text-neutral-500">Este mês</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">3.2x</div>
              <div className="text-sm text-neutral-600 mb-3">ROI Médio</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-down text-neutral-700"></i>
                <span className="text-neutral-700">-5%</span>
                <span className="text-neutral-500">vs mês anterior</span>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-wallet text-xl text-neutral-700"></i>
                </div>
                <span className="text-xs text-neutral-500">Saldo atual</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">R$ 18.4k</div>
              <div className="text-sm text-neutral-600 mb-3">Caixa Disponível</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                <span className="text-neutral-700">+23%</span>
                <span className="text-neutral-500">vs mês anterior</span>
              </div>
            </div>

          </div>
        </section>

        {/* Alerts and Pending Tasks */}
        <section id="alerts-section" className="mb-8">
          <h2 className="text-xl text-neutral-900 mb-4">Alertas & Pendências</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            <div className="bg-neutral-900 border-2 border-neutral-800 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-exclamation-triangle text-white"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-sm mb-1">Conectar canal pendente</h3>
                  <p className="text-neutral-400 text-xs mb-3">Instagram Business ainda não conectado</p>
                  <button className="text-xs text-white underline hover:no-underline">Conectar agora</button>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border-2 border-neutral-800 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-circle-exclamation text-white"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-sm mb-1">Campanha sem orçamento</h3>
                  <p className="text-neutral-400 text-xs mb-3">2 campanhas pausadas por falta de budget</p>
                  <button className="text-xs text-white underline hover:no-underline">Revisar campanhas</button>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border-2 border-neutral-800 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-money-bill-wave text-white"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-sm mb-1">Contas a pagar</h3>
                  <p className="text-neutral-400 text-xs mb-3">3 faturas vencem em 5 dias (R$ 2.1k)</p>
                  <button className="text-xs text-white underline hover:no-underline">Ver detalhes</button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Suggested Tasks and Module Shortcuts */}
        <section id="tasks-shortcuts-section" className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Suggested Tasks */}
            <div>
              <h2 className="text-xl text-neutral-900 mb-4">Tarefas Sugeridas pela IA</h2>
              <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
                <div className="space-y-4">
                  
                  <div className="flex items-start gap-4 pb-4 border-b border-neutral-200">
                    <input type="checkbox" className="w-5 h-5 mt-1 border-2 border-neutral-300 rounded cursor-pointer" />
                    <div className="flex-1">
                      <h3 className="text-sm text-neutral-900 mb-1">Responder 12 comentários no Instagram</h3>
                      <p className="text-xs text-neutral-500 mb-2">Engajamento caiu 8% esta semana</p>
                      <span className="text-xs text-neutral-400">Prioridade: Alta</span>
                    </div>
                    <button className="text-neutral-400 hover:text-neutral-600">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-neutral-200">
                    <input type="checkbox" className="w-5 h-5 mt-1 border-2 border-neutral-300 rounded cursor-pointer" />
                    <div className="flex-1">
                      <h3 className="text-sm text-neutral-900 mb-1">Criar post para próxima semana</h3>
                      <p className="text-xs text-neutral-500 mb-2">Calendário vazio após 25/04</p>
                      <span className="text-xs text-neutral-400">Prioridade: Média</span>
                    </div>
                    <button className="text-neutral-400 hover:text-neutral-600">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-neutral-200">
                    <input type="checkbox" className="w-5 h-5 mt-1 border-2 border-neutral-300 rounded cursor-pointer" />
                    <div className="flex-1">
                      <h3 className="text-sm text-neutral-900 mb-1">Revisar 8 leads sem follow-up</h3>
                      <p className="text-xs text-neutral-500 mb-2">Contatos sem interação há 7+ dias</p>
                      <span className="text-xs text-neutral-400">Prioridade: Alta</span>
                    </div>
                    <button className="text-neutral-400 hover:text-neutral-600">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>

                  <div className="flex items-start gap-4">
                    <input type="checkbox" className="w-5 h-5 mt-1 border-2 border-neutral-300 rounded cursor-pointer" />
                    <div className="flex-1">
                      <h3 className="text-sm text-neutral-900 mb-1">Ajustar orçamento de anúncios</h3>
                      <p className="text-xs text-neutral-500 mb-2">CPC aumentou 15% nos últimos 3 dias</p>
                      <span className="text-xs text-neutral-400">Prioridade: Média</span>
                    </div>
                    <button className="text-neutral-400 hover:text-neutral-600">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>

                </div>
                <button className="w-full mt-6 py-3 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-sm">
                  Ver todas as tarefas
                </button>
              </div>
            </div>

            {/* Module Shortcuts */}
            <div>
              <h2 className="text-xl text-neutral-900 mb-4">Atalhos Rápidos</h2>
              <div className="grid grid-cols-2 gap-4">
                
                <Link to="/dashboard/midias-sociais" className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-all text-left">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-share-nodes text-xl text-neutral-700"></i>
                  </div>
                  <h3 className="text-sm text-neutral-900 mb-1">Mídias Sociais</h3>
                  <p className="text-xs text-neutral-500">Gerenciar posts</p>
                </Link>

                <Link to="/dashboard/marketing" className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-all text-left">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-megaphone text-xl text-neutral-700"></i>
                  </div>
                  <h3 className="text-sm text-neutral-900 mb-1">Marketing</h3>
                  <p className="text-xs text-neutral-500">Ver campanhas</p>
                </Link>

                <Link to="/dashboard/vendas" className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-all text-left">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-filter text-xl text-neutral-700"></i>
                  </div>
                  <h3 className="text-sm text-neutral-900 mb-1">Vendas/Funil</h3>
                  <p className="text-xs text-neutral-500">Acompanhar leads</p>
                </Link>

                <Link to="/dashboard/financeiro" className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-all text-left">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-chart-pie text-xl text-neutral-700"></i>
                  </div>
                  <h3 className="text-sm text-neutral-900 mb-1">Financeiro</h3>
                  <p className="text-xs text-neutral-500">Ver fluxo de caixa</p>
                </Link>

                <Link to="/dashboard/presenca" className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-all text-left">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-browser text-xl text-neutral-700"></i>
                  </div>
                  <h3 className="text-sm text-neutral-900 mb-1">Presença Digital</h3>
                  <p className="text-xs text-neutral-500">Análise de SEO</p>
                </Link>

                <button className="bg-neutral-900 border-2 border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all text-left">
                  <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-robot text-xl text-white"></i>
                  </div>
                  <h3 className="text-sm text-white mb-1">IA Copiloto</h3>
                  <p className="text-xs text-neutral-400">Perguntar algo</p>
                </button>

              </div>
            </div>

          </div>
        </section>

        {/* Weekly Timeline */}
        <section id="weekly-timeline-section" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-neutral-900">Resumo Semanal</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 border-2 border-neutral-200 rounded-lg flex items-center justify-center hover:border-neutral-400 transition-colors">
                <i className="fa-solid fa-chevron-left text-neutral-600 text-sm"></i>
              </button>
              <span className="text-sm text-neutral-600 px-3">15 - 21 Abr 2025</span>
              <button className="w-8 h-8 border-2 border-neutral-200 rounded-lg flex items-center justify-center hover:border-neutral-400 transition-colors">
                <i className="fa-solid fa-chevron-right text-neutral-600 text-sm"></i>
              </button>
            </div>
          </div>

          <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
            <div className="space-y-4">
              
              <div className="flex items-start gap-4 pb-4 border-b border-neutral-100">
                <div className="text-center flex-shrink-0" style={{ width: '60px' }}>
                  <div className="text-xs text-neutral-500 mb-1">SEG</div>
                  <div className="text-lg text-neutral-900">15</div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                    <span className="text-sm text-neutral-900">3 posts publicados no Instagram</span>
                    <span className="text-xs text-neutral-500 ml-auto">09:00</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                    <span className="text-sm text-neutral-900">Campanha Google Ads iniciada</span>
                    <span className="text-xs text-neutral-500 ml-auto">14:30</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-neutral-100">
                <div className="text-center flex-shrink-0" style={{ width: '60px' }}>
                  <div className="text-xs text-neutral-500 mb-1">TER</div>
                  <div className="text-lg text-neutral-900">16</div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                    <span className="text-sm text-neutral-900">15 novos leads capturados</span>
                    <span className="text-xs text-neutral-500 ml-auto">Todo dia</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-neutral-100">
                <div className="text-center flex-shrink-0" style={{ width: '60px' }}>
                  <div className="text-xs text-neutral-500 mb-1">QUA</div>
                  <div className="text-lg text-neutral-900">17</div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                    <span className="text-sm text-neutral-900">Reunião com cliente fechado</span>
                    <span className="text-xs text-neutral-500 ml-auto">10:00</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                    <span className="text-sm text-neutral-900">Fatura de R$ 850 paga</span>
                    <span className="text-xs text-neutral-500 ml-auto">16:20</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-center flex-shrink-0" style={{ width: '60px' }}>
                  <div className="text-xs text-neutral-500 mb-1">QUI</div>
                  <div className="text-lg text-neutral-900">18</div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                    <span className="text-sm text-neutral-900">Análise SEO completa gerada</span>
                    <span className="text-xs text-neutral-500 ml-auto">11:45</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CentralDashboard;
