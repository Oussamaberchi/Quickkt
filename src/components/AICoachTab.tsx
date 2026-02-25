import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { ChatMessage } from '../types';
import { GoogleGenAI } from '@google/genai';

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
      // @ts-ignore
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      
      // Format history for Gemini
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
    <div className="flex flex-col h-[65vh] bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-emerald-50 dark:bg-emerald-900/20 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-300">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="font-bold text-slate-800 dark:text-white">{isAr ? 'المدرب الذكي' : 'Coach IA'}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{isAr ? 'متواجد دائماً لدعمك' : 'Toujours là pour vous soutenir'}</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 && (
          <div className="text-center text-slate-500 dark:text-slate-400 mt-10 text-sm">
            {isAr ? 'مرحباً! أنا مدربك الذكي. كيف يمكنني مساعدتك اليوم في رحلة إقلاعك؟' : "Bonjour ! Je suis votre coach IA. Comment puis-je vous aider aujourd'hui dans votre démarche d'arrêt ?"}
          </div>
        )}
        {chatHistory.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-500 text-white rounded-tr-none' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-none p-3 text-sm flex gap-1">
              <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Écrivez votre message ici...'}
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 dark:text-white transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-emerald-500 text-white p-3 rounded-xl disabled:opacity-50 transition-opacity"
          >
            <Send size={18} className={isAr ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
