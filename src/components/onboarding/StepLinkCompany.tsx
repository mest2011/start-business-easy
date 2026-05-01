import React, { useState } from 'react';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
}

const StepLinkCompany: React.FC<Props> = ({ onNext, onBack }) => {
  const [cnpj, setCnpj] = useState('');
  const [method, setMethod] = useState<'email' | 'sms'>('email');

  const isValidated = true; // cnpj.length > 10;

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
              <i className="fa-solid fa-link text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl sm:text-4xl text-neutral-900 mb-4">Vincular CNPJ Existente</h1>
            <p className="text-neutral-600 text-lg">Preencha os dados da sua empresa para vincular à plataforma</p>
          </div>

          {/* Form */}
          <form className="space-y-6 mb-8" onSubmit={(e) => { e.preventDefault(); onNext({ cnpj }); }}>
            
            {/* CNPJ Field */}
            <div>
              <label className="block text-neutral-900 mb-2">
                CNPJ <span className="text-neutral-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-building text-neutral-400"></i>
                </div>
                <input 
                  type="text" 
                  value={cnpj}
                  onChange={e => setCnpj(e.target.value)}
                  placeholder="00.000.000/0000-00"
                  className="w-full border-2 border-neutral-200 py-3 pl-12 pr-4 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
            </div>

            {isValidated && (
              <div className="bg-neutral-50 border-2 border-neutral-200 p-4">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-neutral-600 mt-1"></i>
                  <div>
                    <h4 className="text-neutral-900 mb-1">CNPJ validado com sucesso</h4>
                    <p className="text-neutral-700 text-sm">Empresa encontrada e dados carregados automaticamente.</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-neutral-900 mb-2">
                Razão Social <span className="text-neutral-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-file-signature text-neutral-400"></i>
                </div>
                <input 
                  type="text" 
                  value={isValidated ? "EMPRESA SIMULADA LTDA" : ""}
                  placeholder="Preenchido automaticamente após validação"
                  className="w-full border-2 border-neutral-200 py-3 pl-12 pr-4 bg-neutral-50 text-neutral-500 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-900 mb-3">
                Método de Verificação <span className="text-neutral-600">*</span>
              </label>
              
              <div className="space-y-3">
                <label className="block cursor-pointer group">
                  <input type="radio" checked={method === 'email'} onChange={() => setMethod('email')} className="peer hidden" />
                  <div className={`border-2 p-4 transition-all ${method === 'email' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${method === 'email' ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-300'}`}>
                          <div className={`w-2.5 h-2.5 bg-white rounded-full ${method === 'email' ? 'block' : 'hidden'}`}></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="fa-solid fa-envelope text-neutral-900"></i>
                          <h4 className="text-neutral-900">Código por E-mail</h4>
                        </div>
                        <p className="text-sm text-neutral-600">Enviaremos um código de 6 dígitos para o e-mail cadastrado</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="block cursor-pointer group">
                  <input type="radio" checked={method === 'sms'} onChange={() => setMethod('sms')} className="peer hidden" />
                  <div className={`border-2 p-4 transition-all ${method === 'sms' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${method === 'sms' ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-300'}`}>
                          <div className={`w-2.5 h-2.5 bg-white rounded-full ${method === 'sms' ? 'block' : 'hidden'}`}></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="fa-solid fa-mobile-screen text-neutral-900"></i>
                          <h4 className="text-neutral-900">Código por SMS</h4>
                        </div>
                        <p className="text-sm text-neutral-600">Enviaremos um código de 6 dígitos para o celular cadastrado</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="button" 
                onClick={onBack}
                className="flex-1 py-4 border-2 border-neutral-200 text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Voltar</span>
              </button>
              <button 
                type="submit" 
                disabled={!isValidated}
                className="flex-1 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Validar e Continuar</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default StepLinkCompany;
