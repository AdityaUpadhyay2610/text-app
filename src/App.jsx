import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Text from './Components/Text';
import Bmi from './Components/Bmi';
import SimpleCalc from './Components/SimpleCalc';

function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [title, setTitle] = useState('TextUtils'); // Initial title

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.body.style.backgroundColor = newMode === 'dark' ? '#042743' : 'white';
  };

  const location = useLocation();

  useEffect(() => {
    // Update the title based on the current path
    if (location.pathname === '/') {
      setTitle('TextUtils');
    } else if (location.pathname === '/bmi') {
      setTitle('BMI Calculator');
    }else if (location.pathname === '/semi'){
      setTitle('Simple Calculator');
    }
  }, [location]);

  return (
    <>
      <Navbar title={title} aboutText="About Us" mode={mode} toggleMode={toggleMode} />
      <Routes>
        <Route path="/" element={<Text heading="Enter the text to analyze below" mode={mode} />} />
        <Route path="/bmi" element={<Bmi mode={mode}/>} />
        <Route path="/semi" element={<SimpleCalc mode={mode} />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}