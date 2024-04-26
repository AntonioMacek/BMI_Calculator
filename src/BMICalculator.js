import React, { useState } from "react";
import "./BMICalculator.css";

function BMICalculator() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [bmi, setBMI] = useState(null);
  const [bmr, setBMR] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const calculateBMI = () => {
    if (!name || !weight || !height || !sex) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const weightInKilograms = parseFloat(weight);
    const heightInMeters = parseFloat(height) / 100;

    if (isNaN(weightInKilograms) || isNaN(heightInMeters)) {
      setErrorMessage(
        "Please enter valid numerical values for weight and height."
      );
      return;
    }

    const calculatedBMI = weightInKilograms / (heightInMeters * heightInMeters);
    setBMI(calculatedBMI.toFixed(2));
    setErrorMessage("");
  };

  const calculateBMR = () => {
    if (!weight || !height || !sex) {
      setErrorMessage(
        "Please fill in weight, height, and sex to calculate BMR."
      );
      return;
    }

    const weightInKilograms = parseFloat(weight);
    const heightInCentimeters = parseFloat(height);
    const age = 30; // Just a placeholder for age, you can make it dynamic

    if (isNaN(weightInKilograms) || isNaN(heightInCentimeters)) {
      setErrorMessage(
        "Please enter valid numerical values for weight and height."
      );
      return;
    }

    let bmr;
    if (sex === "male") {
      bmr = 10 * weightInKilograms + 6.25 * heightInCentimeters - 5 * age + 5;
    } else if (sex === "female") {
      bmr = 10 * weightInKilograms + 6.25 * heightInCentimeters - 5 * age - 161;
    }

    setBMR(bmr.toFixed(2));
    setErrorMessage("");
  };

  return (
    <div className="bmi-calculator-container">
      <h1>BMI Calculator</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="input-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div className="input-group">
        <label>Weight (kg):</label>
        <input type="text" value={weight} onChange={handleWeightChange} />
      </div>
      <div className="input-group">
        <label>Height (cm):</label>
        <input type="text" value={height} onChange={handleHeightChange} />
      </div>
      <div className="input-group">
        <label>Sex:</label>
        <select value={sex} onChange={handleSexChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="button-container">
        <button onClick={calculateBMI}>
          Calculate <b>BMI</b>
        </button>
        <button onClick={calculateBMR}>
          Calculate <b>BMR</b>
        </button>
      </div>
      {bmi !== null && (
        <div>
          <h2>Your BMI: {bmi}</h2>
          {bmi < 18.5 && (
            <p>
              Underweight - Underweight is when a person's weight is too low for
              their age, height, and sex. It can cause nutritional deficiencies,
              weakened immune system, muscle loss, hormonal imbalances, and
              growth issues.
            </p>
          )}
          {bmi >= 18.5 && bmi < 25 && (
            <p>
              Healthy range - A healthy weight range refers to a person's weight
              falling within the expected range for their age, height, and sex.
              It is associated with adequate nutrition, a strong immune system,
              proper muscle mass, balanced hormones, and normal growth.
              Maintaining a healthy weight is important for overall well-being
              and reduced risk of health complications.
            </p>
          )}
          {bmi >= 25 && (
            <p>Unhealthy range - Your BMI is above the healthy range.</p>
          )}
        </div>
      )}
      {bmr !== null && (
        <div>
          <h2>Your BMR: {bmr} calories per day</h2>
          <p>
            BMR stands for Basal Metabolic Rate. It represents the number of
            calories your body needs to maintain basic physiological functions
            while at rest. These functions include breathing, circulating blood,
            controlling body temperature, cell production, and nutrient
            processing.
          </p>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
