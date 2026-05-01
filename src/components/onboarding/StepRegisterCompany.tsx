import React, { useState } from 'react';

interface Props {
  type: 'ME' | 'SLU' | 'LTDA';
  onNext: (data: any) => void;
  onBack: () => void;
}

const StepRegisterCompany: React.FC<Props> = ({ type, onNext, onBack }) => {

  const [expanded, setExpanded] = useState<number>(1);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ type }); // Pass collected form data here
  };

  return (
    <div className="w-full bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center">
              <i className="fa-solid fa-rocket text-white text-2xl"></i>
            </div>
            <span className="text-2xl text-neutral-900">EmpresaFácil</span>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="border-2 border-neutral-200 p-8 sm:p-12">
          
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-neutral-900 flex items-center justify-center">
                <i className="fa-solid fa-building text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl text-neutral-900">Cadastro {type}</h1>
                <p className="text-neutral-600">Preencha os dados da empresa e anexe a documentação necessária.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleContinue}>
            
            {/* Accordion 1: Dados da Empresa */}
            <div className="mb-6 border-2 border-neutral-200">
              <button 
                type="button" 
                onClick={() => setExpanded(1)}
                className={`w-full p-6 flex items-center justify-between transition-colors ${expanded === 1 ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900 hover:bg-neutral-50 border-b-2 border-neutral-200'}`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-building text-xl"></i>
                  <span className="text-lg">1. Dados da Empresa</span>
                </div>
                <i className={`fa-solid ${expanded === 1 ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
              </button>
              
              {expanded === 1 && (
                <div className="p-6 bg-white">
                  <div className="mb-6">
                    <label className="block text-neutral-900 text-sm mb-2">Razão Social <span className="text-neutral-600">*</span></label>
                    <input type="text" placeholder="Nome completo da empresa" className="w-full border-2 border-neutral-200 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-neutral-900 text-sm mb-2">Nome Fantasia</label>
                    <input type="text" placeholder="Nome comercial" className="w-full border-2 border-neutral-200 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors" />
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Sócios */}
            <div className="mb-6 border-2 border-neutral-200">
              <button 
                type="button" 
                onClick={() => setExpanded(2)}
                className={`w-full p-6 flex items-center justify-between transition-colors ${expanded === 2 ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900 hover:bg-neutral-50 border-b-2 border-neutral-200'}`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-users text-xl"></i>
                  <span className="text-lg">2. Sócios/Administrador</span>
                </div>
                <i className={`fa-solid ${expanded === 2 ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
              </button>
              
              {expanded === 2 && (
                <div className="p-6 bg-white">
                  <p className="text-sm text-neutral-600 mb-4">Adicione os dados dos sócios aqui.</p>
                  <button type="button" className="w-full py-4 border-2 border-dashed border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
                    <i className="fa-solid fa-plus"></i>
                    <span>Adicionar Sócio</span>
                  </button>
                </div>
              )}
            </div>

            {/* Accordion 3: Capital Social */}
            <div className="mb-6 border-2 border-neutral-200">
              <button 
                type="button" 
                onClick={() => setExpanded(3)}
                className={`w-full p-6 flex items-center justify-between transition-colors ${expanded === 3 ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900 hover:bg-neutral-50 border-b-2 border-neutral-200'}`}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-coins text-xl"></i>
                  <span className="text-lg">3. Capital Social</span>
                </div>
                <i className={`fa-solid ${expanded === 3 ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
              </button>
              
              {expanded === 3 && (
                <div className="p-6 bg-white">
                  <div className="mb-6">
                    <label className="block text-neutral-900 text-sm mb-2">Capital Social Total (R$) <span className="text-neutral-600">*</span></label>
                    <input type="text" placeholder="0,00" className="w-full border-2 border-neutral-200 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors" />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button type="button" onClick={onBack} className="flex-1 py-4 border-2 border-neutral-200 text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
                <i className="fa-solid fa-arrow-left"></i>
                <span>Voltar</span>
              </button>
              <button type="submit" className="flex-1 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                <span>Continuar para Revisão</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default StepRegisterCompany;
