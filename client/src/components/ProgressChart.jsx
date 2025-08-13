import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import useElementSize from "../hooks/useElementSize";

// yyyy-mm-dd (local)
function ymdLocal(d) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function lastNDays(n) {
  const out = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(ymdLocal(d));
  }
  return out;
}

export default function ProgressChart({ habits = [] }) {
  const days = lastNDays(7);
  const totals = days.map((day) => {
    const total = habits.reduce((acc, h) => {
      if (!Array.isArray(h?.completions)) return acc;
      const hit = h.completions.some((c) => ymdLocal(c) === day);
      return acc + (hit ? 1 : 0);
    }, 0);
    return { day: day.slice(5), total };
  });
  const data = totals;
  const allZero = data.every((d) => d.total === 0);

  // Autosize container
  const [wrapRef, size] = useElementSize();
  const width = Math.max(320, Math.floor(size.width));   // guard small widths
  const height = 260;                                     // fixed height looks good; tweak as you like

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Last 7 Days</h2>
      <div ref={wrapRef} className="w-full h-64 border border-white/20 rounded p-2 bg-white/5 overflow-hidden">
        {width > 0 ? (
          <LineChart width={width - 16} height={height - 16} data={data}> 
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="total" />
          </LineChart>
        ) : (
          <div className="text-xs text-gray-400 p-2">Sizing…</div>
        )}
      </div>
    </div>
  );
}