import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice.js";
import API from "../api/axios.js";

function Signup() {
  const [form, setForm] = useState({
    name: "", email: "", password: "",
    age: "", weight: "", height: "", gender: "male"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [focused, setFocused] = useState(null);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSubmit = async () => {
    setLoading(true); setError("");
    try {
      const { data } = await API.post("/user/register", form);
      dispatch(loginSuccess(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      if (step === 1) nextStep();
      else handleSubmit();
    }
  };

  const step1Fields = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "password", label: "Password", type: "password" },
  ];

  const step2Fields = [
    { key: "age", label: "Age", unit: "yrs" },
    { key: "weight", label: "Weight", unit: "kg" },
    { key: "height", label: "Height", unit: "cm" },
  ];

  return React.createElement("div", {
    style: {
      minHeight: "100vh", background: "#fafafa",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
      paddingTop: "80px",
    },
  },

    // ── LEFT — Dark branding ──
    !mobile && React.createElement("div", {
      style: {
        background: "#0a0a0a",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 64px",
        position: "relative", overflow: "hidden",
      },
    },
      // Ghost bg
      React.createElement("div", {
        style: {
          position: "absolute", bottom: "-40px", left: "-20px",
          fontSize: "28vw", fontFamily: "'Bebas Neue', Impact",
          color: "transparent", WebkitTextStroke: "1px #111",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        },
      }, "FT"),

      // Logo
      React.createElement("div", {
        onClick: () => navigate("/"),
        style: { cursor: "pointer", position: "relative", zIndex: 2 },
      },
        React.createElement("div", {
          style: { fontSize: "22px", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.18em", color: "#fff", lineHeight: 1 },
        }, "FITNESS"),
        React.createElement("div", {
          style: { fontSize: "6px", letterSpacing: "0.55em", color: "#444", textTransform: "uppercase", lineHeight: 1 },
        }, "TRACKER")
      ),

      // Center text
      React.createElement("div", { style: { position: "relative", zIndex: 2 } },
        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.6em", color: "#333", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" },
        },
          React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#333" } }),
          "Join Now"
        ),
        React.createElement("h2", {
          style: { fontSize: "clamp(48px,7vw,88px)", fontFamily: "'Bebas Neue', Impact", color: "#fff", lineHeight: 0.88, margin: "0 0 8px", letterSpacing: "0.01em" },
        }, "BEGIN YOUR"),
        React.createElement("h2", {
          style: { fontSize: "clamp(48px,7vw,88px)", fontFamily: "'Bebas Neue', Impact", color: "transparent", WebkitTextStroke: "1px #222", lineHeight: 0.88, margin: 0, letterSpacing: "0.01em" },
        }, "JOURNEY."),
      ),

      // Step indicator on left
      React.createElement("div", { style: { position: "relative", zIndex: 2 } },
        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.5em", color: "#333", textTransform: "uppercase", marginBottom: "12px" },
        }, `Step ${step} of 2`),
        React.createElement("div", { style: { display: "flex", gap: "8px" } },
          [1, 2].map(s =>
            React.createElement("div", {
              key: s,
              style: {
                height: "1px", flex: 1,
                background: step >= s ? "#fff" : "#222",
                transition: "background 0.4s ease",
              },
            })
          )
        ),
        React.createElement("p", {
          style: { color: "#222", fontSize: "10px", letterSpacing: "0.1em", lineHeight: 2.2, margin: "16px 0 0" },
        }, "No shortcuts. No excuses.\nJust results.")
      )
    ),

    // ── RIGHT — Form ──
    React.createElement("div", {
      style: {
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: mobile ? "48px 24px" : "72px 80px",
        background: "#fafafa",
        position: "relative",
      },
    },

      // Top nav hint
      React.createElement("div", {
        style: {
          position: "absolute", top: mobile ? "24px" : "40px",
          right: mobile ? "24px" : "80px",
          fontSize: "8px", letterSpacing: "0.4em",
          color: "#ccc", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: "8px",
          cursor: "pointer",
        },
        onClick: () => navigate("/login"),
      },
        "Have account?",
        React.createElement("span", { style: { color: "#000", fontSize: "10px" } }, "→")
      ),

      // Progress bar mobile
      mobile && React.createElement("div", {
        style: { position: "absolute", top: "80px", left: "24px", right: "24px" },
      },
        React.createElement("div", { style: { display: "flex", gap: "6px" } },
          [1, 2].map(s =>
            React.createElement("div", {
              key: s,
              style: { height: "1px", flex: 1, background: step >= s ? "#000" : "#f0f0f0", transition: "background 0.4s ease" },
            })
          )
        )
      ),

      React.createElement("div", { style: { maxWidth: "400px", width: "100%" } },

        // Header
        React.createElement("div", { style: { marginBottom: "48px" } },
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.6em", color: "#ccc", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" },
          },
            React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#ddd" } }),
            step === 1 ? "Step 01 — Account" : "Step 02 — Body Stats"
          ),
          React.createElement("h1", {
            style: { fontSize: mobile ? "12vw" : "clamp(40px,6vw,72px)", fontFamily: "'Bebas Neue', Impact", color: "#000", lineHeight: 0.88, margin: "0 0 8px", letterSpacing: "0.01em" },
          }, step === 1 ? "CREATE" : "YOUR"),
          React.createElement("h1", {
            style: { fontSize: mobile ? "12vw" : "clamp(40px,6vw,72px)", fontFamily: "'Bebas Neue', Impact", color: "transparent", WebkitTextStroke: "2px #e8e8e8", lineHeight: 0.88, margin: 0, letterSpacing: "0.01em" },
          }, step === 1 ? "ACCOUNT." : "BODY STATS."),
        ),

        // Error
        error && React.createElement("div", {
          style: {
            padding: "14px 20px", background: "#fff",
            border: "1px solid #f0f0f0", borderLeft: "3px solid #000",
            marginBottom: "24px", fontSize: "9px",
            letterSpacing: "0.2em", color: "#000", textTransform: "uppercase",
          },
        }, error),

        // Step 1 fields
        step === 1 && React.createElement("div", null,
          ...step1Fields.map(f =>
            React.createElement(InputField, {
              key: f.key, label: f.label, type: f.type,
              value: form[f.key],
              onChange: (v) => setForm({ ...form, [f.key]: v }),
              onKeyDown: handleKey,
              focused: focused === f.key,
              onFocus: () => setFocused(f.key),
              onBlur: () => setFocused(null),
            })
          ),

          React.createElement("button", {
            onClick: nextStep,
            style: {
              width: "100%", padding: "18px", background: "#000",
              border: "none", color: "#fff", fontSize: "9px",
              letterSpacing: "0.5em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif",
              transition: "all 0.3s ease", display: "flex",
              alignItems: "center", justifyContent: "center",
              gap: "12px", marginBottom: "24px",
            },
            onMouseEnter: (e) => e.currentTarget.style.background = "#222",
            onMouseLeave: (e) => e.currentTarget.style.background = "#000",
          },
            "Continue",
            React.createElement("span", { style: { fontSize: "14px" } }, "→")
          ),

          React.createElement("div", {
            style: { display: "flex", alignItems: "center", gap: "16px", paddingTop: "24px", borderTop: "1px solid #f0f0f0" },
          },
            React.createElement("span", { style: { fontSize: "8px", letterSpacing: "0.3em", color: "#ccc", textTransform: "uppercase" } }, "Have account?"),
            React.createElement("span", {
              onClick: () => navigate("/login"),
              style: { fontSize: "8px", letterSpacing: "0.4em", color: "#000", textTransform: "uppercase", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "4px" },
            }, "Sign In →")
          )
        ),

        // Step 2 fields
        step === 2 && React.createElement("div", null,

          // Body stat inputs
          ...step2Fields.map(f =>
            React.createElement(NumberField, {
              key: f.key, label: f.label, unit: f.unit,
              value: form[f.key],
              onChange: (v) => setForm({ ...form, [f.key]: v }),
              onKeyDown: handleKey,
              focused: focused === f.key,
              onFocus: () => setFocused(f.key),
              onBlur: () => setFocused(null),
            })
          ),

          // Gender toggle
          React.createElement("div", { style: { marginBottom: "40px" } },
            React.createElement("div", {
              style: { fontSize: "7px", letterSpacing: "0.5em", color: "#ccc", textTransform: "uppercase", marginBottom: "16px" },
            }, "Gender"),
            React.createElement("div", { style: { display: "flex", gap: "0" } },
              ["male", "female", "other"].map(g =>
                React.createElement("button", {
                  key: g,
                  onClick: () => setForm({ ...form, gender: g }),
                  style: {
                    flex: 1, padding: "13px",
                    background: form.gender === g ? "#000" : "#fff",
                    border: "1px solid #f0f0f0",
                    color: form.gender === g ? "#fff" : "#bbb",
                    fontSize: "8px", letterSpacing: "0.35em",
                    textTransform: "uppercase", cursor: "pointer",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    transition: "all 0.3s ease",
                  },
                }, g.charAt(0).toUpperCase() + g.slice(1))
              )
            )
          ),

          // Buttons
          React.createElement("div", { style: { display: "flex", gap: "12px", marginBottom: "24px" } },
            React.createElement("button", {
              onClick: () => { setStep(1); setError(""); },
              style: {
                flex: 1, padding: "18px", background: "#fff",
                border: "1px solid #f0f0f0", color: "#bbb",
                fontSize: "9px", letterSpacing: "0.4em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                transition: "all 0.3s ease",
              },
              onMouseEnter: (e) => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.color = "#000"; },
              onMouseLeave: (e) => { e.currentTarget.style.borderColor = "#f0f0f0"; e.currentTarget.style.color = "#bbb"; },
            }, "← Back"),

            React.createElement("button", {
              onClick: handleSubmit, disabled: loading,
              style: {
                flex: 2, padding: "18px",
                background: loading ? "#f0f0f0" : "#000",
                border: "none",
                color: loading ? "#bbb" : "#fff",
                fontSize: "9px", letterSpacing: "0.5em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                transition: "all 0.3s ease", display: "flex",
                alignItems: "center", justifyContent: "center", gap: "10px",
              },
              onMouseEnter: (e) => { if (!loading) e.currentTarget.style.background = "#222"; },
              onMouseLeave: (e) => { if (!loading) e.currentTarget.style.background = "#000"; },
            },
              loading ? "Creating..." : "Create Account",
              !loading && React.createElement("span", { style: { fontSize: "14px" } }, "→")
            )
          ),

          React.createElement("p", {
            style: { fontSize: "8px", color: "#ddd", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center" },
          }, "Body stats are optional — you can skip")
        )
      )
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      input::placeholder { color: #ddd; }
      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      input[type=number] { -moz-appearance: textfield; }
    `)
  );
}

// ── TEXT INPUT ──
function InputField({ label, type, value, onChange, onKeyDown, focused, onFocus, onBlur }) {
  return React.createElement("div", { style: { marginBottom: "32px" } },
    React.createElement("div", {
      style: { fontSize: "7px", letterSpacing: "0.5em", color: focused ? "#000" : "#ccc", textTransform: "uppercase", marginBottom: "10px", transition: "color 0.3s ease" },
    }, label),
    React.createElement("div", {
      style: { borderBottom: `1px solid ${focused ? "#000" : "#f0f0f0"}`, transition: "border-color 0.3s ease", paddingBottom: "12px" },
    },
      React.createElement("input", {
        type, value,
        onChange: (e) => onChange(e.target.value),
        onKeyDown, onFocus, onBlur,
        style: {
          width: "100%", border: "none", background: "transparent",
          fontSize: "clamp(20px,3vw,28px)", fontFamily: "'Bebas Neue', Impact",
          color: "#000", outline: "none", letterSpacing: "0.04em",
        },
      })
    )
  );
}

// ── NUMBER INPUT ──
function NumberField({ label, unit, value, onChange, onKeyDown, focused, onFocus, onBlur }) {
  return React.createElement("div", { style: { marginBottom: "28px" } },
    React.createElement("div", {
      style: { fontSize: "7px", letterSpacing: "0.5em", color: focused ? "#000" : "#ccc", textTransform: "uppercase", marginBottom: "10px", transition: "color 0.3s ease" },
    }, label),
    React.createElement("div", {
      style: { display: "flex", alignItems: "baseline", gap: "12px", borderBottom: `1px solid ${focused ? "#000" : "#f0f0f0"}`, paddingBottom: "12px", transition: "border-color 0.3s ease" },
    },
      React.createElement("input", {
        type: "number", value,
        onChange: (e) => onChange(e.target.value),
        onKeyDown, onFocus, onBlur,
        placeholder: "—",
        style: {
          flex: 1, border: "none", background: "transparent",
          fontSize: "clamp(24px,4vw,40px)", fontFamily: "'Bebas Neue', Impact",
          color: "#000", outline: "none", letterSpacing: "0.02em",
        },
      }),
      React.createElement("span", {
        style: { fontSize: "8px", letterSpacing: "0.4em", color: "#ddd", textTransform: "uppercase" },
      }, unit)
    )
  );
}

export default Signup;