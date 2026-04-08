import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Transaction } from '../types';
import { Modal } from '../components/ui/Modal';
import { downloadCSV } from '../utils/export';
import { PageSkeleton } from '../components/ui/PageSkeleton';

const Financeiro: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadTransactions();
      setTimeout(() => setLoading(false), 800);
    };
    init();
  }, []);

  const loadTransactions = async () => {
    const data = await api.financeiro.getTransactions();
    setTransactions(data);
  };

  const handlePay = async (id: string) => {
    await api.financeiro.payTransaction(id);
    loadTransactions();
  };

  const handleExport = () => {
    downloadCSV(transactions, 'Relatorio_Financeiro');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amount) return;
    await api.financeiro.createTransaction({
      description: desc,
      amount: Number(amount),
      type
    });
    setIsModalOpen(false);
    setDesc('');
    setAmount('');
    loadTransactions();
  };

  const totalIncome = transactions.filter(t => t.type === 'income' && t.status === 'paid').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense' && t.status === 'paid').reduce((acc, t) => acc + t.amount, 0);

  if (loading) return <PageSkeleton />;

  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full flex flex-col">
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
        
        {/* Page Header */}
        <section id="page-header-section" className="mb-8 flex-shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl text-neutral-900 mb-2">Planejamento Financeiro</h1>
              <p className="text-neutral-600">Gerencie seu caixa, contas e projeções financeiras</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExport}
                className="px-4 py-3 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-file-import mr-2"></i>Exportar Extrato
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-plus mr-2"></i>Registrar Transação
              </button>
            </div>
          </div>
        </section>

        {/* Financial Overview Cards */}
        <section id="financial-overview-section" className="mb-8 flex-shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">Saldo Atual</span>
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-wallet text-neutral-700"></i>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl text-neutral-900">R$ {totalIncome - totalExpense}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-600">+12,5% vs mês anterior</span>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">Entradas (Pagas)</span>
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-arrow-trend-up text-neutral-700"></i>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl text-neutral-900">R$ {totalIncome}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">{transactions.filter(t => t.type === 'income' && t.status === 'paid').length} transações</span>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">Saídas (Pagas)</span>
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-arrow-trend-down text-neutral-700"></i>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl text-neutral-900">R$ {totalExpense}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">{transactions.filter(t => t.type === 'expense' && t.status === 'paid').length} transações</span>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">Resultado</span>
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-chart-line text-neutral-700"></i>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl text-neutral-900">R$ {totalIncome - totalExpense}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Lucro operacional</span>
              </div>
            </div>

          </div>
        </section>

        {/* Revenue Goals & Projection */}
        <section id="goals-projection-section" className="mb-8 flex-shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Revenue Goals */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-neutral-900">Meta de Faturamento - Abril 2025</h2>
                <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  <i className="fa-solid fa-gear"></i>
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-neutral-600">Progresso da Meta</span>
                  <span className="text-lg text-neutral-900">85,6%</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full mb-2">
                  <div className="w-5/6 h-3 bg-neutral-900 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">R$ 42.800 de R$ 50.000</span>
                  <span className="text-sm text-neutral-500">Faltam R$ 7.200</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                    <span className="text-sm text-neutral-700">Serviços de Consultoria</span>
                  </div>
                  <span className="text-sm text-neutral-900">R$ 28.500</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                    <span className="text-sm text-neutral-700">Produtos Digitais</span>
                  </div>
                  <span className="text-sm text-neutral-900">R$ 9.200</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
                    <span className="text-sm text-neutral-700">Outros</span>
                  </div>
                  <span className="text-sm text-neutral-900">R$ 5.100</span>
                </div>
              </div>
            </div>

            {/* Simple Projection */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-neutral-900">Projeção Simples</h2>
                <button className="px-3 py-2 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-sm">
                  <i className="fa-solid fa-calendar mr-2"></i>Próx. 3 meses
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <span className="text-sm text-neutral-600">Maio 2025</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-lg text-neutral-900">R$ 52.000</span>
                      <span className="text-xs text-neutral-500">(projetado)</span>
                    </div>
                  </div>
                  <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                </div>

                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <span className="text-sm text-neutral-600">Junho 2025</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-lg text-neutral-900">R$ 54.000</span>
                      <span className="text-xs text-neutral-500">(projetado)</span>
                    </div>
                  </div>
                  <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                </div>

                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <span className="text-sm text-neutral-600">Julho 2025</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-lg text-neutral-900">R$ 56.000</span>
                      <span className="text-xs text-neutral-500">(projetado)</span>
                    </div>
                  </div>
                  <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 text-white rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Projetado (3 meses)</span>
                  <span className="text-xl">R$ 162.000</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Accounts Payable & Receivable */}
        <section id="accounts-section" className="mb-8 flex-shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Accounts Receivable */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-neutral-900 mb-1">Contas a Receber</h2>
                  <p className="text-sm text-neutral-500">Pendente</p>
                </div>
                <button onClick={() => { setType('income'); setIsModalOpen(true); }} className="px-3 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm">
                  <i className="fa-solid fa-plus mr-2"></i>Adicionar
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {transactions.filter(t => t.type === 'income' && t.status === 'pending').map(t => (
                  <div key={t.id} className="flex items-center justify-between p-4 border-2 border-neutral-200 rounded-lg hover:border-neutral-400 transition-all cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-neutral-900">{t.description}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-neutral-500">Lançado: {new Date(t.date).toLocaleDateString()}</span>
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">Pendente</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg text-neutral-900 ml-4 hidden sm:block">R$ {t.amount}</span>
                      <button onClick={(e) => { e.stopPropagation(); handlePay(t.id); }} className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                        Dar Baixa
                      </button>
                    </div>
                  </div>
                ))}
                {transactions.filter(t => t.type === 'income' && t.status === 'pending').length === 0 && (
                  <p className="text-sm text-neutral-400 py-4 text-center">Nenhuma conta a receber</p>
                )}
              </div>
            </div>

            {/* Accounts Payable */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-neutral-900 mb-1">Contas a Pagar</h2>
                  <p className="text-sm text-neutral-500">Pendente</p>
                </div>
                <button onClick={() => { setType('expense'); setIsModalOpen(true); }} className="px-3 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm">
                  <i className="fa-solid fa-plus mr-2"></i>Adicionar
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {transactions.filter(t => t.type === 'expense' && t.status === 'pending').map(t => (
                  <div key={t.id} className="flex items-center justify-between p-4 border-2 border-neutral-200 rounded-lg hover:border-neutral-400 transition-all cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-neutral-900">{t.description}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-neutral-500">Lançado: {new Date(t.date).toLocaleDateString()}</span>
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">Pendente</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg text-neutral-900 ml-4 hidden sm:block">R$ {t.amount}</span>
                      <button onClick={(e) => { e.stopPropagation(); handlePay(t.id); }} className="text-xs font-semibold px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors">
                        Dar Baixa
                      </button>
                    </div>
                  </div>
                ))}
                {transactions.filter(t => t.type === 'expense' && t.status === 'pending').length === 0 && (
                  <p className="text-sm text-neutral-400 py-4 text-center">Nenhuma conta a pagar</p>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Recent Transactions & Category Breakdown */}
        <section id="transactions-categories-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Transactions */}
            <div className="lg:col-span-2 bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-neutral-900">Transações Recentes</h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-sm">
                    <i className="fa-solid fa-filter mr-2"></i>Filtrar
                  </button>
                  <button className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg text-sm transition-colors">
                    Ver todas
                  </button>
                </div>
              </div>

              <div className="space-y-3 h-[400px] overflow-y-auto pr-2">
                {transactions.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-4 border-2 border-neutral-200 rounded-lg hover:border-neutral-400 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        {t.type === 'income' ? <i className="fa-solid fa-arrow-up text-green-600"></i> : <i className="fa-solid fa-arrow-down text-red-500"></i>}
                      </div>
                      <div>
                        <span className="text-sm text-neutral-900 block mb-1">{t.description}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-neutral-500">{new Date(t.date).toLocaleDateString()}</span>
                          <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">{t.status === 'paid' ? 'Efetivado' : 'Aberto'}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-lg ${t.type === 'income' ? 'text-green-600' : 'text-neutral-900'}`}>{t.type === 'income' ? '+' : '-'}R$ {t.amount}</span>
                  </div>
                ))}
                {transactions.length === 0 && <p className="text-sm text-neutral-400 text-center py-8">Nenhuma transação registrada.</p>}
              </div>

            </div>

            {/* Category Breakdown (Static Mock as requested for premium fidelity) */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-neutral-900">Categorias</h2>
                <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  <i className="fa-solid fa-gear"></i>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-neutral-900 rounded"></div>
                      <span className="text-sm text-neutral-700">Marketing</span>
                    </div>
                    <span className="text-sm text-neutral-900">R$ 8.400</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full">
                    <div className="w-2/5 h-2 bg-neutral-900 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-neutral-700 rounded"></div>
                      <span className="text-sm text-neutral-700">Serviços</span>
                    </div>
                    <span className="text-sm text-neutral-900">R$ 6.200</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full">
                    <div className="w-1/3 h-2 bg-neutral-700 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-neutral-500 rounded"></div>
                      <span className="text-sm text-neutral-700">Software</span>
                    </div>
                    <span className="text-sm text-neutral-900">R$ 4.850</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full">
                    <div className="w-1/4 h-2 bg-neutral-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-neutral-400 rounded"></div>
                      <span className="text-sm text-neutral-700">Impostos</span>
                    </div>
                    <span className="text-sm text-neutral-900">R$ 3.100</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full">
                    <div className="w-1/5 h-2 bg-neutral-400 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-neutral-300 rounded"></div>
                      <span className="text-sm text-neutral-700">Outros</span>
                    </div>
                    <span className="text-sm text-neutral-900">R$ 1.800</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full">
                    <div className="w-1/6 h-2 bg-neutral-300 rounded-full"></div>
                  </div>
                </div>

              </div>

              <button className="w-full py-3 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-sm">
                <i className="fa-solid fa-plus mr-2"></i>Nova Categoria
              </button>
            </div>

          </div>
        </section>

        {/* Integration Connections */}
        <section id="integrations-section" className="mt-8">
          <div className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl text-neutral-900 mb-1">Conexões & Atribuições</h2>
                <p className="text-sm text-neutral-500">Vincule custos de marketing e vendas às transações</p>
              </div>
              <button className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm">
                <i className="fa-solid fa-link mr-2"></i>Configurar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-white border-2 border-neutral-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-bullhorn text-neutral-700"></i>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-900 block">Campanhas Marketing</span>
                    <span className="text-xs text-neutral-500">3 ativas</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-600">Gasto total</span>
                  <span className="text-sm text-neutral-900">R$ 8.400</span>
                </div>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-chart-line text-neutral-700"></i>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-900 block">Pipeline Vendas</span>
                    <span className="text-xs text-neutral-500">10 fechados</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-600">Receita gerada</span>
                  <span className="text-sm text-neutral-900">R$ 54.200</span>
                </div>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-percentage text-neutral-700"></i>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-900 block">ROI Médio</span>
                    <span className="text-xs text-neutral-500">Últimos 30 dias</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-600">Retorno</span>
                  <span className="text-sm text-neutral-900">545%</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Transação">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-900 mb-1">Descrição</label>
              <input required value={desc} onChange={e => setDesc(e.target.value)} type="text" className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900 focus:outline-none" placeholder="Ex: Pagamento Fornecedor" />
            </div>
            <div>
              <label className="block text-sm text-neutral-900 mb-1">Valor (R$)</label>
              <input required value={amount} onChange={e => setAmount(e.target.value)} type="number" min="0" step="0.01" className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900 focus:outline-none" placeholder="150.00" />
            </div>
            <div>
              <label className="block text-sm text-neutral-900 mb-1">Tipo de Transação</label>
              <select value={type} onChange={e => setType(e.target.value as 'income' | 'expense')} className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900 focus:outline-none bg-white">
                <option value="income">Entrada a Receber (Receita)</option>
                <option value="expense">Saída a Pagar (Despesa)</option>
              </select>
            </div>
            <button type="submit" className="w-full mt-4 bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium">
              Salvar Lançamento (Fica Pendente)
            </button>
          </form>
        </Modal>

      </div>
    </div>
  );
};

export default Financeiro;
