import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ input, setInput, onSend }) => (
  <div className="chat-input">
    <input
      type="text"
      placeholder="تحدث مع مساعد اداء"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && onSend()}
      style={{ textAlign: "right", direction: "rtl" }}
    />
    <div className="send-msg" onClick={onSend}>
      <FaPaperPlane className="icon" />
    </div>
  </div>
);

export default ChatInput;
