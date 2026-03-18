import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice.js";

function Header() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const navItems = [
    { name: "Home", slug: "/" },
    { name: "BMI", slug: "/bmi" },
    ...(!isLoggedIn ? [
      { name: "Login", slug: "/login" },
      { name: "Signup", slug: "/signup" },
    ] : [
      { name: "Dashboard", slug: "/dashboard" },
      { name: "Profile", slug: "/profile" },
    ]),
  ];

  return React.createElement(
    "header",
    {
      style: {
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 1000,
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }
    },

    // ── MAIN BAR ──
    React.createElement("div", {
      style: {
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: mobile ? "0 24px" : "0 64px",
        height: scrolled ? "64px" : "80px",
        background: scrolled ? "rgba(250,250,250,0.98)" : "rgba(250,250,250,0.0)",
        borderBottom: scrolled ? "1px solid #f0f0f0" : "1px solid transparent",
        transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
      }
    },

      // ── LOGO ──
      React.createElement("div", {
        onClick: () => navigate("/"),
        style: {
          cursor: "pointer",
          display: "flex", flexDirection: "column", gap: "2px",
          flexShrink: 0,
        }
      },
        React.createElement("div", {
          style: {
            fontSize: scrolled ? "18px" : "22px",
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            letterSpacing: "0.18em",
            color: "#bbb", lineHeight: 1,
            transition: "font-size 0.4s ease",
          }
        }, "FITNESS"),
        React.createElement("div", {
          style: {
            fontSize: "6px", letterSpacing: "0.55em",
            textTransform: "uppercase", color: "#bbb",
            lineHeight: 1,
          }
        }, "TRACKER")
      ),

      // ── DESKTOP NAV ──
      !mobile && React.createElement("nav", {
        style: {
          position: "absolute", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: "0",
        }
      },
        ...navItems.map(item =>
          React.createElement(NavBtn, {
            key: item.name,
            label: item.name,
            onClick: () => navigate(item.slug),
          })
        )
      ),

      // ── RIGHT SIDE ──
      React.createElement("div", {
        style: {
          display: "flex", alignItems: "center",
          gap: "16px", flexShrink: 0,
        }
      },

        // Logout btn desktop
        !mobile && isLoggedIn && React.createElement("button", {
          onClick: () => { dispatch(logout()); navigate("/"); },
          style: {
            padding: "9px 22px",
            background: "#000", border: "none",
            color: "#fff", fontSize: "8px",
            letterSpacing: "0.4em", textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            transition: "background 0.3s ease",
          },
          onMouseEnter: (e) => e.currentTarget.style.background = "#333",
          onMouseLeave: (e) => e.currentTarget.style.background = "#000",
        }, "Logout"),

        // Hamburger
        React.createElement("button", {
          onClick: () => setMenuOpen(!menuOpen),
          style: {
            background: "transparent", border: "none",
            cursor: "pointer", padding: "6px",
            display: "flex", flexDirection: "column",
            gap: "5px", alignItems: "flex-end",
          }
        },
          React.createElement("span", {
            style: {
              display: "block", width: "24px", height: "1.5px",
              background: "#000", transition: "all 0.4s ease",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }
          }),
          React.createElement("span", {
            style: {
              display: "block", width: "16px", height: "1.5px",
              background: "#000", transition: "all 0.4s ease",
              opacity: menuOpen ? 0 : 1,
            }
          }),
          React.createElement("span", {
            style: {
              display: "block", width: "24px", height: "1.5px",
              background: "#000", transition: "all 0.4s ease",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }
          })
        )
      )
    ),

    // ── FULLSCREEN MENU ──
    React.createElement("div", {
      style: {
        position: "fixed", inset: 0,
        background: "#fafafa",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: mobile ? "0 32px" : "0 80px",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transition: "opacity 0.4s ease",
        zIndex: -1,
        overflow: "hidden",
      }
    },

      // Top bar inside menu
      React.createElement("div", {
        style: {
          position: "absolute", top: 0, left: 0, right: 0,
          height: "80px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: mobile ? "0 24px" : "0 64px",
          borderBottom: "1px solid #f0f0f0",
        }
      },
        // Logo inside menu
        React.createElement("div", {
          onClick: () => { navigate("/"); setMenuOpen(false); },
          style: { cursor: "pointer", display: "flex", flexDirection: "column", gap: "2px" }
        },
          React.createElement("div", {
            style: { fontSize: "20px", fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.18em", color: "#000", lineHeight: 1 }
          }, "FITNESS"),
          React.createElement("div", {
            style: { fontSize: "6px", letterSpacing: "0.55em", textTransform: "uppercase", color: "#bbb", lineHeight: 1 }
          }, "TRACKER")
        ),

        // Close text
        React.createElement("div", {
          onClick: () => setMenuOpen(false),
          style: { fontSize: "8px", letterSpacing: "0.5em", color: "#bbb", textTransform: "uppercase", cursor: "pointer", transition: "color 0.3s ease" },
          onMouseEnter: (e) => e.currentTarget.style.color = "#000",
          onMouseLeave: (e) => e.currentTarget.style.color = "#bbb",
        }, "Close ✕")
      ),

      // Ghost bg text
      React.createElement("div", {
        style: {
          position: "absolute", right: "-20px", bottom: "-20px",
          fontSize: mobile ? "40vw" : "28vw",
          fontFamily: "'Bebas Neue', Impact",
          color: "transparent", WebkitTextStroke: "1px #f0f0f0",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        }
      }, "FT"),

      // Big nav links
      React.createElement("nav", {
        style: { display: "flex", flexDirection: "column", gap: "0px", position: "relative", zIndex: 2 }
      },
        navItems.map((item, idx) =>
          React.createElement(BigNavItem, {
            key: item.name,
            label: item.name,
            index: idx,
            visible: menuOpen,
            onClick: () => { navigate(item.slug); setMenuOpen(false); }
          })
        )
      ),

      // Bottom row
      React.createElement("div", {
        style: {
          position: "absolute", bottom: "40px",
          left: mobile ? "32px" : "80px", right: mobile ? "32px" : "80px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity 0.5s ease 0.4s",
          borderTop: "1px solid #f0f0f0", paddingTop: "20px",
        }
      },
        React.createElement("span", {
          style: { fontSize: "8px", letterSpacing: "0.4em", color: "#ddd", textTransform: "uppercase" }
        }, "© 2024 Fitness Tracker"),

        isLoggedIn && React.createElement("button", {
          onClick: () => { dispatch(logout()); navigate("/"); setMenuOpen(false); },
          style: {
            background: "none", border: "1px solid #e0e0e0",
            padding: "8px 20px",
            cursor: "pointer", fontSize: "8px",
            letterSpacing: "0.4em", color: "#bbb",
            textTransform: "uppercase",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            transition: "all 0.3s ease",
          },
          onMouseEnter: (e) => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.color = "#000"; },
          onMouseLeave: (e) => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#bbb"; },
        }, "Logout")
      )
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    `)
  );
}

// ── DESKTOP NAV BUTTON ──
function NavBtn({ label, onClick }) {
  const [hov, setHov] = useState(false);
  return React.createElement("button", {
    onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      background: "transparent", border: "none",
      cursor: "pointer",
      color: hov ? "#000" : "#aaa",
      fontSize: "9px", letterSpacing: "0.3em",
      textTransform: "uppercase",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      padding: "8px 18px",
      transition: "color 0.3s ease",
      position: "relative",
    }
  },
    label,
    React.createElement("span", {
      style: {
        position: "absolute", bottom: "3px",
        left: "18px", right: "18px",
        height: "1px", background: "#000",
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.3s ease",
        display: "block",
      }
    })
  );
}

// ── FULLSCREEN BIG NAV ITEM ──
function BigNavItem({ label, index, visible, onClick }) {
  const [hov, setHov] = useState(false);
  return React.createElement("div", {
    onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      cursor: "pointer",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(24px)",
      transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
      display: "flex", alignItems: "baseline", gap: "16px",
      padding: "6px 0",
      borderBottom: "1px solid #f5f5f5",
    }
  },
    React.createElement("span", {
      style: {
        fontSize: "9px", letterSpacing: "0.4em",
        color: "#ccc", minWidth: "28px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        transition: "color 0.3s ease",
      }
    }, `0${index + 1}`),
    React.createElement("span", {
      style: {
        fontSize: "clamp(36px,7vw,88px)",
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        color: hov ? "#000" : "#ddd",
        letterSpacing: "0.02em", lineHeight: 1.1,
        transition: "color 0.3s ease",
      }
    }, label.toUpperCase()),
    hov && React.createElement("span", {
      style: {
        fontSize: "8px", letterSpacing: "0.4em",
        color: "#bbb", textTransform: "uppercase",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        marginLeft: "auto", alignSelf: "center",
      }
    }, "→")
  );
}

export default Header;