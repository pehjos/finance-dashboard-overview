"use client";

import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import type { AppState, AppAction, AppContextType, User, Transaction, Contact } from "@/src/types";
import { mockData } from "@/src/utils/mockData";

const initialState: AppState = {
  user: null,
  balance: 0,
  showBalance: true,
  transactions: [],
  contacts: [],
  savingsGoals: [],
  notifications: [],
  spendingCategories: [],
  isLoading: true,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    
    case "TOGGLE_BALANCE_VISIBILITY":
      return { ...state, showBalance: !state.showBalance };
    
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        balance: state.balance + action.payload.amount,
      };
    
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        ),
      };
    
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    
    case "UPDATE_SAVINGS_GOAL":
      return {
        ...state,
        savingsGoals: state.savingsGoals.map(goal =>
          goal.id === action.payload.id
            ? { ...goal, current: goal.current + action.payload.amount }
            : goal
        ),
      };
    
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    
    case "SET_ERROR":
      return { ...state, error: action.payload };
    
    case "LOAD_INITIAL_DATA":
      return { ...state, ...action.payload, isLoading: false };
    
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const setUser = useCallback((user: User) => {
    dispatch({ type: "SET_USER", payload: user });
  }, []);

  const toggleBalanceVisibility = useCallback(() => {
    dispatch({ type: "TOGGLE_BALANCE_VISIBILITY" });
  }, []);

  const addTransaction = useCallback((transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `TXN${Date.now()}`,
    };
    dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    dispatch({ type: "UPDATE_TRANSACTION", payload: { id, updates } });
  }, []);

  const addContact = useCallback((contact: Omit<Contact, "id">) => {
    const newContact: Contact = {
      ...contact,
      id: `CONTACT${Date.now()}`,
    };
    dispatch({ type: "ADD_CONTACT", payload: newContact });
  }, []);

  const updateSavingsGoal = useCallback((id: string, amount: number) => {
    dispatch({ type: "UPDATE_SAVINGS_GOAL", payload: { id, amount } });
  }, []);

  const markNotificationAsRead = useCallback((id: number) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: id });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call with more realistic timing
        await new Promise(resolve => setTimeout(resolve, 1500));
        dispatch({ type: "LOAD_INITIAL_DATA", payload: mockData });
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setLoading, setError]);

  const contextValue: AppContextType = {
    state,
    dispatch,
    setUser,
    toggleBalanceVisibility,
    addTransaction,
    updateTransaction,
    addContact,
    updateSavingsGoal,
    markNotificationAsRead,
    setLoading,
    setError,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
