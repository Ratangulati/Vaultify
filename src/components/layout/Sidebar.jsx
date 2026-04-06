import { useApp } from '../../context/AppContext'
import InsightCard from '../cards/InsightCard'
import SummaryCard from '../cards/SummaryCard'
import { HiOutlineBanknotes, HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown, HiOutlineTrophy, HiOutlineScale, HiOutlineCalendarDays, HiOutlineExclamationTriangle } from 'react-icons/hi2'

export default function Sidebar() {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    topCategoryThisMonth,
    expenseMomComparison,
    averageDailySpend,
    overspendAlert,
  } = useApp()

  const momPct = expenseMomComparison?.pctChange
  const momText = momPct == null ? 'N/A' : `${momPct >= 0 ? '+' : ''}${momPct.toFixed(1)}%`
  const momSubtext = expenseMomComparison
    ? `$${expenseMomComparison.current.toLocaleString()} vs $${expenseMomComparison.previous.toLocaleString()}`
    : 'Need 2 months of data'

  return (
    <aside className="hidden min-h-[calc(100vh-60px)] w-56 flex-shrink-0 flex-col gap-2 overflow-y-auto border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3 dark:border-[#1e1c33] dark:from-[#13111e] dark:to-[#0f0e1a] lg:flex">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-700">Overview</p>

      <SummaryCard
        label="Total Balance"
        value={`$${totalBalance.toLocaleString()}`}
        subtext="All time"
        accentColor="indigo"
        icon={<HiOutlineBanknotes aria-hidden="true" />}
      />
      <SummaryCard
        label="Monthly Income"
        value={`$${monthlyIncome.toLocaleString()}`}
        subtext="Current month"
        accentColor="green"
        icon={<HiOutlineArrowTrendingUp aria-hidden="true" />}
      />
      <SummaryCard
        label="Monthly Expenses"
        value={`$${monthlyExpenses.toLocaleString()}`}
        subtext="Current month"
        accentColor="red"
        icon={<HiOutlineArrowTrendingDown aria-hidden="true" />}
      />

      <p className="mb-1 mt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-700">Insights</p>

      <InsightCard
        label="Top Category (Month)"
        value={topCategoryThisMonth?.name ?? '—'}
        subtext={topCategoryThisMonth ? `$${topCategoryThisMonth.value.toLocaleString()} this month` : 'No expense data'}
        iconGradient="from-indigo-700 to-purple-700"
        icon={<HiOutlineTrophy aria-hidden="true" />}
      />
      <InsightCard
        label="MoM Expense Change"
        value={momText}
        subtext={momSubtext}
        iconGradient="from-cyan-700 to-blue-700"
        icon={<HiOutlineScale aria-hidden="true" />}
      />
      <InsightCard
        label="Average Daily Spend"
        value={`$${averageDailySpend.toFixed(2)}`}
        subtext="Current month"
        iconGradient="from-amber-700 to-yellow-600"
        icon={<HiOutlineCalendarDays aria-hidden="true" />}
      />
      <InsightCard
        label="Category Concentration"
        value={overspendAlert ? `${overspendAlert.category} ${overspendAlert.percentage.toFixed(0)}%` : 'Healthy mix'}
        subtext={overspendAlert ? 'Category above 40% of expenses' : 'No category above 40%'}
        badge={overspendAlert ? 'Alert' : 'OK'}
        iconGradient="from-rose-700 to-red-600"
        icon={<HiOutlineExclamationTriangle aria-hidden="true" />}
      />
    </aside>
  )
}
