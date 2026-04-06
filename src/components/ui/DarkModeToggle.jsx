import { useApp } from '../../context/AppContext'

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useApp()

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
        darkMode ? 'bg-indigo-500' : 'bg-slate-400'
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
          darkMode ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}
