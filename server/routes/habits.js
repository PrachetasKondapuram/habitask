const express = require("express");
const Habit = require("../models/Habit");
const router = express.Router();

// GET /api/habits - get all habits
router.get("/", async (req, res) => {
    const habits = await Habit.find();
    res.json(habits);
});

// POST /api/habits - create a new habit
router.post("/", async (req, res) => {
    const { name, frequency = "daily" } = req.body || {};
    
    try {
        const habit = await Habit.create({ name: name.trim(), frequency });
        res.status(201).json(habit);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// handler function
async function completeHabit(req, res) {
  try {
    const { id } = req.params;
    const { date } = req.body || {};

    const d = date ? new Date(date) : new Date();
    // normalize to local midnight so the same calendar day de-dupes
    d.setHours(0, 0, 0, 0);

    const habit = await Habit.findByIdAndUpdate(
      id,
      { $addToSet: { completions: d } },
      { new: true }
    );

    if (!habit) return res.status(404).json({ error: "Habit not found" });
    return res.json(habit);
  } catch (e) {
    console.error("completeHabit error:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// both PATCH and PUT at /:id/complete
router.patch("/:id/complete", completeHabit);
router.put("/:id/complete", completeHabit);

// DELETE /api/habits/:id - delete a habit
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Habit.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: "Habit not found" });
        }
        res.json({ ok: true }); 
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
