import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios.js";

function Dashboard() {
  const { user } = useSelector((s) => s.auth);
  const [stats, setStats] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    title: "", category: "Cardio", duration: "", calories: "", sets: "", reps: "", notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);

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
    setLoading(true);
    try {
      await API.post("/workout/add", form);
      setForm({ title: "", category: "Cardio", duration: "", calories: "", sets: "", reps: "", notes: "" });
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
    { label: "Total Workouts", value: stats.totalWorkouts, icon: "⚡" },
    { label: "Total Calories", value: stats.totalCalories + " kcal", icon: "🔥" },
    { label: "Total Duration", value: stats.totalDuration + " min", icon: "⏱" },
    { label: "Total Sets", value: stats.totalSets || 0, icon: "💪" },
    { label: "Total Reps", value: stats.totalReps || 0, icon: "🎯" },
  ] : [];

  return React.createElement("div", {
    style: { padding: mobile ? "100px 16px 60px" : "100px 24px 60px", maxWidth: "1100px", margin: "0 auto" }
  },

    // ── HEADER ──
    React.createElement("div", { style: { marginBottom: "40px" } },
      React.createElement("div", {
        style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }
      },
        React.createElement("div", { style: { width: "3px", height: "32px", background: "#C0392B", flexShrink: 0 } }),
        React.createElement("div", {
          style: { fontSize: mobile ? "28px" : "36px", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.1em", color: "#fff", lineHeight: 1 }
        }, `WELCOME, ${user?.name?.toUpperCase() || "USER"}`)
      ),
      React.createElement("div", {
        style: { fontSize: "9px", letterSpacing: "0.4em", color: "#C0392B", textTransform: "uppercase", paddingLeft: "15px" }
      }, "Your fitness dashboard")
    ),

    // ── STATS ──
    stats && React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)",
        gap: "12px", marginBottom: "32px"
      }
    },
      ...statCards.map((card, i) =>
        React.createElement("div", {
          key: card.label,
          style: {
            position: "relative",
            background: "rgba(10,10,10,0.98)",
            border: "1px solid #1a1a1a",
            borderRadius: "20px",
            padding: "24px 20px",
            overflow: "hidden",
            gridColumn: mobile && i === 4 ? "span 2" : "span 1",
          }
        },
          React.createElement("div", { style: { position: "absolute", top: 0, left: 0, width: "30px", height: "1px", background: "#C0392B" } }),
          React.createElement("div", { style: { position: "absolute", top: 0, left: 0, width: "1px", height: "30px", background: "#C0392B" } }),
          React.createElement("div", {
            style: { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "44px", opacity: 0.04, userSelect: "none", pointerEvents: "none" }
          }, card.icon),
          React.createElement("div", {
            style: { fontSize: "7px", letterSpacing: "0.4em", color: "#C0392B", textTransform: "uppercase", marginBottom: "8px" }
          }, card.label),
          React.createElement("div", {
            style: { fontSize: mobile ? "24px" : "28px", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.05em", color: "#fff", lineHeight: 1 }
          }, card.value)
        )
      )
    ),

    // ── ADD WORKOUT FORM ──
    React.createElement("div", {
      style: {
        position: "relative",
        background: "rgba(10,10,10,0.98)",
        border: "1px solid #1a1a1a",
        borderRadius: "24px",
        padding: mobile ? "24px 20px" : "36px 32px",
        marginBottom: "32px"
      }
    },
      React.createElement("div", { style: { position: "absolute", top: 0, left: 0, width: "60px", height: "1px", background: "#C0392B" } }),
      React.createElement("div", { style: { position: "absolute", top: 0, left: 0, width: "1px", height: "60px", background: "#C0392B" } }),

      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" } },
        React.createElement("div", { style: { width: "3px", height: "20px", background: "#C0392B" } }),
        React.createElement("div", {
          style: { fontSize: "16px", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.15em", color: "#fff" }
        }, "LOG WORKOUT")
      ),

      // Row 1 — Title + Category
      React.createElement("div", {
        style: { display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "10px", marginBottom: "10px" }
      },
        React.createElement("input", {
          placeholder: "Workout Title", value: form.title,
          onChange: (e) => setForm({ ...form, title: e.target.value }),
          style: inputStyle,
          onFocus: (e) => e.target.style.borderColor = "#C0392B",
          onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
        }),
        React.createElement("select", {
          value: form.category,
          onChange: (e) => setForm({ ...form, category: e.target.value }),
          style: selectStyle,
        },
          ["Cardio", "Strength", "Flexibility", "Balance"].map(c =>
            React.createElement("option", { key: c, value: c }, c)
          )
        )
      ),

      // Row 2 — Duration + Calories
      React.createElement("div", {
        style: { display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "10px", marginBottom: "10px" }
      },
        React.createElement("input", {
          placeholder: "Duration (min)", type: "number", value: form.duration,
          onChange: (e) => setForm({ ...form, duration: e.target.value }),
          style: inputStyle,
          onFocus: (e) => e.target.style.borderColor = "#C0392B",
          onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
        }),
        React.createElement("input", {
          placeholder: "Calories Burned (kcal)", type: "number", value: form.calories,
          onChange: (e) => setForm({ ...form, calories: e.target.value }),
          style: inputStyle,
          onFocus: (e) => e.target.style.borderColor = "#C0392B",
          onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
        })
      ),

      // Row 3 — Sets + Reps
      React.createElement("div", {
        style: { display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "10px", marginBottom: "10px" }
      },
        React.createElement("div", { style: { position: "relative" } },
          React.createElement("input", {
            placeholder: "Sets", type: "number", value: form.sets,
            onChange: (e) => setForm({ ...form, sets: e.target.value }),
            style: inputStyle,
            onFocus: (e) => e.target.style.borderColor = "#C0392B",
            onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
          }),
          React.createElement("span", {
            style: { position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "8px", letterSpacing: "0.3em", color: "#fff", textTransform: "uppercase", pointerEvents: "none" }
          }, "Sets")
        ),
        React.createElement("div", { style: { position: "relative" } },
          React.createElement("input", {
            placeholder: "Reps per Set", type: "number", value: form.reps,
            onChange: (e) => setForm({ ...form, reps: e.target.value }),
            style: inputStyle,
            onFocus: (e) => e.target.style.borderColor = "#C0392B",
            onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
          }),
          React.createElement("span", {
            style: { position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "8px", letterSpacing: "0.3em", color: "#fff", textTransform: "uppercase", pointerEvents: "none" }
          }, "Reps")
        )
      ),

      // Notes
      React.createElement("input", {
        placeholder: "Notes (optional)", value: form.notes,
        onChange: (e) => setForm({ ...form, notes: e.target.value }),
        style: { ...inputStyle, width: "100%", marginBottom: "20px" },
        onFocus: (e) => e.target.style.borderColor = "#C0392B",
        onBlur: (e) => e.target.style.borderColor = "#1a1a1a",
      }),

      // Submit button
      React.createElement("button", {
        onClick: addWorkout, disabled: loading,
        style: {
          padding: "13px 36px",
          background: loading ? "#333" : "#C0392B",
          border: "none", borderRadius: "100px",
          color: "#fff", fontSize: "11px",
          letterSpacing: "0.25em", textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: "500",
          transition: "all 0.3s ease",
          opacity: loading ? 0.7 : 1,
          boxShadow: "0 0 20px rgba(192,57,43,0.2)",
        },
        onMouseEnter: (e) => {
          if (!loading) {
            e.currentTarget.style.background = "#a93226";
            e.currentTarget.style.boxShadow = "0 0 32px rgba(192,57,43,0.4)";
          }
        },
        onMouseLeave: (e) => {
          if (!loading) {
            e.currentTarget.style.background = "#C0392B";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(192,57,43,0.2)";
          }
        },
      }, loading ? "Logging..." : "Log Workout")
    ),

    // ── RECENT WORKOUTS ──
    React.createElement("div", null,
      React.createElement("div", {
        style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }
      },
        React.createElement("div", { style: { width: "3px", height: "20px", background: "#C0392B" } }),
        React.createElement("div", {
          style: { fontSize: "16px", fontFamily: "'Bebas Neue', Impact", letterSpacing: "0.15em", color: "#fff" }
        }, "RECENT WORKOUTS"),
        React.createElement("span", {
          style: { fontSize: "8px", letterSpacing: "0.3em", color: "#fff", textTransform: "uppercase", marginLeft: "auto" }
        }, `${workouts.length} logged`)
      ),

      workouts.length === 0
        ? React.createElement("div", {
            style: {
              background: "rgba(10,10,10,0.98)", border: "1px solid #1a1a1a",
              borderRadius: "16px", padding: "60px 24px", textAlign: "center",
              color: "#fff", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase",
            }
          }, "No workouts yet — log your first mission")

        : workouts.map((w) =>
          React.createElement("div", {
            key: w._id,
            style: {
              position: "relative", background: "rgba(10,10,10,0.98)",
              border: "1px solid #1a1a1a", borderRadius: "16px",
              padding: "20px 24px", marginBottom: "10px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: "12px", transition: "border-color 0.3s ease",
            },
            onMouseEnter: (e) => e.currentTarget.style.borderColor = "#C0392B",
            onMouseLeave: (e) => e.currentTarget.style.borderColor = "#1a1a1a",
          },
            React.createElement("div", null,
              React.createElement("div", {
                style: { color: "#fff", fontSize: "14px", letterSpacing: "0.05em", marginBottom: "8px", fontWeight: "500" }
              }, w.title),
              React.createElement("div", {
                style: { display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }
              },
                React.createElement("span", {
                  style: { fontSize: "9px", letterSpacing: "0.25em", color: "#C0392B", textTransform: "uppercase" }
                }, w.category),
                w.duration && React.createElement("span", { style: tagStyle }, `⏱ ${w.duration} min`),
                w.calories && React.createElement("span", { style: tagStyle }, `🔥 ${w.calories} kcal`),
                w.sets > 0 && React.createElement("span", { style: tagStyle }, `💪 ${w.sets} sets`),
                w.reps > 0 && React.createElement("span", { style: tagStyle }, `🎯 ${w.reps} reps`),
                w.notes && React.createElement("span", { style: { ...tagStyle } }, `📝 ${w.notes}`)
              )
            ),

            // Delete button
            React.createElement("button", {
              onClick: () => deleteWorkout(w._id),
              style: {
                background: "transparent",
                border: "1px solid #333",
                borderRadius: "100px",
                color: "#fff",
                fontSize: "10px",
                letterSpacing: "0.15em",
                padding: "7px 18px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                textTransform: "uppercase",
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.borderColor = "#C0392B";
                e.currentTarget.style.color = "#C0392B";
                e.currentTarget.style.background = "rgba(192,57,43,0.08)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.borderColor = "#333";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "transparent";
              },
            }, "Delete")
          )
        )
    ),

    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      select option { background: #0d0d0d !important; color: #fff !important; }
      input::placeholder { color: #444 !important; }
    `)
  );
}

const inputStyle = {
  width: "100%", padding: "12px 16px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid #1a1a1a", borderRadius: "12px",
  color: "#fff", fontSize: "13px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  outline: "none", transition: "border-color 0.3s ease", display: "block",
};

const selectStyle = {
  width: "100%", padding: "12px 16px",
  background: "#0d0d0d", border: "1px solid #1a1a1a",
  borderRadius: "12px", color: "#fff", fontSize: "13px",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  outline: "none", cursor: "pointer", appearance: "none", display: "block",
};

const tagStyle = {
  fontSize: "9px", letterSpacing: "0.2em",
  color: "#fff", textTransform: "uppercase",
};

export default Dashboard;