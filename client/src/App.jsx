import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Habits } from './lib/api';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState("");

  const loadHabits = () => {
    Habits.list()
      .then(setHabits)
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    Habits.list().then(setHabits).catch((e) => setError(e.message));
  }, []);

  const addHabit = (payload) => {
    Habits.create(payload)
      .then((newHabit) => setHabits((prev) => [newHabit, ...prev]))
      .catch((e) => setError(e.message));
  };

  const markComplete = (id) => {
    Habits.complete(id)
      .then((updated) => setHabits(prev => prev.map((h) => (h._id === id ? updated : h)))
      )
      .catch((e) => setError(e.message));
  };

  const removeHabit = (id) => {
    Habits.remove(id)
      .then(() => setHabits((prev) => prev.filter((h) => h._id !== id)))
      .catch((e) => setError(e.message));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Habitask</h1>

      <HabitForm onAdd={addHabit} />

      {error && <p className="text-red-400 mb-4">Error: {error}</p>}

      <HabitList habits={habits} onComplete={markComplete} onRemove={removeHabit} />
    </div>
  );
}