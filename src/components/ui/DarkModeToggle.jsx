import { useApp } from '../../context/AppContext'

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useApp()

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full border transition-colors duration-200 ${
        darkMode
          ? 'border-[#2d2b52] bg-[#0d0d1a]'
          : 'border-slate-200 bg-slate-100'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 ${
          darkMode ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}
