import React, { useState } from "react";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import "./App.css";
import AdaaLogo from "./assets/logo.svg";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(true); // Manage predefined questions visibility

  // Predefined questions
  const predefinedQuestions = [
    "ماهو التحول الرقمي",
    "كيف يتم تصنيف البيانات وفقًا لمجال تصنيف البيانات وما هي المعايير المستخدمة في ذلك",
    " كيف يمكن للجهة تقييم الأثر المترتب على الإفصاح غير المصرح به عن البيانات",
    "ما هي مؤشرات الأداء الرئيسية التي يجب تحديدها لقياس فعالية خطة تصنيف البيانات"
  ];

  const sendMessage = async (messageText) => {
    const userInput = messageText || input; // Use passed messageText if provided, otherwise use the input state
    if (userInput.trim() === "") return;

    const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);

    setLoading(true); // Show loading animation

    try {
      const response = await fetch("http://localhost:5000/api/v1/nlp/index/answer/1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userInput, limit: 2 })
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
  };

  // Function to apply pretty formatting
  const prettyFormatText = (text) => {
    return text.split("\n").map((str, index) => <p key={index}>{str}</p>);
  };

  const handlePredefinedQuestionClick = (question) => {
    sendMessage(question); // Send the predefined question to the API directly
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
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
              >
                {message.text}
              </div>
            ))}

            {/* Display loading animation while waiting for API response */}
            {loading && (
              <div className="message bot-message loading">
                <p>...جاري التحميل</p>
              </div>
            )}

            {/* Predefined Questions in the middle of the chat */}
            {showPredefinedQuestions && (
              <div className="predefined-questions-container">
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
            )}
          </div>

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
            <FaPaperPlane className="icon" onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
