import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { SiGooglegemini } from "react-icons/si";
import "./App.css";
import AdaaLogo from "./logo.png";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(true); // Manage predefined questions visibility

  // Predefined questions
  const predefinedQuestions = [
    "كيف يتم تصنيف البيانات وما هي المعايير المستخدمة في ذلك؟",
    "ما هي ركائز وعناصر سياسات الحكومة الرقمية",
    "ما هي سياسات الرصد والتقييم؟",
    "مالهدف من مسودة السياسة التشغيلية؟",
  ];

  const sendMessage = async (messageText) => {
    let userInput;
    if(typeof messageText === 'string'){
      userInput = messageText;
    }else{
       userInput = input;
    }
    
    console.log( userInput);
    const clearUserInput = userInput.trim();
    if (clearUserInput){
      const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);

    setLoading(true);

    try {
      const response = await fetch("http://10.110.128.7:5000/api/v1/nlp/index/answer/1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput, limit: 5 })
      });

      const data = await response.json();
      const formattedAnswer = prettyFormatText(data.answer || "لم يتم العثور على إجابة");

      const botMessage = { sender: "bot", text: formattedAnswer };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // Hide predefined questions after the first question
      setShowPredefinedQuestions(false);
    } catch (error) {
      console.error("Error fetching the response:", error);
    } finally {
      setLoading(false); // Hide loading animation
      setInput(""); // Clear input
    }

    }else{
      console.log('Empty user input ! ')
      return;
    };
    
  };

  // Function to apply pretty formatting
  const prettyFormatText = (text) => {
    return text.split("\n").map((str, index) => <p key={index}>{str}</p>);
  };

  const handlePredefinedQuestionClick = (question) => {
    sendMessage(question);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={AdaaLogo} className="AdaaLogo" alt="Adaa Logo" />
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-container">
        <div className="chat-window">
        {messages.length < 1 && (
              <div className="predefined-questions-container">
                <div className="predefined-questions-area">
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="predefined-question-button"
                    onClick={() => handlePredefinedQuestionClick(question)}
                  >
                    {question}
                  </button>
                ))}
                </div>
              </div>
            )}
          {
            messages.length > 0  && (
              <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
              >
                {message.sender === "user" && <div className="user-avatar">
                  <LuUser />
                  </div>}
                {message.sender !== "user" && <div className="ai-avatar">
                  <SiGooglegemini />
                  </div>}
                  <div>
                    {message.text}
                  </div>
              </div>
            ))}

            {/* Display loading animation while waiting for API response */}
            { loading && (
              <div className="message bot-message loading">
                <div className="ai-avatar">
                <SiGooglegemini />
                  </div>
                <div>جاري التحميل ...</div>
              </div>
            )}

            {/* Predefined Questions in the middle of the chat */}
          </div>
            )
          }

          {/* Chat Input */}
          <div className="chat-input">
            {/* <FaPaperclip className="icon" /> */}
            <input
              type="text"
              placeholder="تحدث مع مساعد اداء"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              style={{ textAlign: "right", direction: "rtl" }} // Align text input to the right
            />
            {/* <FaSmile className="icon" /> */}
            <div className="send-msg">
            <FaPaperPlane className="icon" onClick={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
