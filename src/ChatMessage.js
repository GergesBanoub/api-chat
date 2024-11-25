import React from "react";
import { LuUser } from "react-icons/lu";
import { SiGooglegemini } from "react-icons/si";
import PrettyFormatText from "./PrettyFormatText";

const ChatMessage = ({ message }) => (
  <div className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}>
    {message.sender === "user" && <div className="user-avatar"><LuUser /></div>}
    {message.sender !== "user" && <div className="ai-avatar"><SiGooglegemini /></div>}
    <div>{message.sender === "user" ? message.text : <PrettyFormatText text={message.text} />}</div>
  </div>
);

export default ChatMessage;
