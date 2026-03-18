import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [hovBtn, setHovBtn] = useState(null);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return React.createElement("div", {
    style: {
      minHeight: "100vh", background: "#fafafa",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    },
  },

    // ── TOP BAR ──
    React.createElement("div", {
      style: {
        padding: mobile ? "28px 24px" : "32px 80px",
        borderBottom: "1px solid #f0f0f0",
        display: "flex", justifyContent: "space-between",
        alignItems: "center",
        opacity: show ? 1 : 0,
        transition: "opacity 0.8s ease 0.2s",
      },
    },
      React.createElement("div", {
        onClick: () => navigate("/"),
        style: { cursor: "pointer" },
      },
      ),
      React.createElement("div", {
        style: { fontSize: "8px", letterSpacing: "0.5em", color: "#ddd", textTransform: "uppercase" },
      }, "Error — 404")
    ),

    // ── MAIN CONTENT ──
    React.createElement("div", {
      style: {
        flex: 1, display: "flex",
        flexDirection: mobile ? "column" : "row",
        alignItems: "stretch",
      },
    },

      // LEFT — Big 404
      React.createElement("div", {
        style: {
          flex: mobile ? "none" : 1,
          display: "flex", alignItems: "center",
          justifyContent: "center",
          borderRight: mobile ? "none" : "1px solid #f0f0f0",
          borderBottom: mobile ? "1px solid #f0f0f0" : "none",
          padding: mobile ? "60px 24px 40px" : "0",
          position: "relative", overflow: "hidden",
        },
      },

        // Ghost bg
        React.createElement("div", {
          style: {
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: mobile ? "60vw" : "35vw",
            fontFamily: "'Bebas Neue', Impact",
            color: "transparent", WebkitTextStroke: "1.5px #f5f5f5",
            userSelect: "none", pointerEvents: "none",
            lineHeight: 1, letterSpacing: "-0.02em",
          },
        }, "404"),

        // Actual number
        React.createElement("div", {
          style: {
            position: "relative", zIndex: 2,
            opacity: show ? 1 : 0,
            transform: show ? "none" : "translateY(30px)",
            transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
          },
        },
          React.createElement("div", {
            style: {
              fontSize: mobile ? "40vw" : "clamp(120px,20vw,260px)",
              fontFamily: "'Bebas Neue', Impact",
              color: "#000", lineHeight: 0.85,
              letterSpacing: "-0.02em", textAlign: "center",
            },
          }, "4"),
          React.createElement("div", {
            style: {
              fontSize: mobile ? "40vw" : "clamp(120px,20vw,260px)",
              fontFamily: "'Bebas Neue', Impact",
              color: "transparent",
              WebkitTextStroke: mobile ? "2px #e0e0e0" : "3px #e0e0e0",
              lineHeight: 0.85, letterSpacing: "-0.02em",
              textAlign: "center",
            },
          }, "0"),
          React.createElement("div", {
            style: {
              fontSize: mobile ? "40vw" : "clamp(120px,20vw,260px)",
              fontFamily: "'Bebas Neue', Impact",
              color: "transparent",
              WebkitTextStroke: mobile ? "2px #eeeeee" : "3px #eeeeee",
              lineHeight: 0.85, letterSpacing: "-0.02em",
              textAlign: "center",
            },
          }, "4")
        )
      ),

      // RIGHT — Message
      React.createElement("div", {
        style: {
          flex: mobile ? "none" : 1,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: mobile ? "40px 24px 60px" : "0 80px",
          position: "relative", overflow: "hidden",
        },
      },

        // Ghost text bg
        !mobile && React.createElement("div", {
          style: {
            position: "absolute", right: "-20px", bottom: "-30px",
            fontSize: "22vw", fontFamily: "'Bebas Neue', Impact",
            color: "transparent", WebkitTextStroke: "1px #f8f8f8",
            userSelect: "none", pointerEvents: "none", lineHeight: 1,
          },
        }, "LOST"),

        React.createElement("div", {
          style: {
            position: "relative", zIndex: 2,
            opacity: show ? 1 : 0,
            transform: show ? "none" : "translateX(30px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
          },
        },

          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.6em", color: "#888", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" },
          },
            React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#ccc" } }),
            "Page Not Found"
          ),

          React.createElement("h2", {
            style: { fontSize: mobile ? "10vw" : "clamp(36px,6vw,72px)", fontFamily: "'Bebas Neue', Impact", color: "#000", lineHeight: 0.88, margin: "0 0 8px", letterSpacing: "0.01em" },
          }, "WRONG"),
          React.createElement("h2", {
            style: { fontSize: mobile ? "10vw" : "clamp(36px,6vw,72px)", fontFamily: "'Bebas Neue', Impact", color: "transparent", WebkitTextStroke: "2px #e0e0e0", lineHeight: 0.88, margin: "0 0 32px", letterSpacing: "0.01em" },
          }, "DIRECTION."),

          React.createElement("p", {
            style: { fontSize: "11px", color: "#999", letterSpacing: "0.08em", lineHeight: 2.2, maxWidth: "320px", margin: "0 0 48px" },
          }, "The page you're looking for doesn't exist or has been moved. Let's get you back on track."),

          // Buttons
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "280px" } },
            React.createElement("button", {
              onClick: () => navigate("/"),
              onMouseEnter: () => setHovBtn("home"),
              onMouseLeave: () => setHovBtn(null),
              style: {
                padding: "16px 36px", background: hovBtn === "home" ? "#222" : "#000",
                border: "none", color: "#fff",
                fontSize: "9px", letterSpacing: "0.45em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                transition: "all 0.3s ease",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: "10px",
              },
            },
              "Go Home",
              React.createElement("span", { style: { fontSize: "12px" } }, "→")
            ),

            React.createElement("button", {
              onClick: () => navigate("/dashboard"),
              onMouseEnter: () => setHovBtn("dash"),
              onMouseLeave: () => setHovBtn(null),
              style: {
                padding: "16px 36px", background: "transparent",
                border: `1px solid ${hovBtn === "dash" ? "#000" : "#e8e8e8"}`,
                color: hovBtn === "dash" ? "#000" : "#aaa",
                fontSize: "9px", letterSpacing: "0.45em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                transition: "all 0.3s ease",
              },
            }, "Dashboard"),

            React.createElement("button", {
              onClick: () => navigate(-1),
              onMouseEnter: () => setHovBtn("back"),
              onMouseLeave: () => setHovBtn(null),
              style: {
                padding: "16px 36px", background: "transparent",
                border: `1px solid ${hovBtn === "back" ? "#000" : "#e8e8e8"}`,
                color: hovBtn === "back" ? "#000" : "#aaa",
                fontSize: "9px", letterSpacing: "0.45em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                transition: "all 0.3s ease",
              },
            }, "← Go Back")
          )
        )
      )
    ),

    // ── BOTTOM BAR ──
    React.createElement("div", {
      style: {
        padding: mobile ? "20px 24px" : "20px 80px",
        borderTop: "1px solid #f0f0f0",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "12px",
        opacity: show ? 1 : 0, transition: "opacity 0.8s ease 0.8s",
      },
    },
      React.createElement("span", {
        style: { fontSize: "8px", letterSpacing: "0.4em", color: "#ddd", textTransform: "uppercase" },
      }, "© 2024 Fitness Tracker"),
      React.createElement("span", {
        style: { fontSize: "8px", letterSpacing: "0.4em", color: "#eee", textTransform: "uppercase" },
      }, "Error Code — 404")
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    `)
  );
}

export default NotFound;