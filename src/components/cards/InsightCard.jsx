export default function InsightCard({ icon, label, value, subtext, iconGradient }) {
  return (
    <div className="bg-[#16141f] border border-[#2d2b52] rounded-lg px-3 py-2 flex items-center gap-3">
      <div
        className={`w-8 h-8 bg-gradient-to-br ${iconGradient} rounded-lg flex items-center justify-center text-sm flex-shrink-0`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-slate-500 text-xs">{label}</p>
        <p className="text-slate-100 text-sm font-bold truncate">{value}</p>
        <p className="text-slate-600 text-xs truncate">{subtext}</p>
      </div>
    </div>
  )
}
