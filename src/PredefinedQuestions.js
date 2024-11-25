import React from "react";
import "./App.css";


const PredefinedQuestions = ({ questions, onSelect }) => (
  <div className="predefined-questions-container">
    <div className="predefined-questions-area">
      {questions.map((question, index) => (
        <button
          key={index}
          className="predefined-question-button"
          onClick={() => onSelect(question)}
        >
          {question}
        </button>
      ))}
    </div>
  </div>
);

export default PredefinedQuestions;
