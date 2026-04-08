import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { SocialPost } from '../types';
import { Modal } from '../components/ui/Modal';
import { PageSkeleton } from '../components/ui/PageSkeleton';
import { downloadCSV } from '../utils/export';

const CalendarWidget: React.FC<{ posts: SocialPost[] }> = ({ posts }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: Array<{ day: number, isCurrent: boolean, isToday: boolean, scheduledPosts: number }> = [];

  const today = new Date();

  // Populate prev month tail
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, isCurrent: false, isToday: false, scheduledPosts: 0 });
  }

  // Populate current month
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate();
    
    // Calculate how many posts we have on this day
    const dayPosts = posts.filter(p => {
      if (!p.scheduledAt) return false;
      const d = new Date(p.scheduledAt);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === i;
    }).length;

    calendarDays.push({ day: i, isCurrent: true, isToday, scheduledPosts: dayPosts });
  }

  // Populate next month head to fill grid
  const remaining = Math.max(0, 35 - calendarDays.length); 
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, isCurrent: false, isToday: false, scheduledPosts: 0 });
  }

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-neutral-900">Calendário de Posts</h2>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="w-8 h-8 border-2 border-neutral-200 rounded-lg flex items-center justify-center hover:border-neutral-400 transition-colors">
            <i className="fa-solid fa-chevron-left text-neutral-600 text-sm"></i>
          </button>
          <span className="text-sm text-neutral-600 px-3">{capitalizedMonth}</span>
          <button onClick={nextMonth} className="w-8 h-8 border-2 border-neutral-200 rounded-lg flex items-center justify-center hover:border-neutral-400 transition-colors">
            <i className="fa-solid fa-chevron-right text-neutral-600 text-sm"></i>
          </button>
        </div>
      </div>

      <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          <div className="text-center text-xs text-neutral-500 py-2">DOM</div>
          <div className="text-center text-xs text-neutral-500 py-2">SEG</div>
          <div className="text-center text-xs text-neutral-500 py-2">TER</div>
          <div className="text-center text-xs text-neutral-500 py-2">QUA</div>
          <div className="text-center text-xs text-neutral-500 py-2">QUI</div>
          <div className="text-center text-xs text-neutral-500 py-2">SEX</div>
          <div className="text-center text-xs text-neutral-500 py-2">SAB</div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((c, idx) => (
            <div 
              key={idx} 
              className={`aspect-square p-2 border-2 ${c.isToday ? 'bg-neutral-900 border-neutral-900 text-white' : (c.isCurrent ? 'border-neutral-200 text-neutral-900 hover:border-neutral-400' : 'border-transparent text-neutral-400')} rounded-lg transition-colors text-xs text-center flex flex-col items-center justify-center relative cursor-pointer`}
            >
              <span className="font-medium">{c.day}</span>
              {c.scheduledPosts > 0 && (
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: Math.min(3, c.scheduledPosts) }).map((_, i) => (
                    <div key={i} className={`w-1 h-1 rounded-full ${c.isToday ? 'bg-white' : 'bg-neutral-700'}`}></div>
                  ))}
                  {c.scheduledPosts > 3 && <div className={`w-1 h-1 rounded-full ${c.isToday ? 'bg-white' : 'bg-neutral-700'}`} style={{ opacity: 0.5 }}></div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MidiasSociais: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'scheduled'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadPosts();
      setTimeout(() => setLoading(false), 800);
    };
    init();
  }, [filter]);

  const loadPosts = async () => {
    const data = await api.social.getPosts(filter);
    setPosts(data);
  };

  const handlePublishDraft = async (id: string) => {
    await api.social.publishDraft(id);
    loadPosts();
  };

  const handleExport = () => {
    downloadCSV(posts, 'Relatorio_Social');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    await api.social.createPost({
      title,
      content,
      status: 'draft',
      channels: ['instagram'] 
    });
    setIsModalOpen(false);
    setTitle('');
    setContent('');
    loadPosts();
  };

  if (loading) return <PageSkeleton />;

  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full">
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        {/* Page Header */}
        <section id="page-header-section" className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl text-neutral-900 mb-2">Gestão de Mídias Sociais</h1>
              <p className="text-neutral-600">Gerencie seus posts, interações e métricas em um só lugar</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExport}
                className="px-4 py-3 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-download mr-2"></i>Exportar
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-plus mr-2"></i>Criar Post
              </button>
            </div>
          </div>
        </section>

        {/* Channel Connection Status */}
        <section id="channel-status-section" className="mb-8">
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
            <h2 className="text-lg text-neutral-900 mb-4">Status de Conexão dos Canais</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              
              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-instagram text-xl text-neutral-700"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-neutral-500">Instagram</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                    <span className="text-xs text-neutral-900">Ativo</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-facebook text-xl text-neutral-700"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-neutral-500">Facebook</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                    <span className="text-xs text-neutral-900">Ativo</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-linkedin text-xl text-neutral-700"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-neutral-500">LinkedIn</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
                    <span className="text-xs text-neutral-500">Inativo</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-twitter text-xl text-neutral-700"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-neutral-500">Twitter</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
                    <span className="text-xs text-neutral-500">Inativo</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-tiktok text-xl text-neutral-700"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-neutral-500">TikTok</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                    <span className="text-xs text-neutral-900">Ativo</span>
                  </div>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-neutral-300 rounded-lg hover:border-neutral-400 transition-colors">
                <i className="fa-solid fa-plus text-neutral-400"></i>
                <span className="text-xs text-neutral-600">Adicionar</span>
              </button>

            </div>
          </div>
        </section>

        {/* Metrics Overview */}
        <section id="metrics-section" className="mb-8">
          <h2 className="text-xl text-neutral-900 mb-4">Métricas Básicas (Últimos 7 dias)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-eye text-xl text-neutral-700"></i>
                </div>
                <span className="text-xs text-neutral-500">Total</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">24.8k</div>
              <div className="text-sm text-neutral-600 mb-3">Alcance</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                <span className="text-neutral-700">+18%</span>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-heart text-xl text-neutral-700"></i>
                </div>
                <span className="text-xs text-neutral-500">Total</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">1.2k</div>
              <div className="text-sm text-neutral-600 mb-3">Engajamento</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                <span className="text-neutral-700">+12%</span>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-comment text-xl text-neutral-700"></i>
                </div>
                <span className="text-xs text-neutral-500">Total</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">89</div>
              <div className="text-sm text-neutral-600 mb-3">Comentários</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-down text-neutral-700"></i>
                <span className="text-neutral-700">-5%</span>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-user-plus text-xl text-neutral-700"></i>
                </div>
                <span className="text-xs text-neutral-500">Total</span>
              </div>
              <div className="text-3xl text-neutral-900 mb-2">147</div>
              <div className="text-sm text-neutral-600 mb-3">Novos Seguidores</div>
              <div className="flex items-center gap-2 text-sm">
                <i className="fa-solid fa-arrow-up text-neutral-700"></i>
                <span className="text-neutral-700">+22%</span>
              </div>
            </div>

          </div>
        </section>

        {/* Main Content Grid */}
        <section id="main-content-grid" className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Calendar & Posts List */}
            <div className="lg:col-span-2 space-y-8">
              
              <CalendarWidget posts={posts} />

              {/* Dynamic Posts */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-neutral-900">Posts Recentes</h2>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <button onClick={() => setFilter('all')} className={`px-3 py-2 rounded-lg text-xs transition-colors shrink-0 ${filter === 'all' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>Todos</button>
                    <button onClick={() => setFilter('draft')} className={`px-3 py-2 rounded-lg text-xs transition-colors shrink-0 ${filter === 'draft' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>Rascunhos</button>
                    <button onClick={() => setFilter('published')} className={`px-3 py-2 rounded-lg text-xs transition-colors shrink-0 ${filter === 'published' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>Publicados</button>
                    <button onClick={() => setFilter('scheduled')} className={`px-3 py-2 rounded-lg text-xs transition-colors shrink-0 ${filter === 'scheduled' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>Agendados</button>
                  </div>
                </div>
                
                {loading ? (
                  <div className="p-8 text-center text-neutral-500">
                    <i className="fa-solid fa-spinner fa-spin text-2xl mb-2"></i>
                    <p>Carregando posts...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.length === 0 && (
                      <div className="p-8 text-center text-neutral-500 bg-neutral-50 rounded-xl border-2 border-neutral-200">
                        Nenhum post encontrado para este filtro.
                      </div>
                    )}
                    {posts.map(post => (
                      <div key={post.id} className="bg-white border-2 border-neutral-200 rounded-xl p-5 hover:border-neutral-400 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fa-solid fa-image text-neutral-400"></i>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-sm text-neutral-900 font-semibold mb-1">{post.title}</h3>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 text-xs rounded font-medium ${
                                    post.status === 'published' ? 'bg-green-100 text-green-700' :
                                    post.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                    'bg-neutral-100 text-neutral-700'
                                  }`}>
                                    {post.status === 'draft' ? 'RASCUNHO' : post.status.toUpperCase()}
                                  </span>
                                  {post.scheduledAt && <span className="text-xs text-neutral-500">{new Date(post.scheduledAt).toLocaleDateString()}</span>}
                                </div>
                              </div>
                              {post.status === 'draft' && (
                                <button onClick={() => handlePublishDraft(post.id)} className="text-xs text-blue-600 hover:underline">
                                  Publicar Agora
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-neutral-600 mb-3">{post.content}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                {post.channels.map(c => (
                                  <i key={c} className={`fa-brands fa-${c} text-sm text-neutral-500`}></i>
                                ))}
                              </div>
                              {post.metrics && (
                                <div className="flex items-center gap-4 text-xs text-neutral-500">
                                  <span><i className="fa-solid fa-eye mr-1"></i>{post.metrics.views}</span>
                                  <span><i className="fa-solid fa-heart mr-1"></i>{post.metrics.likes}</span>
                                  <span><i className="fa-solid fa-comment mr-1"></i>{post.metrics.comments}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Inbox & Quick Actions */}
            <div className="space-y-8">
              
              {/* Inbox */}
              <div>
                <h2 className="text-xl text-neutral-900 mb-4">Caixa de Entrada</h2>
                <div className="bg-white border-2 border-neutral-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <button className="flex-1 px-3 py-2 bg-neutral-900 text-white rounded-lg text-xs">Comentários (12)</button>
                    <button className="flex-1 px-3 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg text-xs transition-colors">DMs (5)</button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
                      <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=2341" alt="User" className="w-10 h-10 rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-sm text-neutral-900 truncate">@maria.silva</h4>
                          <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">2h</span>
                        </div>
                        <p className="text-xs text-neutral-600 line-clamp-2">Adorei esse conteúdo! Quando vai ter mais dicas assim?</p>
                        <div className="flex items-center gap-2 mt-2">
                          <i className="fa-brands fa-instagram text-xs text-neutral-400"></i>
                          <span className="text-xs text-neutral-400">Post: Dicas de produtividade</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-xs">
                    Ver todas as mensagens
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl text-neutral-900 mb-4">Ações Rápidas</h2>
                <div className="space-y-3">
                  
                  <button onClick={() => setIsModalOpen(true)} className="w-full p-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors text-left flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-plus text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-sm mb-1">Criar Novo Post</h3>
                      <p className="text-xs text-neutral-400">Publique em todos os canais</p>
                    </div>
                  </button>

                  <button className="w-full p-4 bg-white border-2 border-neutral-200 rounded-xl hover:border-neutral-400 transition-colors text-left flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-calendar text-neutral-700"></i>
                    </div>
                    <div>
                      <h3 className="text-sm text-neutral-900 mb-1">Agendar Post</h3>
                      <p className="text-xs text-neutral-500">Planeje seu calendário</p>
                    </div>
                  </button>

                  <button className="w-full p-4 bg-white border-2 border-neutral-200 rounded-xl hover:border-neutral-400 transition-colors text-left flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-robot text-neutral-700"></i>
                    </div>
                    <div>
                      <h3 className="text-sm text-neutral-900 mb-1">IA: Sugerir Conteúdo</h3>
                      <p className="text-xs text-neutral-500">Ideias personalizadas</p>
                    </div>
                  </button>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Modal Structure Maintained */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Rascunho">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-900 mb-1">Título</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900 focus:outline-none" placeholder="Ex: Aviso aos Clientes" />
            </div>
            <div>
              <label className="block text-sm text-neutral-900 mb-1">Conteúdo</label>
              <textarea required value={content} onChange={e => setContent(e.target.value)} rows={4} className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900 focus:outline-none" placeholder="Mensagem do post..."></textarea>
            </div>
            <button type="submit" className="w-full mt-4 bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium">
              Salvar como Rascunho
            </button>
          </form>
        </Modal>

      </div>
    </div>
  );
};

export default MidiasSociais;
