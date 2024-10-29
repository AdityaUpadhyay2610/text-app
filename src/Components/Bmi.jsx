import React, { useState } from 'react';
import './Bmi.css';

const Bmi = (props) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBmi = (e) => {
    e.preventDefault();
    const heightInMeters = height / 100; // Convert height from cm to meters
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(2));
    determineCategory(calculatedBmi);
  };

  const determineCategory = (bmi) => {
    if (bmi < 18.5) {
      setCategory('Underweight');
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setCategory('Normal weight');
    } else if (bmi >= 25 && bmi < 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  const clearResults = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <>
      <div className='calc'>
        <div className="border-content">
          <h2>BMI Calculator</h2>
          <form onSubmit={calculateBmi}>
            <div className='weight'>
              <label>
                Weight (kg):
                <input
                  className='weight-input'
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className='height'>
              <label>
                Height (cm):
                <input
                  className='height-input'
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit" className='btn2' style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Calculate BMI</button>
          </form>

          {bmi && (
            <div className='result'>
              <h3>Your BMI: {bmi}</h3>
              <h4>Category: {category}</h4>
              <button onClick={clearResults} className='btn2' style={{ marginTop: '10px', color: props.mode === 'dark' ? 'white' : 'black' }}>
                Clear Results
              </button>
            </div>
          )}
        </div>

        <div className="intro">
          <h2 className='intro-head' style={{ color: props.mode === 'dark' ? 'white' : 'black' }}> BMI introduction</h2>
          <p style={{ color: props.mode === 'dark' ? 'white' : 'black' }}> BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether a person is underweight, normal weight, overweight, or obese depending on what range the value falls between. These ranges of BMI vary based on factors such as region and age, and are sometimes further divided into subcategories such as severely underweight or very severely obese. Being overweight or underweight can have significant health effects, so while BMI is an imperfect measure of healthy body weight, it is a useful indicator of whether any additional testing or action is required. Refer to the table below to see the different categories based on BMI that are used by the calculator.</p>
        </div>
        <div className="formula" >
          <h2 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>BMI Formula</h2>
          <p style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Below are the equations used for calculating BMI in the International System of Units (SI) and the US customary system (USC) using a 5'10", 160-pound individual as an example:</p>
  
          <h3 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>USC Units:</h3>
          <pre>
            BMI = 703 × (mass (lbs) / height² (in))
            = 703 × (160 / 70²)
            = 23.0
          </pre >

            <h3 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>SI, Metric Units:</h3>
            <pre >
              BMI = mass (kg) / height² (m)
                = 72.57 / (1.778²)
                = 23.0
            </pre>
</div>
      </div>
    </>
  );
};

export default Bmi;