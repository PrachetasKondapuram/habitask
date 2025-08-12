import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import { Habits } from './lib/api';
import HabitForm from './components/HabitForm';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState("");

  const loadHabits = () => {
    Habits.list()
      .then(setHabits)
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const addHabit = (payload) => {
    Habits.create(payload)
      .then((newHabit) => setHabits((prev) => [newHabit, ...prev]))
      .catch((e) => setError(e.message));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Habitask</h1>

      <HabitForm onAdd={addHabit} />

      {error && <p className="text-red-400 mb-4">Error: {error}</p>}

      <pre>{JSON.stringify(habits, null, 2)}</pre>
    </div>
  );
}