import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useApp } from '../../context/AppContext'

export default function BalanceTrendChart() {
  const { balanceTrendData } = useApp()

  return (
    <div className="bg-[#13111e] border border-[#1e1c33] rounded-xl p-4 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-100 text-sm font-bold">Balance Trend</p>
          <p className="text-slate-600 text-xs">Jan – Mar 2026</p>
        </div>
        <span className="bg-indigo-950 text-indigo-400 text-xs px-2 py-1 rounded-md">3 months</span>
      </div>
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
            formatter={v => [`$${Number(v).toLocaleString()}`, 'Balance']}
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
    </div>
  )
}
