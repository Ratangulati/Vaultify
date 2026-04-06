import { useApp } from '../../context/AppContext'

export default function RoleSwitcher() {
  const { role, setRole } = useApp()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="role-switcher" className="text-xs font-medium text-slate-400">Role</label>
      <select
        id="role-switcher"
        aria-label="Select role"
        value={role}
        onChange={e => setRole(e.target.value)}
        className="rounded-md border border-[#2d2b52] bg-[#111827] px-2 py-1 text-xs text-slate-200 outline-none focus:border-indigo-500"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  )
}
