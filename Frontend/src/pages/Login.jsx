import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice.js";
import API from "../api/axios.js";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true); setError("");
    try {
      const { data } = await API.post("/user/login", form);
      dispatch(loginSuccess(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return React.createElement(
    "div",
    { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" } },
    React.createElement(
      "div",
      { style: { width: "100%", maxWidth: "420px", background: "rgba(10,10,10,0.98)", border: "1px solid #1a1a1a", borderRadius: "24px", padding: "48px 40px" } },
      React.createElement("div", { style: { fontSize: "28px", fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.1em", color: "#fff", marginBottom: "4px" } }, "WELCOME BACK"),
      React.createElement("div", { style: { fontSize: "10px", letterSpacing: "0.3em", color: "#C0392B", marginBottom: "32px", textTransform: "uppercase" } }, "Login to your account"),
      error && React.createElement("div", { style: { background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#C0392B", fontSize: "12px", marginBottom: "20px" } }, error),
      React.createElement("input", {
        type: "email", placeholder: "Email", value: form.email,
        onChange: (e) => setForm({ ...form, email: e.target.value }),
        style: inputStyle,
        onFocus: (e) => e.target.style.borderColor = "#C0392B",
        onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
      }),
      React.createElement("input", {
        type: "password", placeholder: "Password", value: form.password,
        onChange: (e) => setForm({ ...form, password: e.target.value }),
        style: { ...inputStyle, marginBottom: "24px" },
        onFocus: (e) => e.target.style.borderColor = "#C0392B",
        onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
      }),
      React.createElement(
        "button",
        {
          onClick: handleSubmit, disabled: loading,
          style: { width: "100%", padding: "14px", background: "#C0392B", border: "none", borderRadius: "100px", color: "#fff", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "all 0.3s ease", opacity: loading ? 0.7 : 1 },
        },
        loading ? "Logging in..." : "Login"
      ),
      React.createElement(
        "p",
        { style: { textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#444" } },
        "Don't have an account? ",
        React.createElement("a", { href: "/signup", style: { color: "#C0392B", textDecoration: "none" } }, "Sign up")
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

export default Login;