const STYLES = {
  indigo: {
    gradient: 'from-[#1e1b4b] to-[#2d2060]',
    border: 'border-indigo-800/30',
    label: 'text-indigo-400',
    value: 'text-indigo-100',
    icon: 'text-indigo-200/90',
  },
  green: {
    gradient: 'from-[#052e16] to-[#14532d]',
    border: 'border-green-800/20',
    label: 'text-emerald-400',
    value: 'text-emerald-100',
    icon: 'text-emerald-200/90',
  },
  red: {
    gradient: 'from-[#2d0a0a] to-[#4c1414]',
    border: 'border-red-800/20',
    label: 'text-red-400',
    value: 'text-red-100',
    icon: 'text-red-200/90',
  },
}

export default function SummaryCard({ label, value, subtext, accentColor, trend, icon }) {
  const s = STYLES[accentColor] || STYLES.indigo

  return (
    <div className={`bg-gradient-to-br ${s.gradient} border ${s.border} rounded-xl p-3 relative overflow-hidden`}>
      <div className="absolute -top-3 -right-3 w-14 h-14 bg-white/5 rounded-full" />
      <div className="flex items-center justify-between gap-2">
        <p className={`text-xs font-semibold uppercase tracking-wide ${s.label}`}>{label}</p>
        {icon ? <span className={`${s.icon} text-base leading-none`}>{icon}</span> : null}
      </div>
      <p className={`text-lg font-extrabold my-1 tracking-tight ${s.value}`}>{value}</p>
      <div className="flex items-center gap-1">
        {trend && <span className="text-emerald-400 text-xs font-semibold">{trend}</span>}
        <span className="text-slate-600 text-xs">{subtext}</span>
      </div>
    </div>
  )
}
