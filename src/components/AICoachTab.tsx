import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { GoogleGenAI } from '@google/genai';
import { motion } from 'framer-motion';

interface Props {
  chatHistory: ChatMessage[];
  onSendMessage: (message: ChatMessage) => void;
  language: 'ar' | 'fr';
}

export function AICoachTab({ chatHistory, onSendMessage, language }: Props) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAr = language === 'ar';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };
    
    onSendMessage(userMsg);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      
      const contents = chatHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: input }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents as any,
        config: {
          systemInstruction: isAr 
            ? 'أنت مدرب ذكاء اصطناعي متخصص في مساعدة الأشخاص على الإقلاع عن التدخين. قدم نصائح قصيرة، مشجعة، وعملية. استخدم العلاج السلوكي المعرفي (CBT) عند الحاجة. تحدث باللغة العربية.'
            : 'Vous êtes un coach IA spécialisé pour aider les gens à arrêter de fumer. Donnez des conseils courts, encourageants et pratiques. Utilisez la thérapie cognitivo-comportementale (TCC) si nécessaire. Parlez en français.'
        }
      });

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || '',
        timestamp: new Date().toISOString()
      };
      
      onSendMessage(aiMsg);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: isAr ? 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.' : 'Désolé, une erreur de connexion s\'est produite. Veuillez réessayer.',
        timestamp: new Date().toISOString()
      };
      onSendMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] glass-panel rounded-3xl overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-slate-800/50 flex items-center gap-4 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-50 animate-pulse"></div>
          <div className="w-12 h-12 bg-slate-900 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 relative z-10">
            <Bot size={24} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
            <Sparkles size={8} className="text-white" />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">{isAr ? 'المدرب الذكي' : 'Coach IA'}</h2>
          <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">{isAr ? 'متصل الآن' : 'En ligne'}</p>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10 hide-scrollbar">
        {chatHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
            <Bot size={48} className="text-slate-500 mb-4" />
            <p className="text-slate-400 text-sm max-w-[80%]">
              {isAr ? 'مرحباً! أنا مدربك الذكي. كيف يمكنني مساعدتك اليوم في رحلة إقلاعك؟' : "Bonjour ! Je suis votre coach IA. Comment puis-je vous aider aujourd'hui dans votre démarche d'arrêt ?"}
            </p>
          </div>
        )}
        
        {chatHistory.map((msg, idx) => (
          <motion.div 
            key={msg.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-sm' 
                : 'bg-slate-800 border border-white/5 text-slate-200 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-white/5 text-emerald-400 rounded-2xl rounded-tl-sm p-4 text-sm flex gap-1 items-center h-12">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-slate-800/80 backdrop-blur-md relative z-10">
        <div className="flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Écrivez votre message ici...'}
            className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-500"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-xl disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors flex items-center justify-center w-12 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:shadow-none"
          >
            <Send size={20} className={isAr ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
