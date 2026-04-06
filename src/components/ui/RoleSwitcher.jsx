import { useApp } from '../../context/AppContext'

export default function RoleSwitcher() {
  const { role, setRole } = useApp()

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setRole('viewer')}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          role === 'viewer'
            ? 'bg-indigo-900 border border-indigo-600 text-indigo-300'
            : 'bg-[#111827] border border-slate-700 text-slate-500 hover:text-slate-300'
        }`}
      >
        👁 Viewer
      </button>
      <button
        onClick={() => setRole('admin')}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          role === 'admin'
            ? 'bg-indigo-900 border border-indigo-600 text-indigo-300'
            : 'bg-[#111827] border border-slate-700 text-slate-500 hover:text-slate-300'
        }`}
      >
        🛡 Admin
      </button>
    </div>
  )
}
