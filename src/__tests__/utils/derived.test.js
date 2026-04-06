import { describe, it, expect } from 'vitest'
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
} from '../../utils/derived'

const txns = [
  { id: 't1', date: '2026-01-01', description: 'Salary',    category: 'Salary', type: 'income',  amount: 5000 },
  { id: 't2', date: '2026-01-05', description: 'Rent',      category: 'Rent',   type: 'expense', amount: 1200 },
  { id: 't3', date: '2026-01-10', description: 'Groceries', category: 'Food',   type: 'expense', amount: 100  },
  { id: 't4', date: '2026-02-01', description: 'Salary',    category: 'Salary', type: 'income',  amount: 5000 },
  { id: 't5', date: '2026-02-05', description: 'Rent',      category: 'Rent',   type: 'expense', amount: 1200 },
  { id: 't6', date: '2026-02-10', description: 'Groceries', category: 'Food',   type: 'expense', amount: 150  },
]

describe('computeTotalIncome', () => {
  it('sums all income transactions', () => {
    expect(computeTotalIncome(txns)).toBe(10000)
  })
  it('returns 0 for empty array', () => {
    expect(computeTotalIncome([])).toBe(0)
  })
})

describe('computeTotalExpenses', () => {
  it('sums all expense transactions', () => {
    expect(computeTotalExpenses(txns)).toBe(2650)
  })
  it('returns 0 for empty array', () => {
    expect(computeTotalExpenses([])).toBe(0)
  })
})

describe('computeTotalBalance', () => {
  it('returns income minus expenses', () => {
    expect(computeTotalBalance(txns)).toBe(7350)
  })
})

describe('computeBalanceTrendData', () => {
  it('returns a 6 month series ending at latest month', () => {
    const result = computeBalanceTrendData(txns)
    expect(result).toHaveLength(6)
    expect(result[result.length - 1].month).toBe('Feb')
  })
  it('accumulates balance across months', () => {
    const result = computeBalanceTrendData(txns)
    expect(result[result.length - 2].balance).toBe(3700)
    expect(result[result.length - 1].balance).toBe(7350)
  })
})

describe('computeSpendingByCategory', () => {
  it('groups expense totals by category', () => {
    const result = computeSpendingByCategory(txns)
    const rent = result.find(c => c.name === 'Rent')
    const food = result.find(c => c.name === 'Food')
    expect(rent.value).toBe(2400)
    expect(food.value).toBe(250)
  })
  it('excludes income transactions', () => {
    const result = computeSpendingByCategory(txns)
    expect(result.find(c => c.name === 'Salary')).toBeUndefined()
  })
  it('returns empty array for empty input', () => {
    expect(computeSpendingByCategory([])).toEqual([])
  })
})

describe('computeTopCategory', () => {
  it('returns the category with the highest expense total', () => {
    const result = computeTopCategory(txns)
    expect(result.name).toBe('Rent')
    expect(result.value).toBe(2400)
  })
  it('returns null for empty array', () => {
    expect(computeTopCategory([])).toBeNull()
  })
})

describe('computeBiggestTransaction', () => {
  it('returns the transaction with the highest amount', () => {
    const result = computeBiggestTransaction(txns)
    expect(result.amount).toBe(5000)
  })
  it('returns null for empty array', () => {
    expect(computeBiggestTransaction([])).toBeNull()
  })
})

describe('computeMomChange', () => {
  it('returns % change in expenses between last two months', () => {
    // Jan expenses: 1300, Feb expenses: 1350 → (50/1300)*100 = 3.846...
    const result = computeMomChange(txns)
    expect(result).toBeCloseTo(3.85, 1)
  })
  it('returns null when fewer than 2 months of expense data', () => {
    const oneMonth = txns.slice(0, 3)
    expect(computeMomChange(oneMonth)).toBeNull()
  })
})

describe('applyFilters', () => {
  const defaults = { search: '', category: '', type: '', sortBy: 'date', sortDir: 'desc' }

  it('returns all transactions with empty filters', () => {
    expect(applyFilters(txns, defaults)).toHaveLength(6)
  })
  it('filters by search string (case-insensitive, matches description)', () => {
    const result = applyFilters(txns, { ...defaults, search: 'salary' })
    expect(result).toHaveLength(2)
    expect(result.every(t => t.description === 'Salary')).toBe(true)
  })
  it('filters by category', () => {
    const result = applyFilters(txns, { ...defaults, category: 'Rent' })
    expect(result).toHaveLength(2)
    expect(result.every(t => t.category === 'Rent')).toBe(true)
  })
  it('filters by type', () => {
    const result = applyFilters(txns, { ...defaults, type: 'income' })
    expect(result).toHaveLength(2)
    expect(result.every(t => t.type === 'income')).toBe(true)
  })
  it('sorts by amount ascending', () => {
    const result = applyFilters(txns, { ...defaults, sortBy: 'amount', sortDir: 'asc' })
    expect(result[0].amount).toBe(100)
    expect(result[result.length - 1].amount).toBe(5000)
  })
  it('sorts by date descending', () => {
    const result = applyFilters(txns, { ...defaults, sortBy: 'date', sortDir: 'desc' })
    expect(result[0].date).toBe('2026-02-10')
    expect(result[result.length - 1].date).toBe('2026-01-01')
  })
  it('can combine search and type filters', () => {
    const result = applyFilters(txns, { ...defaults, search: 'groceries', type: 'expense' })
    expect(result).toHaveLength(2)
  })
})
