import React, { useState, useEffect, useRef } from 'react';

type MessageType = 'user' | 'agent';

interface Message {
  id: number;
  text: string;
  type: MessageType;
  timestamp: string;
}

const mockReplies = [
  "Certo. Entendi o contexto. Pode detalhar um pouco mais as métricas atuais que tem observado?",
  "Compreendo perfeitamente. Vamos avaliar isso junto ao seu gestor de conta.",
  "Muitos parceiros nossos têm essa mesma dúvida no começo. O ideal é manter pelo menos 2 meses de caixa para estabilidade.",
  "Interessante! Isso reflete uma melhora excelente no seu Funil de Vendas de fundo.",
  "Ok! Estarei documentando esse ponto. Há algo mais que eu deveria adicionar no seu histórico antes de fecharmos?",
];

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Seja bem-vindo ao Atendimento VIP do Empreendedor Digital. Como o nosso time de especialistas pode ajudá-lo a escalar ainda mais o seu projeto hoje?",
      type: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now(),
      text: inputValue,
      type: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Bot Typing Simulator (delay de 2 a 4 segundos)
    const replyDelay = Math.floor(Math.random() * 2000) + 1500;
    
    setTimeout(() => {
      const randomReplyIndex = Math.floor(Math.random() * mockReplies.length);
      const newAgentMsg: Message = {
        id: Date.now() + 1,
        text: mockReplies[randomReplyIndex],
        type: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newAgentMsg]);
      setIsTyping(false);
    }, replyDelay);
  };

  return (
    <div className="w-full px-4 lg:px-8 py-8 h-full flex flex-col">
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Chat Header */}
        <div className="px-6 py-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=Afonso_Consultor" alt="Atendente" className="w-12 h-12 rounded-full border-2 border-neutral-700 bg-white" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-neutral-900 rounded-full"></div>
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg leading-tight">Afonso (Consultor)</h2>
              <p className="text-neutral-400 text-xs flex items-center gap-1">
                <i className="fa-solid fa-bolt text-yellow-500"></i> Especialista em Growth
              </p>
            </div>
          </div>
          <div className="text-neutral-400 hidden sm:block text-sm">
            Tíquete #2093F5
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-6 bg-neutral-50 flex flex-col space-y-4">
          {messages.map(msg => {
            const isUser = msg.type === 'user';
            return (
              <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=Afonso_Consultor" alt="" className="w-8 h-8 rounded-full bg-white border border-neutral-200 mr-3 mt-auto mb-1 flex-shrink-0" />
                )}
                <div className={`max-w-[75%] lg:max-w-[60%] px-5 py-3 rounded-2xl shadow-sm relative group ${
                  isUser 
                    ? 'bg-neutral-900 text-white rounded-br-none' 
                    : 'bg-white text-neutral-800 border border-neutral-200 rounded-bl-none'
                }`}>
                  <p className="text-[15px] leading-relaxed">{msg.text}</p>
                  <span className={`text-[10px] mt-1.5 block select-none ${isUser ? 'text-neutral-400 text-right' : 'text-neutral-400'}`}>
                    {msg.timestamp} {isUser && <i className="fa-solid fa-check-double text-[10px] ml-1"></i>}
                  </span>
                </div>
              </div>
            );
          })}
          
          {/* Typing Indicator */}
          {isTyping && (
             <div className="flex w-full justify-start">
               <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=Afonso_Consultor" alt="" className="w-8 h-8 rounded-full bg-white border border-neutral-200 mr-3 mb-1 mt-auto flex-shrink-0 opacity-70" />
               <div className="px-5 py-4 bg-white border border-neutral-200 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                 <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                 <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                 <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="px-4 py-4 lg:px-6 lg:py-5 border-t border-neutral-200 bg-white">
          <form onSubmit={handleSend} className="flex items-center gap-3 relative">
            <button type="button" className="text-neutral-400 hover:text-neutral-600 p-2 transition-colors hidden sm:block">
              <i className="fa-solid fa-paperclip text-lg"></i>
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Descreva seu problema estratégico aqui..." 
              className="flex-1 bg-neutral-100 border-none px-5 py-3.5 rounded-full text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
              disabled={isTyping}
            />
             <button 
              type="submit" 
              disabled={!inputValue.trim() || isTyping}
              className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${
                inputValue.trim() && !isTyping ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-md' : 'bg-neutral-200 text-neutral-400'
              }`}
             >
               <i className="fa-solid fa-paper-plane"></i>
             </button>
          </form>
          <div className="text-center mt-3 text-[10px] text-neutral-400 hidden sm:block">
            Nossos consultores usam seus dados estritamente para alavancagem dos seus dashboards. Não compartilhe senhas completas.
          </div>
        </div>

      </div>
    </div>
  );
};

export default SupportChat;
