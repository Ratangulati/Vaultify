import { useApp } from '../../context/AppContext'
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'

const CATEGORY_COLORS = {
  Rent:          { bg: 'bg-red-950',     text: 'text-red-400'     },
  Food:          { bg: 'bg-indigo-950',  text: 'text-indigo-400'  },
  Transport:     { bg: 'bg-cyan-950',    text: 'text-cyan-400'    },
  Health:        { bg: 'bg-amber-950',   text: 'text-amber-400'   },
  Entertainment: { bg: 'bg-pink-950',    text: 'text-pink-400'    },
  Salary:        { bg: 'bg-emerald-950', text: 'text-emerald-400' },
}

export default function TransactionRow({ transaction, onEdit, onDelete }) {
  const { role } = useApp()
  const colors = CATEGORY_COLORS[transaction.category] || { bg: 'bg-slate-900', text: 'text-slate-400' }
  const isIncome = transaction.type === 'income'

  return (
    <tr className="border-b border-slate-200 transition-colors hover:bg-slate-50 dark:border-[#16141f] dark:hover:bg-[#16141f]">
      <td className="px-4 py-2.5 text-xs text-slate-500">{transaction.date}</td>
      <td className="px-4 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-200">{transaction.description}</td>
      <td className="px-4 py-2.5 text-xs">
        <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded-full text-xs font-semibold`}>
          {transaction.category}
        </span>
      </td>
      <td className="px-4 py-2.5 text-xs">
        <span className={`${isIncome ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'} px-2 py-0.5 rounded-full text-xs`}>
          {transaction.type}
        </span>
      </td>
      <td className={`px-4 py-2.5 text-xs text-right font-bold ${isIncome ? 'text-emerald-400' : 'text-red-400'}`}>
        {isIncome ? '+' : '-'}${transaction.amount.toLocaleString()}
      </td>
      {role === 'admin' && (
        <td className="px-4 py-2.5 text-xs text-center">
          <button
            onClick={() => onEdit(transaction)}
            aria-label="Edit transaction"
            className="mr-3 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-slate-300 dark:hover:bg-[#16141f]"
          >
            <span className="inline-flex items-center gap-1.5">
              <HiOutlinePencilSquare className="text-sm" aria-hidden="true" />
              Edit
            </span>
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            aria-label="Delete transaction"
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-red-600 hover:bg-slate-50 dark:border-[#2d2b52] dark:bg-[#0d0d1a] dark:text-red-400 dark:hover:bg-[#16141f]"
          >
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineTrash className="text-sm" aria-hidden="true" />
              Delete
            </span>
          </button>
        </td>
      )}
    </tr>
  )
}
