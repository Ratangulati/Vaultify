import { useApp } from '../../context/AppContext'
import { motion } from 'framer-motion'
import InsightCard from '../cards/InsightCard'
import SummaryCard from '../cards/SummaryCard'
import BalanceTrendChart from '../charts/BalanceTrendChart'
import SpendingPieChart from '../charts/SpendingPieChart'
import TransactionsTable from '../transactions/TransactionsTable'
import { HiOutlineBanknotes, HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown, HiOutlineTrophy, HiOutlineScale, HiOutlineCalendarDays, HiOutlineExclamationTriangle } from 'react-icons/hi2'

export default function MainContent() {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    topCategoryThisMonth,
    expenseMomComparison,
    averageDailySpend,
    overspendAlert,
    chartsLoading,
  } = useApp()

  const momPct = expenseMomComparison?.pctChange
  const momText = momPct == null ? 'N/A' : `${momPct >= 0 ? '+' : ''}${momPct.toFixed(1)}%`
  const momSubtext = expenseMomComparison
    ? `$${expenseMomComparison.current.toLocaleString()} vs $${expenseMomComparison.previous.toLocaleString()}`
    : 'Need 2 months of data'

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-4 overflow-auto p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:hidden">
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
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
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
      </div>

      <motion.div
        className="flex flex-col gap-4 lg:flex-row"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {chartsLoading ? (
          <>
            <div className="h-64 flex-1 animate-pulse rounded-xl border border-slate-200 bg-slate-100 dark:border-[#1e1c33] dark:bg-[#13111e]" />
            <div className="h-64 lg:w-64 animate-pulse rounded-xl border border-slate-200 bg-slate-100 dark:border-[#1e1c33] dark:bg-[#13111e]" />
          </>
        ) : (
          <>
            <div className="min-w-0 flex-1">
              <BalanceTrendChart />
            </div>
            <div className="flex-shrink-0 lg:w-64">
              <SpendingPieChart />
            </div>
          </>
        )}
      </motion.div>

      <TransactionsTable />
    </main>
  )
}
