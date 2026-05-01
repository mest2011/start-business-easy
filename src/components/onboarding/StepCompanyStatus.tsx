import React, { useState } from 'react';

interface Props {
  onNext: (status: 'has-cnpj' | 'need-to-open') => void;
  onBack: () => void;
}

const StepCompanyStatus: React.FC<Props> = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState<'has-cnpj' | 'need-to-open' | null>(null);

  return (
    <div className="w-full bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center">
              <i className="fa-solid fa-rocket text-white text-2xl"></i>
            </div>
            <span className="text-2xl text-neutral-900">EmpresaFácil</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="border-2 border-neutral-200 p-8 sm:p-12">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-building text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl sm:text-4xl text-neutral-900 mb-4">Você já possui empresa?</h1>
            <p className="text-neutral-600 text-lg">Selecione a opção que melhor descreve sua situação atual</p>
          </div>

          {/* Decision Cards */}
          <div className="space-y-4 mb-8">
            
            {/* Option 1: Already has CNPJ */}
            <label className="block cursor-pointer group">
              <input 
                type="radio" 
                name="company-status" 
                value="has-cnpj" 
                checked={selected === 'has-cnpj'}
                onChange={() => setSelected('has-cnpj')}
                className="peer hidden" 
              />
              <div className={`border-2 p-6 sm:p-8 transition-all ${selected === 'has-cnpj' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors ${selected === 'has-cnpj' ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-300 group-hover:border-neutral-400'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full ${selected === 'has-cnpj' ? 'block' : 'hidden'}`}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <i className="fa-solid fa-check-circle text-2xl text-neutral-900"></i>
                      <h3 className="text-xl text-neutral-900">Sim, já tenho CNPJ</h3>
                    </div>
                    <p className="text-neutral-600 mb-4">Minha empresa já está formalizada e possuo um CNPJ ativo. Quero vincular minha empresa existente à plataforma.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm border border-neutral-200">Vinculação rápida</span>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm border border-neutral-200">Sem burocracia</span>
                    </div>
                  </div>
                </div>
              </div>
            </label>

            {/* Option 2: Need to open/regularize */}
            <label className="block cursor-pointer group">
              <input 
                type="radio" 
                name="company-status" 
                value="need-to-open" 
                checked={selected === 'need-to-open'}
                onChange={() => setSelected('need-to-open')}
                className="peer hidden" 
              />
              <div className={`border-2 p-6 sm:p-8 transition-all ${selected === 'need-to-open' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors ${selected === 'need-to-open' ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-300 group-hover:border-neutral-400'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full ${selected === 'need-to-open' ? 'block' : 'hidden'}`}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <i className="fa-solid fa-plus-circle text-2xl text-neutral-900"></i>
                      <h3 className="text-xl text-neutral-900">Não, vou abrir ou regularizar</h3>
                    </div>
                    <p className="text-neutral-600 mb-4">Ainda não tenho empresa formalizada ou preciso regularizar minha situação. Quero abrir uma nova empresa com suporte completo.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm border border-neutral-200">Abertura guiada</span>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm border border-neutral-200">Assessoria completa</span>
                    </div>
                  </div>
                </div>
              </div>
            </label>

          </div>

          {/* Help Text */}
          <div className="bg-neutral-50 border-2 border-neutral-200 p-6 mb-8">
            <div className="flex items-start gap-4">
              <i className="fa-solid fa-circle-info text-neutral-600 text-xl mt-1"></i>
              <div>
                <h4 className="text-neutral-900 mb-2">Precisa de ajuda para decidir?</h4>
                <p className="text-neutral-600 text-sm mb-3">Se você já possui um CNPJ ativo, selecione a primeira opção. Caso contrário, ou se está em dúvida sobre sua situação, escolha a segunda opção e nosso time irá te orientar.</p>
                <a href="#" className="text-neutral-900 text-sm hover:underline inline-flex items-center gap-2">
                  <span>Falar com um especialista</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onBack}
              type="button" 
              className="flex-1 py-4 border-2 border-neutral-200 text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>Voltar</span>
            </button>
            <button 
              onClick={() => selected && onNext(selected)}
              disabled={!selected}
              type="button" 
              className="flex-1 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Continuar</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Dados Criptografados</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-lock"></i>
            <span>Conexão Segura</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StepCompanyStatus;
