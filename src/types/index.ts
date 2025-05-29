export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Transaction {
  id: string
  date: string
  description: string
  recipient: string
  category: string
  amount: number
  status: "completed" | "pending" | "failed"
  type: "credit" | "debit"
}

export interface Contact {
  id: string
  name: string
  username: string
  phone: string
  email: string
  avatar: string
  favorite?: boolean
  recent?: boolean
}

export interface SavingsGoal {
  id: string
  title: string
  target: number
  current: number
  daysLeft: number
  icon: string
}

export interface Notification {
  id: number
  title: string
  message: string
  type: "warning" | "success" | "alert"
  timestamp: string
}

export interface SpendingCategory {
  name: string
  amount: number
  percentage: number
  color: string
  trend: string
}

export interface AppState {
  user: User | null
  balance: number
  showBalance: boolean
  transactions: Transaction[]
  contacts: Contact[]
  savingsGoals: SavingsGoal[]
  notifications: Notification[]
  spendingCategories: SpendingCategory[]
  isLoading: boolean
  error: string | null
}

export interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  // Action creators
  setUser: (user: User) => void
  toggleBalanceVisibility: () => void
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  addContact: (contact: Omit<Contact, "id">) => void
  updateSavingsGoal: (id: string, amount: number) => void
  markNotificationAsRead: (id: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "TOGGLE_BALANCE_VISIBILITY" }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "UPDATE_TRANSACTION"; payload: { id: string; updates: Partial<Transaction> } }
  | { type: "ADD_CONTACT"; payload: Contact }
  | { type: "UPDATE_SAVINGS_GOAL"; payload: { id: string; amount: number } }
  | { type: "MARK_NOTIFICATION_READ"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "LOAD_INITIAL_DATA"; payload: Partial<AppState> }
