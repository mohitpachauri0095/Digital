import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hi! I'm the AI Notice Assistant. Ask me anything about the recent college notices.", 
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [studentType, setStudentType] = useState('General');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { text: userMsg, isBot: false, timestamp: currentTime }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: userMsg, studentType });
      setMessages(prev => [...prev, { 
        text: response.data.reply, 
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Server error, please try again later", 
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-college-primary hover:bg-college-secondary text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center animate-bounce"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col h-[500px] max-h-[80vh] overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom-8 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-college-primary to-blue-700 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Digital Assistant</h3>
                <p className="text-xs text-blue-100">AI Powered Notice Q&A</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-blue-100 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex max-w-[85%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'} gap-2 items-end`}>
                  
                  {msg.isBot && (
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot size={14} className="text-blue-600" />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <div 
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        msg.isBot 
                          ? 'bg-white text-slate-800 rounded-bl-none border border-slate-100' 
                          : 'bg-college-primary text-white rounded-br-none'
                      }`}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {msg.text}
                    </div>
                    {msg.timestamp && (
                      <span className={`text-[10px] text-slate-400 ${msg.isBot ? 'text-left ml-1' : 'text-right mr-1'}`}>
                        {msg.timestamp}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-end">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mb-1">
                    <Bot size={14} className="text-blue-600" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 flex flex-col gap-2">
            <select 
              value={studentType} 
              onChange={(e) => setStudentType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-college-secondary outline-none transition-shadow"
            >
              <option value="General">General Student</option>
              <option value="B.Tech">B.Tech Student</option>
              <option value="MCA">MCA Student</option>
              <option value="MBA">MBA Student</option>
            </select>
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about notices..."
                className="flex-1 bg-slate-100 border-none outline-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 transition-shadow"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-college-primary hover:bg-college-secondary disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-2 rounded-full flex items-center justify-center transition-colors h-10 w-10 flex-shrink-0"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
