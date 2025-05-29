import React from "react";
import { render, screen } from "@testing-library/react";
import { AppProvider } from "@/src/context/AppContext";
import { useTransactions } from "@/src/hooks/useTransactions";

function TestComponent() {
  const { transactions, monthlyIncome, monthlyExpenses, savingsRate } = useTransactions();

  return (
    <div>
      <div data-testid="transactions-count">{transactions.length}</div>
      <div data-testid="monthly-income">{monthlyIncome}</div>
      <div data-testid="monthly-expenses">{monthlyExpenses}</div>
      <div data-testid="savings-rate">{savingsRate.toFixed(1)}</div>
    </div>
  );
}

describe("useTransactions", () => {
  it("calculates monthly income correctly", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Wait for data to load
    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(screen.getByTestId("monthly-income")).toHaveTextContent("5000");
  });

  it("calculates monthly expenses correctly", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(screen.getByTestId("monthly-expenses")).toHaveTextContent("141.49");
  });

  it("calculates savings rate correctly", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 1100));

    const savingsRate = screen.getByTestId("savings-rate").textContent;
    expect(parseFloat(savingsRate || "0")).toBeGreaterThan(90);
  });
});
