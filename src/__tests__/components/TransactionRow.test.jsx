import { describe, it, expect, vi, useEffect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useEffect as reactUseEffect } from 'react'
import { AppProvider, useApp } from '../../context/AppContext'
import TransactionRow from '../../components/transactions/TransactionRow'

const txn = {
  id: 'txn_test',
  date: '2026-01-15',
  description: 'Test Grocery',
  category: 'Food',
  type: 'expense',
  amount: 50,
}

function ViewerWrapper({ children }) {
  return <AppProvider>{children}</AppProvider>
}

function AdminSetter({ children }) {
  const { setRole } = useApp()
  reactUseEffect(() => { setRole('admin') }, [])
  return children
}

function AdminWrapper({ children }) {
  return (
    <AppProvider>
      <AdminSetter>{children}</AdminSetter>
    </AppProvider>
  )
}

describe('TransactionRow (viewer)', () => {
  it('renders description, category, and formatted amount', () => {
    render(
      <table><tbody>
        <TransactionRow transaction={txn} onEdit={vi.fn()} onDelete={vi.fn()} />
      </tbody></table>,
      { wrapper: ViewerWrapper }
    )
    expect(screen.getByText('Test Grocery')).toBeInTheDocument()
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(screen.getByText('-$50')).toBeInTheDocument()
  })

  it('does not show edit or delete buttons for viewer', () => {
    render(
      <table><tbody>
        <TransactionRow transaction={txn} onEdit={vi.fn()} onDelete={vi.fn()} />
      </tbody></table>,
      { wrapper: ViewerWrapper }
    )
    expect(screen.queryByLabelText('Edit transaction')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Delete transaction')).not.toBeInTheDocument()
  })
})

describe('TransactionRow (admin)', () => {
  it('shows edit and delete buttons for admin role', async () => {
    render(
      <table><tbody>
        <TransactionRow transaction={txn} onEdit={vi.fn()} onDelete={vi.fn()} />
      </tbody></table>,
      { wrapper: AdminWrapper }
    )
    expect(await screen.findByLabelText('Edit transaction')).toBeInTheDocument()
    expect(screen.getByLabelText('Delete transaction')).toBeInTheDocument()
  })

  it('calls onEdit with transaction when edit clicked', async () => {
    const onEdit = vi.fn()
    render(
      <table><tbody>
        <TransactionRow transaction={txn} onEdit={onEdit} onDelete={vi.fn()} />
      </tbody></table>,
      { wrapper: AdminWrapper }
    )
    fireEvent.click(await screen.findByLabelText('Edit transaction'))
    expect(onEdit).toHaveBeenCalledWith(txn)
  })

  it('calls onDelete with transaction id when delete clicked', async () => {
    const onDelete = vi.fn()
    render(
      <table><tbody>
        <TransactionRow transaction={txn} onEdit={vi.fn()} onDelete={onDelete} />
      </tbody></table>,
      { wrapper: AdminWrapper }
    )
    fireEvent.click(await screen.findByLabelText('Delete transaction'))
    expect(onDelete).toHaveBeenCalledWith('txn_test')
  })
})
