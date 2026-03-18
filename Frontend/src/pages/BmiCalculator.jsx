import React, { useState, useRef, useEffect } from "react";

function BMICalculator() {
  const [form, setForm] = useState({ weight: "", height: "", age: "", gender: "male" });
  const [result, setResult] = useState(null);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [calculating, setCalculating] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const calculate = () => {
    if (!form.weight || !form.height) return;
    setCalculating(true);
    setTimeout(() => {
      const h = parseFloat(form.height) / 100;
      const w = parseFloat(form.weight);
      const bmi = (w / (h * h)).toFixed(1);
      let label, desc, barWidth;
      if (bmi < 18.5) {
        label = "Underweight";
        desc = "Below healthy range. Consider consulting a nutritionist.";
        barWidth = "20%";
      } else if (bmi < 25) {
        label = "Normal Weight";
        desc = "You are within a healthy weight range. Keep it up!";
        barWidth = "45%";
      } else if (bmi < 30) {
        label = "Overweight";
        desc = "Slightly above healthy range. Regular exercise recommended.";
        barWidth = "70%";
      } else {
        label = "Obese";
        desc = "Significantly above healthy range. Consult a doctor.";
        barWidth = "90%";
      }
      setResult({ bmi, label, desc, barWidth });
      setCalculating(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }, 600);
  };

  return React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "#fafafa",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      paddingTop: "80px",
    },
  },

    // ── HERO ──
    React.createElement("div", {
      style: {
        borderBottom: "1px solid #e8e8e8",
        padding: mobile ? "48px 24px 40px" : "72px 80px 56px",
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        alignItems: mobile ? "flex-start" : "flex-end",
        justifyContent: "space-between",
        gap: "24px",
        position: "relative",
        overflow: "hidden",
      },
    },
      // Ghost bg
      React.createElement("div", {
        style: {
          position: "absolute", right: "-10px", bottom: "-20px",
          fontSize: mobile ? "35vw" : "20vw",
          fontFamily: "'Bebas Neue', Impact",
          color: "transparent", WebkitTextStroke: "1.5px #ebebeb",
          userSelect: "none", pointerEvents: "none",
          lineHeight: 1,
        },
      }, "BMI"),

      // Left title
      React.createElement("div", { style: { position: "relative", zIndex: 2 } },
        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.6em", color: "#999", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" },
        },
          React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#ccc" } }),
          "Body Analysis"
        ),
        React.createElement("h1", {
          style: { fontSize: mobile ? "14vw" : "clamp(64px,10vw,128px)", fontFamily: "'Bebas Neue', Impact", color: "#000", lineHeight: 0.88, margin: "0 0 4px", letterSpacing: "-0.01em" },
        }, "BMI"),
        React.createElement("h1", {
          style: { fontSize: mobile ? "14vw" : "clamp(64px,10vw,128px)", fontFamily: "'Bebas Neue', Impact", color: "transparent", WebkitTextStroke: "2px #ddd", lineHeight: 0.88, margin: 0, letterSpacing: "-0.01em" },
        }, "CALCULATOR"),
      ),

      // Right description
      React.createElement("p", {
        style: { color: "#666", fontSize: "11px", lineHeight: 2.2, letterSpacing: "0.06em", maxWidth: "260px", margin: 0, position: "relative", zIndex: 2 },
      }, "Know your Body Mass Index. Understand where you stand. Take control of your health.")
    ),

    // ── MAIN GRID ──
    React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
      },
    },

      // ── LEFT — FORM ──
      React.createElement("div", {
        style: {
          padding: mobile ? "48px 24px" : "72px 80px",
          borderRight: mobile ? "none" : "1px solid #e8e8e8",
          borderBottom: mobile ? "1px solid #e8e8e8" : "none",
        },
      },

        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.55em", color: "#999", textTransform: "uppercase", marginBottom: "48px" },
        }, "01 — Enter Your Details"),

        // Weight field
        React.createElement(FormField, {
          label: "Weight", unit: "KG",
          value: form.weight,
          onChange: (v) => setForm({ ...form, weight: v }),
        }),

        // Height field
        React.createElement(FormField, {
          label: "Height", unit: "CM",
          value: form.height,
          onChange: (v) => setForm({ ...form, height: v }),
        }),

        // Age field
        React.createElement(FormField, {
          label: "Age", unit: "YRS",
          value: form.age,
          onChange: (v) => setForm({ ...form, age: v }),
        }),

        // Gender toggle
        React.createElement("div", { style: { marginBottom: "48px" } },
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.5em", color: "#999", textTransform: "uppercase", marginBottom: "16px" },
          }, "Gender"),
          React.createElement("div", { style: { display: "flex" } },
            ["male", "female"].map((g) =>
              React.createElement("button", {
                key: g,
                onClick: () => setForm({ ...form, gender: g }),
                style: {
                  flex: 1, padding: "14px",
                  background: form.gender === g ? "#000" : "#fff",
                  border: "1px solid #e8e8e8",
                  color: form.gender === g ? "#fff" : "#999",
                  fontSize: "9px", letterSpacing: "0.4em",
                  textTransform: "uppercase", cursor: "pointer",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  transition: "all 0.3s ease",
                },
              }, g.charAt(0).toUpperCase() + g.slice(1))
            )
          )
        ),

        // Calculate button
        React.createElement("button", {
          onClick: calculate,
          disabled: calculating || !form.weight || !form.height,
          style: {
            width: "100%", padding: "18px",
            background: calculating || !form.weight || !form.height ? "#f0f0f0" : "#000",
            border: "none",
            color: calculating || !form.weight || !form.height ? "#bbb" : "#fff",
            fontSize: "9px", letterSpacing: "0.5em",
            textTransform: "uppercase",
            cursor: calculating || !form.weight || !form.height ? "not-allowed" : "pointer",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            transition: "all 0.3s ease",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
          },
          onMouseEnter: (e) => {
            if (!calculating && form.weight && form.height) e.currentTarget.style.background = "#222";
          },
          onMouseLeave: (e) => {
            if (!calculating && form.weight && form.height) e.currentTarget.style.background = "#000";
          },
        },
          calculating ? "Calculating..." : "Calculate BMI",
          !calculating && React.createElement("span", { style: { fontSize: "14px" } }, "→")
        )
      ),

      // ── RIGHT — RESULT ──
      React.createElement("div", {
        ref: resultRef,
        style: {
          padding: mobile ? "48px 24px" : "72px 80px",
          display: "flex", flexDirection: "column",
          justifyContent: result ? "flex-start" : "center",
          alignItems: result ? "flex-start" : "center",
          minHeight: mobile ? "auto" : "500px",
          position: "relative", overflow: "hidden",
        },
      },

        // Empty state
        !result && React.createElement("div", { style: { textAlign: "center", position: "relative", zIndex: 2 } },
          React.createElement("div", {
            style: {
              fontSize: mobile ? "30vw" : "clamp(100px,18vw,220px)",
              fontFamily: "'Bebas Neue', Impact",
              color: "transparent", WebkitTextStroke: "1.5px #ebebeb",
              lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "16px",
            },
          }, "—"),
          React.createElement("p", {
            style: { fontSize: "8px", letterSpacing: "0.5em", color: "#ccc", textTransform: "uppercase" },
          }, "Fill form to see result")
        ),

        // Result
        result && React.createElement("div", { style: { width: "100%" } },
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.55em", color: "#999", textTransform: "uppercase", marginBottom: "40px" },
          }, "02 — Your Result"),

          // Big number
          React.createElement("div", {
            style: {
              fontSize: mobile ? "28vw" : "clamp(100px,16vw,200px)",
              fontFamily: "'Bebas Neue', Impact",
              color: "#000", lineHeight: 1,
              letterSpacing: "-0.02em", marginBottom: "8px",
            },
          }, result.bmi),

          // Label
          React.createElement("div", {
            style: { fontSize: "9px", letterSpacing: "0.55em", color: "#555", textTransform: "uppercase", marginBottom: "40px" },
          }, result.label),

          // Progress bar
          React.createElement("div", { style: { marginBottom: "40px" } },
            React.createElement("div", {
              style: { height: "1px", background: "#e8e8e8", position: "relative", marginBottom: "12px" },
            },
              React.createElement("div", {
                style: {
                  position: "absolute", left: 0, top: 0,
                  height: "1px", background: "#000",
                  width: result.barWidth,
                  transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                },
              }),
              React.createElement("div", {
                style: {
                  position: "absolute",
                  left: result.barWidth,
                  top: "-5px",
                  width: "11px", height: "11px",
                  border: "1.5px solid #000",
                  borderRadius: "50%", background: "#fff",
                  transform: "translateX(-50%)",
                  transition: "left 1.2s cubic-bezier(0.16,1,0.3,1)",
                },
              })
            ),
            React.createElement("div", {
              style: { display: "flex", justifyContent: "space-between", fontSize: "7px", letterSpacing: "0.3em", color: "#bbb", textTransform: "uppercase" },
            },
              React.createElement("span", null, "Thin"),
              React.createElement("span", null, "Normal"),
              React.createElement("span", null, "Obese"),
            )
          ),

          // Description
          React.createElement("p", {
            style: { fontSize: "11px", color: "#666", lineHeight: 2.2, letterSpacing: "0.06em", margin: "0 0 40px", maxWidth: "320px" },
          }, result.desc),

          // BMI range table
          React.createElement("div", { style: { borderTop: "1px solid #e8e8e8" } },
            [
              { range: "< 18.5", label: "Underweight" },
              { range: "18.5 – 24.9", label: "Normal Weight" },
              { range: "25 – 29.9", label: "Overweight" },
              { range: "≥ 30", label: "Obese" },
            ].map((row) =>
              React.createElement("div", {
                key: row.label,
                style: {
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 0", borderBottom: "1px solid #f5f5f5",
                  background: result.label === row.label ? "#f5f5f5" : "transparent",
                  paddingLeft: result.label === row.label ? "12px" : "0",
                  paddingRight: result.label === row.label ? "12px" : "0",
                  transition: "all 0.3s ease",
                },
              },
                React.createElement("span", {
                  style: { fontSize: "8px", letterSpacing: "0.3em", color: result.label === row.label ? "#000" : "#aaa", textTransform: "uppercase" },
                }, row.label),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px" } },
                  result.label === row.label && React.createElement("span", {
                    style: { fontSize: "7px", letterSpacing: "0.3em", color: "#999", textTransform: "uppercase" },
                  }, "You"),
                  React.createElement("span", {
                    style: { fontSize: "14px", fontFamily: "'Bebas Neue', Impact", color: result.label === row.label ? "#000" : "#ccc", letterSpacing: "0.05em" },
                  }, row.range)
                )
              )
            )
          )
        )
      )
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      input[type=number] { -moz-appearance: textfield; }
    `)
  );
}

// ── FORM FIELD ──
function FormField({ label, unit, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return React.createElement("div", { style: { marginBottom: "32px" } },
    React.createElement("div", {
      style: { fontSize: "7px", letterSpacing: "0.5em", color: focused ? "#000" : "#999", textTransform: "uppercase", marginBottom: "10px", transition: "color 0.3s ease" },
    }, label),
    React.createElement("div", {
      style: { display: "flex", alignItems: "baseline", borderBottom: `1px solid ${focused ? "#000" : "#e8e8e8"}`, transition: "border-color 0.3s ease", paddingBottom: "10px" },
    },
      React.createElement("input", {
        type: "number",
        value,
        onChange: (e) => onChange(e.target.value),
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        placeholder: "0",
        style: {
          flex: 1, border: "none", background: "transparent",
          fontSize: "clamp(32px,5vw,56px)",
          fontFamily: "'Bebas Neue', Impact",
          color: "#000", outline: "none",
          letterSpacing: "0.02em",
          appearance: "none",
        },
      }),
      React.createElement("span", {
        style: { fontSize: "8px", letterSpacing: "0.5em", color: "#bbb", textTransform: "uppercase" },
      }, unit)
    )
  );
}

export default BMICalculator;
