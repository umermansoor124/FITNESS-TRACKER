import React, { useEffect, useRef, useState } from "react";

function Footer() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [tab, setTab] = useState(window.innerWidth < 1024);
  const [hovLink, setHovLink] = useState(null);

  useEffect(() => {
    const onResize = () => {
      setMobile(window.innerWidth < 768);
      setTab(window.innerWidth < 1024);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "BMI Calculator", href: "/bmi" },
    { label: "Profile", href: "/profile" },
    { label: "Workouts", href: "/dashboard" },
    { label: "Login", href: "/login" },
    { label: "Signup", href: "/signup" },
  ];

  return React.createElement(
    "footer",
    {
      style: {
        background: "#fff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        borderTop: "1px solid #f0f0f0",
        position: "relative",
        overflow: "hidden",
      },
    },

    // ── TOP BAND ──
    React.createElement("div", {
      style: {
        borderBottom: "1px solid #f0f0f0",
        padding: mobile ? "32px 24px" : "24px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      },
    },
      React.createElement("div", {
        style: { display: "flex", alignItems: "center", gap: "12px" },
      },
        React.createElement("div", {
          style: {
            width: "6px", height: "6px",
            borderRadius: "50%", background: "#000",
            animation: "bPulse 2s ease-in-out infinite",
          },
        }),
        React.createElement("span", {
          style: { fontSize: "8px", letterSpacing: "0.5em", color: "#bbb", textTransform: "uppercase" },
        }, "All Systems Operational"),
      ),
      React.createElement("span", {
        style: { fontSize: "8px", letterSpacing: "0.5em", color: "#e0e0e0", textTransform: "uppercase" },
      }, "Est. 2024 — Vol. 01"),
    ),

    // ── HERO BRAND BLOCK ──
    React.createElement("div", {
      style: {
        padding: mobile ? "60px 24px 48px" : tab ? "80px 48px 64px" : "100px 80px 80px",
        borderBottom: "1px solid #f0f0f0",
        position: "relative",
        overflow: "hidden",
      },
    },

      // Giant ghost text
      React.createElement("div", {
        style: {
          position: "absolute",
          right: mobile ? "-10px" : "-20px",
          bottom: "-30px",
          fontSize: mobile ? "38vw" : "22vw",
          fontFamily: "'Bebas Neue', Impact",
          color: "transparent",
          WebkitTextStroke: "1.5px #f5f5f5",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        },
      }, "FT"),

      React.createElement("div", {
        style: {
          position: "relative", zIndex: 2,
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: mobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          gap: "40px",
        },
      },

        // Left — Big brand
        React.createElement("div", null,
          React.createElement("div", {
            style: {
              fontSize: "8px", letterSpacing: "0.6em",
              color: "#ccc", textTransform: "uppercase",
              marginBottom: "16px",
              display: "flex", alignItems: "center", gap: "12px",
            },
          },
            React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#ddd" } }),
            "Since 2026"
          ),
          React.createElement("h2", {
            style: {
              fontSize: mobile ? "18vw" : "clamp(72px,12vw,160px)",
              fontFamily: "'Bebas Neue', Impact",
              letterSpacing: "-0.01em",
              color: "#000", lineHeight: 0.88,
              margin: "0 0 8px",
            },
          }, "FITNESS"),
          React.createElement("h2", {
            style: {
              fontSize: mobile ? "18vw" : "clamp(72px,12vw,160px)",
              fontFamily: "'Bebas Neue', Impact",
              letterSpacing: "-0.01em",
              color: "transparent",
              WebkitTextStroke: "2px #e8e8e8",
              lineHeight: 0.88, margin: 0,
            },
          }, "TRACKER"),
        ),

        // Right — tagline + CTA
        React.createElement("div", {
          style: { maxWidth: "300px" },
        },
          React.createElement("p", {
            style: {
              color: "#bbb", fontSize: "11px",
              lineHeight: 2.3, letterSpacing: "0.06em",
              margin: "0 0 32px",
            },
          }, "Built for those who refuse to quit. Track every session. Own every result. Dominate every goal."),

          React.createElement("button", {
            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
            style: {
              padding: "14px 36px",
              background: "#000", border: "none",
              color: "#fff", fontSize: "8px",
              letterSpacing: "0.45em", textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              transition: "background 0.3s ease",
              display: "flex", alignItems: "center", gap: "10px",
            },
            onMouseEnter: (e) => e.currentTarget.style.background = "#222",
            onMouseLeave: (e) => e.currentTarget.style.background = "#000",
          },
            "Back to Top",
            React.createElement("span", { style: { fontSize: "12px" } }, "↑")
          )
        )
      )
    ),

    // ── NAV LINKS — big list ──
    React.createElement("div", {
      style: {
        borderBottom: "1px solid #f0f0f0",
      },
    },
      navLinks.map((link, i) =>
        React.createElement("div", {
          key: link.label,
          onMouseEnter: () => setHovLink(i),
          onMouseLeave: () => setHovLink(null),
          onClick: () => window.location.href = link.href,
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: mobile ? "20px 24px" : "22px 80px",
            borderBottom: i < navLinks.length - 1 ? "1px solid #f8f8f8" : "none",
            cursor: "pointer",
            background: hovLink === i ? "#fafafa" : "#fff",
            transition: "background 0.3s ease",
          },
        },
          // Left
          React.createElement("div", {
            style: { display: "flex", alignItems: "center", gap: mobile ? "16px" : "28px" },
          },
            React.createElement("span", {
              style: {
                fontSize: "8px", letterSpacing: "0.4em",
                color: hovLink === i ? "#000" : "#ddd",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                transition: "color 0.3s ease",
                minWidth: "24px",
              },
            }, `0${i + 1}`),
            React.createElement("span", {
              style: {
                fontSize: mobile ? "24px" : "clamp(24px,4vw,48px)",
                fontFamily: "'Bebas Neue', Impact",
                letterSpacing: "0.04em",
                color: hovLink === i ? "#000" : "#ccc",
                transition: "color 0.3s ease",
              },
            }, link.label.toUpperCase()),
          ),

          // Right arrow
          React.createElement("span", {
            style: {
              fontSize: mobile ? "16px" : "20px",
              color: hovLink === i ? "#000" : "#e0e0e0",
              transition: "all 0.3s ease",
              transform: hovLink === i ? "translateX(4px)" : "none",
            },
          }, "→")
        )
      )
    ),

    // ── BOTTOM BAR ──
    React.createElement("div", {
      style: {
        padding: mobile ? "20px 24px" : "20px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      },
    },
      React.createElement("span", {
        style: { fontSize: "8px", letterSpacing: "0.4em", color: "#ddd", textTransform: "uppercase" },
      }, "© 2024 Fitness Tracker"),

      React.createElement("span", {
        style: { fontSize: "8px", letterSpacing: "0.4em", color: "#eee", textTransform: "uppercase" },
      }, "All Rights Reserved"),
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      @keyframes bPulse {
        0%,100%{opacity:1;transform:scale(1)}
        50%{opacity:0.2;transform:scale(0.5)}
      }
    `)
  );
}

export default Footer;