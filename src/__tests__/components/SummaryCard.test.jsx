import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SummaryCard from '../../components/cards/SummaryCard'

describe('SummaryCard', () => {
  it('renders label, value, and subtext', () => {
    render(<SummaryCard label="Total Balance" value="$12,000" subtext="All time" accentColor="indigo" />)
    expect(screen.getByText('Total Balance')).toBeInTheDocument()
    expect(screen.getByText('$12,000')).toBeInTheDocument()
    expect(screen.getByText('All time')).toBeInTheDocument()
  })

  it('renders trend when provided', () => {
    render(<SummaryCard label="Balance" value="$1,000" subtext="All time" accentColor="indigo" trend="↑ 5%" />)
    expect(screen.getByText('↑ 5%')).toBeInTheDocument()
  })

  it('does not render trend text when omitted', () => {
    render(<SummaryCard label="Balance" value="$1,000" subtext="All time" accentColor="indigo" />)
    expect(screen.queryByText(/↑/)).not.toBeInTheDocument()
  })
})
