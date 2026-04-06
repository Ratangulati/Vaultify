import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'

const CATEGORY_COLORS = {
  Rent:          '#f87171',
  Food:          '#6366f1',
  Transport:     '#22d3ee',
  Health:        '#f59e0b',
  Entertainment: '#f472b6',
  Salary:        '#4ade80',
}

export default function SpendingPieChart() {
  const { spendingByCategory } = useApp()
  const total = spendingByCategory.reduce((s, c) => s + c.value, 0)
  const top = spendingByCategory.length > 0
    ? spendingByCategory.reduce((max, c) => (c.value > max.value ? c : max), spendingByCategory[0])
    : null
  const topPct = top && total > 0 ? ((top.value / total) * 100).toFixed(0) : '0'

  return (
    <div className="bg-[#13111e] border border-[#1e1c33] rounded-xl p-4 flex flex-col">
      <p className="text-slate-100 text-sm font-bold">By Category</p>
      <p className="text-slate-600 text-xs mb-2">Spending breakdown</p>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={spendingByCategory}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={2}
            dataKey="value"
          >
            {spendingByCategory.map(entry => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#6b7280'} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#13111e',
              border: '1px solid #2d2b52',
              borderRadius: 8,
              color: '#e2e8f0',
            }}
            formatter={v => [`$${Number(v).toLocaleString()}`, '']}
          />
          {top && (
            <>
              <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" fill="#e2e8f0" fontSize={11} fontWeight={700}>
                {top.name}
              </text>
              <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle" fill="#6366f1" fontSize={10}>
                {topPct}%
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1 mt-1">
        {spendingByCategory.map(({ name, value }) => (
          <div key={name} className="flex justify-between text-xs">
            <span style={{ color: CATEGORY_COLORS[name] || '#6b7280' }}>● {name}</span>
            <span className="text-slate-500">{total > 0 ? ((value / total) * 100).toFixed(0) : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
