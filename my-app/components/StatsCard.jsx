export default function StatsCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
