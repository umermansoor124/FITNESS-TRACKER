import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios.js";

function Dashboard() {
  const { user } = useSelector((s) => s.auth);
  const [stats, setStats] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    title: "", category: "Strength", duration: "",
    calories: "", sets: "", reps: "", notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [focused, setFocused] = useState(null);
  const [hovDel, setHovDel] = useState(null);

  useEffect(() => {
    fetchData();
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, workoutsRes] = await Promise.all([
        API.get("/workout/stats"),
        API.get("/workout/all"),
      ]);
      setStats(statsRes.data);
      setWorkouts(workoutsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addWorkout = async () => {
    if (!form.title) return;
    setLoading(true);
    try {
      await API.post("/workout/add", form);
      setForm({ title: "", category: "Strength", duration: "", calories: "", sets: "", reps: "", notes: "" });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (id) => {
    await API.delete(`/workout/${id}`);
    fetchData();
  };

  const statCards = stats ? [
    { label: "Workouts", value: stats.totalWorkouts, num: "01" },
    { label: "Calories", value: stats.totalCalories + " kcal", num: "02" },
    { label: "Duration", value: stats.totalDuration + " min", num: "03" },
    { label: "Sets", value: stats.totalSets || 0, num: "04" },
    { label: "Reps", value: stats.totalReps || 0, num: "05" },
  ] : [];

  const categories = ["Cardio", "Strength", "Flexibility", "Balance"];

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
      React.createElement("div", {
        style: {
          position: "absolute", right: "-10px", bottom: "-20px",
          fontSize: mobile ? "30vw" : "18vw",
          fontFamily: "'Bebas Neue', Impact",
          color: "transparent", WebkitTextStroke: "1px #f0f0f0",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        },
      }, "HQ"),

      React.createElement("div", { style: { position: "relative", zIndex: 2 } },
        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.6em", color: "#888", textTransform: "uppercase", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" },
        },
          React.createElement("span", { style: { display: "inline-block", width: "20px", height: "1px", background: "#ccc" } }),
          "Mission Control"
        ),
        React.createElement("h1", {
          style: { fontSize: mobile ? "10vw" : "clamp(40px,6vw,72px)", fontFamily: "'Bebas Neue', Impact", color: "#000", lineHeight: 0.88, margin: "0 0 6px", letterSpacing: "0.01em" },
        }, "WELCOME,"),
        React.createElement("h1", {
          style: { fontSize: mobile ? "10vw" : "clamp(40px,6vw,72px)", fontFamily: "'Bebas Neue', Impact", color: "transparent", WebkitTextStroke: "2px #ccc", lineHeight: 0.88, margin: 0, letterSpacing: "0.01em" },
        }, `${user?.name?.toUpperCase() || "OPERATOR"}.`)
      ),

      React.createElement("div", {
        style: { fontSize: "7px", letterSpacing: "0.5em", color: "#888", textTransform: "uppercase", position: "relative", zIndex: 2 },
      }, "Your fitness dashboard")
    ),

    // ── STATS ──
    stats && React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)",
        borderBottom: "1px solid #f0f0f0",
      },
    },
      ...statCards.map((card, i) =>
        React.createElement("div", {
          key: card.label,
          style: {
            padding: mobile ? "28px 16px" : "36px 32px",
            borderRight: i < statCards.length - 1 ? "1px solid #f0f0f0" : "none",
            borderBottom: mobile && i < 3 ? "1px solid #f0f0f0" : "none",
            position: "relative", overflow: "hidden",
            gridColumn: mobile && i === 4 ? "span 2" : "span 1",
          },
        },
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.5em", color: "#888", textTransform: "uppercase", marginBottom: "10px" },
          }, card.label),
          React.createElement("div", {
            style: { fontSize: mobile ? "28px" : "clamp(28px,3.5vw,44px)", fontFamily: "'Bebas Neue', Impact", color: "#000", lineHeight: 1, letterSpacing: "0.02em" },
          }, card.value),
          React.createElement("div", {
            style: { position: "absolute", bottom: "8px", right: "12px", fontSize: "9px", letterSpacing: "0.3em", color: "#eee", fontFamily: "'Bebas Neue', Impact" },
          }, card.num)
        )
      )
    ),

    // ── MAIN GRID ──
    React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
        minHeight: "60vh",
      },
    },

      // ── LEFT — LOG WORKOUT ──
      React.createElement("div", {
        style: {
          padding: mobile ? "40px 24px" : "56px 80px",
          borderRight: mobile ? "none" : "1px solid #f0f0f0",
          borderBottom: mobile ? "1px solid #f0f0f0" : "none",
        },
      },
        React.createElement("div", {
          style: { fontSize: "7px", letterSpacing: "0.6em", color: "#888", textTransform: "uppercase", marginBottom: "36px" },
        }, "01 — Log Workout"),

        React.createElement(DashInputField, {
          label: "Workout Title", type: "text", value: form.title,
          onChange: (v) => setForm({ ...form, title: v }),
          focused: focused === "title",
          onFocus: () => setFocused("title"),
          onBlur: () => setFocused(null),
        }),

        // Category
        React.createElement("div", { style: { marginBottom: "28px" } },
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.5em", color: "#888", textTransform: "uppercase", marginBottom: "16px" },
          }, "Category"),
          React.createElement("div", { style: { display: "flex", gap: "0", flexWrap: "wrap" } },
            categories.map(c =>
              React.createElement("button", {
                key: c,
                onClick: () => setForm({ ...form, category: c }),
                style: {
                  padding: "10px 16px",
                  background: form.category === c ? "#000" : "#fff",
                  border: "1px solid #f0f0f0",
                  color: form.category === c ? "#fff" : "#888",
                  fontSize: "8px", letterSpacing: "0.3em",
                  textTransform: "uppercase", cursor: "pointer",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  transition: "all 0.3s ease",
                },
              }, c)
            )
          )
        ),

        // Duration + Calories
        React.createElement("div", {
          style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "8px" },
        },
          React.createElement(DashNumberField, {
            label: "Duration", unit: "min", value: form.duration,
            onChange: (v) => setForm({ ...form, duration: v }),
            focused: focused === "duration",
            onFocus: () => setFocused("duration"),
            onBlur: () => setFocused(null),
          }),
          React.createElement(DashNumberField, {
            label: "Calories", unit: "kcal", value: form.calories,
            onChange: (v) => setForm({ ...form, calories: v }),
            focused: focused === "calories",
            onFocus: () => setFocused("calories"),
            onBlur: () => setFocused(null),
          }),
        ),

        // Sets + Reps
        React.createElement("div", {
          style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "8px" },
        },
          React.createElement(DashNumberField, {
            label: "Sets", unit: "sets", value: form.sets,
            onChange: (v) => setForm({ ...form, sets: v }),
            focused: focused === "sets",
            onFocus: () => setFocused("sets"),
            onBlur: () => setFocused(null),
          }),
          React.createElement(DashNumberField, {
            label: "Reps", unit: "reps", value: form.reps,
            onChange: (v) => setForm({ ...form, reps: v }),
            focused: focused === "reps",
            onFocus: () => setFocused("reps"),
            onBlur: () => setFocused(null),
          }),
        ),

        React.createElement(DashInputField, {
          label: "Notes (optional)", type: "text", value: form.notes,
          onChange: (v) => setForm({ ...form, notes: v }),
          focused: focused === "notes",
          onFocus: () => setFocused("notes"),
          onBlur: () => setFocused(null),
        }),

        React.createElement("button", {
          onClick: addWorkout, disabled: loading,
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
          },
          onMouseEnter: (e) => { if (!loading) e.currentTarget.style.background = "#222"; },
          onMouseLeave: (e) => { if (!loading) e.currentTarget.style.background = "#000"; },
        },
          loading ? "Logging..." : "Log Workout",
          !loading && React.createElement("span", { style: { fontSize: "14px" } }, "→")
        )
      ),

      // ── RIGHT — WORKOUTS LIST ──
      React.createElement("div", {
        style: { padding: mobile ? "40px 24px" : "56px 80px" },
      },
        React.createElement("div", {
          style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "36px" },
        },
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.6em", color: "#888", textTransform: "uppercase" },
          }, "02 — Recent Workouts"),
          React.createElement("span", {
            style: { fontSize: "16px", letterSpacing: "0.3em", color: "#000", textTransform: "uppercase", fontFamily: "'Bebas Neue', Impact" },
          }, workouts.length)
        ),

        workouts.length === 0
          ? React.createElement("div", {
              style: { padding: "80px 0", textAlign: "center" },
            },
              React.createElement("div", {
                style: { fontSize: mobile ? "20vw" : "clamp(60px,10vw,120px)", fontFamily: "'Bebas Neue', Impact", color: "transparent", WebkitTextStroke: "1px #eee", lineHeight: 1, marginBottom: "16px" },
              }, "0"),
              React.createElement("p", {
                style: { fontSize: "8px", letterSpacing: "0.5em", color: "#999", textTransform: "uppercase" },
              }, "No workouts yet — log your first")
            )

          : React.createElement("div", null,
              ...workouts.map((w, i) =>
                React.createElement("div", {
                  key: w._id,
                  onMouseEnter: () => setHovDel(w._id),
                  onMouseLeave: () => setHovDel(null),
                  style: {
                    padding: "20px 0",
                    borderBottom: "1px solid #f5f5f5",
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", gap: "16px",
                  },
                },
                  React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", {
                      style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" },
                    },
                      React.createElement("span", {
                        style: { fontSize: "8px", letterSpacing: "0.3em", color: "#aaa", fontFamily: "'Bebas Neue', Impact", minWidth: "20px" },
                      }, `0${i + 1}`),
                      React.createElement("span", {
                        style: { fontSize: "14px", fontFamily: "'Bebas Neue', Impact", color: "#000", letterSpacing: "0.06em" },
                      }, w.title.toUpperCase())
                    ),
                    React.createElement("div", {
                      style: { display: "flex", gap: "8px", flexWrap: "wrap", paddingLeft: "32px" },
                    },
                      React.createElement("span", {
                        style: { fontSize: "7px", letterSpacing: "0.4em", color: "#555", textTransform: "uppercase", background: "#f5f5f5", padding: "3px 10px" },
                      }, w.category),
                      w.duration && React.createElement("span", { style: statTagStyle }, `${w.duration} min`),
                      w.calories && React.createElement("span", { style: statTagStyle }, `${w.calories} kcal`),
                      w.sets > 0 && React.createElement("span", { style: statTagStyle }, `${w.sets} sets`),
                      w.reps > 0 && React.createElement("span", { style: statTagStyle }, `${w.reps} reps`),
                      w.notes && React.createElement("span", { style: { ...statTagStyle, fontStyle: "italic" } }, w.notes)
                    )
                  ),

                  React.createElement("button", {
                    onClick: () => deleteWorkout(w._id),
                    style: {
                      background: "transparent",
                      border: `1px solid ${hovDel === w._id ? "#000" : "#eee"}`,
                      color: hovDel === w._id ? "#000" : "#bbb",
                      fontSize: "8px", letterSpacing: "0.3em",
                      padding: "8px 16px", cursor: "pointer",
                      textTransform: "uppercase",
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      transition: "all 0.3s ease", flexShrink: 0,
                    },
                  }, "✕")
                )
              )
            )
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

function DashInputField({ label, type, value, onChange, focused, onFocus, onBlur }) {
  return React.createElement("div", { style: { marginBottom: "28px" } },
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
          fontSize: "16px", color: "#000", outline: "none",
          letterSpacing: "0.04em", fontFamily: "'Helvetica Neue', Arial, sans-serif",
        },
      })
    )
  );
}

function DashNumberField({ label, unit, value, onChange, focused, onFocus, onBlur }) {
  return React.createElement("div", { style: { marginBottom: "28px" } },
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
          fontSize: "clamp(20px,3vw,32px)", fontFamily: "'Bebas Neue', Impact",
          color: "#000", outline: "none", letterSpacing: "0.02em",
        },
      }),
      React.createElement("span", {
        style: { fontSize: "7px", letterSpacing: "0.4em", color: "#aaa", textTransform: "uppercase" },
      }, unit)
    )
  );
}

const statTagStyle = {
  fontSize: "7px", letterSpacing: "0.3em",
  color: "#666", textTransform: "uppercase",
};

export default Dashboard;