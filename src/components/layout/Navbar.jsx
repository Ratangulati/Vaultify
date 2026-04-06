import DarkModeToggle from '../ui/DarkModeToggle'
import RoleSwitcher from '../ui/RoleSwitcher'
import { HiCurrencyDollar } from 'react-icons/hi2'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 dark:border-[#2d2b52] dark:bg-gradient-to-r dark:from-[#13111e] dark:to-[#1a1730]">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
          <HiCurrencyDollar className="text-lg" aria-hidden="true" />
        </div>
        <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">Vaultify</span>
      </div>
      <div className="flex items-center gap-3">
        <RoleSwitcher />
        <DarkModeToggle />
      </div>
    </nav>
  )
}
