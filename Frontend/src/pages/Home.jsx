import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Counter({ end, suffix = "" }) {
  const [ref, visible] = useReveal();
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!visible || done.current) return;
    done.current = true;
    let c = 0;
    const step = Math.ceil(end / 60);
    const t = setInterval(() => {
      c = Math.min(c + step, end);
      setN(c);
      if (c >= end) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [visible, end]);
  return React.createElement("span", { ref }, n.toLocaleString() + suffix);
}

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((s) => s.auth);
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [show, setShow] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
    const s = () => setScrollY(window.scrollY);
    const m = (e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    const r = () => setMobile(window.innerWidth < 768);
    window.addEventListener("scroll", s, { passive: true });
    window.addEventListener("mousemove", m);
    window.addEventListener("resize", r);
    return () => {
      window.removeEventListener("scroll", s);
      window.removeEventListener("mousemove", m);
      window.removeEventListener("resize", r);
    };
  }, []);

  const features = [
    { title: "Workout Logger", sub: "Track every rep", desc: "Log every set, every rep, every drop of sweat. Real-time tracking built for athletes who demand precision.", num: "01" },
    { title: "Calorie Engine", sub: "Know your burn", desc: "Precision calorie tracking that keeps you accountable. Your numbers, your control, your results.", num: "02" },
    { title: "Progress Intel", sub: "See your gains", desc: "Visual analytics that reveal your transformation. Data-driven insights from your very first session.", num: "03" },
    { title: "Body Analysis", sub: "Know your body", desc: "Complete BMI calculator and body metrics. Understand where you are. Know where you're going.", num: "04" },
  ];

  return React.createElement("div", {
    style: { background: "#fafafa", color: "#000", fontFamily: "'Helvetica Neue', Arial, sans-serif", overflowX: "hidden" }
  },

    // ══════════════════════════════════════
    // 01 — HERO — Split layout
    // ══════════════════════════════════════
    React.createElement("section", {
      style: {
        minHeight: "100vh", display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
        position: "relative", overflow: "hidden",
      }
    },

      // LEFT — Dark side
      React.createElement("div", {
        style: {
          background: "#0a0a0a", display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: mobile ? "120px 32px 48px" : "0 64px 72px",
          position: "relative", overflow: "hidden", minHeight: mobile ? "60vh" : "100vh",
        }
      },

        // Animated circle bg
        React.createElement("div", {
          style: {
            position: "absolute",
            width: "500px", height: "500px", borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
            top: "50%", left: "50%",
            transform: `translate(calc(-50% + ${(mouse.x - 0.5) * 20}px), calc(-50% + ${(mouse.y - 0.5) * 20}px))`,
            transition: "transform 0.8s ease",
          }
        }),
        React.createElement("div", {
          style: {
            position: "absolute",
            width: "300px", height: "300px", borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
            top: "50%", left: "50%",
            transform: `translate(calc(-50% + ${(mouse.x - 0.5) * 40}px), calc(-50% + ${(mouse.y - 0.5) * 40}px))`,
            transition: "transform 0.5s ease",
          }
        }),

        // Tag
        // React.createElement("div", {
        //   style: {
        //     position: "absolute", top: "40px", left: "64px",
        //     fontSize: "8px", letterSpacing: "0.5em", color: "#333",
        //     textTransform: "uppercase",
        //     opacity: show ? 1 : 0, transition: "opacity 0.8s ease 0.3s",
        //   }
        // }, "Fitness Tracker — 2024"),

        // Main text
        React.createElement("div", {
          style: {
            opacity: show ? 1 : 0,
            transform: show ? "none" : "translateY(30px)",
            transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }
        },
          React.createElement("h1", {
            style: {
              fontSize: mobile ? "14vw" : "clamp(64px,9vw,120px)",
              fontFamily: "'Bebas Neue', Impact",
              color: "#fff", lineHeight: 0.9, margin: "0 0 32px",
              letterSpacing: "0.01em",
              transform: `translateY(${scrollY * -0.08}px)`,
            }
          }, "TRAIN\nTRACK\nDOMINATE"),

          React.createElement("p", {
            style: { color: "#444", fontSize: "11px", letterSpacing: "0.12em", lineHeight: 2.2, margin: "0 0 40px", maxWidth: "280px", textTransform: "uppercase" }
          }, "Built for those who refuse to quit. Track every session. Own every result."),

          React.createElement("button", {
            onClick: () => navigate(isLoggedIn ? "/dashboard" : "/signup"),
            style: {
              padding: "16px 40px", background: "#fff", border: "none",
              color: "#000", fontSize: "9px", letterSpacing: "0.45em",
              textTransform: "uppercase", cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              transition: "all 0.3s ease",
            },
            onMouseEnter: (e) => { e.currentTarget.style.background = "#e0e0e0"; },
            onMouseLeave: (e) => { e.currentTarget.style.background = "#fff"; },
          }, isLoggedIn ? "Enter Dashboard" : "Start Now"),
        )
      ),

      // RIGHT — White side
      !mobile && React.createElement("div", {
        style: {
          background: "#fafafa", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "0 64px",
          position: "relative", overflow: "hidden",
        }
      },

        // Large number
        React.createElement("div", {
          style: {
            position: "absolute", right: "-20px", bottom: "-20px",
            fontSize: "40vw", fontFamily: "'Bebas Neue', Impact",
            color: "transparent", WebkitTextStroke: "1px #ebebeb",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
            transform: `translateY(${scrollY * 0.05}px)`,
          }
        }, "F"),

        React.createElement("div", { style: { position: "relative", zIndex: 2 } },
          React.createElement("div", {
            style: {
              opacity: show ? 1 : 0, transition: "opacity 0.8s ease 0.8s",
            }
          },
            React.createElement("div", {
              style: { fontSize: "8px", letterSpacing: "0.5em", color: "#ccc", textTransform: "uppercase", marginBottom: "48px" }
            }, "— Scroll to explore"),

            // Mini stat cards
            ...[
              { n: 10000, s: "+", l: "Athletes" },
              { n: 500000, s: "+", l: "Sessions" },
              { n: 98, s: "%", l: "Goals Hit" },
            ].map((st, i) =>
              React.createElement("div", {
                key: i,
                style: {
                  display: "flex", alignItems: "baseline", gap: "12px",
                  padding: "20px 0", borderBottom: "1px solid #f0f0f0",
                }
              },
                React.createElement("div", {
                  style: { fontSize: "28px", fontFamily: "'Bebas Neue', Impact", color: "#000", letterSpacing: "0.02em" }
                }, React.createElement(Counter, { end: st.n, suffix: st.s })),
                React.createElement("div", {
                  style: { fontSize: "8px", letterSpacing: "0.4em", color: "#ccc", textTransform: "uppercase" }
                }, st.l)
              )
            ),

            React.createElement("div", { style: { marginTop: "40px" } },
              React.createElement("button", {
                onClick: () => navigate("/bmi"),
                style: {
                  padding: "14px 32px", background: "transparent",
                  border: "1px solid #e0e0e0", color: "#999",
                  fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  transition: "all 0.3s ease",
                },
                onMouseEnter: (e) => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.color = "#000"; },
                onMouseLeave: (e) => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#999"; },
              }, "BMI Calculator →")
            )
          )
        )
      )
    ),

    // ══════════════════════════════════════
    // 02 — FEATURES — Accordion style
    // ══════════════════════════════════════
    React.createElement("section", {
      style: { background: "#fff", borderTop: "1px solid #f0f0f0" }
    },

      // Section label
      React.createElement(RevealSection, null,
        React.createElement("div", {
          style: { padding: mobile ? "48px 32px 32px" : "72px 80px 48px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }
        },
          React.createElement("h2", {
            style: { fontSize: mobile ? "28px" : "clamp(28px,4vw,48px)", fontFamily: "'Bebas Neue', Impact", color: "#000", margin: 0, letterSpacing: "0.02em" }
          }, "WHAT WE OFFER"),
          React.createElement("span", { style: { fontSize: "8px", letterSpacing: "0.4em", color: "#ccc", textTransform: "uppercase" } }, "04 Systems")
        )
      ),

      // Accordion items
      features.map((f, i) =>
        React.createElement(FeatureRow, {
          key: f.num, feature: f, index: i,
          active: activeFeature === i,
          onClick: () => setActiveFeature(i),
          mobile,
        })
      )
    ),

    // ══════════════════════════════════════
    // 03 — STATS — Full width
    // ══════════════════════════════════════
    React.createElement("section", {
      style: { background: "#0a0a0a", borderTop: "1px solid #111" }
    },
      React.createElement(RevealSection, null,
        React.createElement("div", {
          style: { padding: mobile ? "64px 32px" : "100px 80px", display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "0" }
        },
          [
            { end: 10000, suffix: "+", label: "Elite Athletes", desc: "Training smarter" },
            { end: 500000, suffix: "+", label: "Sessions", desc: "Logged and crushed" },
            { end: 98, suffix: "%", label: "Goals Met", desc: "By active users" },
            { end: 4, suffix: ".9★", label: "Rating", desc: "Across all users" },
          ].map((s, i) =>
            React.createElement("div", {
              key: i,
              style: {
                padding: mobile ? "32px 16px" : "0 48px 0 0",
                borderRight: !mobile && i < 3 ? "1px solid #1a1a1a" : "none",
                borderBottom: mobile && i < 2 ? "1px solid #1a1a1a" : "none",
                marginBottom: mobile && i < 2 ? "0" : "0",
              }
            },
              React.createElement("div", {
                style: { fontSize: mobile ? "36px" : "clamp(44px,6vw,72px)", fontFamily: "'Bebas Neue', Impact", color: "#fff", lineHeight: 1, letterSpacing: "0.02em" }
              }, React.createElement(Counter, { end: s.end, suffix: s.suffix })),
              React.createElement("div", { style: { fontSize: "9px", letterSpacing: "0.4em", color: "#fff", textTransform: "uppercase", marginTop: "8px" } }, s.label),
              React.createElement("div", { style: { fontSize: "9px", color: "#333", marginTop: "4px", letterSpacing: "0.1em" } }, s.desc)
            )
          )
        )
      )
    ),

    // ══════════════════════════════════════
    // 04 — CTA — Minimal powerful
    // ══════════════════════════════════════
    React.createElement("section", {
      style: { background: "#fafafa", borderTop: "1px solid #f0f0f0", position: "relative", overflow: "hidden" }
    },
      // Ghost text bg
      React.createElement("div", {
        style: {
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: mobile ? "30vw" : "20vw",
          fontFamily: "'Bebas Neue', Impact",
          color: "transparent", WebkitTextStroke: "1px #f0f0f0",
          userSelect: "none", pointerEvents: "none",
          whiteSpace: "nowrap", letterSpacing: "0.02em",
        }
      }, "BEGIN"),

      React.createElement(RevealSection, null,
        React.createElement("div", {
          style: {
            padding: mobile ? "80px 32px 100px" : "140px 80px",
            display: "flex", flexDirection: mobile ? "column" : "row",
            alignItems: mobile ? "flex-start" : "center",
            justifyContent: "space-between", gap: "60px",
            position: "relative", zIndex: 2,
          }
        },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: "7px", letterSpacing: "0.6em", color: "#ccc", textTransform: "uppercase", marginBottom: "24px" } }, "— Ready?"),
            React.createElement("h2", {
              style: { fontSize: mobile ? "12vw" : "clamp(56px,9vw,120px)", fontFamily: "'Bebas Neue', Impact", color: "#000", lineHeight: 0.9, margin: "0 0 24px", letterSpacing: "0.01em" }
            }, "START YOUR\nJOURNEY."),
            React.createElement("p", {
              style: { fontSize: "10px", color: "#bbb", letterSpacing: "0.12em", lineHeight: 2.2, textTransform: "uppercase", maxWidth: "320px" }
            }, "No shortcuts. No excuses. Just results.")
          ),

          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px" } },
            React.createElement("button", {
              onClick: () => navigate(isLoggedIn ? "/dashboard" : "/signup"),
              style: {
                padding: "18px 52px", background: "#000", border: "none",
                color: "#fff", fontSize: "9px", letterSpacing: "0.45em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                transition: "all 0.3s ease",
              },
              onMouseEnter: (e) => e.currentTarget.style.background = "#222",
              onMouseLeave: (e) => e.currentTarget.style.background = "#000",
            }, isLoggedIn ? "Enter Dashboard" : "Join Now — Free"),

            React.createElement("button", {
              onClick: () => navigate("/bmi"),
              style: {
                padding: "18px 52px", background: "transparent",
                border: "1px solid #e8e8e8", color: "#bbb",
                fontSize: "9px", letterSpacing: "0.45em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                transition: "all 0.3s ease",
              },
              onMouseEnter: (e) => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.color = "#000"; },
              onMouseLeave: (e) => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.color = "#bbb"; },
            }, "Calculate BMI")
          )
        )
      )
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    `)
  );
}

// ── REVEAL SECTION ──
function RevealSection({ children }) {
  const [ref, visible] = [useRef(null), useState(false)];
  const vis = useRef(false);
  const r = useRef(null);

  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !vis.current) { vis.current = true; } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return React.createElement("div", {
    ref: r,
    style: {
      opacity: v ? 1 : 0,
      transform: v ? "none" : "translateY(40px)",
      transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
    }
  }, children);
}

// ── FEATURE ROW — Accordion ──
function FeatureRow({ feature, index, active, onClick, mobile }) {
  return React.createElement("div", {
    onClick,
    style: {
      borderBottom: "1px solid #f0f0f0",
      cursor: "pointer",
      background: active ? "#fafafa" : "#fff",
      transition: "background 0.3s ease",
    }
  },
    // Header
    React.createElement("div", {
      style: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: mobile ? "24px 32px" : "32px 80px",
        gap: "20px",
      }
    },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "24px" } },
        React.createElement("span", { style: { fontSize: "9px", letterSpacing: "0.4em", color: "#ccc", fontFamily: "'Helvetica Neue', Arial, sans-serif", minWidth: "24px" } }, feature.num),
        React.createElement("span", {
          style: {
            fontSize: mobile ? "20px" : "clamp(20px,3vw,36px)",
            fontFamily: "'Bebas Neue', Impact",
            color: active ? "#000" : "#888",
            letterSpacing: "0.04em",
            transition: "color 0.3s ease",
          }
        }, feature.title)
      ),
      React.createElement("div", {
        style: {
          width: "28px", height: "28px",
          border: `1px solid ${active ? "#000" : "#e0e0e0"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", color: active ? "#000" : "#ccc",
          transition: "all 0.3s ease",
          transform: active ? "rotate(45deg)" : "none",
          flexShrink: 0,
        }
      }, "+")
    ),

    // Expanded content
    React.createElement("div", {
      style: {
        maxHeight: active ? "200px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
      }
    },
      React.createElement("div", {
        style: {
          padding: mobile ? "0 32px 32px 80px" : "0 80px 40px 128px",
          display: "flex", gap: "48px", flexWrap: "wrap",
        }
      },
        React.createElement("p", {
          style: { fontSize: "12px", color: "#999", lineHeight: 2.2, letterSpacing: "0.06em", margin: 0, maxWidth: "500px" }
        }, feature.desc),
        React.createElement("div", {
          style: { fontSize: "8px", letterSpacing: "0.4em", color: "#ccc", textTransform: "uppercase", alignSelf: "flex-end" }
        }, feature.sub)
      )
    )
  );
}

export default Home;