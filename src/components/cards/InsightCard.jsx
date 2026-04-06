export default function InsightCard({ label, value, subtext, iconGradient, badge, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-[#2d2b52] dark:bg-[#16141f]">
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${iconGradient}`}
      >
        {icon ? <span className="text-white/90">{icon}</span> : null}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-xs text-slate-500 dark:text-slate-500">{label}</p>
          {badge ? (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-amber-900 dark:text-amber-300">
              {badge}
            </span>
          ) : null}
        </div>
        <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">{value}</p>
        <p className="truncate text-xs text-slate-600 dark:text-slate-600">{subtext}</p>
      </div>
    </div>
  )
}
