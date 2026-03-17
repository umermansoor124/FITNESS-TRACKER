import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice.js";
import API from "../api/axios.js";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "", weight: "", height: "", gender: "male" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true); setError("");
    try {
      const { data } = await API.post("/user/register", form);
      dispatch(loginSuccess(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name", placeholder: "Full Name", type: "text" },
    { key: "email", placeholder: "Email", type: "email" },
    { key: "password", placeholder: "Password", type: "password" },
    { key: "age", placeholder: "Age", type: "number" },
    { key: "weight", placeholder: "Weight (kg)", type: "number" },
    { key: "height", placeholder: "Height (cm)", type: "number" },
  ];

  return React.createElement(
    "div",
    { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px" } },
    React.createElement(
      "div",
      { style: { width: "100%", maxWidth: "460px", background: "rgba(10,10,10,0.98)", border: "1px solid #1a1a1a", borderRadius: "24px", padding: "48px 40px" } },
      React.createElement("div", { style: { fontSize: "28px", fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.1em", color: "#fff", marginBottom: "4px" } }, "CREATE ACCOUNT"),
      React.createElement("div", { style: { fontSize: "10px", letterSpacing: "0.3em", color: "#C0392B", marginBottom: "32px", textTransform: "uppercase" } }, "Start your fitness journey"),
      error && React.createElement("div", { style: { background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#C0392B", fontSize: "12px", marginBottom: "20px" } }, error),
      ...fields.map(f =>
        React.createElement("input", {
          key: f.key, type: f.type, placeholder: f.placeholder, value: form[f.key],
          onChange: (e) => setForm({ ...form, [f.key]: e.target.value }),
          style: inputStyle,
          onFocus: (e) => e.target.style.borderColor = "#C0392B",
          onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
        })
      ),
      React.createElement(
        "select",
        {
          value: form.gender,
          onChange: (e) => setForm({ ...form, gender: e.target.value }),
          style: { ...inputStyle, marginBottom: "24px" },
        },
        React.createElement("option", { value: "male" }, "Male"),
        React.createElement("option", { value: "female" }, "Female"),
        React.createElement("option", { value: "other" }, "Other")
      ),
      React.createElement(
        "button",
        {
          onClick: handleSubmit, disabled: loading,
          style: { width: "100%", padding: "14px", background: "#C0392B", border: "none", borderRadius: "100px", color: "#fff", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "all 0.3s ease", opacity: loading ? 0.7 : 1 },
        },
        loading ? "Creating..." : "Create Account"
      ),
      React.createElement(
        "p",
        { style: { textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#444" } },
        "Already have an account? ",
        React.createElement("a", { href: "/login", style: { color: "#C0392B", textDecoration: "none" } }, "Login")
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

export default Signup;