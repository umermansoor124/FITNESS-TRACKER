import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ── GRAIN ──
function GrainCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    let frame;
    const draw = () => {
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 18;
        img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 20;
      }
      ctx.putImageData(img, 0, 0);
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);
  return React.createElement("canvas", {
    ref, style: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }
  });
}

// ── SCANLINES ──
function Scanlines() {
  return React.createElement("div", {
    style: {
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2,
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
    }
  });
}

// ── GLITCH TEXT ──
function GlitchText({ text, size, color = "#fff", stroke }) {
  const [glitch, setGlitch] = useState(false);
  const [glitch2, setGlitch2] = useState(false);

  useEffect(() => {
    const t1 = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
    }, Math.random() * 4000 + 2000);

    const t2 = setInterval(() => {
      setGlitch2(true);
      setTimeout(() => setGlitch2(false), 120);
    }, Math.random() * 5000 + 3000);

    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const baseStyle = {
    fontSize: size,
    fontFamily: "'Bebas Neue', Impact, sans-serif",
    letterSpacing: "0.02em",
    color: stroke ? "transparent" : color,
    WebkitTextStroke: stroke ? `1px ${stroke}` : "none",
    display: "block",
    lineHeight: 0.88,
  };

  return React.createElement("div", { style: { position: "relative", display: "block" } },
    React.createElement("span", {
      style: {
        ...baseStyle,
        textShadow: glitch ? "4px 0 #C0392B, -4px 0 rgba(0,200,255,0.4)" : "none",
        transform: glitch ? `translate(${Math.random()*6-3}px,${Math.random()*3-1}px) skewX(${Math.random()*2-1}deg)` : "none",
        display: "block",
        transition: "none",
        clipPath: glitch2 ? "inset(20% 0 30% 0)" : "none",
      }
    }, text),
    (glitch || glitch2) && React.createElement("span", {
      style: {
        ...baseStyle,
        position: "absolute", top: `${Math.random()*8-4}px`, left: `${Math.random()*8-4}px`,
        color: "#C0392B", opacity: 0.5,
        clipPath: "inset(40% 0 20% 0)",
        pointerEvents: "none",
      }
    }, text)
  );
}

// ── MARQUEE ──
function Marquee({ items, reverse = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let pos = reverse ? -50 : 0;
    let id;
    const run = () => {
      pos += reverse ? 0.025 : -0.025;
      if (!reverse && pos <= -50) pos = 0;
      if (reverse && pos >= 0) pos = -50;
      el.style.transform = `translateX(${pos}%)`;
      id = requestAnimationFrame(run);
    };
    id = requestAnimationFrame(run);
    return () => cancelAnimationFrame(id);
  }, [reverse]);

  const all = [...items, ...items, ...items, ...items];
  return React.createElement("div", { style: { overflow: "hidden", width: "100%" } },
    React.createElement("div", {
      ref, style: { display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", willChange: "transform" }
    },
      all.map((item, i) =>
        React.createElement("span", { key: i, style: { display: "inline-flex", alignItems: "center" } },
          React.createElement("span", {
            style: {
              fontSize: "11px", letterSpacing: "0.45em", textTransform: "uppercase",
              fontFamily: "'Bebas Neue', Impact",
              color: item.red ? "#C0392B" : "#181818",
              padding: "0 20px",
            }
          }, item.text),
          React.createElement("span", { style: { color: "#C0392B", fontSize: "6px" } }, "◆")
        )
      )
    )
  );
}

