import React, { useState } from "react";

function BMICalculator() {
  const [form, setForm] = useState({ weight: "", height: "", age: "", gender: "male" });
  const [result, setResult] = useState(null);

  const calculate = () => {
    const h = form.height / 100;
    const bmi = (form.weight / (h * h)).toFixed(1);
    let category = "";
    let color = "";
    if (bmi < 18.5) { category = "Underweight"; color = "#3498db"; }
    else if (bmi < 25) { category = "Normal Weight"; color = "#2ecc71"; }
    else if (bmi < 30) { category = "Overweight"; color = "#f39c12"; }
    else { category = "Obese"; color = "#C0392B"; }
    setResult({ bmi, category, color });
  };

  return React.createElement(
    "div",
    { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px" } },
    React.createElement(
      "div",
      { style: { width: "100%", maxWidth: "440px" } },
      React.createElement("div", { style: { fontSize: "42px", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.1em", color: "#fff", marginBottom: "4px" } }, "BMI CALCULATOR"),
      React.createElement("div", { style: { fontSize: "10px", letterSpacing: "0.3em", color: "#C0392B", marginBottom: "32px", textTransform: "uppercase" } }, "Know your body mass index"),

      React.createElement(
        "div",
        { style: { background: "rgba(10,10,10,0.98)", border: "1px solid #1a1a1a", borderRadius: "24px", padding: "36px" } },
        ["weight", "height", "age"].map(key =>
          React.createElement("input", {
            key, type: "number",
            placeholder: key === "weight" ? "Weight (kg)" : key === "height" ? "Height (cm)" : "Age",
            value: form[key],
            onChange: (e) => setForm({ ...form, [key]: e.target.value }),
            style: inputStyle,
            onFocus: (e) => e.target.style.borderColor = "#C0392B",
            onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
          })
        ),
        React.createElement(
          "select",
          { value: form.gender, onChange: (e) => setForm({ ...form, gender: e.target.value }), style: { ...inputStyle, marginBottom: "24px" } },
          React.createElement("option", { value: "male" }, "Male"),
          React.createElement("option", { value: "female" }, "Female")
        ),
        React.createElement(
          "button",
          {
            onClick: calculate,
            style: { width: "100%", padding: "14px", background: "#C0392B", border: "none", borderRadius: "100px", color: "#fff", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "all 0.3s ease" },
            onMouseEnter: (e) => e.currentTarget.style.background = "#a93226",
            onMouseLeave: (e) => e.currentTarget.style.background = "#C0392B",
          },
          "Calculate BMI"
        ),
        result && React.createElement(
          "div",
          { style: { marginTop: "28px", textAlign: "center", padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: `1px solid ${result.color}22` } },
          React.createElement("div", { style: { fontSize: "56px", fontFamily: "'Bebas Neue', Impact", color: result.color, lineHeight: 1 } }, result.bmi),
          React.createElement("div", { style: { fontSize: "11px", letterSpacing: "0.3em", color: result.color, textTransform: "uppercase", marginTop: "8px" } }, result.category),
          React.createElement("div", { style: { fontSize: "11px", color: "#333", marginTop: "12px", letterSpacing: "0.1em" } }, "BMI Score")
        )
      ),
      React.createElement("style", null, `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`)
    )
  );
}

const inputStyle = {
  width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.03)",
  border: "1px solid #1a1a1a", borderRadius: "12px", color: "#fff",
  fontSize: "13px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
  outline: "none", marginBottom: "12px", display: "block",
  transition: "border-color 0.3s ease",
};

export default BMICalculator;