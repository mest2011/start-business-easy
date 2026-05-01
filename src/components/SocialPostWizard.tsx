import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from './ui/Modal';

// Mocks
const MOCK_TRENDS = [
  { id: '1', hashtag: '#SustentabilidadeModa', volume: '128K posts', engagement: '8.4%', trend: '+245%', networks: ['instagram', 'tiktok'] },
  { id: '2', hashtag: '#LookDoDia', volume: '94K posts', engagement: '12.1%', trend: '+189%', networks: ['instagram', 'facebook'] },
  { id: '3', hashtag: '#TendênciasPrimavera', volume: '76K posts', engagement: '9.8%', trend: '+156%', networks: ['instagram', 'pinterest'] },
  { id: '4', hashtag: '#ModaConsciente', volume: '62K posts', engagement: '11.2%', trend: '+134%', networks: ['instagram', 'linkedin'] },
];

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: 'fa-instagram', color: 'text-pink-600', formats: ['Feed', 'Stories', 'Reels'] },
  { id: 'facebook', name: 'Facebook', icon: 'fa-facebook', color: 'text-blue-600', formats: ['Post', 'Stories'] },
  { id: 'linkedin', name: 'LinkedIn', icon: 'fa-linkedin', color: 'text-blue-700', formats: ['Post', 'Artigo'] },
  { id: 'tiktok', name: 'TikTok', icon: 'fa-tiktok', color: 'text-black', formats: ['Vídeo Curto'] },
];

