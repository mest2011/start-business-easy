import React, { useState } from 'react';

interface Props {
  onNext: (data: any) => void;
}

const StepAuth: React.FC<Props> = ({ onNext }) => {
  const [tab, setTab] = useState<'login' | 'cadastro'>('cadastro');

  return (
    <div className="w-full bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center">
              <i className="fa-solid fa-rocket text-white text-2xl"></i>
            </div>
            <span className="text-2xl text-neutral-900">EmpresaFácil</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-2 border-neutral-200 mb-8">
          <div className="grid grid-cols-2">
            <button 
              onClick={() => setTab('login')}
              className={`py-4 text-center transition-colors ${tab === 'login' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setTab('cadastro')}
              className={`py-4 text-center transition-colors ${tab === 'cadastro' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50'}`}
            >
              Cadastro
            </button>
          </div>
        </div>

        {/* Login Form */}
        {tab === 'login' && (
          <div className="border-2 border-neutral-200 p-8">
            <h2 className="text-2xl text-neutral-900 mb-2">Bem-vindo de volta</h2>
            <p className="text-neutral-600 mb-8">Entre para continuar sua jornada empreendedora</p>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext({}); }}>
              <div>
                <label className="block text-sm text-neutral-900 mb-2">E-mail</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-neutral-900 focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-900 mb-2">Senha</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-neutral-900 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-2 border-neutral-300" />
                  <span className="text-sm text-neutral-600">Lembrar de mim</span>
                </label>
                <a href="#" className="text-sm text-neutral-900 hover:underline">Esqueci minha senha</a>
              </div>

              <button type="submit" className="w-full py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors">
                Entrar
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-neutral-500">ou</span>
                </div>
              </div>

              <button type="button" className="w-full py-4 border-2 border-neutral-200 text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-3">
                <i className="fa-brands fa-google text-xl"></i>
                <span>Entrar com Google</span>
              </button>
            </form>
          </div>
        )}

        {/* Cadastro Form */}
        {tab === 'cadastro' && (
          <div className="border-2 border-neutral-200 p-8">
            <h2 className="text-2xl text-neutral-900 mb-2">Criar sua conta</h2>
            <p className="text-neutral-600 mb-8">Comece sua jornada empreendedora hoje</p>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext({}); }}>
              <div>
                <label className="block text-sm text-neutral-900 mb-2">Nome completo (opcional)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-neutral-900 focus:outline-none transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-900 mb-2">E-mail</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-neutral-900 focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-900 mb-2">Senha</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-neutral-900 focus:outline-none transition-colors"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-900 mb-2">Confirmar senha</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-neutral-900 focus:outline-none transition-colors"
                  placeholder="Digite a senha novamente"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 border-2 border-neutral-300 mt-0.5" />
                <span className="text-sm text-neutral-600">
                  Eu aceito os <a href="#" className="text-neutral-900 hover:underline">Termos de Uso</a> e a <a href="#" className="text-neutral-900 hover:underline">Política de Privacidade</a>
                </span>
              </label>

              <button type="submit" className="w-full py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors">
                Criar conta e continuar
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-neutral-500">ou</span>
                </div>
              </div>

              <button type="button" className="w-full py-4 border-2 border-neutral-200 text-neutral-900 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-3">
                <i className="fa-brands fa-google text-xl"></i>
                <span>Cadastrar com Google</span>
              </button>
            </form>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            Ao continuar, você concorda com nossos Termos e Política de Privacidade
          </p>
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

export default StepAuth;
