import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice.js";
import API from "../api/axios.js";

function Profile() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", age: "", weight: "", height: "", gender: "male" });
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    API.get("/user/profile").then(({ data }) => {
      setForm({ name: data.name, age: data.age || "", weight: data.weight || "", height: data.height || "", gender: data.gender || "male" });
      if (data.profilePic) setPreview(`http://localhost:5000/uploads/${data.profilePic}`);
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (profilePic) fd.append("profilePic", profilePic);
      const { data } = await API.put("/user/profile", fd, { headers: { "Content-Type": "multipart/form-data" } });
      dispatch(loginSuccess({ token: localStorage.getItem("token"), user: data }));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return React.createElement(
    "div",
    { style: { padding: "100px 24px 60px", maxWidth: "600px", margin: "0 auto" } },
    React.createElement("div", { style: { fontSize: "36px", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.1em", color: "#fff", marginBottom: "4px" } }, "MY PROFILE"),
    React.createElement("div", { style: { fontSize: "10px", letterSpacing: "0.3em", color: "#C0392B", marginBottom: "32px", textTransform: "uppercase" } }, "Update your info"),

    React.createElement(
      "div",
      { style: { background: "rgba(10,10,10,0.98)", border: "1px solid #1a1a1a", borderRadius: "24px", padding: "40px" } },

      // Profile pic
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" } },
        React.createElement(
          "div",
          {
            style: { width: "80px", height: "80px", borderRadius: "50%", border: "2px solid #C0392B", overflow: "hidden", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
            onClick: () => document.getElementById("picInput").click(),
          },
          preview
            ? React.createElement("img", { src: preview, style: { width: "100%", height: "100%", objectFit: "cover" } })
            : React.createElement("span", { style: { color: "#333", fontSize: "24px" } }, "👤")
        ),
        React.createElement(
          "div",
          null,
          React.createElement("div", { style: { color: "#fff", fontSize: "14px", marginBottom: "4px" } }, "Profile Picture"),
          React.createElement("div", { style: { color: "#444", fontSize: "11px", cursor: "pointer", letterSpacing: "0.1em" }, onClick: () => document.getElementById("picInput").click() }, "Click avatar to change"),
          React.createElement("input", {
            id: "picInput", type: "file", accept: "image/*", style: { display: "none" },
            onChange: (e) => {
              setProfilePic(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            },
          })
        )
      ),

      // Fields
      ...[
        { key: "name", placeholder: "Full Name", type: "text" },
        { key: "age", placeholder: "Age", type: "number" },
        { key: "weight", placeholder: "Weight (kg)", type: "number" },
        { key: "height", placeholder: "Height (cm)", type: "number" },
      ].map(f =>
        React.createElement("input", {
          key: f.key, type: f.type, placeholder: f.placeholder, value: form[f.key],
          onChange: (e) => setForm({ ...form, [f.key]: e.target.value }),
          style: inputStyle,
          onFocus: (e) => e.target.style.borderColor = "#C0392B",
          onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
        })
      ),
      React.createElement(
        "select",
        { value: form.gender, onChange: (e) => setForm({ ...form, gender: e.target.value }), style: { ...inputStyle, marginBottom: "24px" } },
        React.createElement("option", { value: "male" }, "Male"),
        React.createElement("option", { value: "female" }, "Female"),
        React.createElement("option", { value: "other" }, "Other")
      ),

      success && React.createElement("div", { style: { background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#2ecc71", fontSize: "12px", marginBottom: "16px" } }, "Profile updated successfully!"),

      React.createElement(
        "button",
        {
          onClick: handleSave, disabled: loading,
          style: { width: "100%", padding: "14px", background: "#C0392B", border: "none", borderRadius: "100px", color: "#fff", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "all 0.3s ease", opacity: loading ? 0.7 : 1 },
        },
        loading ? "Saving..." : "Save Changes"
      )
    ),
    React.createElement("style", null, `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`)
  );
}

const inputStyle = {
  width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.03)",
  border: "1px solid #1a1a1a", borderRadius: "12px", color: "#fff",
  fontSize: "13px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
  outline: "none", marginBottom: "12px", display: "block",
  transition: "border-color 0.3s ease",
};

export default Profile;