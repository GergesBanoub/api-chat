import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define the typing effect component
const PrettyFormatText = ({ text }) => {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text || isTyping || typeof text !== 'string') return; // Add type check for string

    const textX = text.replace(/\\n/g, '\n');
    let i = 0;

    // Simulate the typing effect
    const intervalId = setInterval(() => {
      setCurrentText((prev) => prev + textX[i]);
      i++;

      if (i === textX.length - 1) {
        clearInterval(intervalId);
      }
    }, 5); // Adjust typing speed here (100ms between characters)

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [text, isTyping]);

  return (
    <div style={{ textAlign: "right", direction: "rtl" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentText}</ReactMarkdown>
    </div>
  );
};

export default PrettyFormatText;
