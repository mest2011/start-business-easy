import React from 'react';

interface Props {
  onNext: (type: 'MEI' | 'ME' | 'SLU' | 'LTDA') => void;
  onBack: () => void;
}

const StepSelectType: React.FC<Props> = ({ onNext, onBack }) => {

  const OptionCard = ({ title, sub, icon, complexity, onClick, details }: any) => (
    <div 
      onClick={onClick}
      className="border-2 border-neutral-200 hover:border-neutral-900 transition-all cursor-pointer group"
    >
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
              <i className={`fa-solid ${icon} text-white text-xl`}></i>
            </div>
            <div>
              <h3 className="text-2xl text-neutral-900">{title}</h3>
              <p className="text-sm text-neutral-600">{sub}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {details.map((d: string, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-neutral-900 text-sm mt-1"></i>
              <p className="text-neutral-900 text-sm">{d}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-neutral-600">Complexidade:</span>
          <div className="flex gap-1">
            <div className={`w-8 h-2 ${complexity >= 1 ? 'bg-neutral-900' : 'bg-neutral-200'}`}></div>
            <div className={`w-8 h-2 ${complexity >= 2 ? 'bg-neutral-900' : 'bg-neutral-200'}`}></div>
            <div className={`w-8 h-2 ${complexity >= 3 ? 'bg-neutral-900' : 'bg-neutral-200'}`}></div>
          </div>
        </div>

        <button className="w-full py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
          <span>Cadastrar como {title}</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center">
              <i className="fa-solid fa-rocket text-white text-2xl"></i>
            </div>
            <span className="text-2xl text-neutral-900">EmpresaFácil</span>
          </div>
        </div>

        <div className="border-2 border-neutral-200 p-8 sm:p-12">
          
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-building text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl sm:text-4xl text-neutral-900 mb-4">Escolha o Tipo de Empresa</h1>
            <p className="text-neutral-600 text-lg mb-4">Selecione a categoria que melhor se adequa ao seu negócio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <OptionCard 
              title="MEI" 
              sub="Microempreendedor Individual" 
              icon="fa-user" 
              complexity={1} 
              onClick={() => onNext('MEI')}
              details={['Faturamento até R$ 81.000/ano', 'Sem sócios permitidos', 'Máximo de 1 funcionário', 'Tributação simplificada (DAS)']}
            />
            <OptionCard 
              title="ME" 
              sub="Microempresa" 
              icon="fa-briefcase" 
              complexity={2} 
              onClick={() => onNext('ME')}
              details={['Faturamento até R$ 360.000/ano', 'Permite sócios', 'Sem limite de funcionários', 'Simples Nacional disponível']}
            />
            <OptionCard 
              title="SLU" 
              sub="Sociedade Limitada Unipessoal" 
              icon="fa-user-tie" 
              complexity={2} 
              onClick={() => onNext('SLU')}
              details={['Sem limite de faturamento', 'Apenas 1 sócio (titular único)', 'Patrimônio separado', 'Não exige capital mínimo']}
            />
            <OptionCard 
              title="LTDA" 
              sub="Sociedade Limitada" 
              icon="fa-users" 
              complexity={3} 
              onClick={() => onNext('LTDA')}
              details={['Sem limite de faturamento', '2 ou mais sócios', 'Responsabilidade limitada', 'Ideal para negócios em sociedade']}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onBack}
              type="button" 
              className="flex-1 py-4 border-2 border-neutral-200 text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>Voltar</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StepSelectType;
