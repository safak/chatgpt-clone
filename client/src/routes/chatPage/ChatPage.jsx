import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chatPage.css';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    
    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    // Focus input on load
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!input.trim()) return;
        
        // Add user message
        const userMessage = { text: input, isUser: true, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        try {
            // Get conversation history (last 10 messages)
            const history = messages.slice(-10);
            
            // Call the active listener endpoint
            const response = await axios.post('http://localhost:3001/api/active-listener', {
                message: input,
                history
            });
            
            // Add AI response
            const aiMessage = { 
                text: `${response.data.summary}\n\n${response.data.question}`, 
                isUser: false, 
                timestamp: new Date(),
                summary: response.data.summary,
                question: response.data.question 
            };
            
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error communicating with AI:', error);
            
            // Add error message
            setMessages(prev => [
                ...prev, 
                { 
                    text: "Sorry, I couldn't connect to the AI service. Please try again later.", 
                    isUser: false, 
                    isError: true,
                    timestamp: new Date() 
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                <div className="chat-header">
                    <h2>Active Listener AI</h2>
                    <p>Share your thoughts, and I'll listen</p>
                </div>
                
                <div className="messages-container">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <p>Start a conversation by typing a message below.</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`message ${msg.isUser ? 'user-message' : 'ai-message'} ${msg.isError ? 'error-message' : ''}`}
                            >
                                <div className="message-bubble">
                                    {msg.isUser ? (
                                        <p>{msg.text}</p>
                                    ) : msg.summary && msg.question ? (
                                        <>
                                            <p className="ai-summary">{msg.summary}</p>
                                            <p className="ai-question">{msg.question}</p>
                                        </>
                                    ) : (
                                        <p>{msg.text}</p>
                                    )}
                                </div>
                                <div className="message-time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="message ai-message loading-message">
                            <div className="message-bubble">
                                <div className="loading-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                <form className="input-container" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        ref={inputRef}
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;