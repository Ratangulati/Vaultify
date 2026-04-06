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

export function computeBalanceTrendData(transactions) {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date))
  const monthDeltas = {}
  sorted.forEach(t => {
    const month = t.date.slice(0, 7)
    monthDeltas[month] = (monthDeltas[month] || 0) + (t.type === 'income' ? t.amount : -t.amount)
  })
  let running = 0
  return Object.entries(monthDeltas)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, delta]) => {
      running += delta
      return { month, balance: running }
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
      const month = t.date.slice(0, 7)
      expensesByMonth[month] = (expensesByMonth[month] || 0) + t.amount
    })
  const months = Object.keys(expensesByMonth).sort()
  if (months.length < 2) return null
  const prev = expensesByMonth[months[months.length - 2]]
  const curr = expensesByMonth[months[months.length - 1]]
  return ((curr - prev) / prev) * 100
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
