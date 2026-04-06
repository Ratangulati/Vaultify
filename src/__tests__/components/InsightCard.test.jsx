import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import InsightCard from '../../components/cards/InsightCard'

describe('InsightCard', () => {
  it('renders label, value, and subtext', () => {
    render(
      <InsightCard
        icon="🏆"
        label="Top Category"
        value="Rent"
        subtext="$3,600 total"
        iconGradient="from-indigo-700 to-purple-700"
      />
    )
    expect(screen.getByText('Top Category')).toBeInTheDocument()
    expect(screen.getByText('Rent')).toBeInTheDocument()
    expect(screen.getByText('$3,600 total')).toBeInTheDocument()
  })

  it('renders icon', () => {
    render(
      <InsightCard icon="🏆" label="Top" value="Rent" subtext="$100" iconGradient="from-indigo-700 to-purple-700" />
    )
    expect(screen.getByText('🏆')).toBeInTheDocument()
  })
})
