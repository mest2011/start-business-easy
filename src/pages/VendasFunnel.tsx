import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { SalesLead } from '../types';
import { Modal } from '../components/ui/Modal';
import { PageSkeleton } from '../components/ui/PageSkeleton';
import { downloadCSV } from '../utils/export';

const VendasFunnel: React.FC = () => {
  const [leads, setLeads] = useState<SalesLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [client, setClient] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadLeads();
      setTimeout(() => setLoading(false), 800);
    };
    init();
  }, []);

  const loadLeads = async () => {
    const data = await api.vendas.getLeads();
    setLeads(data);
  };

  const advanceStage = async (id: string, currentStage: SalesLead['stage']) => {
    let nextStage: SalesLead['stage'] | null = null;
    if (currentStage === 'lead') nextStage = 'negotiation';
    else if (currentStage === 'negotiation') nextStage = 'won';
    
    if (nextStage) {
      await api.vendas.moveLeadStage(id, nextStage);
      loadLeads();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !value) return;
    await api.vendas.createLead({
      clientName: client,
      value: Number(value)
    });
    setIsModalOpen(false);
    setClient('');
    setValue('');
    loadLeads();
  };

  const handleExport = () => {
    downloadCSV(leads, 'pipeline_vendas.csv');
  };

  const getLeadsByStage = (stage: SalesLead['stage']) => leads.filter(l => l.stage === stage);

  if (loading) return <PageSkeleton />;

  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full flex flex-col">
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
        
        {/* Page Header */}
        <section id="page-header-section" className="mb-8 flex-shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl text-neutral-900 mb-2">Pipeline de Vendas</h1>
              <p className="text-neutral-600">Gerencie leads e oportunidades através do funil de conversão</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExport}
                className="px-4 py-3 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-file-import mr-2"></i>Exportar
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-plus mr-2"></i>Novo Lead
              </button>
            </div>
          </div>
        </section>

        {/* Monthly Goals Summary */}
        <section id="goals-summary-section" className="mb-8 flex-shrink-0">
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-neutral-900">Metas do Mês - Abril 2025</h2>
              <button className="px-3 py-2 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-sm">
                <i className="fa-solid fa-sliders mr-2"></i>Ajustar Metas
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Novos Leads</span>
                  <span className="text-xs text-neutral-500">78%</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl text-neutral-900">78</span>
                  <span className="text-sm text-neutral-500">/ 100</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-4/5 h-2 bg-neutral-900 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Propostas Enviadas</span>
                  <span className="text-xs text-neutral-500">65%</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl text-neutral-900">26</span>
                  <span className="text-sm text-neutral-500">/ 40</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-2/3 h-2 bg-neutral-900 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Negócios Fechados</span>
                  <span className="text-xs text-neutral-500">83%</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl text-neutral-900">10</span>
                  <span className="text-sm text-neutral-500">/ 12</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-5/6 h-2 bg-neutral-900 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Receita Estimada</span>
                  <span className="text-xs text-neutral-500">71%</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl text-neutral-900">R$ 35,5k</span>
                  <span className="text-sm text-neutral-500">/ R$ 50k</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full">
                  <div className="w-3/4 h-2 bg-neutral-900 rounded-full"></div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Quick Lead Capture */}
        <section id="quick-capture-section" className="mb-8 flex-shrink-0">
          <form className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-5" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}>
            <h3 className="text-base text-neutral-900 mb-4">Captura Rápida de Lead</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <input required value={client} onChange={e => setClient(e.target.value)} type="text" placeholder="Nome do lead" className="px-4 py-2.5 bg-white border-2 border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-400" />
              <input type="email" placeholder="Email" className="px-4 py-2.5 bg-white border-2 border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-400" />
              <input type="tel" placeholder="Telefone" className="px-4 py-2.5 bg-white border-2 border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-400" />
              <input required value={value} onChange={e => setValue(e.target.value)} type="number" placeholder="Valor estimado" className="px-4 py-2.5 bg-white border-2 border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-400" />
              <button type="submit" className="px-4 py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm">
                <i className="fa-solid fa-plus mr-2"></i>Adicionar
              </button>
            </div>
          </form>
        </section>

        {/* Pipeline Kanban Board */}
        <section id="pipeline-board-section" className="flex-1 flex flex-col pb-8 min-h-[500px]">
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <h2 className="text-xl text-neutral-900">Pipeline de Oportunidades</h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 bg-neutral-900 text-white rounded-lg text-xs">
                <i className="fa-solid fa-columns mr-1"></i>Colunas
              </button>
              <button className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg text-xs transition-colors">
                <i className="fa-solid fa-list mr-1"></i>Lista
              </button>
              <button className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg text-xs transition-colors">
                <i className="fa-solid fa-chart-bar mr-1"></i>Relatório
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
            
            {/* Column 1: Leads */}
            <div id="leads-column" className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div>
                  <h3 className="text-base text-neutral-900 mb-1">Leads</h3>
                  <p className="text-xs text-neutral-500">{getLeadsByStage('lead').length} oportunidades</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="w-8 h-8 bg-white border-2 border-neutral-200 rounded-lg flex items-center justify-center hover:border-neutral-400 transition-colors">
                  <i className="fa-solid fa-plus text-neutral-700 text-xs"></i>
                </button>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {getLeadsByStage('lead').map(lead => (
                  <div key={lead.id} className="bg-white border-2 border-neutral-200 rounded-lg p-4 hover:border-neutral-400 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm text-neutral-900">{lead.clientName}</h4>
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">Novo</span>
                      <span className="text-xs text-neutral-500">ativo</span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Valor estimado</span>
                        <span className="text-neutral-900">R$ {lead.value}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Próxima ação</span>
                        <span className="text-neutral-900">Avançar</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-xs">Você</div>
                      </div>
                      <button onClick={() => advanceStage(lead.id, lead.stage)} className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded bg-blue-50">
                        Mover <i className="fa-solid fa-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                ))}
                {!getLeadsByStage('lead').length && <p className="text-sm text-neutral-400 text-center py-4">Nenhum lead</p>}
              </div>
            </div>

            {/* Column 2: Contato */}
            <div id="contato-column" className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div>
                  <h3 className="text-base text-neutral-900 mb-1">Contato</h3>
                  <p className="text-xs text-neutral-500">{getLeadsByStage('negotiation').length} oportunidades</p>
                </div>
                <button className="w-8 h-8 bg-white border-2 border-neutral-200 rounded-lg flex items-center justify-center hover:border-neutral-400 transition-colors">
                  <i className="fa-solid fa-plus text-neutral-700 text-xs"></i>
                </button>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {getLeadsByStage('negotiation').map(lead => (
                  <div key={lead.id} className="bg-white border-2 border-neutral-200 rounded-lg p-4 hover:border-neutral-400 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm text-neutral-900">{lead.clientName}</h4>
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">Em contato / Negociando</span>
                      <span className="text-xs text-neutral-500">ativo</span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Valor estimado</span>
                        <span className="text-neutral-900">R$ {lead.value}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Próxima ação</span>
                        <span className="text-neutral-900">Finalizar</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-xs">Você</div>
                      </div>
                      <button onClick={() => advanceStage(lead.id, lead.stage)} className="text-xs text-green-600 hover:text-green-800 px-2 py-1 rounded bg-green-50">
                        Ganho <i className="fa-solid fa-check ml-1"></i>
                      </button>
                    </div>
                  </div>
                ))}
                {!getLeadsByStage('negotiation').length && <p className="text-sm text-neutral-400 text-center py-4">Sem contatos ativos</p>}
              </div>
            </div>

            {/* Column 3: Proposta (Mocked statically as per requested fidelity if empty, otherwise we reuse logic) */}
            <div id="proposta-column" className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div>
                  <h3 className="text-base text-neutral-900 mb-1">Proposta</h3>
                  <p className="text-xs text-neutral-500">Fluxo em aprovação</p>
                </div>
                <button className="w-8 h-8 bg-white border-2 border-neutral-200 rounded-lg flex items-center justify-center hover:border-neutral-400 transition-colors">
                  <i className="fa-solid fa-plus text-neutral-700 text-xs"></i>
                </button>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                <div className="bg-white border-2 border-neutral-200 rounded-lg p-4 hover:border-neutral-400 transition-all opacity-60">
                  <p className="text-sm text-neutral-500 text-center py-4">As propostas pendentes aparecerão aqui.</p>
                </div>
              </div>
            </div>

            {/* Column 4: Fechado */}
            <div id="fechado-column" className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div>
                  <h3 className="text-base text-neutral-900 mb-1">Fechado</h3>
                  <p className="text-xs text-neutral-500">{getLeadsByStage('won').length} ganhos</p>
                </div>
                <button className="w-8 h-8 bg-white border-2 border-neutral-200 rounded-lg flex items-center justify-center hover:border-neutral-400 transition-colors">
                  <i className="fa-solid fa-plus text-neutral-700 text-xs"></i>
                </button>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {getLeadsByStage('won').map(lead => (
                  <div key={lead.id} className="bg-white border-2 border-neutral-900 rounded-lg p-4 hover:border-neutral-700 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm text-neutral-900">{lead.clientName}</h4>
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-neutral-900 text-white text-xs rounded">Ganho</span>
                      <span className="text-xs text-neutral-500">Concluído</span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Valor fechado</span>
                        <span className="text-neutral-900">R$ {lead.value}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-xs">Você</div>
                    </div>
                  </div>
                ))}
                {!getLeadsByStage('won').length && <p className="text-sm text-neutral-400 text-center py-4">Ainda sem ganhos</p>}
              </div>
            </div>

          </div>
        </section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Lead">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-900 mb-1">Nome do Cliente</label>
              <input required value={client} onChange={e => setClient(e.target.value)} type="text" className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900 focus:outline-none" placeholder="Ex: Tech Corp" />
            </div>
            <div>
              <label className="block text-sm text-neutral-900 mb-1">Valor do Negócio (R$)</label>
              <input required value={value} onChange={e => setValue(e.target.value)} type="number" min="0" step="0.01" className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900 focus:outline-none" placeholder="2500" />
            </div>
            <button type="submit" className="w-full mt-4 bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium">
              Criar Lead
            </button>
          </form>
        </Modal>

      </div>
    </div>
  );
};

export default VendasFunnel;
