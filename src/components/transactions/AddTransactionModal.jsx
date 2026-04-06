import { useState } from 'react'

const CATEGORIES = ['Food', 'Rent', 'Salary', 'Entertainment', 'Health', 'Transport']

export default function AddTransactionModal({ transaction, onSave, onClose }) {
  const [form, setForm] = useState({
    date:        transaction?.date        ?? new Date().toISOString().slice(0, 10),
    description: transaction?.description ?? '',
    category:    transaction?.category    ?? 'Food',
    type:        transaction?.type        ?? 'expense',
    amount:      transaction?.amount      ?? '',
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
      <div className="bg-[#13111e] border border-[#2d2b52] rounded-xl p-6 w-full max-w-md mx-4">
        {transaction && (
          <h2 className="text-slate-100 text-base font-bold mb-5">Edit Transaction</h2>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="modal-date" className="text-slate-400 text-xs block mb-1">Date</label>
            <input
              id="modal-date"
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
              className="w-full bg-[#0d0d1a] border border-[#2d2b52] rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <label htmlFor="modal-desc" className="text-slate-400 text-xs block mb-1">Description</label>
            <input
              id="modal-desc"
              type="text"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="e.g. Grocery Store"
              className="w-full bg-[#0d0d1a] border border-[#2d2b52] rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="modal-category" className="text-slate-400 text-xs block mb-1">Category</label>
              <select
                id="modal-category"
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className="w-full bg-[#0d0d1a] border border-[#2d2b52] rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="modal-type" className="text-slate-400 text-xs block mb-1">Type</label>
              <select
                id="modal-type"
                value={form.type}
                onChange={e => set('type', e.target.value)}
                className="w-full bg-[#0d0d1a] border border-[#2d2b52] rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="modal-amount" className="text-slate-400 text-xs block mb-1">Amount ($)</label>
            <input
              id="modal-amount"
              type="number"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#0d0d1a] border border-[#2d2b52] rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
            {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#1e1c33] text-slate-300 rounded-lg text-sm hover:bg-[#2d2b52] transition-colors"
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
