import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const CATEGORIES = ['Food', 'Rent', 'Salary', 'Entertainment', 'Health', 'Transport']
const ACCOUNTS = ['cash', 'bank', 'credit']
const CURRENCIES = [
  { code: 'INR', label: 'INR (₹)' },
  { code: 'USD', label: 'USD ($)' },
  { code: 'CNY', label: 'CNY (¥)' },
  { code: 'EUR', label: 'EUR (€)' },
]

export default function AddTransactionModal({ transaction, onSave, onClose }) {
  const { currency: defaultCurrency } = useApp()
  const [form, setForm] = useState({
    date:        transaction?.date        ?? new Date().toISOString().slice(0, 10),
    description: transaction?.description ?? '',
    category:    transaction?.category    ?? 'Food',
    type:        transaction?.type        ?? 'expense',
    amount:      transaction?.amount      ?? '',
    currency:    transaction?.currency    ?? defaultCurrency,
    account:     transaction?.account     ?? 'bank',
  })
  const [errors, setErrors] = useState({})

  function validate() {
    const errs = {}
    if (!form.description.trim()) errs.description = 'Required'
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Must be > 0'
    if (!form.date) errs.date = 'Required'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave({ ...form, amount: Number(form.amount) })
  }

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-md mx-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-[#2d2b52] dark:bg-[#13111e]">
        <h2 className="mb-5 text-base font-bold text-slate-900 dark:text-slate-100">
          {transaction ? 'Edit Transaction' : 'New Transaction'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="modal-date" className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Date</label>
            <input
              id="modal-date"
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-200"
            />
            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <label htmlFor="modal-desc" className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Description</label>
            <input
              id="modal-desc"
              type="text"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="e.g. Grocery Store"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-200"
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="modal-category" className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Category</label>
              <select
                id="modal-category"
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-200"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="modal-type" className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Type</label>
              <select
                id="modal-type"
                value={form.type}
                onChange={e => set('type', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-200"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="modal-currency" className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Currency</label>
            <select
              id="modal-currency"
              value={form.currency}
              onChange={e => set('currency', e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-200"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="modal-account" className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Account</label>
            <select
              id="modal-account"
              value={form.account}
              onChange={e => set('account', e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-200"
            >
              {ACCOUNTS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="modal-amount" className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Amount</label>
            <input
              id="modal-amount"
              type="number"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-200"
            />
            {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-300 dark:hover:bg-[#16141f]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 transition-colors"
            >
              {transaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
