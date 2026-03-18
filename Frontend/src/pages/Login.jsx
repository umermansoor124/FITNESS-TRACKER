import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice.js";
import API from "../api/axios.js";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [focused, setFocused] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSubmit = async () => {
    if (!form.email || !form.password) return;
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

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return React.createElement("div", {
    style: {
      minHeight: "100vh", background: "#fafafa",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
      paddingTop: "80px",
    },
  },

    // ── LEFT — Dark branding side ──
    !mobile && React.createElement("div", {
      style: {
        background: "#0a0a0a",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 64px",
        position: "relative", overflow: "hidden",
      },
    },
      React.createElement("div", {
        style: {
          position: "absolute", bottom: "-40px", left: "-20px",
          fontSize: "28vw", fontFamily: "'Bebas Neue', Impact",
          color: "transparent", WebkitTextStroke: "1px #111",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        },
      }, "FT"),

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

      React.createElement("div", { style: { position: "relative", zIndex: 2 } },
        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.6em", color: "#333", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" },
        },
          React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#333" } }),
          "Welcome Back"
        ),
        React.createElement("h2", {
          style: { fontSize: "clamp(48px,7vw,88px)", fontFamily: "'Bebas Neue', Impact", color: "#fff", lineHeight: 0.88, margin: "0 0 8px", letterSpacing: "0.01em" },
        }, "TRAIN."),
        React.createElement("h2", {
          style: { fontSize: "clamp(48px,7vw,88px)", fontFamily: "'Bebas Neue', Impact", color: "transparent", WebkitTextStroke: "1px #222", lineHeight: 0.88, margin: 0, letterSpacing: "0.01em" },
        }, "DOMINATE."),
      ),

      React.createElement("p", {
        style: { color: "#222", fontSize: "10px", letterSpacing: "0.1em", lineHeight: 2.2, margin: 0, position: "relative", zIndex: 2 },
      }, "No shortcuts. No excuses. Just results.")
    ),

    // ── RIGHT — Form side ──
    React.createElement("div", {
      style: {
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: mobile ? "48px 24px" : "72px 80px",
        background: "#fafafa",
        position: "relative", overflow: "hidden",
      },
    },

      React.createElement("div", {
        style: {
          position: "absolute", top: mobile ? "24px" : "40px",
          right: mobile ? "24px" : "80px",
          fontSize: "8px", letterSpacing: "0.4em",
          color: "#ccc", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: "8px",
          cursor: "pointer",
        },
        onClick: () => navigate("/signup"),
      },
        "New here?",
        React.createElement("span", { style: { color: "#000", fontSize: "10px" } }, "→")
      ),

      React.createElement("div", { style: { maxWidth: "400px", width: "100%" } },

        React.createElement("div", { style: { marginBottom: "48px" } },
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.6em", color: "#ccc", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" },
          },
            React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#ddd" } }),
            "Sign In"
          ),
          React.createElement("h1", {
            style: { fontSize: mobile ? "12vw" : "clamp(48px,7vw,80px)", fontFamily: "'Bebas Neue', Impact", color: "#000", lineHeight: 0.88, margin: "0 0 8px", letterSpacing: "0.01em" },
          }, "WELCOME"),
          React.createElement("h1", {
            style: { fontSize: mobile ? "12vw" : "clamp(48px,7vw,80px)", fontFamily: "'Bebas Neue', Impact", color: "transparent", WebkitTextStroke: "2px #e8e8e8", lineHeight: 0.88, margin: 0, letterSpacing: "0.01em" },
          }, "BACK."),
        ),

        error && React.createElement("div", {
          style: {
            padding: "14px 20px", background: "#fff",
            border: "1px solid #f0f0f0", borderLeft: "3px solid #000",
            marginBottom: "24px", fontSize: "9px",
            letterSpacing: "0.2em", color: "#000", textTransform: "uppercase",
          },
        }, error),

        React.createElement(InputField, {
          label: "Email Address", type: "email", value: form.email,
          onChange: (v) => setForm({ ...form, email: v }),
          onKeyDown: handleKey, focused: focused === "email",
          onFocus: () => setFocused("email"), onBlur: () => setFocused(null),
        }),

        React.createElement(InputField, {
          label: "Password", type: "password", value: form.password,
          onChange: (v) => setForm({ ...form, password: v }),
          onKeyDown: handleKey, focused: focused === "password",
          onFocus: () => setFocused("password"), onBlur: () => setFocused(null),
        }),

        React.createElement("button", {
          onClick: handleSubmit, disabled: loading,
          style: {
            width: "100%", padding: "18px",
            background: loading ? "#f0f0f0" : "#000", border: "none",
            color: loading ? "#bbb" : "#fff", fontSize: "9px",
            letterSpacing: "0.5em", textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            transition: "all 0.3s ease", display: "flex",
            alignItems: "center", justifyContent: "center",
            gap: "12px", marginBottom: "24px",
          },
          onMouseEnter: (e) => { if (!loading) e.currentTarget.style.background = "#222"; },
          onMouseLeave: (e) => { if (!loading) e.currentTarget.style.background = "#000"; },
        },
          loading ? "Signing in..." : "Sign In",
          !loading && React.createElement("span", { style: { fontSize: "14px" } }, "→")
        ),

        React.createElement("div", {
          style: { display: "flex", alignItems: "center", gap: "16px", paddingTop: "24px", borderTop: "1px solid #f0f0f0" },
        },
          React.createElement("span", {
            style: { fontSize: "8px", letterSpacing: "0.3em", color: "#ccc", textTransform: "uppercase" },
          }, "No account?"),
          React.createElement("span", {
            onClick: () => navigate("/signup"),
            style: { fontSize: "8px", letterSpacing: "0.4em", color: "#000", textTransform: "uppercase", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "4px" },
          }, "Create One →")
        )
      )
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      input::placeholder { color: #ddd; }
    `)
  );
}

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

export default Login;