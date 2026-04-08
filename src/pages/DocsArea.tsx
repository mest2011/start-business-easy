import React from 'react';

const DocsArea: React.FC = () => {
  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full">
      <div className="w-full max-w-4xl mx-auto bg-white border-2 border-neutral-200 rounded-2xl p-8 lg:p-12 prose prose-neutral max-w-none">
        
        <div className="flex items-center gap-3 text-neutral-500 mb-6 border-b border-neutral-200 pb-6">
          <i className="fa-solid fa-book-open text-3xl text-neutral-900"></i>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 m-0 leading-tight">Documentação do Empreendedor</h1>
            <p className="m-0 text-sm mt-1">Versão 2.1 • Atualizado há 1 dia</p>
          </div>
        </div>

        <div className="space-y-8 text-neutral-700">
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3 border-l-4 border-neutral-900 pl-3">Visão Geral</h2>
            <p className="mb-4 text-justify">
              O ecossistema "Empreendedor Digital" foi idealizado como um Painel SPA (Single Page Application) moderno e de alta performance. 
              Criado nativamente sobre a fundação React + TypeScript + Vite, ele elimina inteiramente o carregamento de páginas durante a troca de módulos, 
              o que maximiza a imersão e o engajamento na construção do seu império digital.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3 border-l-4 border-neutral-900 pl-3">Módulos do Sistema</h2>
            
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 mb-4">
              <h3 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-camera-retro text-neutral-500"></i> Mídias Sociais
              </h3>
              <p className="text-sm">Centraliza postagens, rascunhos e gestão de canais. Um atalho formidável contra o bloqueio criativo.</p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 mb-4">
              <h3 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-filter text-neutral-500"></i> Funil de Vendas
              </h3>
              <p className="text-sm">Trabalha transições dinâmicas de estados de Lead (Negociação - Fechamento). Os Cards iterativos dão visão de gargalos em tempo real.</p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
              <h3 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-dollar-sign text-neutral-500"></i> Painel Financeiro
              </h3>
              <p className="text-sm">Traz automação matemática aos lançamentos mensais. Além disso integra sistema de exportação em `.csv` validado de modo bruto com Browser-Storage.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-3 border-l-4 border-neutral-900 pl-3">Integrações Futuras (Back-end)</h2>
            <p className="mb-4 text-justify">
              No momento, nossa API (`src/services/api/index.ts`) trabalha baseada em um emulador robusto nativo via promises. 
              Sua arquitetura é padronizada REST. Uma eventual migração para <strong>NodeJS</strong> + <strong>Express</strong> ou <strong>GoLang</strong>
              demanda zero re-design e se adapta perfeitamente apenas trocando o objeto <code>localStorage</code> ativo para *fetch/axios interceptors* de ponta.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default DocsArea;
