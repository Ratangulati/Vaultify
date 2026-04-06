import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useApp } from '../../context/AppContext'
import { formatMoney } from '../../utils/money'

export default function BalanceTrendChart() {
  const { balanceTrendData, currency } = useApp()
  const hasData = balanceTrendData.some(point => point.balance !== 0)

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 dark:border-[#1e1c33] dark:bg-[#13111e]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Balance Trend</p>
          <p className="text-xs text-slate-500 dark:text-slate-600">Last 6 months</p>
        </div>
        <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">6 months</span>
      </div>
      {!hasData ? (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-500 dark:border-[#2d2b52]">
          No balance trend data available yet.
        </div>
      ) : (
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={balanceTrendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1c33" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#4b4870', fontSize: 11 }}
            axisLine={{ stroke: '#1e1c33' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#4b4870', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: '#13111e',
              border: '1px solid #2d2b52',
              borderRadius: 8,
              color: '#e2e8f0',
            }}
            formatter={v => [formatMoney(Number(v), currency), 'Balance']}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#balanceGradient)"
            dot={{ fill: '#6366f1', r: 4 }}
            activeDot={{ r: 6, fill: '#a5b4fc' }}
          />
        </AreaChart>
      </ResponsiveContainer>
      )}
    </div>
  )
}
