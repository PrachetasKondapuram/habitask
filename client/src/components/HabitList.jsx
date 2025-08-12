export default function HabitList({ habits }) {
  if (!habits?.length) {
    return <p className="text-sm text-gray-400">No habits yet. Add your first one above.</p>;
  }

  return (
    <ul className="space-y-2">
      {habits.map((h) => (
        <li
          key={h._id}
          className="border border-white/10 bg-white/5 rounded px-3 py-2 flex items-center justify-between"
        >
          <div>
            <div className="font-medium">{h.name}</div>
            <div className="text-xs text-gray-400">{h.frequency}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}