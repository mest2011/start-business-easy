import React from 'react';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
}

const StepRegisterMEI: React.FC<Props> = ({ onNext, onBack }) => {

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ type: 'MEI' }); // Pass collected form data here
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
                <i className="fa-solid fa-user text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl text-neutral-900">Cadastro MEI</h1>
                <p className="text-neutral-600">Microempreendedor Individual</p>
              </div>
            </div>
            <p className="text-neutral-600">Preencha os dados abaixo para iniciar seu cadastro. Você pode salvar como rascunho a qualquer momento.</p>
          </div>

          <form onSubmit={handleContinue}>
            
            {/* Dados Pessoais Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-neutral-200">
                <i className="fa-solid fa-id-card text-neutral-900 text-xl"></i>
                <h2 className="text-xl text-neutral-900">Dados Pessoais</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-900 text-sm mb-2">CPF <span className="text-neutral-600">*</span></label>
                  <input type="text" placeholder="000.000.000-00" className="w-full border-2 border-neutral-200 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors" />
                </div>
                <div>
                  <label className="block text-neutral-900 text-sm mb-2">RG <span className="text-neutral-600">*</span></label>
                  <input type="text" placeholder="00.000.000-0" className="w-full border-2 border-neutral-200 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors" />
                </div>
                <div>
                  <label className="block text-neutral-900 text-sm mb-2">Data de Nascimento <span className="text-neutral-600">*</span></label>
                  <input type="text" placeholder="DD/MM/AAAA" className="w-full border-2 border-neutral-200 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors" />
                </div>
              </div>
            </div>

            {/* Endereço Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-neutral-200">
                <i className="fa-solid fa-location-dot text-neutral-900 text-xl"></i>
                <h2 className="text-xl text-neutral-900">Endereço</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-neutral-900 text-sm mb-2">CEP <span className="text-neutral-600">*</span></label>
                    <input type="text" placeholder="00000-000" className="w-full border-2 border-neutral-200 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-900 text-sm mb-2">Logradouro <span className="text-neutral-600">*</span></label>
                  <input type="text" placeholder="Rua, Avenida, etc." className="w-full border-2 border-neutral-200 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors" />
                </div>
              </div>
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

export default StepRegisterMEI;
