import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice.js";
import API from "../api/axios.js";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", age: "", weight: "", height: "", gender: "male" });
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    API.get("/user/profile").then(({ data }) => {
      setForm({
        name: data.name || "",
        age: data.age || "",
        weight: data.weight || "",
        height: data.height || "",
        gender: data.gender || "male",
      });
      if (data.profilePic) {
        setPreview(`https://graceful-mercy-production-aae3.up.railway.app/uploads/${data.profilePic}`);
      }
    }).catch(console.error);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSave = async () => {
    setLoading(true); setError(""); setSuccess(false);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (profilePic) fd.append("profilePic", profilePic);
      const { data } = await API.put("/user/profile", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(loginSuccess({ token: localStorage.getItem("token"), user: data }));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "age", label: "Age", type: "number", unit: "yrs" },
    { key: "weight", label: "Weight", type: "number", unit: "kg" },
    { key: "height", label: "Height", type: "number", unit: "cm" },
  ];

  return React.createElement("div", {
    style: {
      minHeight: "100vh", background: "#fafafa",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      paddingTop: "80px",
    },
  },

    // ── PAGE HEADER ──
    React.createElement("div", {
      style: {
        borderBottom: "1px solid #f0f0f0",
        padding: mobile ? "40px 24px 32px" : "56px 80px 40px",
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap", gap: "16px",
        position: "relative", overflow: "hidden",
      },
    },
      // Ghost bg
      React.createElement("div", {
        style: {
          position: "absolute", right: "-10px", bottom: "-20px",
          fontSize: mobile ? "30vw" : "18vw",
          fontFamily: "'Bebas Neue', Impact",
          color: "transparent", WebkitTextStroke: "1px #f0f0f0",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        },
      }, "ME"),

      React.createElement("div", { style: { position: "relative", zIndex: 2 } },
        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.6em", color: "#888", textTransform: "uppercase", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" },
        },
          React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#ccc" } }),
          "Account Settings"
        ),
        React.createElement("h1", {
          style: { fontSize: mobile ? "10vw" : "clamp(40px,6vw,72px)", fontFamily: "'Bebas Neue', Impact", color: "#000", lineHeight: 0.88, margin: "0 0 6px", letterSpacing: "0.01em" },
        }, "MY"),
        React.createElement("h1", {
          style: { fontSize: mobile ? "10vw" : "clamp(40px,6vw,72px)", fontFamily: "'Bebas Neue', Impact", color: "transparent", WebkitTextStroke: "2px #ccc", lineHeight: 0.88, margin: 0, letterSpacing: "0.01em" },
        }, "PROFILE.")
      ),

      React.createElement("div", {
        style: { fontSize: "7px", letterSpacing: "0.5em", color: "#888", textTransform: "uppercase", position: "relative", zIndex: 2 },
      }, "Update your information")
    ),

    // ── MAIN GRID ──
    React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
        minHeight: "70vh",
      },
    },

      // ── LEFT — AVATAR ──
      React.createElement("div", {
        style: {
          padding: mobile ? "40px 24px" : "64px 80px",
          borderRight: mobile ? "none" : "1px solid #f0f0f0",
          borderBottom: mobile ? "1px solid #f0f0f0" : "none",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "32px",
        },
      },

        // Avatar circle
        React.createElement("div", {
          onClick: () => document.getElementById("picInput").click(),
          style: {
            width: mobile ? "140px" : "180px",
            height: mobile ? "140px" : "180px",
            borderRadius: "50%",
            border: "1px solid #f0f0f0",
            overflow: "hidden",
            background: "#f8f8f8",
            display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer",
            position: "relative",
            transition: "border-color 0.3s ease",
          },
          onMouseEnter: (e) => e.currentTarget.style.borderColor = "#000",
          onMouseLeave: (e) => e.currentTarget.style.borderColor = "#f0f0f0",
        },
          preview
            ? React.createElement("img", {
                src: preview,
                style: { width: "100%", height: "100%", objectFit: "cover" },
              })
            : React.createElement("div", {
                style: { textAlign: "center" },
              },
                React.createElement("div", { style: { fontSize: "40px", marginBottom: "8px" } }, "👤"),
                React.createElement("div", { style: { fontSize: "7px", letterSpacing: "0.4em", color: "#ccc", textTransform: "uppercase" } }, "Upload")
              ),

          // Hover overlay
          React.createElement("div", {
            style: {
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0, transition: "opacity 0.3s ease",
            },
            onMouseEnter: (e) => e.currentTarget.style.opacity = "1",
            onMouseLeave: (e) => e.currentTarget.style.opacity = "0",
          },
            React.createElement("span", { style: { fontSize: "8px", letterSpacing: "0.4em", color: "#fff", textTransform: "uppercase" } }, "Change")
          )
        ),

        React.createElement("input", {
          id: "picInput", type: "file", accept: "image/*",
          style: { display: "none" },
          onChange: (e) => {
            const file = e.target.files[0];
            if (!file) return;
            setProfilePic(file);
            setPreview(URL.createObjectURL(file));
          },
        }),

        React.createElement("div", { style: { textAlign: "center" } },
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.5em", color: "#888", textTransform: "uppercase", marginBottom: "6px" },
          }, "Profile Picture"),
          React.createElement("div", {
            style: { fontSize: "9px", color: "#bbb", letterSpacing: "0.1em" },
          }, "Click to upload — JPG, PNG, WEBP"),
        ),

        // Gender toggle
        React.createElement("div", { style: { width: "100%", maxWidth: "280px" } },
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.5em", color: "#888", textTransform: "uppercase", marginBottom: "12px" },
          }, "Gender"),
          React.createElement("div", { style: { display: "flex" } },
            ["male", "female", "other"].map(g =>
              React.createElement("button", {
                key: g,
                onClick: () => setForm({ ...form, gender: g }),
                style: {
                  flex: 1, padding: "12px 8px",
                  background: form.gender === g ? "#000" : "#fff",
                  border: "1px solid #f0f0f0",
                  color: form.gender === g ? "#fff" : "#888",
                  fontSize: "8px", letterSpacing: "0.3em",
                  textTransform: "uppercase", cursor: "pointer",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  transition: "all 0.3s ease",
                },
              }, g.charAt(0).toUpperCase() + g.slice(1))
            )
          )
        )
      ),

      // ── RIGHT — FORM ──
      React.createElement("div", {
        style: {
          padding: mobile ? "40px 24px" : "64px 80px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        },
      },
        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.6em", color: "#888", textTransform: "uppercase", marginBottom: "40px" },
        }, "01 — Personal Details"),

        // Fields
        ...fields.map(f =>
          f.type === "number"
            ? React.createElement(ProfileNumberField, {
                key: f.key, label: f.label, unit: f.unit,
                value: form[f.key],
                onChange: (v) => setForm({ ...form, [f.key]: v }),
                focused: focused === f.key,
                onFocus: () => setFocused(f.key),
                onBlur: () => setFocused(null),
              })
            : React.createElement(ProfileTextField, {
                key: f.key, label: f.label, type: f.type,
                value: form[f.key],
                onChange: (v) => setForm({ ...form, [f.key]: v }),
                focused: focused === f.key,
                onFocus: () => setFocused(f.key),
                onBlur: () => setFocused(null),
              })
        ),

        // Success
        success && React.createElement("div", {
          style: {
            padding: "14px 20px", background: "#fff",
            border: "1px solid #f0f0f0", borderLeft: "3px solid #000",
            marginBottom: "24px", fontSize: "9px",
            letterSpacing: "0.2em", color: "#000", textTransform: "uppercase",
          },
        }, "Profile updated successfully"),

        // Error
        error && React.createElement("div", {
          style: {
            padding: "14px 20px", background: "#fff",
            border: "1px solid #f0f0f0", borderLeft: "3px solid #000",
            marginBottom: "24px", fontSize: "9px",
            letterSpacing: "0.2em", color: "#000", textTransform: "uppercase",
          },
        }, error),

        // Save button
        React.createElement("button", {
          onClick: handleSave, disabled: loading,
          style: {
            width: "100%", padding: "18px",
            background: loading ? "#f0f0f0" : "#000",
            border: "none", color: loading ? "#888" : "#fff",
            fontSize: "9px", letterSpacing: "0.5em",
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            transition: "all 0.3s ease",
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: "12px",
            marginBottom: "16px",
          },
          onMouseEnter: (e) => { if (!loading) e.currentTarget.style.background = "#222"; },
          onMouseLeave: (e) => { if (!loading) e.currentTarget.style.background = "#000"; },
        },
          loading ? "Saving..." : "Save Changes",
          !loading && React.createElement("span", { style: { fontSize: "14px" } }, "→")
        ),

        // Dashboard link
        React.createElement("button", {
          onClick: () => navigate("/dashboard"),
          style: {
            width: "100%", padding: "18px",
            background: "transparent", border: "1px solid #f0f0f0",
            color: "#bbb", fontSize: "9px", letterSpacing: "0.5em",
            textTransform: "uppercase", cursor: "pointer",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            transition: "all 0.3s ease",
          },
          onMouseEnter: (e) => { e.currentTarget.style.borderColor = "#000"; e.currentTarget.style.color = "#000"; },
          onMouseLeave: (e) => { e.currentTarget.style.borderColor = "#f0f0f0"; e.currentTarget.style.color = "#bbb"; },
        }, "← Back to Dashboard")
      )
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      input::placeholder { color: #bbb; }
      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      input[type=number] { -moz-appearance: textfield; }
    `)
  );
}

// ── TEXT FIELD ──
function ProfileTextField({ label, type, value, onChange, focused, onFocus, onBlur }) {
  return React.createElement("div", { style: { marginBottom: "32px" } },
    React.createElement("div", {
      style: { fontSize: "7px", letterSpacing: "0.5em", color: focused ? "#000" : "#888", textTransform: "uppercase", marginBottom: "10px", transition: "color 0.3s ease" },
    }, label),
    React.createElement("div", {
      style: { borderBottom: `1px solid ${focused ? "#000" : "#e8e8e8"}`, transition: "border-color 0.3s ease", paddingBottom: "10px" },
    },
      React.createElement("input", {
        type, value,
        onChange: (e) => onChange(e.target.value),
        onFocus, onBlur,
        style: {
          width: "100%", border: "none", background: "transparent",
          fontSize: "clamp(18px,2.5vw,24px)",
          fontFamily: "'Bebas Neue', Impact",
          color: "#000", outline: "none", letterSpacing: "0.04em",
        },
      })
    )
  );
}

// ── NUMBER FIELD ──
function ProfileNumberField({ label, unit, value, onChange, focused, onFocus, onBlur }) {
  return React.createElement("div", { style: { marginBottom: "32px" } },
    React.createElement("div", {
      style: { fontSize: "7px", letterSpacing: "0.5em", color: focused ? "#000" : "#888", textTransform: "uppercase", marginBottom: "10px", transition: "color 0.3s ease" },
    }, label),
    React.createElement("div", {
      style: { display: "flex", alignItems: "baseline", gap: "8px", borderBottom: `1px solid ${focused ? "#000" : "#e8e8e8"}`, paddingBottom: "10px", transition: "border-color 0.3s ease" },
    },
      React.createElement("input", {
        type: "number", value,
        onChange: (e) => onChange(e.target.value),
        onFocus, onBlur,
        placeholder: "—",
        style: {
          flex: 1, border: "none", background: "transparent",
          fontSize: "clamp(24px,4vw,40px)",
          fontFamily: "'Bebas Neue', Impact",
          color: "#000", outline: "none", letterSpacing: "0.02em",
        },
      }),
      React.createElement("span", {
        style: { fontSize: "7px", letterSpacing: "0.4em", color: "#aaa", textTransform: "uppercase" },
      }, unit)
    )
  );
}

export default Profile;