import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';

const mockNotifications = [
  { id: 1, title: 'Nova venda!', message: 'Você fechou um negócio de R$ 6.000.', time: 'Agora', read: false, icon: 'fa-solid fa-money-bill-wave text-green-500' },
  { id: 2, title: 'Lead entrou no Funil', message: 'João Silva foi adicionado.', time: 'Há 2 min', read: false, icon: 'fa-solid fa-user-plus text-blue-500' },
  { id: 3, title: 'Campanha de Ads Ativa', message: 'Google Ads consumiu R$ 120 do budget.', time: 'Há 1 hora', read: true, icon: 'fa-solid fa-bullhorn text-yellow-500' },
];

const DashboardLayout: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  const navigate = useNavigate();

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div id="dashboard-central-screen" className="w-full bg-white min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header id="header" className="w-full bg-neutral-900 border-b-2 border-neutral-800">
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-rocket text-neutral-900"></i>
                </div>
                <span className="text-white text-lg hidden lg:block">Empreendedor Digital</span>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-1">
              <NavLink 
                to="/dashboard" 
                end
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white text-neutral-900' : 'text-neutral-300 hover:text-white'}`
                }>
                Dashboard Central
              </NavLink>
              <NavLink 
                to="/dashboard/midias-sociais"
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white text-neutral-900' : 'text-neutral-300 hover:text-white'}`
                }>
                Mídias Sociais
              </NavLink>
              <NavLink 
                to="/dashboard/marketing"
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white text-neutral-900' : 'text-neutral-300 hover:text-white'}`
                }>
                Marketing
              </NavLink>
              <NavLink 
                to="/dashboard/vendas"
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white text-neutral-900' : 'text-neutral-300 hover:text-white'}`
                }>
                Vendas/Funil
              </NavLink>
              <NavLink 
                to="/dashboard/financeiro"
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white text-neutral-900' : 'text-neutral-300 hover:text-white'}`
                }>
                Planejamento Financeiro
              </NavLink>
              <NavLink 
                to="/dashboard/presenca"
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white text-neutral-900' : 'text-neutral-300 hover:text-white'}`
                }>
                Presença Digital
              </NavLink>
            </nav>

            <div className="flex items-center gap-4">
              {/* Notifications Dropdown */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-neutral-700 transition-colors relative"
                >
                  <i className="fa-solid fa-bell text-neutral-300"></i>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-neutral-900 flex items-center justify-center text-[9px] text-white font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
                      <h3 className="font-semibold text-neutral-900 text-sm">Notificações</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:underline">Marcar lidas</button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-neutral-500 text-sm">Tudo limpo por aqui!</div>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} className={`p-4 border-b border-neutral-50 hover:bg-neutral-50 transition-colors flex gap-3 ${!notif.read ? 'bg-blue-50/20' : ''}`}>
                            <div className="mt-0.5">
                              <i className={notif.icon}></i>
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${!notif.read ? 'font-semibold text-neutral-900' : 'text-neutral-700'}`}>{notif.title}</p>
                              <p className="text-xs text-neutral-500 mt-1">{notif.message}</p>
                              <p className="text-[10px] text-neutral-400 mt-1.5 font-medium">{notif.time}</p>
                            </div>
                            {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>}
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-2 border-t border-neutral-100 bg-neutral-50/50 rounded-b-xl text-center">
                      <button className="text-xs text-neutral-600 font-medium hover:text-neutral-900 w-full py-1">Ver todas as atividades</button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="w-10 h-10 rounded-lg overflow-hidden border-2 border-transparent hover:border-neutral-500 transition-colors focus:outline-none focus:border-white"
                >
                  <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=4782" alt="User" className="w-full h-full object-cover" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-neutral-100 mb-1">
                      <p className="text-xs text-neutral-500 font-medium">Logado como</p>
                      <p className="text-sm text-neutral-900 font-bold truncate">Empreendedor</p>
                    </div>
                    <Link 
                      to="/dashboard/perfil" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      <i className="fa-solid fa-user w-5 text-center mr-2 text-neutral-400"></i> Meu Perfil
                    </Link>
                    <button 
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/welcome');
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-neutral-50 transition-colors text-left"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center mr-2 text-red-400"></i> Sair da Conta
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
      <footer id="footer" className="w-full bg-neutral-900 border-t-2 border-neutral-800 px-4 lg:px-8 py-8 mt-auto">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-rocket text-neutral-900 text-sm"></i>
              </div>
              <span className="text-neutral-400 text-sm">© 2025 Empreendedor Digital</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/dashboard/ajuda" className="text-neutral-400 hover:text-white text-sm transition-colors">Ajuda</Link>
              <Link to="/dashboard/docs" className="text-neutral-400 hover:text-white text-sm transition-colors">Documentação</Link>
              <Link to="/dashboard/suporte" className="text-neutral-400 hover:text-white text-sm transition-colors">Suporte</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
