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
      content: 'Bonjour ! Je suis un expert en agriculture sénégalaise. Posez-moi vos questions.'
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
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-bl from-green-300 via-yellow-300 to-red-300 p-4 text-white">
        <h2 className="font-semibold">Assistant Agricole Sénégalais</h2>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 p-4 space-y-4 bg-gray-50 overflow-y-auto"
        style={{ maxHeight: '60vh' }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-lg px-4 py-2 max-w-xs md:max-w-md lg:max-w-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-[#4CAF50] via-[#F9A825] to-[#A0522D]  text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question sur l'agriculture sénégalaise..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors text-sm"
          >
            Envoyer
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Posez des questions sur les cultures, techniques ou marchés agricoles au Sénégal
        </p>
      </div>
    </div>
  );
};

export default ChatAgricole;