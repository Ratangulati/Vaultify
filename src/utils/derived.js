export function computeTotalIncome(transactions) {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function computeTotalExpenses(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
}

export function computeTotalBalance(transactions) {
  return computeTotalIncome(transactions) - computeTotalExpenses(transactions)
}

function monthKey(date) {
  return date.slice(0, 7)
}

function toMonthLabel(key) {
  const [year, month] = key.split('-')
  return new Date(Number(year), Number(month) - 1, 1).toLocaleString('en-US', { month: 'short' })
}

function buildRecentMonthKeys(count, fromDate) {
  const base = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1)
  const keys = []
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    keys.push(key)
  }
  return keys
}

export function computeBalanceTrendData(transactions) {
  const monthDeltas = {}
  transactions.forEach(t => {
    const month = monthKey(t.date)
    monthDeltas[month] = (monthDeltas[month] || 0) + (t.type === 'income' ? t.amount : -t.amount)
  })
  const latestDate = transactions.length > 0
    ? new Date([...transactions].sort((a, b) => a.date.localeCompare(b.date)).at(-1).date)
    : new Date()
  const months = buildRecentMonthKeys(6, latestDate)
  let running = 0
  return months.map(month => {
    running += monthDeltas[month] || 0
    return { month: toMonthLabel(month), balance: running }
  })
}

export function computeSpendingByCategory(transactions) {
  const map = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

export function computeTopCategory(transactions) {
  const byCategory = computeSpendingByCategory(transactions)
  if (byCategory.length === 0) return null
  return byCategory.reduce((max, c) => (c.value > max.value ? c : max), byCategory[0])
}

export function computeBiggestTransaction(transactions) {
  if (transactions.length === 0) return null
  return transactions.reduce((max, t) => (t.amount > max.amount ? t : max), transactions[0])
}

export function computeMomChange(transactions) {
  const expensesByMonth = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const month = monthKey(t.date)
      expensesByMonth[month] = (expensesByMonth[month] || 0) + t.amount
    })
  const months = Object.keys(expensesByMonth).sort()
  if (months.length < 2) return null
  const prev = expensesByMonth[months[months.length - 2]]
  const curr = expensesByMonth[months[months.length - 1]]
  if (prev === 0) return null
  return ((curr - prev) / prev) * 100
}

export function computeCurrentMonthIncome(transactions) {
  if (transactions.length === 0) return 0
  const latestMonth = monthKey([...transactions].sort((a, b) => a.date.localeCompare(b.date)).at(-1).date)
  return transactions
    .filter(t => t.type === 'income' && monthKey(t.date) === latestMonth)
    .reduce((sum, t) => sum + t.amount, 0)
}

export function computeCurrentMonthExpenses(transactions) {
  if (transactions.length === 0) return 0
  const latestMonth = monthKey([...transactions].sort((a, b) => a.date.localeCompare(b.date)).at(-1).date)
  return transactions
    .filter(t => t.type === 'expense' && monthKey(t.date) === latestMonth)
    .reduce((sum, t) => sum + t.amount, 0)
}

export function computeTopCategoryThisMonth(transactions) {
  if (transactions.length === 0) return null
  const latestMonth = monthKey([...transactions].sort((a, b) => a.date.localeCompare(b.date)).at(-1).date)
  const categoryTotals = {}
  transactions
    .filter(t => t.type === 'expense' && monthKey(t.date) === latestMonth)
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
    })
  const entries = Object.entries(categoryTotals)
  if (entries.length === 0) return null
  const [name, value] = entries.reduce((max, curr) => (curr[1] > max[1] ? curr : max))
  return { name, value, month: latestMonth }
}

export function computeExpenseMomComparison(transactions) {
  const expensesByMonth = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const month = monthKey(t.date)
      expensesByMonth[month] = (expensesByMonth[month] || 0) + t.amount
    })
  const months = Object.keys(expensesByMonth).sort()
  if (months.length < 2) return null
  const previousMonth = months[months.length - 2]
  const currentMonth = months[months.length - 1]
  const previous = expensesByMonth[previousMonth]
  const current = expensesByMonth[currentMonth]
  const pctChange = previous > 0 ? ((current - previous) / previous) * 100 : null
  return { currentMonth, previousMonth, current, previous, pctChange }
}

export function computeAverageDailySpend(transactions) {
  if (transactions.length === 0) return 0
  const latestMonth = monthKey([...transactions].sort((a, b) => a.date.localeCompare(b.date)).at(-1).date)
  const monthlyExpenses = transactions.filter(
    t => t.type === 'expense' && monthKey(t.date) === latestMonth
  )
  if (monthlyExpenses.length === 0) return 0
  const uniqueDays = new Set(monthlyExpenses.map(t => t.date)).size
  const total = monthlyExpenses.reduce((sum, t) => sum + t.amount, 0)
  return total / uniqueDays
}

export function computeOverspendAlert(transactions, threshold = 40) {
  if (transactions.length === 0) return null
  const latestMonth = monthKey([...transactions].sort((a, b) => a.date.localeCompare(b.date)).at(-1).date)
  const monthExpenses = transactions.filter(
    t => t.type === 'expense' && monthKey(t.date) === latestMonth
  )
  const total = monthExpenses.reduce((sum, t) => sum + t.amount, 0)
  if (total <= 0) return null
  const byCategory = {}
  monthExpenses.forEach(t => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount
  })
  const top = Object.entries(byCategory).reduce((max, curr) => (curr[1] > max[1] ? curr : max))
  const pct = (top[1] / total) * 100
  if (pct < threshold) return null
  return {
    category: top[0],
    amount: top[1],
    percentage: pct,
    month: latestMonth,
  }
}

export function applyFilters(transactions, filters) {
  let result = [...transactions]
  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    )
  }
  if (filters.category) {
    result = result.filter(t => t.category === filters.category)
  }
  if (filters.type) {
    result = result.filter(t => t.type === filters.type)
  }
  result.sort((a, b) => {
    let valA = a[filters.sortBy]
    let valB = b[filters.sortBy]
    if (filters.sortBy === 'amount') {
      valA = Number(valA)
      valB = Number(valB)
    }
    if (valA < valB) return filters.sortDir === 'asc' ? -1 : 1
    if (valA > valB) return filters.sortDir === 'asc' ? 1 : -1
    return 0
  })
  return result
}
