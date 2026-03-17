import React, { useEffect, useRef } from "react";

function Footer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    let frame;
    const draw = () => {
      if (!canvas.width || !canvas.height) return;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 12;
        img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 15;
      }
      ctx.putImageData(img, 0, 0);
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  const links = [
    { title: "Features", items: ["Dashboard", "Workouts", "BMI Calc", "Profile"] },
    { title: "Support", items: ["About", "Contact", "Privacy", "Terms"] },
  ];

  return React.createElement(
    "footer",
    { style: { background: "#050505", padding: "24px" } },
    React.createElement(
      "div",
      {
        style: {
          position: "relative", maxWidth: "1200px", margin: "0 auto",
          background: "rgba(10,10,10,0.98)", border: "1px solid #161616",
          borderRadius: "32px", overflow: "hidden", padding: "48px 48px 32px",
        },
      },
      React.createElement("canvas", { ref: canvasRef, style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 } }),
      React.createElement("div", { style: { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "50%", height: "1px", background: "linear-gradient(90deg, transparent, #C0392B 40%, #C0392B 60%, transparent)", zIndex: 1 } }),
      React.createElement("div", { style: { position: "absolute", bottom: "-16px", left: "50%", transform: "translateX(-50%)", fontSize: "clamp(60px, 12vw, 130px)", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.05em", color: "transparent", WebkitTextStroke: "1px #151515", userSelect: "none", whiteSpace: "nowrap", zIndex: 0, lineHeight: 1, pointerEvents: "none" } }, "FITNESS"),
      React.createElement(
        "div",
        { style: { position: "relative", zIndex: 2 } },
        React.createElement(
          "div",
          { style: { display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "48px", marginBottom: "40px" } },
          React.createElement(
            "div",
            null,
            React.createElement("div", { style: { fontSize: "28px", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.12em", color: "#fff", lineHeight: 1, marginBottom: "4px" } }, "FITNESS"),
            React.createElement("div", { style: { fontSize: "8px", letterSpacing: "0.4em", color: "#C0392B", marginBottom: "16px", textTransform: "uppercase" } }, "Tracker"),
            React.createElement("p", { style: { color: "#3a3a3a", fontSize: "12px", lineHeight: "1.9", maxWidth: "240px", margin: 0 } }, "Track your workouts, monitor your progress, and achieve your fitness goals.")
          ),
          ...links.map(col =>
            React.createElement(
              "div",
              { key: col.title },
              React.createElement("div", { style: { fontSize: "9px", letterSpacing: "0.35em", color: "#C0392B", marginBottom: "16px", fontWeight: 500, textTransform: "uppercase" } }, col.title),
              React.createElement(
                "div",
                { style: { display: "flex", flexDirection: "column", gap: "10px" } },
                ...col.items.map(item =>
                  React.createElement("a", {
                    key: item, href: "#",
                    style: { color: "#333", textDecoration: "none", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.3s ease" },
                    onMouseEnter: (e) => e.currentTarget.style.color = "#C0392B",
                    onMouseLeave: (e) => e.currentTarget.style.color = "#333",
                  }, item)
                )
              )
            )
          )
        ),
        React.createElement("div", { style: { height: "1px", background: "linear-gradient(90deg, transparent, #1a1a1a 20%, #1a1a1a 80%, transparent)", marginBottom: "24px" } }),
        React.createElement(
          "div",
          { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" } },
          React.createElement("div", { style: { fontSize: "11px", color: "#252525", letterSpacing: "0.08em" } }, "© 2024 Fitness Tracker. All rights reserved."),
          React.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "7px", padding: "6px 14px", borderRadius: "100px", border: "1px solid #1a1a1a", background: "rgba(192,57,43,0.04)" } },
            React.createElement("div", { style: { width: "5px", height: "5px", borderRadius: "50%", background: "#C0392B", animation: "ftPulse 2s ease-in-out infinite" } }),
            React.createElement("span", { style: { fontSize: "9px", color: "#333", letterSpacing: "0.15em", textTransform: "uppercase" } }, "All Systems Live")
          )
        )
      )
    ),
    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      @keyframes ftPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
    `)
  );
}

export default Footer;