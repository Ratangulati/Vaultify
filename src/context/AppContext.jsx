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

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [role, setRole] = useState('viewer')
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const totalIncome        = useMemo(() => computeTotalIncome(transactions), [transactions])
  const totalExpenses      = useMemo(() => computeTotalExpenses(transactions), [transactions])
  const totalBalance       = useMemo(() => computeTotalBalance(transactions), [transactions])
  const balanceTrendData   = useMemo(() => computeBalanceTrendData(transactions), [transactions])
  const spendingByCategory = useMemo(() => computeSpendingByCategory(transactions), [transactions])
  const topCategory        = useMemo(() => computeTopCategory(transactions), [transactions])
  const biggestTransaction = useMemo(() => computeBiggestTransaction(transactions), [transactions])
  const momChange          = useMemo(() => computeMomChange(transactions), [transactions])
  const filteredTransactions = useMemo(() => applyFilters(transactions, filters), [transactions, filters])

  function addTransaction(txn) {
    setTransactions(prev => [{ ...txn, id: `txn_${Date.now()}` }, ...prev])
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
      totalIncome,
      totalExpenses,
      totalBalance,
      balanceTrendData,
      spendingByCategory,
      topCategory,
      biggestTransaction,
      momChange,
      filteredTransactions,
      setRole,
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
