import React, { useState, useEffect } from 'react';
import './SimpleCalc.css'; // Import the CSS file

const SimpleCalc = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleButtonClick = (value) => {
    setInput((prevInput) => {
      // Limit the input length to 20 characters to avoid overflow
      if (prevInput.length < 20) {
        return prevInput + value;
      } else {
        return prevInput.slice(1) + value; // Remove the first character to keep the last number visible
      }
    });
  };

  const calculateResult = () => {
    try {
      const result = eval(input);
      setHistory((prevHistory) => [...prevHistory, `${input} = ${result}`]);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleKeyPress = (event) => {
    const key = event.key;

    if (/[0-9]/.test(key) || ['+', '-', '*', '/'].includes(key)) {
      handleButtonClick(key);
    } else if (key === 'Enter') {
      calculateResult();
    } else if (key === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (key === 'Escape') {
      handleClear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="calculator">
      <input
        type="text"
        value={input}
        readOnly
        className="calculator-display"
      />
      <div className="calculator-buttons">
        <button onClick={handleClear} className="button clear">C</button>
        <button onClick={() => handleButtonClick('1')} className="button">1</button>
        <button onClick={() => handleButtonClick('2')} className="button">2</button>
        <button onClick={() => handleButtonClick('3')} className="button">3</button>
        <button onClick={() => handleButtonClick('+')} className="button operator">+</button>
        <button onClick={() => handleButtonClick('4')} className="button">4</button>
        <button onClick={() => handleButtonClick('5')} className="button">5</button>
        <button onClick={() => handleButtonClick('6')} className="button">6</button>
        <button onClick={() => handleButtonClick('-')} className="button operator">-</button>
        <button onClick={() => handleButtonClick('7')} className="button">7</button>
        <button onClick={() => handleButtonClick('8')} className="button">8</button>
        <button onClick={() => handleButtonClick('9')} className="button">9</button>
 <button onClick={() => handleButtonClick('*')} className="button operator">*</button>
        <button onClick={() => handleButtonClick('0')} className="button">0</button>
        <button onClick={calculateResult} className="button equals">=</button>
        <button onClick={() => handleButtonClick('/')} className="button operator">/</button>
      </div>
      <button onClick={handleShowHistory} className="button history">
        {showHistory ? 'Hide History' : 'Show History'}
      </button>
      <button onClick={handleClearHistory} className="button clear-history">
        Clear History
      </button>
      {showHistory && (
        <div className="history-list">
          {history.length === 0 ? (
            <p>No history available</p>
          ) : (
            <ul>
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleCalc;