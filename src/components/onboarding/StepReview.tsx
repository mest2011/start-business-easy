import React, { useState } from 'react';

interface Props {
  data: any;
  onNext: () => void;
  onBack: () => void;
}

const StepReview: React.FC<Props> = ({ data, onNext, onBack }) => {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onNext(); // Redireciona
      }, 2000);
    }, 1500);
  };

  return (
    <div className="w-full bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center">
              <i className="fa-solid fa-rocket text-white text-2xl"></i>
            </div>
            <span className="text-2xl text-neutral-900">EmpresaFácil</span>
          </div>
        </div>

        {/* Main Container */}
        <div className="border-2 border-neutral-200 p-8 sm:p-12 relative">
          
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-neutral-900 flex items-center justify-center">
                <i className="fa-solid fa-clipboard-check text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl text-neutral-900">Revisão Final</h1>
                <p className="text-neutral-600">Confira todos os dados antes de finalizar a configuração</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <div className="border-2 border-neutral-200">
              <div className="bg-neutral-50 border-b-2 border-neutral-200 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-building text-neutral-900 text-xl"></i>
                  <h2 className="text-xl text-neutral-900">Dados da Empresa</h2>
                </div>
                <button type="button" onClick={onBack} className="px-6 py-2 border-2 border-neutral-900 text-neutral-900 text-sm hover:bg-neutral-900 hover:text-white transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-pen text-sm"></i>
                  <span>Editar</span>
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-neutral-500 text-xs mb-1">Status da Empresa</p>
                    <p className="text-neutral-900 text-sm">{data.companyStatus === 'has-cnpj' ? 'Empresa Existente' : 'Nova Empresa'}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-xs mb-1">Tipo de Empresa</p>
                    <p className="text-neutral-900 text-sm">{data.companyType || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={onBack} className="flex-1 py-4 border-2 border-neutral-200 text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-left"></i>
              <span>Voltar para Edição</span>
            </button>
            <button 
              type="button" 
              onClick={handleFinish}
              disabled={loading}
              className="flex-1 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-75"
            >
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid fa-check-circle"></i>
              )}
              <span>Finalizar Configuração</span>
            </button>
          </div>

          {/* Success Confirmation Modal */}
          {success && (
            <div className="absolute inset-0 bg-white/95 flex items-center justify-center z-10">
              <div className="bg-white border-2 border-neutral-900 p-12 max-w-lg w-full text-center shadow-2xl">
                <div className="w-20 h-20 bg-neutral-900 mx-auto flex items-center justify-center mb-6">
                  <i className="fa-solid fa-check text-white text-4xl"></i>
                </div>
                <h2 className="text-3xl text-neutral-900 mb-4">Configuração Finalizada!</h2>
                <p className="text-neutral-600 mb-8">Sua solicitação foi enviada com sucesso. Você será redirecionado em instantes.</p>
                <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Redirecionando para o Dashboard...</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default StepReview;
