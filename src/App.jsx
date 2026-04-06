import Navbar from './components/layout/Navbar'
import MainContent from './components/layout/MainContent'
import Sidebar from './components/layout/Sidebar'
import { AppProvider } from './context/AppContext'
import { motion } from 'framer-motion'

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0d0d1a] dark:text-slate-100">
        <Navbar />
        <motion.div
          className="flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Sidebar />
          <MainContent />
        </motion.div>
      </div>
    </AppProvider>
  )
}
