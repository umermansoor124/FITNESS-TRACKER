import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice.js";

function Header() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "BMI Calc", slug: "/bmi", active: true },
    { name: "Login", slug: "/login", active: !isLoggedIn },
    { name: "Signup", slug: "/signup", active: !isLoggedIn },
    { name: "Dashboard", slug: "/dashboard", active: isLoggedIn },
    { name: "Profile", slug: "/profile", active: isLoggedIn },
  ];

  return React.createElement(
    "header",
    {
      style: {
        position: "fixed", top: scrolled ? "12px" : "20px",
        left: "50%", transform: "translateX(-50%)",
        zIndex: 1000, width: scrolled ? "70%" : "90%",
        maxWidth: "1100px", transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          background: scrolled ? "rgba(8,8,8,0.96)" : "rgba(12,12,12,0.75)",
          border: `1px solid ${scrolled ? "#222" : "rgba(255,255,255,0.06)"}`,
          borderRadius: "100px", padding: "0 8px 0 20px",
          height: "56px", display: "flex", alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.6)" : "0 4px 24px rgba(0,0,0,0.3)",
        },
      },
      // Logo
      React.createElement(
        "div",
        { onClick: () => navigate("/"), style: { cursor: "pointer", display: "flex", flexDirection: "column", gap: "1px" } },
        React.createElement("span", { style: { fontSize: "20px", fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.15em", color: "#fff", lineHeight: 1 } }, "FITNESS"),
        React.createElement("span", { style: { fontSize: "6px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#C0392B", lineHeight: 1 } }, "Tracker")
      ),
      // Nav
      React.createElement(
        "nav",
        { style: { display: "flex", alignItems: "center", gap: "2px", position: "absolute", left: "50%", transform: "translateX(-50%)" } },
        ...navItems.filter(i => i.active).map(item =>
          React.createElement(NavItem, { key: item.name, label: item.name, onClick: () => navigate(item.slug) })
        )
      ),
      // Right
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "8px" } },
        isLoggedIn && React.createElement(
          "button",
          {
            onClick: () => { dispatch(logout()); navigate("/"); },
            style: {
              background: "transparent", border: "1px solid #2a2a2a",
              borderRadius: "100px", color: "#555", fontSize: "10px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "7px 16px", cursor: "pointer",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              transition: "all 0.3s ease",
            },
            onMouseEnter: (e) => { e.currentTarget.style.borderColor = "#C0392B"; e.currentTarget.style.color = "#C0392B"; },
            onMouseLeave: (e) => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#555"; },
          },
          "Logout"
        ),
        // Hamburger
        React.createElement(
          "button",
          {
            onClick: () => setMenuOpen(!menuOpen),
            style: { background: menuOpen ? "rgba(192,57,43,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${menuOpen ? "#C0392B" : "#2a2a2a"}`, borderRadius: "100px", cursor: "pointer", padding: "8px 14px", display: "flex", flexDirection: "column", gap: "4px", alignItems: "center", transition: "all 0.3s ease" },
          },
          React.createElement("span", { style: { display: "block", width: "18px", height: "1px", background: menuOpen ? "#C0392B" : "#fff", transition: "all 0.3s ease", transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" } }),
          React.createElement("span", { style: { display: "block", width: "18px", height: "1px", background: "#C0392B", transition: "all 0.3s ease", opacity: menuOpen ? 0 : 1 } }),
          React.createElement("span", { style: { display: "block", width: "18px", height: "1px", background: menuOpen ? "#C0392B" : "#fff", transition: "all 0.3s ease", transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" } })
        )
      )
    ),
    // Mobile Menu
    React.createElement(
      "div",
      {
        style: {
          background: "rgba(8,8,8,0.98)", border: "1px solid #1e1e1e",
          borderRadius: "24px", marginTop: "8px",
          maxHeight: menuOpen ? "400px" : "0px", overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
          opacity: menuOpen ? 1 : 0,
        },
      },
      React.createElement(
        "div",
        { style: { padding: "12px 8px 16px" } },
        ...navItems.filter(i => i.active).map((item, idx) =>
          React.createElement(
            "button",
            {
              key: item.name,
              onClick: () => { navigate(item.slug); setMenuOpen(false); },
              style: { width: "100%", background: "transparent", border: "none", cursor: "pointer", color: "#555", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "12px 20px", textAlign: "left", borderRadius: "12px", transition: "all 0.2s ease" },
              onMouseEnter: (e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; },
              onMouseLeave: (e) => { e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "transparent"; },
            },
            item.name
          )
        )
      )
    ),
    React.createElement("style", null, `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`)
  );
}

function NavItem({ label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return React.createElement(
    "button",
    {
      onClick, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false),
      style: { background: hovered ? "rgba(255,255,255,0.06)" : "transparent", border: "none", cursor: "pointer", color: hovered ? "#fff" : "#555", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: "7px 14px", borderRadius: "100px", transition: "all 0.25s ease" },
    },
    label
  );
}

export default Header;