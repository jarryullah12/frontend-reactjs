import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageCircle, MoreVertical, Paperclip } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const SupportChat: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: 1, text: t('chat.welcome'), sender: 'agent', timestamp: new Date() }]);
  }, [t]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newMessage: Message = { id: Date.now(), text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const agentMessage: Message = { id: Date.now() + 1, text: t('chat.agentResponse'), sender: 'agent', timestamp: new Date() };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-10">
         <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="bg-blue-600 p-2 rounded-full">
                  <MessageCircle className="w-6 h-6 text-white" />
               </div>
               <div><h1 className="font-bold text-lg">{t('chat.title')}</h1></div>
            </div>
         </div>
      </div>
      <div className="flex-1 max-w-3xl mx-auto w-full p-4 flex flex-col overflow-hidden">
         <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
               {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`p-4 rounded-2xl text-sm shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-gray-100'}`}>
                        {msg.text}
                     </div>
                  </div>
               ))}
               <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
               <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder={t('chat.placeholder')} className="flex-1 border rounded-full px-4 py-2 focus:ring-blue-500 outline-none" />
               <button type="submit" className="p-3 bg-blue-600 text-white rounded-full"><Send className="w-4 h-4" /></button>
            </form>
         </div>
      </div>
    </div>
  );
};

export default SupportChat;