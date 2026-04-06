import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import TransactionRow from './TransactionRow'
import AddTransactionModal from './AddTransactionModal'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

const CATEGORIES = ['', 'Food', 'Rent', 'Salary', 'Entertainment', 'Health', 'Transport']

export default function TransactionsTable() {
  const {
    filteredTransactions, filters, updateFilters,
    role, addTransaction, updateTransaction, deleteTransaction,
  } = useApp()
  const [modal, setModal] = useState(null) // null | { mode: 'add' } | { mode: 'edit', transaction }

  function handleSort(field) {
    if (filters.sortBy === field) {
      updateFilters({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' })
    } else {
      updateFilters({ sortBy: field, sortDir: 'desc' })
    }
  }

  function handleSave(formData) {
    if (modal.mode === 'add') {
      addTransaction(formData)
    } else {
      updateTransaction(modal.transaction.id, formData)
    }
    setModal(null)
  }

  function exportCsv() {
    const rows = filteredTransactions.map(t => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount,
    ])
    const header = ['Date', 'Description', 'Category', 'Type', 'Amount']
    const csv = [header, ...rows]
      .map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'transactions.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-[#1e1c33] dark:bg-[#13111e]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Transactions</span>
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
            {filteredTransactions.length} entries
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-[#2d2b52] dark:bg-[#0d0d1a]">
            <HiOutlineMagnifyingGlass className="text-sm text-slate-400 dark:text-slate-600" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={e => updateFilters({ search: e.target.value })}
              className="w-28 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>
          {/* Category filter */}
          <select
            value={filters.category}
            onChange={e => updateFilters({ category: e.target.value })}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-300"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c || 'All Categories'}</option>
            ))}
          </select>
          {/* Type filter */}
          <select
            value={filters.type}
            onChange={e => updateFilters({ type: e.target.value })}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-300"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button
            onClick={exportCsv}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-300 dark:hover:bg-[#16141f]"
          >
            Export CSV
          </button>
          {/* Admin-only Add button */}
          {role === 'admin' && (
            <button
              onClick={() => setModal({ mode: 'add' })}
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:from-indigo-500 hover:to-purple-500 transition-colors"
            >
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 dark:border-[#1e1c33] dark:text-slate-600">
              <th
                className="text-left px-4 py-2 font-medium hover:text-slate-400 select-none"
                onClick={() => handleSort('date')}
              >
                Date
              </th>
              <th className="text-left px-4 py-2 font-medium">Description</th>
              <th className="text-left px-4 py-2 font-medium">Category</th>
              <th className="text-left px-4 py-2 font-medium">Type</th>
              <th
                className="text-right px-4 py-2 font-medium hover:text-slate-400 select-none"
                onClick={() => handleSort('amount')}
              >
                Amount
              </th>
              {role === 'admin' && (
                <th className="text-center px-4 py-2 font-medium">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan={role === 'admin' ? 6 : 5}
                  className="px-4 py-8 text-center text-slate-500 dark:text-slate-600"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map(txn => (
                <TransactionRow
                  key={txn.id}
                  transaction={txn}
                  onEdit={t => setModal({ mode: 'edit', transaction: t })}
                  onDelete={deleteTransaction}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <AddTransactionModal
          transaction={modal.mode === 'edit' ? modal.transaction : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
