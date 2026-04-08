import React from 'react';

const PresencaDigital: React.FC = () => {
  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full flex flex-col">
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
        
        {/* Page Header */}
        <section id="page-header-section" className="mb-8 flex-shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl text-neutral-900 mb-2">Presença Digital</h1>
              <p className="text-neutral-600">Gerencie sua presença online, ativos digitais e SEO básico</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-3 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-chart-simple mr-2"></i>Ver Relatório
              </button>
              <button className="px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap">
                <i className="fa-solid fa-plus mr-2"></i>Novo Ativo
              </button>
            </div>
          </div>
        </section>

        {/* Quick Status Overview */}
        <section id="status-overview-section" className="mb-8 flex-shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">Google Meu Negócio</span>
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-brands fa-google text-neutral-700"></i>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-neutral-900 rounded-full"></div>
                <span className="text-lg text-neutral-900">Ativo</span>
              </div>
              <span className="text-xs text-neutral-500">Última atualização: 2 dias atrás</span>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">Site/Landing Page</span>
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-globe text-neutral-700"></i>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-neutral-900 rounded-full"></div>
                <span className="text-lg text-neutral-900">Online</span>
              </div>
              <span className="text-xs text-neutral-500">SSL ativo • Domínio OK</span>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">SEO Score</span>
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-magnifying-glass text-neutral-700"></i>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl text-neutral-900">78/100</span>
              </div>
              <span className="text-xs text-neutral-500">Bom • 3 melhorias sugeridas</span>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">Tracking Pixels</span>
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-code text-neutral-700"></i>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg text-neutral-900">4 ativos</span>
              </div>
              <span className="text-xs text-neutral-500">Meta Pixel • GA4 • GTM • Hotjar</span>
            </div>

          </div>
        </section>

        {/* Digital Presence Checklist */}
        <section id="checklist-section" className="mb-8 flex-shrink-0">
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl text-neutral-900 mb-1">Checklist de Presença Digital</h2>
                <p className="text-sm text-neutral-500">Complete os itens essenciais para fortalecer sua presença online</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-600">Progresso:</span>
                <span className="text-lg text-neutral-900">12/15</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full h-3 bg-neutral-100 rounded-full">
                <div className="w-4/5 h-3 bg-neutral-900 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              <div className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-lg">
                <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-900 block mb-1">Google Meu Negócio configurado e verificado</span>
                  <span className="text-xs text-neutral-500">Concluído em 15/03/2025</span>
                </div>
                <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
              </div>

              <div className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-lg">
                <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-900 block mb-1">Domínio próprio registrado e ativo</span>
                  <span className="text-xs text-neutral-500">seudominio.com.br • Expira em 12/2026</span>
                </div>
                <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
              </div>

              <div className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-lg">
                <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-900 block mb-1">Site/Landing Page publicado</span>
                  <span className="text-xs text-neutral-500">https://seudominio.com.br</span>
                </div>
                <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
              </div>

              <div className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-lg">
                <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-900 block mb-1">Certificado SSL instalado (HTTPS)</span>
                  <span className="text-xs text-neutral-500">Válido até 08/2025</span>
                </div>
                <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
              </div>

              <div className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-lg">
                <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-900 block mb-1">Meta Tags (Title, Description) configuradas</span>
                  <span className="text-xs text-neutral-500">8 páginas com meta tags otimizadas</span>
                </div>
                <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
              </div>

              <div className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-lg">
                <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-900 block mb-1">Google Analytics 4 instalado</span>
                  <span className="text-xs text-neutral-500">ID: G-XXXXXXXXXX • Rastreando dados</span>
                </div>
                <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
              </div>

              <div className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-lg">
                <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-900 block mb-1">Meta Pixel (Facebook/Instagram) instalado</span>
                  <span className="text-xs text-neutral-500">ID: 123456789012345 • Ativo</span>
                </div>
                <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
              </div>

              <div className="flex items-center gap-4 p-4 border-2 border-neutral-400 rounded-lg bg-neutral-50">
                <div className="w-6 h-6 border-2 border-neutral-400 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-900 block mb-1">Schema Markup (dados estruturados) implementado</span>
                  <span className="text-xs text-neutral-500">Melhora resultados de busca</span>
                </div>
                <span className="px-3 py-1 bg-neutral-200 text-neutral-700 text-xs rounded">A fazer</span>
              </div>

              <div className="flex items-center gap-4 p-4 border-2 border-neutral-400 rounded-lg bg-neutral-50">
                <div className="w-6 h-6 border-2 border-neutral-400 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-900 block mb-1">Velocidade de carregamento otimizada</span>
                  <span className="text-xs text-neutral-500">Score atual: 65/100 • Meta: 90+</span>
                </div>
                <span className="px-3 py-1 bg-neutral-200 text-neutral-700 text-xs rounded">A fazer</span>
              </div>

            </div>
          </div>
        </section>

        {/* Digital Assets Management */}
        <section id="digital-assets-section" className="mb-8 flex-shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Domain & Hosting */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-neutral-900">Domínio & Hospedagem</h2>
                <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  <i className="fa-solid fa-gear"></i>
                </button>
              </div>

              <div className="space-y-4">
                
                <div className="p-4 border-2 border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-globe text-neutral-700"></i>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-900 block">seudominio.com.br</span>
                        <span className="text-xs text-neutral-500">Domínio principal</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">Ativo</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-500 block mb-1">Registrado em</span>
                      <span className="text-neutral-900">12/12/2024</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">Expira em</span>
                      <span className="text-neutral-900">12/12/2026</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">Registrador</span>
                      <span className="text-neutral-900">Registro.br</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">DNS Status</span>
                      <span className="text-neutral-900">Propagado</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-server text-neutral-700"></i>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-900 block">Hospedagem Cloud</span>
                        <span className="text-xs text-neutral-500">Plano Business</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">Ativo</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-500 block mb-1">Provedor</span>
                      <span className="text-neutral-900">HostGator</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">Renova em</span>
                      <span className="text-neutral-900">15/05/2025</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">Armazenamento</span>
                      <span className="text-neutral-900">8.5 GB / 50 GB</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">Uptime</span>
                      <span className="text-neutral-900">99.98%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-lock text-neutral-700"></i>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-900 block">Certificado SSL</span>
                        <span className="text-xs text-neutral-500">Let's Encrypt</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">Válido</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-500 block mb-1">Emitido em</span>
                      <span className="text-neutral-900">05/02/2025</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">Expira em</span>
                      <span className="text-neutral-900">05/08/2025</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">Auto-renovação</span>
                      <span className="text-neutral-900">Habilitada</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">Tipo</span>
                      <span className="text-neutral-900">DV SSL</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Tracking & Analytics */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-neutral-900">Pixels & Tags de Rastreamento</h2>
                <button className="px-3 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm">
                  <i className="fa-solid fa-plus mr-2"></i>Adicionar
                </button>
              </div>

              <div className="space-y-3 h-[500px] overflow-y-auto pr-2">
                
                <div className="p-4 border-2 border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <i className="fa-brands fa-google text-neutral-700"></i>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-900 block">Google Analytics 4</span>
                        <span className="text-xs text-neutral-500">ID: G-XXXXXXXXXX</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">Ativo</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Status do rastreamento</span>
                    <span className="text-neutral-900">Coletando dados</span>
                  </div>
                </div>

                <div className="p-4 border-2 border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <i className="fa-brands fa-meta text-neutral-700"></i>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-900 block">Meta Pixel (Facebook)</span>
                        <span className="text-xs text-neutral-500">ID: 123456789012345</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">Ativo</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Eventos configurados</span>
                    <span className="text-neutral-900">PageView, Lead, Purchase</span>
                  </div>
                </div>

                <div className="p-4 border-2 border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-tag text-neutral-700"></i>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-900 block">Google Tag Manager</span>
                        <span className="text-xs text-neutral-500">ID: GTM-XXXXXXX</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">Ativo</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Tags publicadas</span>
                    <span className="text-neutral-900">12 tags ativas</span>
                  </div>
                </div>

                <div className="p-4 border-2 border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <i className="fa-brands fa-linkedin text-neutral-700"></i>
                      </div>
                      <div>
                        <span className="text-sm text-neutral-900 block">LinkedIn Insight Tag</span>
                        <span className="text-xs text-neutral-500">ID: 987654</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded">Ativo</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Conversões rastreadas</span>
                    <span className="text-neutral-900">Lead form, Contact</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SEO Audit & Landing Page CTA */}
        <section id="seo-landing-section" className="mb-8 flex-shrink-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* SEO Simple Audit */}
            <div className="lg:col-span-2 bg-white border-2 border-neutral-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-neutral-900 mb-1">Auditoria SEO Simples</h2>
                  <p className="text-sm text-neutral-500">Principais itens de otimização para mecanismos de busca</p>
                </div>
                <button className="px-3 py-2 border-2 border-neutral-200 text-neutral-700 rounded-lg hover:border-neutral-400 transition-colors text-sm">
                  <i className="fa-solid fa-rotate mr-2"></i>Atualizar
                </button>
              </div>

              <div className="space-y-4">
                
                <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-white text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-900">Meta Tags Otimizadas</span>
                      <span className="px-2 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
                    </div>
                    <p className="text-xs text-neutral-600 mb-2">Title tags e meta descriptions configuradas em todas as páginas principais</p>
                    <span className="text-xs text-neutral-500">8/8 páginas otimizadas</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-white text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-900">Estrutura de URLs Limpa</span>
                      <span className="px-2 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
                    </div>
                    <p className="text-xs text-neutral-600 mb-2">URLs amigáveis e descritivas, sem caracteres especiais</p>
                    <span className="text-xs text-neutral-500">Padrão: /servicos/consultoria-digital</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-white text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-900">Heading Tags (H1, H2, H3)</span>
                      <span className="px-2 py-1 bg-neutral-900 text-white text-xs rounded">OK</span>
                    </div>
                    <p className="text-xs text-neutral-600 mb-2">Hierarquia correta de títulos em todas as páginas</p>
                    <span className="text-xs text-neutral-500">H1 único por página, H2-H6 bem estruturados</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border-2 border-neutral-300 rounded-lg">
                  <div className="w-8 h-8 border-2 border-neutral-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-exclamation text-neutral-600 text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-900">Schema Markup (Dados Estruturados)</span>
                      <span className="px-2 py-1 bg-neutral-200 text-neutral-700 text-xs rounded">A fazer</span>
                    </div>
                    <p className="text-xs text-neutral-600 mb-2">Implementar dados estruturados para melhorar resultados de busca</p>
                    <button className="text-xs text-neutral-900 underline hover:no-underline">Ver recomendações</button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border-2 border-neutral-300 rounded-lg">
                  <div className="w-8 h-8 border-2 border-neutral-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-exclamation text-neutral-600 text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-900">Velocidade de Carregamento</span>
                      <span className="px-2 py-1 bg-neutral-200 text-neutral-700 text-xs rounded">A fazer</span>
                    </div>
                    <p className="text-xs text-neutral-600 mb-2">Score atual: 65/100 • Otimizar imagens e scripts</p>
                    <button className="text-xs text-neutral-900 underline hover:no-underline">Ver sugestões de melhoria</button>
                  </div>
                </div>

              </div>
            </div>

            {/* Landing Page & Trackable Links CTA */}
            <div className="space-y-6">
              
              <div className="bg-neutral-900 text-white rounded-xl p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-file-lines text-neutral-900 text-xl"></i>
                  </div>
                  <h3 className="text-lg mb-2">Landing Page</h3>
                  <p className="text-sm text-neutral-300 mb-4">Crie ou edite sua página de captura com nosso editor visual</p>
                </div>
                <button className="w-full py-3 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors mb-2">
                  <i className="fa-solid fa-plus mr-2"></i>Criar Nova Landing Page
                </button>
                <button className="w-full py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors">
                  <i className="fa-solid fa-pen mr-2"></i>Editar Página Existente
                </button>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-xl p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-link text-neutral-900 text-xl"></i>
                  </div>
                  <h3 className="text-lg text-neutral-900 mb-2">Links Rastreáveis</h3>
                  <p className="text-sm text-neutral-600 mb-4">Gere links com UTMs para rastrear suas campanhas</p>
                </div>
                <button className="w-full py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors mb-3">
                  <i className="fa-solid fa-plus mr-2"></i>Criar Link Rastreável
                </button>
                
                <div className="pt-4 border-t-2 border-neutral-100">
                  <span className="text-xs text-neutral-500 block mb-3">Links recentes</span>
                  <div className="space-y-2">
                    <div className="p-2 bg-neutral-50 rounded text-xs">
                      <span className="text-neutral-900 block mb-1">Campanha Instagram</span>
                      <span className="text-neutral-500">utm_source=instagram</span>
                    </div>
                    <div className="p-2 bg-neutral-50 rounded text-xs">
                      <span className="text-neutral-900 block mb-1">Newsletter Abril</span>
                      <span className="text-neutral-500">utm_source=email</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default PresencaDigital;
