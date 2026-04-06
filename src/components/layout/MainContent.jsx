import { useApp } from '../../context/AppContext'
import { motion } from 'framer-motion'
import InsightCard from '../cards/InsightCard'
import SummaryCard from '../cards/SummaryCard'
import BalanceTrendChart from '../charts/BalanceTrendChart'
import SpendingPieChart from '../charts/SpendingPieChart'
import TransactionsTable from '../transactions/TransactionsTable'
import { HiOutlineBanknotes, HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown, HiOutlineTrophy, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { formatMoney } from '../../utils/money'

export default function MainContent() {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    topCategoryThisMonth,
    overspendAlert,
    savingsRate,
    chartsLoading,
    dateRange,
    setDateRange,
    currency,
  } = useApp()

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-4 overflow-auto p-4">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-[#1e1c33] dark:bg-[#13111e]">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Date range</span>
        <RangeButton label="7D" active={dateRange.preset === '7d'} onClick={() => setDateRange({ preset: '7d', start: '', end: '' })} />
        <RangeButton label="30D" active={dateRange.preset === '30d'} onClick={() => setDateRange({ preset: '30d', start: '', end: '' })} />
        <RangeButton label="90D" active={dateRange.preset === '90d'} onClick={() => setDateRange({ preset: '90d', start: '', end: '' })} />
        <RangeButton label="All" active={dateRange.preset === 'all'} onClick={() => setDateRange({ preset: 'all', start: '', end: '' })} />
        <div className="ml-auto flex items-center gap-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={e => setDateRange(prev => ({ ...prev, preset: 'custom', start: e.target.value }))}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-300"
          />
          <span className="text-xs text-slate-500">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={e => setDateRange(prev => ({ ...prev, preset: 'custom', end: e.target.value }))}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:hidden">
        <SummaryCard
          label="Total Balance"
          value={formatMoney(totalBalance, currency)}
          subtext="All time"
          accentColor="indigo"
          icon={<HiOutlineBanknotes aria-hidden="true" />}
        />
        <SummaryCard
          label="Monthly Income"
          value={formatMoney(monthlyIncome, currency)}
          subtext="Current month"
          accentColor="green"
          icon={<HiOutlineArrowTrendingUp aria-hidden="true" />}
        />
        <SummaryCard
          label="Monthly Expenses"
          value={formatMoney(monthlyExpenses, currency)}
          subtext="Current month"
          accentColor="red"
          icon={<HiOutlineArrowTrendingDown aria-hidden="true" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
        <InsightCard
          label="Top Category (Month)"
          value={topCategoryThisMonth?.name ?? '—'}
          subtext={topCategoryThisMonth ? `${formatMoney(topCategoryThisMonth.value, currency)} this month` : 'No expense data'}
          iconGradient="from-indigo-700 to-purple-700"
          icon={<HiOutlineTrophy aria-hidden="true" />}
        />
        <InsightCard
          label="Savings Rate"
          value={savingsRate == null ? 'N/A' : `${savingsRate.toFixed(1)}%`}
          subtext="Income vs expenses"
          iconGradient="from-emerald-700 to-green-600"
          icon={<HiOutlineArrowTrendingUp aria-hidden="true" />}
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

function RangeButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-2 py-1 text-xs font-semibold ${
        active
          ? 'bg-indigo-600 text-white'
          : 'border border-slate-200 bg-white text-slate-700 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-300'
      }`}
    >
      {label}
    </button>
  )
}
