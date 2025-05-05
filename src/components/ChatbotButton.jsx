import React, { useState, useRef, useEffect } from 'react';
import ChatbotComponent from './ChatbotComponent';
import './ChatbotButton.css';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Close the chatbot if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatbotRef]);

  return (
    <div className="chatbot-button-container">
      <button className="chatbot-button" onClick={toggleChatbot}>
        {isOpen ? (
          <box-icon name="x" color="#ffffff" size="lg"></box-icon> // Close icon
        ) : (
          <box-icon name="message-rounded-dots" color="#ffffff" size="lg"></box-icon> // Chat icon
        )}
      </button>
      {isOpen && (
        <div className="chatbot-popup" ref={chatbotRef}>
          <ChatbotComponent />
        </div>
      )}
    </div>
  );
};

export default ChatbotButton;