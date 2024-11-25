import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import Login from "./Login";
import AdaaLogo from "./logo.png";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (messageText) => {
    const userInput = messageText.trim();
    if (!userInput) {
      console.warn("Empty user input!");
      return;
    }

    const userMessage = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://10.110.128.7:5000/api/v1/nlp/index/answer/1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput, limit: 5 }),
      });
      const data = await response.json();
      const botMessage = { sender: "bot", text: data.answer || "لم يتم العثور على إجابة" };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching the response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <>
          <div className="sidebar">
            <div className="logo">
              <img src={AdaaLogo} className="AdaaLogo" alt="Adaa Logo" />
            </div>
          </div>
          <ChatWindow messages={messages} loading={loading} onSendMessage={sendMessage} />
        </>
      )}
    </div>
  );
}

export default App;
