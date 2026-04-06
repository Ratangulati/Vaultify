import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../../context/AppContext'
import DarkModeToggle from '../../components/ui/DarkModeToggle'

function Wrapper({ children }) {
  return <AppProvider>{children}</AppProvider>
}

describe('DarkModeToggle', () => {
  it('renders a button with accessible label', () => {
    render(<DarkModeToggle />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /toggle dark mode/i })).toBeInTheDocument()
  })

  it('clicking does not throw', () => {
    render(<DarkModeToggle />, { wrapper: Wrapper })
    expect(() => fireEvent.click(screen.getByRole('button', { name: /toggle dark mode/i }))).not.toThrow()
  })
})
