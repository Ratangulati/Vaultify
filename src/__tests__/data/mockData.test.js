import { describe, it, expect } from 'vitest'
import { mockTransactions } from '../../data/mockData'

describe('mockTransactions', () => {
  it('has exactly 30 transactions', () => {
    expect(mockTransactions).toHaveLength(30)
  })

  it('all transactions have required fields with correct types', () => {
    mockTransactions.forEach(t => {
      expect(typeof t.id).toBe('string')
      expect(typeof t.date).toBe('string')
      expect(typeof t.description).toBe('string')
      expect(typeof t.category).toBe('string')
      expect(typeof t.amount).toBe('number')
      expect(t.amount).toBeGreaterThan(0)
    })
  })

  it('all types are income or expense', () => {
    mockTransactions.forEach(t => {
      expect(['income', 'expense']).toContain(t.type)
    })
  })

  it('all categories are valid', () => {
    const valid = ['Food', 'Rent', 'Salary', 'Entertainment', 'Health', 'Transport']
    mockTransactions.forEach(t => {
      expect(valid).toContain(t.category)
    })
  })

  it('has exactly 3 Salary income transactions', () => {
    const salary = mockTransactions.filter(t => t.category === 'Salary' && t.type === 'income')
    expect(salary).toHaveLength(3)
  })

  it('has exactly 3 Rent expense transactions', () => {
    const rent = mockTransactions.filter(t => t.category === 'Rent' && t.type === 'expense')
    expect(rent).toHaveLength(3)
  })

  it('has exactly 9 Food expense transactions', () => {
    const food = mockTransactions.filter(t => t.category === 'Food' && t.type === 'expense')
    expect(food).toHaveLength(9)
  })

  it('has unique ids', () => {
    const ids = mockTransactions.map(t => t.id)
    expect(new Set(ids).size).toBe(30)
  })

  it('dates are valid ISO format YYYY-MM-DD', () => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/
    mockTransactions.forEach(t => {
      expect(t.date).toMatch(isoDateRegex)
    })
  })
})
