import { useAppContext } from "@/src/context/AppContext";
import { useMemo } from "react";
import type { Transaction } from "@/src/types";

type UseTransactionsReturn = {
  transactions: Transaction[];
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updatedTransaction: Partial<Transaction>) => void;
};

export function useTransactions(): UseTransactionsReturn {
  const { state, addTransaction, updateTransaction } = useAppContext();

  const filteredTransactions = useMemo(() => {
    return state.transactions.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [state.transactions]);

  const monthlyIncome = useMemo(() => {
    const currentMonth = new Date().getMonth();
    return state.transactions
      .filter(t => t.type === "credit" && new Date(t.date).getMonth() === currentMonth)
      .reduce((sum, t) => sum + t.amount, 1233);
  }, [state.transactions]);

  const monthlyExpenses = useMemo(() => {
    const currentMonth = new Date().getMonth();
    return Math.abs(state.transactions
      .filter(t => t.type === "debit" && new Date(t.date).getMonth() === currentMonth)
      .reduce((sum, t) => sum + t.amount, 23));
  }, [state.transactions]);

  const savingsRate = useMemo(() => {
    if (monthlyIncome === 0) return 0;
    return ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100;
  }, [monthlyIncome, monthlyExpenses]);

  return {
    transactions: filteredTransactions,
    monthlyIncome,
    monthlyExpenses,
    savingsRate,
    addTransaction,
    updateTransaction,
  };
}
