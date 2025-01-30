import React, { useState, useEffect } from 'react';
import './faul.css';

const FaultyCalc = () => {
    const [result, setResult] = useState('');
    const [inputHistory, setInputHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1); // To track the current input index
    const [showHistory, setShowHistory] = useState(false);

    const appendToResult = (value) => {
        console.log(`Appending value: ${value}`); // Log the value being appended
        setResult((prev) => prev + value);
    };

    const clearResult = () => {
        setResult('');
    };

    const getRandomFaultyResult = (a, b, operator) => {
        const randomChance = Math.random();
        if (randomChance < 0.2) { // 20% chance for a faulty result
            switch (operator) {
                case '+':
                    return a - b; // Faulty result
                case '-':
                    return a / b; // Faulty result
                case '*':
                    return a / b; // Faulty result
                case '/':
                    return a + b; // Faulty result
                default:
                    return null;
            }
        }
        return calculate(a, b, operator); // Correct result
    };

    const calculate = (a, b, operator) => {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) {
                    return "Error: Division by zero";
                }
                return a / b;
            default:
                return null;
        }
    };

    const calculateResult = () => {
        const tokens = result.match(/(\d+|\+|\-|\*|\/)/g); // Split into tokens
        if (!tokens || tokens.length < 3) {
            setResult('Error');
            return;
        }

        let currentResult = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const nextNumber = parseFloat(tokens[i + 1]);
            if (isNaN(nextNumber)) {
                setResult('Error');
                return;
            }
            currentResult = getRandomFaultyResult(currentResult, nextNumber, operator);
        }

        // Store the result in history
        setInputHistory((prev) => [...prev, result]);
        setCurrentIndex(inputHistory.length); // Update current index to the latest
        setResult(currentResult.toString());
        console.log(`Current result: ${currentResult}`); // Log the current result
    };

    const handleButtonClick = (value) => {
        setResult((prevInput) => {
            // Limit the input length to 20 characters to avoid overflow
            if (prevInput.length < 20) {
                return prevInput + value;
            } else {
                return prevInput.slice(1) + value; // Remove the first character to keep the last number visible
            }
        });
    };

    const handleClear = () => {
        setResult('');
    };

    const handleShowHistory = () => {
        setShowHistory(!showHistory);
    };

    const handleClearHistory = () => {
        setInputHistory([]);
    };

    const handleKeyPress = (event) => {
        const key = event.key;

        if (/[0-9]/.test(key) || ['+', '-', '*', '/'].includes(key)) {
            handleButtonClick(key);
        } else if (key === 'Enter') {
            calculateResult();
        } else if (key === 'Backspace') {
            setResult((prevInput) => prevInput.slice(0, -1));
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

    // Dynamically adjust font size based on the length of the result
    const fontSize = Math.max(20 - result.length, 12); // Minimum font size of 12px

    return (
        <div id='body'>
            <div id="calculator">
                <div 
                    id="result" 
                    style={{ 
                        border: '1px solid #ccc', 
                        padding: '10px', 
                        height: '50px', // Fixed height
                        width: '266px', // Fixed width
                        fontSize: `${fontSize}px`, // Dynamic font size
                        textAlign: 'right', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap' 
                    }}
                >
                    {result} {/* Show only the current result */}
                </div>
                <div>
                    <button id='button' onClick={() => appendToResult('1')}>1</button>
                    <button id='button' onClick={() => appendToResult('2')}>2</button>
                    <button id='button' onClick={() => appendToResult('3')}>3</button>
                    <button id='button' onClick={() => appendToResult('+')}>+</button>
                </div>
                <div>
                    <button id='button' onClick={() => appendToResult('4')}>4</button>
                    <button id='button' onClick={() => appendToResult('5')}>5</button>
                    <button id='button' onClick={() => appendToResult('6')}>6</button>
                    <button id='button' onClick={() => appendToResult('-')}>-</button>
                </div>
                <div>
                    <button id='button' onClick={() => appendToResult('7')}>7</button>
                    <button id='button' onClick={() => appendToResult('8')}>8</button>
                    <button id='button' onClick={() => appendToResult('9')}>9</button>
                    <button id='button' onClick={() => appendToResult('*')}>*</button>
                </div>
                <div>
                    <button id='button' onClick={() => appendToResult('0')}>0</button>
                    <button id='button' onClick={calculateResult}>=</button>
                    <button id='button' onClick={clearResult}>C</button>
                    <button id='button' onClick={() => appendToResult('/')}>/</button>
                </div>
            </div>
        </div>
    );
}

export default FaultyCalc;
