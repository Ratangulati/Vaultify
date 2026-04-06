import { useApp } from '../../context/AppContext'

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
    <tr className="border-b border-[#16141f] hover:bg-[#16141f] transition-colors">
      <td className="px-4 py-2.5 text-slate-500 text-xs">{transaction.date}</td>
      <td className="px-4 py-2.5 text-slate-200 text-xs font-medium">{transaction.description}</td>
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
            className="text-indigo-400 hover:text-indigo-300 mr-3 transition-colors"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            aria-label="Delete transaction"
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            🗑
          </button>
        </td>
      )}
    </tr>
  )
}
