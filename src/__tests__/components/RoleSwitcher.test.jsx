import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../../context/AppContext'
import RoleSwitcher from '../../components/ui/RoleSwitcher'

function Wrapper({ children }) {
  return <AppProvider>{children}</AppProvider>
}

describe('RoleSwitcher', () => {
  it('renders role dropdown with options', () => {
    render(<RoleSwitcher />, { wrapper: Wrapper })
    expect(screen.getByLabelText(/select role/i)).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /viewer/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /admin/i })).toBeInTheDocument()
  })

  it('changing to Admin does not throw', () => {
    render(<RoleSwitcher />, { wrapper: Wrapper })
    expect(() => fireEvent.change(screen.getByLabelText(/select role/i), { target: { value: 'admin' } })).not.toThrow()
  })

  it('changing to Viewer does not throw', () => {
    render(<RoleSwitcher />, { wrapper: Wrapper })
    expect(() => fireEvent.change(screen.getByLabelText(/select role/i), { target: { value: 'viewer' } })).not.toThrow()
  })
})
