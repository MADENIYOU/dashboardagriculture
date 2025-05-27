'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const ChatAgricole = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello ! Je suis Agri-Chat. Que souhaites-tu savoit aujourd\'hui ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll automatique vers le bas
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/agri-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.ok) throw new Error('Erreur API');

      const data = await response.json();
      const aiMessage: Message = {
        role: 'assistant',
        content: data.choices[0]?.message?.content || "Désolé, je n'ai pas pu comprendre."
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erreur:', error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Une erreur est survenue. Veuillez réessayer.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-semibold">Agro-Chat</span>
          <button className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Recherche"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div>
          <p className="text-sm mb-2">Toutes les discussions</p>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 p-4 border-b border-gray-700">
          <h2 className="text-2xl font-semibold">Bonjour, Cher Passionné d'agriculture</h2>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 p-4 overflow-y-auto bg-gray-900"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`rounded-lg px-4 py-2 max-w-xs md:max-w-md lg:max-w-lg ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#4CAF50] via-[#F9A825] to-[#A0522D] text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 sticky bottom-16">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question sur l'agriculture sénégalaise..."
              className="w-full h-16 px-4 py-2 rounded-lg bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              disabled={loading}
            />
            <div className="absolute bottom-0 right-0 flex space-x-2 mr-4 mb-4">
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors text-sm"
              >
                Envoyer
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ChatAgricole;