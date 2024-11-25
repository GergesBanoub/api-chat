import React, { useState } from "react";
import PredefinedQuestions from "./PredefinedQuestions";
import ChatMessage from "./ChatMessage";
import { FaPaperPlane } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";


const ChatWindow = ({ messages, loading, onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    onSendMessage(input);
    setInput(""); // Clear input after sending
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.length === 0 && (
          <PredefinedQuestions
            questions={[
              "كيف يتم تصنيف البيانات وما هي المعايير المستخدمة في ذلك؟",
              "ما هي ركائز وعناصر سياسات الحكومة الرقمية",
              "ما هي سياسات الرصد والتقييم؟",
              "مالهدف من مسودة السياسة التشغيلية؟",
            ]}
            onSelect={(question) => onSendMessage(question)}
          />
        )}
        {messages.length > 0 && (
          <div className="chat-messages">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && (
              <div className="message bot-message loading">
                <div className="ai-avatar">
                <SiGooglegemini />
                </div>
                <div>جاري التحميل ...</div>
              </div>
            )}
          </div>
        )}
        <div className="chat-input">
          <input
            type="text"
            placeholder="تحدث مع مساعد اداء"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            style={{ textAlign: "right", direction: "rtl" }}
          />
          <div className="send-msg" onClick={handleSend}>
            <FaPaperPlane className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
