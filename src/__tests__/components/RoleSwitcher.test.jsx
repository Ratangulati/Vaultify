import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../../context/AppContext'
import RoleSwitcher from '../../components/ui/RoleSwitcher'

function Wrapper({ children }) {
  return <AppProvider>{children}</AppProvider>
}

describe('RoleSwitcher', () => {
  it('renders Viewer and Admin buttons', () => {
    render(<RoleSwitcher />, { wrapper: Wrapper })
    expect(screen.getByText(/Viewer/i)).toBeInTheDocument()
    expect(screen.getByText(/Admin/i)).toBeInTheDocument()
  })

  it('clicking Admin does not throw', () => {
    render(<RoleSwitcher />, { wrapper: Wrapper })
    expect(() => fireEvent.click(screen.getByText(/Admin/i))).not.toThrow()
  })

  it('clicking Viewer does not throw', () => {
    render(<RoleSwitcher />, { wrapper: Wrapper })
    expect(() => fireEvent.click(screen.getByText(/Viewer/i))).not.toThrow()
  })
})
