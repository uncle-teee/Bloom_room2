import React, { useState } from 'react';
import './ChatbotComponent.css';

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I help you?", sender: "bot" }]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = { text: inputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Send user message to Flask backend
      const response = await fetch("https://teekinyanjui.pythonanywhere.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      const data = await response.json();
      const botMessage = { text: data.reply || "Sorry, I didn’t get that.", sender: "bot" };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = { text: "Error connecting to chatbot. Please try again later.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-messages" aria-live="polite">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender === "user" ? "user-message" : "bot-message"}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          className="chat-input-field"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
          disabled={isLoading}
        />
        <button className="chat-send-button" onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
