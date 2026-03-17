import Workout from "../model/workout.js";

export const addWorkout = async (req, res) => {
  try {
    const { title, category, duration, calories, sets, reps, notes } = req.body;

    console.log("Received:", req.body); // debug ke liye

    const workout = await Workout.create({
      user: req.user.id,
      title,
      category,
      duration: Number(duration),
      calories: Number(calories),
      sets: sets ? Number(sets) : 0,
      reps: reps ? Number(reps) : 0,
      notes: notes || "",
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((acc, w) => acc + (w.calories || 0), 0);
    const totalDuration = workouts.reduce((acc, w) => acc + (w.duration || 0), 0);
    const totalSets = workouts.reduce((acc, w) => acc + (w.sets || 0), 0);
    const totalReps = workouts.reduce((acc, w) => acc + ((w.sets || 0) * (w.reps || 0)), 0);
    const categories = workouts.reduce((acc, w) => {
      acc[w.category] = (acc[w.category] || 0) + 1;
      return acc;
    }, {});

    res.json({ totalWorkouts, totalCalories, totalDuration, totalSets, totalReps, categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};