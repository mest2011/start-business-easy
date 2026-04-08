import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { UserProfile } from '../types';

const UserProfileArea: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [segment, setSegment] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    const data = await api.user.getProfile();
    setProfile(data);
    setName(data.name);
    setEmail(data.email);
    setBusinessName(data.businessName);
    setSegment(data.segment);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await api.user.updateProfile({ name, email, businessName, segment });
    setSaving(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
    // Reload to ensure state is synchronized globally if needed
    window.dispatchEvent(new Event('profileUpdated'));
  };

  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full">
      <div className="w-full max-w-4xl mx-auto">
        <section className="mb-8">
          <h1 className="text-3xl lg:text-4xl text-neutral-900 mb-2">Meu Perfil</h1>
          <p className="text-neutral-600">Gerencie seus dados pessoais e as configurações da sua empresa.</p>
        </section>

        {loading ? (
          <div className="p-12 text-center text-neutral-500">
            <i className="fa-solid fa-spinner fa-spin text-3xl mb-2"></i>
          </div>
        ) : (
          <div className="bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-8 border-b border-neutral-100 flex items-center gap-6">
              <img src={profile?.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-neutral-100" />
              <div>
                <h2 className="text-xl font-bold text-neutral-900">{profile?.name}</h2>
                <p className="text-neutral-500">{profile?.email}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Plano Premium (Ativo)
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-8">
              {/* Personal Data */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 border-b border-neutral-100 pb-2">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Nome Completo</label>
                    <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">E-mail Profissional</label>
                    <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none" />
                  </div>
                </div>
              </div>

              {/* Business Data */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 border-b border-neutral-100 pb-2">Informações da Empresa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Nome Fantasia / Razão Social</label>
                    <input required value={businessName} onChange={e => setBusinessName(e.target.value)} type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Segmento de Atuação</label>
                    <select required value={segment} onChange={e => setSegment(e.target.value)} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none transition-colors bg-white">
                      <option value="Software & SaaS">Software & SaaS</option>
                      <option value="Serviços Profissionais">Serviços Profissionais</option>
                      <option value="E-commerce">E-commerce e Varejo</option>
                      <option value="Saúde & Bem Estar">Saúde & Bem Estar</option>
                      <option value="Marketing E Agência">Marketing E Agência</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
                <div className="text-sm font-medium text-green-600 transition-opacity duration-300" style={{ opacity: successMsg ? 1 : 0 }}>
                  <i className="fa-solid fa-check mr-2"></i>Alterações salvas com sucesso!
                </div>
                <button type="submit" disabled={saving} className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium flex items-center gap-2 disabled:opacity-70">
                  {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-save"></i>} 
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileArea;
