import { useApp } from '../../context/AppContext'
import InsightCard from '../cards/InsightCard'
import SummaryCard from '../cards/SummaryCard'
import { HiOutlineBanknotes, HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown, HiOutlineTrophy, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { formatMoney } from '../../utils/money'

export default function Sidebar() {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    topCategoryThisMonth,
    overspendAlert,
    savingsRate,
    budgetUtilization,
    accountSplit,
    currency,
  } = useApp()

  return (
    <aside className="hidden min-h-[calc(100vh-60px)] w-56 flex-shrink-0 flex-col gap-2 overflow-y-auto border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3 dark:border-[#1e1c33] dark:from-[#13111e] dark:to-[#0f0e1a] lg:flex">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-700">Overview</p>

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

      <p className="mb-1 mt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-700">Insights</p>

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

      <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-[#2d2b52] dark:bg-[#16141f]">
        <p className="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-300">Budget Utilization</p>
        <div className="space-y-2">
          {budgetUtilization.map(item => (
            <div key={item.category}>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-600 dark:text-slate-400">{item.category}</span>
                <span className={`${item.overBudget ? 'text-red-500' : 'text-slate-500'}`}>
                  {item.percentage.toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-[#0d0d1a]">
                <div
                  className={`h-1.5 rounded-full ${item.overBudget ? 'bg-red-500' : 'bg-indigo-500'}`}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-[#2d2b52] dark:bg-[#16141f]">
        <p className="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-300">Account Split</p>
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Cash</span><span className="text-slate-700 dark:text-slate-200">{formatMoney(accountSplit.cash, currency)}</span></div>
          <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Bank</span><span className="text-slate-700 dark:text-slate-200">{formatMoney(accountSplit.bank, currency)}</span></div>
          <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">Credit</span><span className="text-slate-700 dark:text-slate-200">{formatMoney(accountSplit.credit, currency)}</span></div>
        </div>
      </div>
    </aside>
  )
}
