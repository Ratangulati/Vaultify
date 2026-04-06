# Vaultify

A responsive finance dashboard built with React and Tailwind CSS.  
It includes overview metrics, interactive charts, transactions management, role-based UI behavior (Viewer/Admin), and UX polish such as transitions, persistence, and export tooling.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Vitest + React Testing Library

## Setup

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

## Folder Structure

```text
src/
  components/
    cards/           # Reusable stat/insight cards
    charts/          # Recharts visualizations
    layout/          # Navbar, Sidebar, MainContent
    transactions/    # Table, row, modal form
    ui/              # Role switcher, dark mode toggle
  context/
    AppContext.jsx   # App-wide state + derived values + actions
  data/
    mockData.js      # Seed transactions
  utils/
    derived.js       # Pure data derivation helpers
  __tests__/         # Unit/component tests
```

## Features

### Dashboard Overview

- 3 summary cards:
  - Total Balance
  - Monthly Income (current month)
  - Monthly Expenses (current month)
- Icon-based and color-coded card styling
- Responsive charts:
  - Balance trend area chart (last 6 months)
  - Spending breakdown donut chart by category

### Transactions Table

- Columns: Date, Description, Category, Type, Amount
- Search by description/category
- Filter by category and type
- Sort by Date and Amount
- Empty state message when no rows match
- Mobile-friendly with horizontal scroll handling
- CSV export for currently filtered rows

### Role-Based Access Control (RBAC)

- Role switcher in navbar using a dropdown (`Viewer` / `Admin`)
- Active role stored in React Context
- Viewer:
  - Read-only access to dashboard and table views
- Admin:
  - Sees `Add Transaction` button
  - Can open modal to add/edit transactions
  - Sees edit/delete controls per transaction row

### Insights Section

- Highest spending category for the current month
- Month-over-month expense comparison with percent change
- Average daily spend for current month
- Category concentration callout badge when a category exceeds 40% of expenses

<!-- ### UX + Extras

- Smooth section transitions with Framer Motion
- Transactions and role persisted to `localStorage`
- Chart skeleton loaders on initial dashboard load
- Graceful empty/zero states for charts and insights
- Dark mode toggle via context-driven `dark` class

## Assumptions

- Data is mock/in-memory by default and persisted in browser storage
- "Monthly" metrics refer to the latest month present in transaction data
- CSV export contains the currently filtered/sorted table rows
- No backend/auth service is required for role switching in this demo

## Optional Enhancements Implemented

- Framer Motion transitions for main content/chart section
- `localStorage` persistence for role and transactions
- Chart skeleton loading state
- CSV export button in transactions controls
- Helpful chart empty states when data is unavailable -->
