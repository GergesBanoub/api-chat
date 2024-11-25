import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define the typing effect component
const PrettyFormatText = ({ text, typingSpeed = 10 }) => {
  const [displayedText, setDisplayedText] = useState(""); // Tracks the text being displayed
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current character index

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, typingSpeed]);

  return (
    <div style={{ textAlign: "right", direction: "rtl" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>
    </div>
  );
};

export default PrettyFormatText;
