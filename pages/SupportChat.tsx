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
<<<<<<< HEAD
    setMessages([{ id: 1, text: t('chat.welcome'), sender: 'agent', timestamp: new Date() }]);
  }, [t]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
=======
    // Initial welcome message
    setMessages([
      {
        id: 1,
        text: t('chat.welcome'),
        sender: 'agent',
        timestamp: new Date()
      }
    ]);
  }, [t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
<<<<<<< HEAD
    const newMessage: Message = { id: Date.now(), text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const agentMessage: Message = { id: Date.now() + 1, text: t('chat.agentResponse'), sender: 'agent', timestamp: new Date() };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
=======

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Agent Response
    setTimeout(() => {
      const responses = [
        "I understand. Could you please provide your tracking number?",
        "Our team is currently looking into available vehicles for your route.",
        "Yes, we offer express delivery services to that location.",
        "Is there anything else I can help you with regarding your shipment?",
        "Let me connect you with a specialist for hazardous goods transport."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const agentMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'agent',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 2000);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-10">
         <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
<<<<<<< HEAD
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
=======
               <div className="relative">
                  <div className="bg-orange-500 p-2 rounded-full">
                     <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
               </div>
               <div>
                  <h1 className="font-bold text-lg">{t('chat.title')}</h1>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                     {t('chat.online')}
                  </p>
               </div>
            </div>
            <button className="text-slate-300 hover:text-white">
               <MoreVertical className="w-5 h-5" />
            </button>
         </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full p-4 flex flex-col">
         <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
               <div className="text-center">
                  <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full">
                     {new Date().toLocaleDateString()}
                  </span>
               </div>
               
               {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                           <User className={`w-4 h-4 ${msg.sender === 'user' ? 'text-orange-600' : 'text-blue-600'}`} />
                        </div>
                        <div>
                           <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                              msg.sender === 'user' 
                                 ? 'bg-orange-600 text-white rounded-tr-none' 
                                 : 'bg-white text-slate-800 rounded-tl-none border border-gray-100'
                           }`}>
                              {msg.text}
                           </div>
                           <span className={`text-xs text-gray-400 mt-1 block ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
               
               {isTyping && (
                  <div className="flex justify-start">
                     <div className="flex flex-row gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                           <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                           <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                           <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                           <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                     </div>
                  </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
               <div className="flex items-center gap-2">
                  <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                     <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                     type="text"
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     placeholder={t('chat.placeholder')}
                     className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-slate-900 placeholder-gray-500"
                  />
                  <button 
                     type="submit"
                     disabled={!inputValue.trim()}
                     className="p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:hover:bg-orange-600 transition-colors shadow-sm"
                  >
                     <Send className="w-5 h-5" />
                  </button>
               </div>
            </form>
         </div>
         <p className="text-center text-xs text-gray-400 mt-4">
            Spedition Askari Support Team typically replies in under 2 minutes.
         </p>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      </div>
    </div>
  );
};

export default SupportChat;