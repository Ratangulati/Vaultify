import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { mockTransactions } from '../data/mockData'
import {
  computeTotalIncome,
  computeTotalExpenses,
  computeTotalBalance,
  computeBalanceTrendData,
  computeSpendingByCategory,
  computeTopCategory,
  computeBiggestTransaction,
  computeMomChange,
  computeCurrentMonthIncome,
  computeCurrentMonthExpenses,
  computeTopCategoryThisMonth,
  computeExpenseMomComparison,
  computeAverageDailySpend,
  computeOverspendAlert,
  computeSavingsRate,
  computeExpenseForecast,
  computeBudgetUtilization,
  computeAccountSplit,
  applyDateRange,
  applyFilters,
} from '../utils/derived'

const AppContext = createContext(null)

const DEFAULT_FILTERS = {
  search: '',
  category: '',
  type: '',
  sortBy: 'date',
  sortDir: 'desc',
}
const DEFAULT_DATE_RANGE = { preset: 'all', start: '', end: '' }
const DEFAULT_BUDGETS = {
  Food: 300,
  Rent: 1200,
  Transport: 120,
  Health: 180,
  Entertainment: 150,
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const raw = localStorage.getItem('finance.transactions')
    if (!raw) return mockTransactions
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : mockTransactions
    } catch {
      return mockTransactions
    }
  })
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [role, setRole] = useState(() => localStorage.getItem('finance.role') || 'viewer')
  const [darkMode, setDarkMode] = useState(true)
  const [chartsLoading, setChartsLoading] = useState(true)
  const [currency, setCurrency] = useState(() => localStorage.getItem('finance.currency') || 'INR')
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('finance.transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('finance.role', role)
  }, [role])

  useEffect(() => {
    localStorage.setItem('finance.currency', currency)
  }, [currency])

  useEffect(() => {
    const timer = setTimeout(() => setChartsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  const rangedTransactions = useMemo(() => applyDateRange(transactions, dateRange), [transactions, dateRange])
  const totalIncome        = useMemo(() => computeTotalIncome(rangedTransactions), [rangedTransactions])
  const totalExpenses      = useMemo(() => computeTotalExpenses(rangedTransactions), [rangedTransactions])
  const totalBalance       = useMemo(() => computeTotalBalance(rangedTransactions), [rangedTransactions])
  const monthlyIncome      = useMemo(() => computeCurrentMonthIncome(rangedTransactions), [rangedTransactions])
  const monthlyExpenses    = useMemo(() => computeCurrentMonthExpenses(rangedTransactions), [rangedTransactions])
  const balanceTrendData   = useMemo(() => computeBalanceTrendData(rangedTransactions), [rangedTransactions])
  const spendingByCategory = useMemo(() => computeSpendingByCategory(rangedTransactions), [rangedTransactions])
  const topCategory        = useMemo(() => computeTopCategory(rangedTransactions), [rangedTransactions])
  const biggestTransaction = useMemo(() => computeBiggestTransaction(rangedTransactions), [rangedTransactions])
  const momChange          = useMemo(() => computeMomChange(rangedTransactions), [rangedTransactions])
  const topCategoryThisMonth = useMemo(() => computeTopCategoryThisMonth(rangedTransactions), [rangedTransactions])
  const expenseMomComparison = useMemo(() => computeExpenseMomComparison(rangedTransactions), [rangedTransactions])
  const averageDailySpend = useMemo(() => computeAverageDailySpend(rangedTransactions), [rangedTransactions])
  const overspendAlert    = useMemo(() => computeOverspendAlert(rangedTransactions), [rangedTransactions])
  const savingsRate       = useMemo(() => computeSavingsRate(rangedTransactions), [rangedTransactions])
  const expenseForecast   = useMemo(() => computeExpenseForecast(rangedTransactions), [rangedTransactions])
  const budgetUtilization = useMemo(() => computeBudgetUtilization(rangedTransactions, DEFAULT_BUDGETS), [rangedTransactions])
  const accountSplit      = useMemo(() => computeAccountSplit(rangedTransactions), [rangedTransactions])
  const filteredTransactions = useMemo(() => applyFilters(rangedTransactions, filters), [rangedTransactions, filters])

  function addTransaction(txn) {
    const id = globalThis.crypto?.randomUUID ? `txn_${crypto.randomUUID()}` : `txn_${Date.now()}`
    setTransactions(prev => [{ ...txn, id, currency: txn.currency || currency }, ...prev])
  }

  function updateTransaction(id, updates) {
    setTransactions(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)))
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  function updateFilters(updates) {
    setFilters(prev => ({ ...prev, ...updates }))
  }

  function toggleDarkMode() {
    setDarkMode(prev => !prev)
  }

  return (
    <AppContext.Provider value={{
      transactions,
      filters,
      role,
      darkMode,
      currency,
      dateRange,
      totalIncome,
      totalExpenses,
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      balanceTrendData,
      spendingByCategory,
      topCategory,
      topCategoryThisMonth,
      biggestTransaction,
      momChange,
      expenseMomComparison,
      averageDailySpend,
      overspendAlert,
      savingsRate,
      expenseForecast,
      budgetUtilization,
      accountSplit,
      chartsLoading,
      filteredTransactions,
      setRole,
      setCurrency,
      setDateRange,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      updateFilters,
      toggleDarkMode,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
