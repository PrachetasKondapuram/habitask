export default function HabitList({ habits, onComplete, onRemove }) {
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
            <div className="text-[11px] text-gray-500 mt-1">
              {Array.isArray(h.completions) ? `${h.completions.length} total completions` : "0 total completions"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onComplete(h._id)}
              className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
              title="Mark completed for today"
            >
              Mark Today
            </button>
            <button
              onClick={() => onRemove(h._id)}
              className="px-3 py-1 rounded border border-red-500 text-red-300 hover:bg-red-500/10 text-sm"
              title="Delete habit"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}