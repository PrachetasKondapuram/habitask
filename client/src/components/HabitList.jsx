// client/src/components/HabitList.jsx
// Component to display a list of habits with options to mark them as completed or delete them.
function isToday(dateLike) {
  const d = new Date(dateLike);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

// HabitList component
export default function HabitList({ habits, onComplete, onRemove }) {
  if (!habits?.length) {
    return <p className="text-sm text-gray-400">No habits yet. Add your first one above.</p>;
  }

  // Render list of habits
  return (
    <ul className="space-y-2">
      {habits.map((h) => {
        const doneToday = Array.isArray(h.completions) && h.completions.some(isToday);
        return (
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
                disabled={doneToday}
                className={`px-3 py-1 rounded text-sm ${
                  doneToday
                    ? "bg-emerald-700/50 text-white/70 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
                title={doneToday ? "Already marked today" : "Mark completed for today"}
              >
                {doneToday ? "Done Today" : "Mark Today"}
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
        );
      })}
    </ul>
  );
}