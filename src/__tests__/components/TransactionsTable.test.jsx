import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../../context/AppContext'
import TransactionsTable from '../../components/transactions/TransactionsTable'

function Wrapper({ children }) {
  return <AppProvider>{children}</AppProvider>
}

describe('TransactionsTable', () => {
  it('renders all 30 mock transactions by default', () => {
    render(<TransactionsTable />, { wrapper: Wrapper })
    expect(screen.getByText('30 entries')).toBeInTheDocument()
  })

  it('shows search input', () => {
    render(<TransactionsTable />, { wrapper: Wrapper })
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('filters transactions when searching', () => {
    render(<TransactionsTable />, { wrapper: Wrapper })
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'Monthly Salary' },
    })
    expect(screen.getByText('3 entries')).toBeInTheDocument()
  })

  it('shows "No transactions found" when search has no matches', () => {
    render(<TransactionsTable />, { wrapper: Wrapper })
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'zzznomatch' },
    })
    expect(screen.getByText('No transactions found')).toBeInTheDocument()
  })

  it('does not show + Add button in viewer mode (default)', () => {
    render(<TransactionsTable />, { wrapper: Wrapper })
    expect(screen.queryByText('+ Add')).not.toBeInTheDocument()
  })
})
