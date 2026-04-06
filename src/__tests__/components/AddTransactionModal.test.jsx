import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../../context/AppContext'
import AddTransactionModal from '../../components/transactions/AddTransactionModal'

function Wrapper({ children }) {
  return <AppProvider>{children}</AppProvider>
}

describe('AddTransactionModal', () => {
  it('renders form fields for adding a transaction', () => {
    render(<AddTransactionModal transaction={null} onSave={vi.fn()} onClose={vi.fn()} />, { wrapper: Wrapper })
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Currency/i)).toBeInTheDocument()
  })

  it('shows "Add Transaction" title when transaction is null', () => {
    render(<AddTransactionModal transaction={null} onSave={vi.fn()} onClose={vi.fn()} />, { wrapper: Wrapper })
    expect(screen.getByText('Add Transaction')).toBeInTheDocument()
  })

  it('shows "Edit Transaction" title when transaction is provided', () => {
    const txn = { id: 't1', date: '2026-01-01', description: 'Rent', category: 'Rent', type: 'expense', amount: 1200 }
    render(<AddTransactionModal transaction={txn} onSave={vi.fn()} onClose={vi.fn()} />, { wrapper: Wrapper })
    expect(screen.getByText('Edit Transaction')).toBeInTheDocument()
  })

  it('shows validation error when description is empty', () => {
    render(<AddTransactionModal transaction={null} onSave={vi.fn()} onClose={vi.fn()} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Add Transaction', { selector: 'button' }))
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('calls onClose when Cancel is clicked', () => {
    const onClose = vi.fn()
    render(<AddTransactionModal transaction={null} onSave={vi.fn()} onClose={onClose} />, { wrapper: Wrapper })
    fireEvent.click(screen.getByText('Cancel'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onSave with form data when valid form is submitted', () => {
    const onSave = vi.fn()
    render(<AddTransactionModal transaction={null} onSave={onSave} onClose={vi.fn()} />, { wrapper: Wrapper })
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Coffee' } })
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '5.50' } })
    fireEvent.click(screen.getByText('Add Transaction', { selector: 'button' }))
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ description: 'Coffee', amount: 5.5, currency: 'INR' }))
  })
})