// ── NUMBER TICKER ──
function Ticker({ end, suffix = "" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let c = 0;
    const s = Math.ceil(end / 60);
    const t = setInterval(() => {
      c = Math.min(c + s, end);
      setN(c);
      if (c >= end) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, [end]);
  return React.createElement("span", null, n.toLocaleString() + suffix);
}

// ── FEATURE CARD ──
function Card({ icon, title, desc, index }) {
  const [hov, setHov] = useState(false);
  return React.createElement("div", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      position: "relative",
      padding: "40px 32px",
      background: hov ? "rgba(192,57,43,0.04)" : "#070707",
      borderRight: "1px solid #0d0d0d",
      borderBottom: "1px solid #0d0d0d",
      transition: "background 0.4s ease",
      cursor: "default",
      overflow: "hidden",
    }
  },
    // Top full border on hover
    React.createElement("div", {
      style: {
        position: "absolute", top: 0, left: 0,
        width: hov ? "100%" : "0%", height: "1px",
        background: "linear-gradient(90deg, #C0392B, transparent)",
        transition: "width 0.5s ease",
      }
    }),

    // Index number bg
    React.createElement("div", {
      style: {
        position: "absolute", top: "16px", right: "20px",
        fontSize: "80px", fontFamily: "'Bebas Neue', Impact",
        color: hov ? "rgba(192,57,43,0.06)" : "rgba(255,255,255,0.02)",
        lineHeight: 1, userSelect: "none", transition: "color 0.4s ease",
        pointerEvents: "none",
      }
    }, `0${index + 1}`),

    React.createElement("div", {
      style: {
        width: "40px", height: "40px",
        border: `1px solid ${hov ? "#C0392B" : "#111"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "18px", marginBottom: "24px",
        transition: "border-color 0.3s ease",
      }
    }, icon),

    React.createElement("div", {
      style: {
        fontSize: "13px", fontFamily: "'Bebas Neue', Impact",
        letterSpacing: "0.18em", color: hov ? "#C0392B" : "#fff",
        marginBottom: "12px", transition: "color 0.3s ease",
      }
    }, title),

    React.createElement("div", {
      style: { fontSize: "12px", color: "#2e2e2e", lineHeight: 2, letterSpacing: "0.04em" }
    }, desc)
  );
}

// ── BUTTON ──
function Btn({ label, primary, onClick }) {
  const [hov, setHov] = useState(false);
  return React.createElement("button", {
    onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      position: "relative",
      padding: "13px 32px",
      background: primary ? (hov ? "#a93226" : "#C0392B") : "transparent",
      border: `1px solid ${primary ? "#C0392B" : (hov ? "#444" : "#1e1e1e")}`,
      color: primary ? "#fff" : (hov ? "#888" : "#333"),
      fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase",
      cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif",
      transition: "all 0.3s ease",
      clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
      boxShadow: primary && hov ? "0 0 40px rgba(192,57,43,0.25), inset 0 0 20px rgba(192,57,43,0.1)" : "none",
      overflow: "hidden",
    }
  },
    // Shimmer
    primary && hov && React.createElement("span", {
      style: {
        position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        animation: "shimmer 0.6s ease",
        pointerEvents: "none",
      }
    }),
    label
  );
}

// ── HOME ──
function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((s) => s.auth);
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [tab, setTab] = useState(window.innerWidth < 1024);
  const heroRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setShow(true), 80);
    const onResize = () => {
      setMobile(window.innerWidth < 768);
      setTab(window.innerWidth < 1024);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const mq1 = [
    { text: "Train Hard", red: false }, { text: "No Mercy", red: true },
    { text: "Zero Excuses", red: false }, { text: "Dominate", red: true },
    { text: "Built Different", red: false }, { text: "Stay Elite", red: true },
  ];
  const mq2 = [
    { text: "Fitness Tracker", red: true }, { text: "Track Progress", red: false },
    { text: "Own Your Body", red: true }, { text: "Max Output", red: false },
    { text: "Push Limits", red: true }, { text: "Zero Weakness", red: false },
  ];

  const features = [
    { icon: "⚡", title: "Workout Logger", desc: "Log every set, every rep. Precision data for peak performance." },
    { icon: "🔥", title: "Calorie Intel", desc: "Real-time burn tracking. Own your numbers like an elite athlete." },
    { icon: "📈", title: "Progress HQ", desc: "Mission control for gains. Visual data from day one." },
    { icon: "⚖️", title: "Body Metrics", desc: "BMI, weight, height. Complete body intelligence on demand." },
  ];

  return React.createElement("div", {
    style: { background: "#060606", minHeight: "100vh", fontFamily: "'Helvetica Neue', Arial, sans-serif", overflowX: "hidden" }
  },
    React.createElement(GrainCanvas, null),
    React.createElement(Scanlines, null),

    // ══════════════════════════════
    // HERO
    // ══════════════════════════════
    React.createElement("section", {
      ref: heroRef,
      style: {
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "center", zIndex: 3, overflow: "hidden",
      }
    },

      // BG number
      React.createElement("div", {
        style: {
          position: "absolute", right: mobile ? "-20px" : "40px", top: "50%",
          transform: "translateY(-50%)",
          fontSize: mobile ? "40vw" : "32vw",
          fontFamily: "'Bebas Neue', Impact",
          color: "transparent", WebkitTextStroke: "1px #0d0d0d",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
          opacity: show ? 1 : 0, transition: "opacity 1.5s ease 1s",
        }
      }, "01"),

      // Top marquee strip
      React.createElement("div", {
        style: {
          position: "absolute", top: mobile ? "72px" : "88px", left: 0, right: 0,
          borderTop: "1px solid #0f0f0f", borderBottom: "1px solid #0f0f0f",
          padding: "8px 0",
          opacity: show ? 0.8 : 0, transition: "opacity 1s ease 0.4s",
        }
      }, React.createElement(Marquee, { items: mq1 })),

      // Left accent line
      !mobile && React.createElement("div", {
        style: {
          position: "absolute", left: "56px", top: "15%", bottom: "15%",
          width: "1px",
          background: "linear-gradient(180deg, transparent, #C0392B 40%, #C0392B 60%, transparent)",
          opacity: show ? 1 : 0, transition: "opacity 1s ease 0.8s",
        }
      }),

      // ── MAIN TEXT BLOCK ──
      React.createElement("div", {
        style: {
          padding: mobile ? "160px 28px 100px" : tab ? "0 56px" : "0 96px",
          zIndex: 2,
        }
      },

        // Eyebrow
        React.createElement("div", {
          style: {
            display: "inline-flex", alignItems: "center", gap: "10px",
            marginBottom: "28px",
            opacity: show ? 1 : 0,
            transform: show ? "none" : "translateY(10px)",
            transition: "all 0.7s ease 0.3s",
          }
        },
          React.createElement("div", {
            style: { width: "28px", height: "1px", background: "#C0392B" }
          }),
          React.createElement("span", {
            style: { fontSize: "8px", letterSpacing: "0.55em", color: "#C0392B", textTransform: "uppercase" }
          }, "Fitness Tracker"),
          React.createElement("div", {
            style: {
              width: "6px", height: "6px", borderRadius: "50%", background: "#C0392B",
              animation: "rPulse 1.5s ease-in-out infinite",
            }
          }),
          React.createElement("span", {
            style: { fontSize: "8px", letterSpacing: "0.4em", color: "#1e1e1e", textTransform: "uppercase" }
          }, "v2.0 — Online"),
        ),

        // Hero titles
        React.createElement("div", {
          style: {
            opacity: show ? 1 : 0,
            transform: show ? "none" : "translateY(30px)",
            transition: "all 0.9s ease 0.4s",
            marginBottom: "8px",
          }
        },
          React.createElement(GlitchText, { text: "TRAIN.", size: mobile ? "18vw" : "clamp(72px,11vw,148px)" }),
          React.createElement(GlitchText, {
            text: "TRACK.", size: mobile ? "18vw" : "clamp(72px,11vw,148px)",
            stroke: "#1c1c1c",
          }),
          React.createElement(GlitchText, {
            text: "DOMINATE.", size: mobile ? "14vw" : "clamp(54px,8.5vw,112px)",
            color: "#C0392B",
          }),
        ),

        // Bottom row
        React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            alignItems: mobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: "28px", marginTop: "36px",
            opacity: show ? 1 : 0,
            transform: show ? "none" : "translateY(20px)",
            transition: "all 0.9s ease 0.7s",
          }
        },

          React.createElement("div", { style: { maxWidth: "300px" } },
            React.createElement("div", {
              style: { width: "24px", height: "1px", background: "#C0392B", marginBottom: "12px" }
            }),
            React.createElement("p", {
              style: { color: "#2a2a2a", fontSize: "10px", letterSpacing: "0.2em", lineHeight: 2.2, margin: 0, textTransform: "uppercase" }
            }, "Where discipline meets data. Your mission. Your metrics. Your legacy.")
          ),

          React.createElement("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" } },
            React.createElement(Btn, {
              primary: true,
              label: isLoggedIn ? "Enter HQ" : "Deploy Now",
              onClick: () => navigate(isLoggedIn ? "/dashboard" : "/signup"),
            }),
            React.createElement(Btn, {
              primary: false, label: "Body Analysis",
              onClick: () => navigate("/bmi"),
            })
          )
        )
      ),

      // Bottom marquee
      React.createElement("div", {
        style: {
          position: "absolute", bottom: mobile ? "32px" : "48px", left: 0, right: 0,
          borderTop: "1px solid #0f0f0f", borderBottom: "1px solid #0f0f0f",
          padding: "8px 0",
          opacity: show ? 0.8 : 0, transition: "opacity 1s ease 0.7s",
        }
      }, React.createElement(Marquee, { items: mq2, reverse: true }))
    ),

    // ══════════════════════════════
    // STATS
    // ══════════════════════════════
    React.createElement("div", {
      style: {
        position: "relative", zIndex: 3,
        borderTop: "1px solid #0f0f0f",
        display: "grid",
        gridTemplateColumns: mobile ? "1fr 1fr" : "4px 1fr 1fr 1fr 1fr",
      }
    },
      !mobile && React.createElement("div", { style: { background: "#C0392B" } }),
      ...[
        { end: 10000, suffix: "+", label: "Operators" },
        { end: 500000, suffix: "+", label: "Sessions" },
        { end: 98, suffix: "%", label: "Goals Hit" },
        { end: 4, suffix: ".9★", label: "Rating" },
      ].map((s, i) =>
        React.createElement("div", {
          key: i,
          style: {
            padding: mobile ? "24px 16px" : "32px 28px", textAlign: "center",
            borderRight: "1px solid #0f0f0f", borderBottom: mobile ? "1px solid #0f0f0f" : "none",
          }
        },
          React.createElement("div", {
            style: { fontSize: mobile ? "28px" : "clamp(28px,3.5vw,40px)", fontFamily: "'Bebas Neue', Impact", color: "#fff", lineHeight: 1, letterSpacing: "0.04em" }
          }, React.createElement(Ticker, { end: s.end, suffix: s.suffix })),
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.4em", color: "#C0392B", textTransform: "uppercase", marginTop: "6px" }
          }, s.label)
        )
      )
    ),

    // ══════════════════════════════
    // FEATURES
    // ══════════════════════════════
    React.createElement("section", {
      style: { position: "relative", zIndex: 3, borderTop: "1px solid #0f0f0f" }
    },

      // Header
      React.createElement("div", {
        style: {
          padding: mobile ? "48px 28px 36px" : "64px 96px 48px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
          borderBottom: "1px solid #0f0f0f",
        }
      },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "16px" } },
          React.createElement("div", { style: { width: "3px", height: "36px", background: "#C0392B" } }),
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: "7px", letterSpacing: "0.55em", color: "#C0392B", textTransform: "uppercase", marginBottom: "4px" } }, "Capabilities"),
            React.createElement("h2", {
              style: { fontSize: mobile ? "32px" : "clamp(28px,4vw,52px)", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.06em", color: "#fff", lineHeight: 1, margin: 0 }
            }, "MISSION ARSENAL")
          )
        ),
        React.createElement("span", {
          style: { fontSize: "8px", letterSpacing: "0.3em", color: "#111", textTransform: "uppercase" }
        }, "04 Capabilities")
      ),

      // Grid
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : tab ? "1fr 1fr" : "repeat(4, 1fr)",
        }
      },
        features.map((f, i) => React.createElement(Card, { key: f.title, ...f, index: i }))
      )
    ),

    // ══════════════════════════════
    // CTA SECTION
    // ══════════════════════════════
    React.createElement("section", {
      style: {
        position: "relative", zIndex: 3,
        borderTop: "1px solid #0f0f0f",
        padding: mobile ? "60px 28px 80px" : "100px 96px",
        display: "flex", flexDirection: mobile ? "column" : "row",
        alignItems: mobile ? "flex-start" : "center",
        justifyContent: "space-between", gap: "48px",
        overflow: "hidden",
      }
    },

      // Left
      React.createElement("div", { style: { position: "relative", zIndex: 2 } },
        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.55em", color: "#C0392B", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }
        },
          React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#C0392B" } }),
          "Final Briefing"
        ),
        React.createElement(GlitchText, { text: "READY TO", size: mobile ? "13vw" : "clamp(48px,7vw,88px)" }),
        React.createElement(GlitchText, { text: "DOMINATE?", size: mobile ? "13vw" : "clamp(48px,7vw,88px)", color: "#C0392B" }),
        React.createElement("p", {
          style: { color: "#222", fontSize: "10px", letterSpacing: "0.2em", lineHeight: 2.2, textTransform: "uppercase", margin: "20px 0 0", maxWidth: "360px" }
        }, "The mission begins the moment you decide to start. No shortcuts. No excuses.")
      ),

      // Right
      React.createElement("div", {
        style: { display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start", position: "relative", zIndex: 2 }
      },
        React.createElement(Btn, {
          primary: true,
          label: isLoggedIn ? "Enter Dashboard" : "Begin Mission",
          onClick: () => navigate(isLoggedIn ? "/dashboard" : "/signup"),
        }),
        React.createElement(Btn, {
          primary: false, label: "Calculate BMI",
          onClick: () => navigate("/bmi"),
        }),
        React.createElement("div", {
          style: { display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }
        },
          React.createElement("div", { style: { width: "5px", height: "5px", borderRadius: "50%", background: "#C0392B", animation: "rPulse 1.5s ease-in-out infinite" } }),
          React.createElement("span", { style: { fontSize: "8px", letterSpacing: "0.4em", color: "#1a1a1a", textTransform: "uppercase" } }, "Free to join — no commitment")
        )
      ),

      // BG ghost
      !mobile && React.createElement("div", {
        style: {
          position: "absolute", right: "-20px", bottom: "-40px",
          fontSize: "28vw", fontFamily: "'Bebas Neue', Impact",
          color: "transparent", WebkitTextStroke: "1px #0a0a0a",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
          zIndex: 1,
        }
      }, "GO")
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      @keyframes rPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.2;transform:scale(0.5)} }
      @keyframes shimmer { 0%{left:-100%} 100%{left:200%} }
    `)
  );
}

export default Home;