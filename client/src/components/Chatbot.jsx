import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Chatbot.css';

// Markdown-like text parsing
const parseMarkdownText = (text) => {
  // Bold text
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Unordered lists
  text = text.replace(/\* (.*?)(?=\n\*|\n\n|$)/g, (match, content) => {
    return `<ul><li>${content}</li></ul>`;
  });
  
  // Nested lists
  text = text.replace(/<ul><li>(.*?)<ul>/g, '<ul><li>$1<ul>');
  text = text.replace(/<\/ul>\s*<ul>/g, '');
  
  // Newlines to line breaks
  text = text.replace(/\n/g, '<br/>');
  
  return text;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Validate Gemini API key
  const validateApiKey = (key) => {
    if (!key) return false;
    
    const startsWithValidPrefix = key.startsWith('AIza');
    const hasReasonableLength = key.length > 30 && key.length < 50;
    
    return startsWithValidPrefix && hasReasonableLength;
  };

  // Gemini client initialization
  const [genAI, setGenAI] = useState(null);

  // Detailed API key validation on mount
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    
    console.group('Gemini API Key Validation');
    console.log('Raw API Key:', apiKey ? apiKey.substring(0, 10) + '...' : 'No key');
    console.log('Key Length:', apiKey?.length);
    
    if (!apiKey) {
      setError('No API key found. Please configure your Gemini API key in .env file.');
    } else if (!validateApiKey(apiKey)) {
      setError(`Invalid API key format. 
        Key must:
        - Start with 'AIza'
        - Be between 30-50 characters long
        Current key: ${apiKey.substring(0, 10)}... (Length: ${apiKey.length})`);
    } else {
      // Initialize Gemini client
      try {
        const generativeAI = new GoogleGenerativeAI(apiKey);
        setGenAI(generativeAI);
      } catch (err) {
        console.error('Gemini Client Initialization Error:', err);
        setError(`Failed to initialize Gemini client: ${err.message}`);
      }
    }
    
    console.groupEnd();
  }, []);

  // Send message to Gemini with comprehensive error handling and retry
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (!genAI) {
      setError('Gemini client not initialized. Check API key.');
      return;
    }

    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    const retryOptions = [0, 1000, 3000]; // Retry delays in milliseconds

    const attemptSend = async (retryIndex = 0) => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent(
          `You are an AI assistant for an energy efficiency optimization system in a smart city. 
          Provide helpful, concise, and technical responses about energy management. 
          User query: ${inputMessage}`
        );
        
        const response = await result.response.text();
        
        setMessages(prev => [
          ...prev, 
          { text: response, sender: 'ai' }
        ]);
      } catch (err) {
        console.error('Comprehensive Gemini API Error:', err);
        
        // Retry mechanism
        if (retryIndex < retryOptions.length) {
          console.log(`Retrying in ${retryOptions[retryIndex]}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryOptions[retryIndex]));
          return attemptSend(retryIndex + 1);
        }
        
        let errorMessage = 'An unexpected error occurred.';
        
        if (err.message) {
          errorMessage = err.message;
        }
        
        // Specific error handling for common Gemini API issues
        if (errorMessage.includes('internal error')) {
          errorMessage = 'Gemini API is experiencing issues. Please try again later.';
        }
        
        setError(`Failed to get response: ${errorMessage}`);
        
        setMessages(prev => [
          ...prev, 
          { text: `Error: ${errorMessage}`, sender: 'ai' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    await attemptSend();
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <FaRobot />
        </button>
      ) : (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Energy Management Assistant</h3>
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </div>
          
          {error && (
            <div className="chatbot-error">
              <FaExclamationTriangle /> {error}
            </div>
          )}
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.sender}`}
                dangerouslySetInnerHTML={{
                  __html: msg.sender === 'ai' 
                    ? parseMarkdownText(msg.text) 
                    : msg.text
                }}
              />
            ))}
            {isLoading && <div className="message ai">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about energy efficiency..."
              disabled={!!error || isLoading}
            />
            <button 
              onClick={sendMessage} 
              disabled={!!error || isLoading}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
