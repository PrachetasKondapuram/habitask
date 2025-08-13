import { useState } from "react";

export default function HabitForm({ onAdd }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily"); // ensure default

  const handleSubmit = (e) => {
    e.preventDefault();
    const n = name.trim();
    const f = (frequency || "daily").toLowerCase();
    if (!n) return;
    onAdd({ name: n, frequency: f });
    setName("");
    setFrequency("daily");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4" autoComplete="off">
      <input
        type="text"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
        name="name"
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="border rounded px-3 py-2"
        name="frequency" // <-- important
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add
      </button>
    </form>
  );
}