import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Campaign } from '../types';
import { Modal } from '../components/ui/Modal';
import { downloadCSV } from '../utils/export';
import { PageSkeleton } from '../components/ui/PageSkeleton';

const MarketingArea: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadCampaigns();
      setTimeout(() => setLoading(false), 800);
    };
    init();
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    const data = await api.marketing.getCampaigns();
    setCampaigns(data);
    setLoading(false);
  };

  const toggleStatus = async (id: string) => {
    // Basic toggle logic mapping for the mock API (it normally just toggles active/paused)
    await api.marketing.toggleCampaignStatus(id);
    loadCampaigns();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !budget) return;
    await api.marketing.createCampaign({
      name,
      budget: Number(budget)
    });
    setIsModalOpen(false);
    setName('');
    setBudget('');
    loadCampaigns();
  };

  const handleExport = () => {
    downloadCSV(campaigns, 'campanhas_marketing.csv');
  };

  // derived metrics for budget summary
  const totalOrcado = campaigns.reduce((acc, c) => acc + c.budget, 0) || 15500;
  const totalGasto = campaigns.reduce((acc, c) => acc + c.spent, 0) || 9450;
  const disponivel = totalOrcado - totalGasto;
  const pctGasto = totalOrcado > 0 ? Math.round((totalGasto / totalOrcado) * 100) : 0;

  if (loading) return <PageSkeleton />;

  return (
    <div className="w-full px-4 lg:px-8 py-8">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Page Header */}
        <section id="page-header-section" className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl text-neutral-900 mb-2">Centro de Campanhas</h1>
              <p className="text-neutral-600">Gerencie campanhas, orçamentos e otimize resultados com IA</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleExport} className="px-4 py-3 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-download mr-2"></i>Exportar
              </button>
              <button onClick={() => setIsModalOpen(true)} className="px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-plus mr-2"></i>Nova Campanha
              </button>
            </div>
          </div>
        </section>

        {/* Campaign Objectives Overview */}
        <section id="objectives-section" className="mb-8">
          <h2 className="text-xl text-neutral-900 mb-4">Objetivos Principais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-chart-line text-xl text-neutral-700"></i>
                </div>
                <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">Ativo</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">12.4k</div>
              <div className="text-sm text-neutral-600 mb-3">Tráfego (visitas)</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                <span className="text-neutral-700">+24% vs. período anterior</span>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Meta: 15k</span>
                  <span>83%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full mt-2">
                  <div className="w-4/5 h-2 bg-neutral-900 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-users text-xl text-neutral-700"></i>
                </div>
                <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">Ativo</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">847</div>
              <div className="text-sm text-neutral-600 mb-3">Leads Gerados</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                <span className="text-neutral-700">+31% vs. período anterior</span>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Meta: 1k</span>
                  <span>85%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full mt-2">
                  <div className="w-5/6 h-2 bg-neutral-900 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-cart-shopping text-xl text-neutral-700"></i>
                </div>
                <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">Ativo</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">124</div>
              <div className="text-sm text-neutral-600 mb-3">Conversões</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                <span className="text-neutral-700">+18% vs. período anterior</span>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Meta: 200</span>
                  <span>62%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full mt-2">
                  <div style={{ width: '60%' }} className="h-2 bg-neutral-900 rounded-full"></div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Acquisition Funnel Summary */}
        <section id="funnel-section" className="mb-8">
          <h2 className="text-xl text-neutral-900 mb-4">Funil de Aquisição (Resumo)</h2>
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              
              <div className="text-center">
                <div className="w-full h-32 bg-neutral-100 rounded-lg flex flex-col items-center justify-center mb-3">
                  <div className="text-2xl text-neutral-900 mb-1">12.4k</div>
                  <div className="text-xs text-neutral-500">100%</div>
                </div>
                <div className="text-sm text-neutral-900 mb-1">Visitantes</div>
                <p className="text-xs text-neutral-500">Total de tráfego</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <i className="fa-solid fa-arrow-right text-2xl text-neutral-300"></i>
              </div>

              <div className="text-center">
                <div className="w-full h-32 bg-neutral-100 rounded-lg flex flex-col items-center justify-center mb-3">
                  <div className="text-2xl text-neutral-900 mb-1">3.7k</div>
                  <div className="text-xs text-neutral-500">30%</div>
                </div>
                <div className="text-sm text-neutral-900 mb-1">Engajados</div>
                <p className="text-xs text-neutral-500">Interagiram</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <i className="fa-solid fa-arrow-right text-2xl text-neutral-300"></i>
              </div>

              <div className="text-center">
                <div className="w-full h-32 bg-neutral-100 rounded-lg flex flex-col items-center justify-center mb-3">
                  <div className="text-2xl text-neutral-900 mb-1">847</div>
                  <div className="text-xs text-neutral-500">6.8%</div>
                </div>
                <div className="text-sm text-neutral-900 mb-1">Leads</div>
                <p className="text-xs text-neutral-500">Cadastrados</p>
              </div>

            </div>

            <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-lightbulb text-neutral-500"></i>
                <span className="text-sm text-neutral-600">Taxa de conversão: 6.8% (acima da média do setor)</span>
              </div>
              <button className="px-4 py-2 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-sm">
                Ver detalhes
              </button>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section id="main-content-grid" className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Campaign List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-neutral-900">Campanhas Ads</h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 bg-neutral-900 text-white rounded-lg text-xs">Todas ({campaigns.length})</button>
                  <button className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg text-xs transition-colors">Ativas ({campaigns.filter(c => c.status === 'active').length})</button>
                  <button className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg text-xs transition-colors">Pausadas ({campaigns.filter(c => c.status === 'paused').length})</button>
                </div>
              </div>

              <div className="space-y-4">
                {loading && <div className="text-sm text-neutral-500">Carregando...</div>}
                {!loading && campaigns.map(camp => {
                  const spentPct = camp.budget > 0 ? Math.min(100, Math.round((camp.spent / camp.budget) * 100)) : 0;
                  
                  return (
                    <div key={camp.id} className={`bg-white border-2 border-neutral-200 rounded-xl p-5 hover:border-neutral-400 transition-all ${camp.status === 'completed' ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base text-neutral-900">{camp.name}</h3>
                            <span className={`px-2 py-1 text-xs rounded ${
                              camp.status === 'active' ? 'bg-neutral-100 text-neutral-700' :
                              camp.status === 'paused' ? 'bg-neutral-50 border border-neutral-300 text-neutral-600' :
                              'bg-neutral-100 text-neutral-500'
                            }`}>
                              {camp.status === 'active' ? 'Ativa' : camp.status === 'paused' ? 'Pausada' : 'Concluída'}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 mb-3">Plataformas variadas</p>
                          <div className="flex items-center gap-4 text-xs text-neutral-500">
                            <span><i className="fa-regular fa-calendar mr-1"></i>Período Vigente</span>
                            <span><i className="fa-solid fa-bullseye mr-1"></i>Múltiplos</span>
                          </div>
                        </div>
                        <button className="text-neutral-400 hover:text-neutral-600">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-neutral-500 mb-1">Orçamento</div>
                          <div className="text-sm text-neutral-900">R$ {camp.budget}</div>
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500 mb-1">Gasto</div>
                          <div className="text-sm text-neutral-900">R$ {camp.spent}</div>
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500 mb-1">Conversões</div>
                          <div className="text-sm text-neutral-900">{camp.conversions}</div>
                        </div>
                        <div>
                          <div className="text-xs text-neutral-500 mb-1">Cliques</div>
                          <div className="text-sm text-neutral-900">{camp.clicks}</div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                          <span>Progresso do orçamento</span>
                          <span>{spentPct}%</span>
                        </div>
                        <div className="w-full h-2 bg-neutral-100 rounded-full">
                          <div style={{ width: `${spentPct}%` }} className="h-2 bg-neutral-900 rounded-full"></div>
                        </div>
                      </div>

                      {camp.status !== 'completed' && (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => toggleStatus(camp.id)}
                            className={`flex-1 px-3 py-2 text-xs rounded-lg transition-colors ${
                              camp.status === 'paused' 
                                ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
                                : 'border-2 border-neutral-200 text-neutral-700 hover:border-neutral-400'
                            }`}>
                            <i className={`fa-solid ${camp.status === 'paused' ? 'fa-play' : 'fa-pause'} mr-1`}></i>
                            {camp.status === 'paused' ? 'Retomar' : 'Pausar'}
                          </button>
                          <button className="flex-1 px-3 py-2 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-xs">
                            <i className="fa-solid fa-sliders mr-1"></i>Ajustar
                          </button>
                          <button className="flex-1 px-3 py-2 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-xs">
                            <i className="fa-solid fa-chart-simple mr-1"></i>Detalhes
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>

              <button className="w-full mt-6 py-3 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-sm">
                Ver todas as campanhas
              </button>
            </div>

            {/* Sidebar: Recommendations & Quick Actions */}
            <div className="space-y-8">
              
              {/* AI Recommendations */}
              <div>
                <h2 className="text-xl text-neutral-900 mb-4">Recomendações IA</h2>
                <div className="bg-white border-2 border-neutral-200 rounded-xl p-5">
                  <div className="space-y-4">
                    <div className="p-4 bg-neutral-50 rounded-lg border-l-4 border-neutral-900">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="fa-solid fa-lightbulb text-white text-sm"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm text-neutral-900 mb-1">Aumente o orçamento da principal</h4>
                          <p className="text-xs text-neutral-600 mb-3">Performance 42% acima da média. Recomendamos aumentar orçamento em R$ 2.000 para maximizar conversões.</p>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 bg-neutral-900 text-white rounded text-xs hover:bg-neutral-800 transition-colors">
                              Aplicar
                            </button>
                            <button className="px-3 py-1.5 text-neutral-600 text-xs hover:text-neutral-900 transition-colors">
                              Ignorar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="fa-solid fa-chart-line text-neutral-700 text-sm"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm text-neutral-900 mb-1">Otimize horários de veiculação</h4>
                          <p className="text-xs text-neutral-600 mb-3">Conversões 3x maiores entre 19h-22h. Ajuste lances para esse período.</p>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 border-2 border-neutral-200 text-neutral-700 rounded text-xs hover:border-neutral-400 transition-colors">
                              Ver análise
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="fa-solid fa-bullseye text-neutral-700 text-sm"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm text-neutral-900 mb-1">Teste novo público-alvo</h4>
                          <p className="text-xs text-neutral-600 mb-3">Identifiquei segmento similar com potencial de 28% mais conversões.</p>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 border-2 border-neutral-200 text-neutral-700 rounded text-xs hover:border-neutral-400 transition-colors">
                              Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl text-neutral-900 mb-4">Ações Rápidas</h2>
                <div className="space-y-3">
                  <button onClick={() => setIsModalOpen(true)} className="w-full p-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors text-left flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-plus text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-sm mb-1">Criar Nova Campanha</h3>
                      <p className="text-xs text-neutral-400">Configure em minutos com IA</p>
                    </div>
                  </button>

                  <button className="w-full p-4 bg-white border-2 border-neutral-200 rounded-xl hover:border-neutral-400 transition-colors text-left flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-sliders text-neutral-700"></i>
                    </div>
                    <div>
                      <h3 className="text-sm text-neutral-900 mb-1">Ajustar Orçamentos</h3>
                      <p className="text-xs text-neutral-500">Otimize distribuição de verba</p>
                    </div>
                  </button>

                  <button onClick={handleExport} className="w-full p-4 bg-white border-2 border-neutral-200 rounded-xl hover:border-neutral-400 transition-colors text-left flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-file-lines text-neutral-700"></i>
                    </div>
                    <div>
                      <h3 className="text-sm text-neutral-900 mb-1">Relatório Completo</h3>
                      <p className="text-xs text-neutral-500">Exportar dados de performance</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Budget Summary */}
              <div>
                <h2 className="text-xl text-neutral-900 mb-4">Resumo de Orçamento</h2>
                <div className="bg-white border-2 border-neutral-200 rounded-xl p-5">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600">Total Orçado</span>
                      <span className="text-lg text-neutral-900">R$ {totalOrcado.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600">Total Gasto</span>
                      <span className="text-lg text-neutral-900">R$ {totalGasto.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Disponível</span>
                      <span className="text-lg text-neutral-900">R$ {disponivel.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                      <span>Utilização do orçamento</span>
                      <span>{pctGasto}%</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 rounded-full">
                      <div style={{ width: `${pctGasto}%` }} className="h-3 bg-neutral-900 rounded-full"></div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <i className="fa-solid fa-info-circle"></i>
                      <span>Projeção de gastos dinâmicos calculados</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Campanha">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-900 mb-1">Nome da Campanha</label>
              <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900 focus:outline-none" placeholder="Ex: Black Friday 2025" />
            </div>
            <div>
              <label className="block text-sm text-neutral-900 mb-1">Orçamento (R$)</label>
              <input required value={budget} onChange={e => setBudget(e.target.value)} type="number" min="0" step="0.01" className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900 focus:outline-none" placeholder="1000" />
            </div>
            <button type="submit" className="w-full mt-4 bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium">
              Criar Campanha
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default MarketingArea;
