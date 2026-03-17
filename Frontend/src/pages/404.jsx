import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return React.createElement(
    "div",
    { style: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px" } },
    React.createElement("div", { style: { fontSize: "clamp(100px, 20vw, 200px)", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.05em", color: "transparent", WebkitTextStroke: "1px #1a1a1a", lineHeight: 1 } }, "404"),
    React.createElement("div", { style: { fontSize: "11px", letterSpacing: "0.3em", color: "#C0392B", marginBottom: "12px", textTransform: "uppercase" } }, "Page Not Found"),
    React.createElement(
      "button",
      {
        onClick: () => navigate("/"),
        style: { marginTop: "24px", padding: "12px 32px", background: "transparent", border: "1px solid #222", borderRadius: "100px", color: "#555", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "all 0.3s ease" },
        onMouseEnter: (e) => { e.currentTarget.style.borderColor = "#C0392B"; e.currentTarget.style.color = "#C0392B"; },
        onMouseLeave: (e) => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#555"; },
      },
      "Go Home"
    ),
    React.createElement("style", null, `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`)
  );
}

export default NotFound;