interface WizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SocialPostWizard: React.FC<WizardProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({});
  
  // Content states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // reset on open/close
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedTrend(null);
      setSelectedPlatforms({ instagram: true }); // default
      setTitle('');
      setContent('');
      setScheduleDate('');
    }
  }, [isOpen]);

  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (status: 'draft' | 'published' | 'scheduled') => {
    if (!title || !content) return;
    setIsSubmitting(true);
    try {
      const channels = Object.entries(selectedPlatforms).filter(([_, isSelected]) => isSelected).map(([id]) => id);
      
      const finalStatus = status === 'published' && scheduleDate ? 'scheduled' : status;

      await api.social.createPost({
        title,
        content,
        status: finalStatus,
        channels: channels.length > 0 ? channels : ['instagram'],
        scheduledAt: scheduleDate ? new Date(scheduleDate).toISOString() : undefined
      });
      onSuccess();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Steps
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg text-neutral-900 font-medium">Galeria de Tendências & Insights</h3>
        <p className="text-sm text-neutral-500">Selecione uma tendência do seu nicho para inspirar seu post.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_TRENDS.map(trend => (
          <div 
            key={trend.id} 
            onClick={() => setSelectedTrend(trend.id)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${selectedTrend === trend.id ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-hashtag text-neutral-400"></i>
                <span className="text-neutral-900 font-medium">{trend.hashtag.replace('#', '')}</span>
              </div>
              <span className="text-xs bg-neutral-900 text-white px-2 py-1 rounded">{trend.trend}</span>
            </div>
            <div className="space-y-2 mb-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Volume</span>
                <span className="text-neutral-900">{trend.volume}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Engajamento</span>
                <span className="text-neutral-900">{trend.engagement}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {trend.networks.map(n => (
                <span key={n} className="text-xs bg-neutral-100 px-2 py-1 rounded uppercase flex items-center gap-1">
                  <i className={`fa-brands fa-${n}`}></i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg text-neutral-900 font-medium">Seleção de Plataformas</h3>
        <p className="text-sm text-neutral-500">Escolha onde seu conteúdo será publicado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLATFORMS.map(platform => {
          const isSelected = selectedPlatforms[platform.id] || false;
          return (
            <div 
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${isSelected ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-neutral-200 shadow-sm`}>
                    <i className={`fa-brands ${platform.icon} text-xl ${isSelected ? platform.color : 'text-neutral-400'}`}></i>
                  </div>
                  <div>
                    <h4 className="text-neutral-900 font-medium">{platform.name}</h4>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-neutral-900 border-neutral-900' : 'border-neutral-300'}`}>
                  {isSelected && <i className="fa-solid fa-check text-white text-xs"></i>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {platform.formats.map(fmt => (
                  <span key={fmt} className={`text-xs px-2 py-1 rounded ${isSelected ? 'bg-white border border-neutral-200 text-neutral-700' : 'bg-neutral-100 text-neutral-400'}`}>
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg text-neutral-900 font-medium">Editor de Conteúdo</h3>
        <p className="text-sm text-neutral-500">Crie o conteúdo do seu post.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-neutral-900 mb-1">Título Interno (para organização)</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            type="text" 
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none" 
            placeholder="Ex: Campanha de Primavera" 
          />
        </div>
        
        <div>
          <label className="block text-sm text-neutral-900 mb-1">Conteúdo do Post</label>
          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            rows={5} 
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none" 
            placeholder="Escreva a legenda aqui... Use hashtags para aumentar o alcance."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm text-neutral-900 mb-1">Mídia</label>
          <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 flex flex-col items-center justify-center text-neutral-500 hover:bg-neutral-50 hover:border-neutral-400 transition-colors cursor-pointer">
            <i className="fa-solid fa-cloud-arrow-up text-3xl mb-2"></i>
            <span className="text-sm font-medium text-neutral-900 mt-2">Clique para fazer upload</span>
            <span className="text-xs">Imagens ou vídeos (max 50MB)</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const selectedCount = Object.values(selectedPlatforms).filter(Boolean).length;
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg text-neutral-900 font-medium">Revisão e Agendamento</h3>
          <p className="text-sm text-neutral-500">Confirme os dados antes de publicar.</p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-4">
          <div>
            <span className="text-xs text-neutral-500 block mb-1">Plataformas Selecionadas</span>
            <div className="flex gap-2">
              {Object.entries(selectedPlatforms).filter(([_, v]) => v).map(([id]) => (
                <span key={id} className="text-sm bg-white border border-neutral-200 px-3 py-1 rounded-full capitalize">
                  {id}
                </span>
              ))}
              {selectedCount === 0 && <span className="text-sm text-red-500">Nenhuma plataforma selecionada</span>}
            </div>
          </div>
          
          <div>
            <span className="text-xs text-neutral-500 block mb-1">Conteúdo ({content.length} caracteres)</span>
            <p className="text-sm text-neutral-900 bg-white border border-neutral-200 p-3 rounded-lg whitespace-pre-wrap">
              {content || <span className="text-neutral-400 italic">Sem conteúdo</span>}
            </p>
          </div>

          <div>
            <label className="block text-sm text-neutral-900 mb-1">Data e Hora da Publicação</label>
            <input 
              type="datetime-local" 
              value={scheduleDate}
              onChange={e => setScheduleDate(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none bg-white"
            />
            <p className="text-xs text-neutral-500 mt-1">Deixe em branco para publicar imediatamente.</p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            disabled={isSubmitting || !title || !content}
            onClick={() => handleSubmit('draft')}
            className="flex-1 py-3 border border-neutral-300 rounded-lg text-neutral-700 font-medium hover:bg-neutral-50 disabled:opacity-50 transition-colors"
          >
            Salvar Rascunho
          </button>
          <button 
            disabled={isSubmitting || !title || !content || selectedCount === 0}
            onClick={() => handleSubmit('published')}
            className="flex-1 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Aguarde...' : (scheduleDate ? 'Agendar Post' : 'Publicar Agora')}
          </button>
        </div>
      </div>
    );
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Criar Post - Passo 1 de 4";
      case 2: return "Criar Post - Passo 2 de 4";
      case 3: return "Criar Post - Passo 3 de 4";
      case 4: return "Criar Post - Passo 4 de 4";
      default: return "Criar Post";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getStepTitle()} maxWidth="max-w-3xl">
      <div className="min-h-[400px] flex flex-col">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-between">
          {step > 1 ? (
            <button onClick={handlePrev} className="px-6 py-2 border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors">
              Voltar
            </button>
          ) : (
            <div></div> /* Spacer */
          )}
          
          {step < 4 && (
            <button onClick={handleNext} className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
              Continuar
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
