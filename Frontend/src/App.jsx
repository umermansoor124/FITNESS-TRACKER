import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./pages/Header.jsx";
import Footer from "./pages/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import BMICalculator from "./pages/BmiCalculator.jsx";
import NotFound from "./pages/404.jsx";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? children : React.createElement(Navigate, { to: "/login" });
}

function App() {
  return React.createElement(
    "div",
    { style: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a" } },
    React.createElement(Header, null),
    React.createElement(
      "main",
      { style: { flex: 1 } },
      React.createElement(
        Routes,
        null,
        React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
        React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }),
        React.createElement(Route, { path: "/signup", element: React.createElement(Signup, null) }),
        React.createElement(Route, { path: "/dashboard", element: React.createElement(ProtectedRoute, null, React.createElement(Dashboard, null)) }),
        React.createElement(Route, { path: "/profile", element: React.createElement(ProtectedRoute, null, React.createElement(Profile, null)) }),
        React.createElement(Route, { path: "/bmi", element: React.createElement(BMICalculator, null) }),
        React.createElement(Route, { path: "*", element: React.createElement(NotFound, null) })
      )
    ),
    React.createElement(Footer, null)
  );
}

export default App;