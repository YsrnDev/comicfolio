import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'GREETINGS CITIZEN! I am the Portfolio Assistant. Ask me anything about the developer!', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    // Format history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendMessageToGemini(userMsg.text, history);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-comic-dark border-4 border-white w-80 md:w-96 h-[500px] mb-4 shadow-[8px_8px_0px_0px_#000] flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-200">
          {/* Header */}
          <div className="bg-comic-accent p-3 border-b-4 border-white flex justify-between items-center">
            <h3 className="text-black font-bold comic-font text-xl uppercase">Holocomm Link</h3>
            <button onClick={toggleChat} className="text-black font-bold hover:text-white text-2xl leading-none">&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`
                    max-w-[85%] p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]
                    ${msg.role === 'user' 
                      ? 'bg-comic-secondary text-black rounded-tl-xl rounded-tr-xl rounded-bl-xl' 
                      : 'bg-white text-black rounded-tr-xl rounded-br-xl rounded-bl-xl'
                    }
                  `}
                >
                  <p className="font-bold marker-font text-sm md:text-base">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-2 border-2 border-black">
                   <span className="animate-pulse font-bold text-black">DECODING SIGNAL...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-comic-panel border-t-4 border-white">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about skills..."
                className="flex-1 bg-black border-2 border-white text-white px-3 py-2 outline-none focus:border-comic-accent font-mono text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-comic-accent text-black border-2 border-black px-3 font-bold hover:bg-yellow-300 disabled:opacity-50"
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={toggleChat}
        className="group relative bg-comic-alert text-black w-16 h-16 flex items-center justify-center border-4 border-white shadow-[6px_6px_0px_0px_#000] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_#000] transition-all rounded-full"
      >
         <span className="comic-font text-3xl font-bold">{isOpen ? 'X' : '?'}</span>
         {/* Speech bubble hint */}
         {!isOpen && (
           <div className="absolute right-full mr-4 bg-white text-black px-3 py-1 border-2 border-black whitespace-nowrap hidden group-hover:block comic-font">
             NEED INTEL?
             <div className="absolute top-1/2 left-full w-0 h-0 border-t-[8px] border-t-transparent border-l-[8px] border-l-black border-b-[8px] border-b-transparent transform -translate-y-1/2"></div>
           </div>
         )}
      </button>
    </div>
  );
};