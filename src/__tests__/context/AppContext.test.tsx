import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AppProvider, useAppContext } from "@/src/context/AppContext";
import type { User, Transaction } from "@/src/types";

// Test component to access context
function TestComponent() {
  const {
    state,
    setUser,
    toggleBalanceVisibility,
    addTransaction,
    updateTransaction,
    markNotificationAsRead,
  } = useAppContext();

  return (
    <div>
      <div data-testid="balance">{state.balance}</div>
      <div data-testid="show-balance">{state.showBalance.toString()}</div>
      <div data-testid="transactions-count">{state.transactions.length}</div>
      <div data-testid="notifications-count">{state.notifications.length}</div>
      <div data-testid="user-name">{state.user?.name || "No user"}</div>
      
      <button
        data-testid="set-user"
        onClick={() => setUser({ id: "1", name: "Test User", email: "test@example.com" })}
      >
        Set User
      </button>
      
      <button
        data-testid="toggle-balance"
        onClick={toggleBalanceVisibility}
      >
        Toggle Balance
      </button>
      
      <button
        data-testid="add-transaction"
        onClick={() => addTransaction({
          date: "2024-01-15",
          description: "Test Transaction",
          recipient: "Test Recipient",
          category: "Test",
          amount: 100,
          status: "completed",
          type: "credit",
        })}
      >
        Add Transaction
      </button>
      
      <button
        data-testid="mark-notification-read"
        onClick={() => markNotificationAsRead(1)}
      >
        Mark Notification Read
      </button>
    </div>
  );
}

describe("AppContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("provides initial state", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Wait for initial data to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });

    expect(screen.getByTestId("balance")).toHaveTextContent("45750.8");
    expect(screen.getByTestId("show-balance")).toHaveTextContent("true");
    expect(screen.getByTestId("user-name")).toHaveTextContent("John Doe");
  });

  it("sets user correctly", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });

    act(() => {
      screen.getByTestId("set-user").click();
    });

    expect(screen.getByTestId("user-name")).toHaveTextContent("Test User");
  });

  it("toggles balance visibility", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });

    expect(screen.getByTestId("show-balance")).toHaveTextContent("true");

    act(() => {
      screen.getByTestId("toggle-balance").click();
    });

    expect(screen.getByTestId("show-balance")).toHaveTextContent("false");
  });

  it("adds transaction and updates balance", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });

    const initialTransactionsCount = parseInt(screen.getByTestId("transactions-count").textContent || "0");
    const initialBalance = parseFloat(screen.getByTestId("balance").textContent || "0");

    act(() => {
      screen.getByTestId("add-transaction").click();
    });

    expect(screen.getByTestId("transactions-count")).toHaveTextContent((initialTransactionsCount + 1).toString());
    expect(screen.getByTestId("balance")).toHaveTextContent((initialBalance + 100).toString());
  });

  it("marks notification as read", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });

    const initialNotificationsCount = parseInt(screen.getByTestId("notifications-count").textContent || "0");

    act(() => {
      screen.getByTestId("mark-notification-read").click();
    });

    expect(screen.getByTestId("notifications-count")).toHaveTextContent((initialNotificationsCount - 1).toString());
  });

  it("throws error when used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAppContext must be used within an AppProvider");

    consoleSpy.mockRestore();
  });
});
