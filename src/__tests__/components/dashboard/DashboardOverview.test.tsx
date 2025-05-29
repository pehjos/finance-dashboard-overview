import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppProvider } from "@/src/context/AppContext";
import { DashboardOverview } from "@/components/dashboard-overview";

// Mock the child components
jest.mock("@/components/animated-counter", () => {
  return function MockAnimatedCounter({ end, prefix = "", suffix = "" }: any) {
    return <span>{prefix}{end}{suffix}</span>;
  };
});

jest.mock("@/components/animated-progress", () => {
  return function MockAnimatedProgress({ value }: any) {
    return <div data-testid="animated-progress">{value}%</div>;
  };
});

describe("DashboardOverview", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state initially", () => {
    render(
      <AppProvider>
        <DashboardOverview />
      </AppProvider>
    );

    expect(screen.getByTestId("dashboard-loading")).toBeInTheDocument();
  });

  it("renders dashboard content after loading", async () => {
    render(
      <AppProvider>
        <DashboardOverview />
      </AppProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("dashboard-overview")).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Welcome back! Here's your financial overview.")).toBeInTheDocument();
  });

  it("toggles balance visibility", async () => {
    render(
      <AppProvider>
        <DashboardOverview />
      </AppProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("dashboard-overview")).toBeInTheDocument();
    }, { timeout: 2000 });

    const toggleButton = screen.getByTestId("toggle-balance-button");
    
    // Click to hide balance
    fireEvent.click(toggleButton);
    
    // Should show hidden balance
    await waitFor(() => {
      expect(screen.getByText("••••••")).toBeInTheDocument();
    });
  });

  it("opens notifications when bell icon is clicked", async () => {
    render(
      <AppProvider>
        <DashboardOverview />
      </AppProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("dashboard-overview")).toBeInTheDocument();
    }, { timeout: 2000 });

    const notificationsButton = screen.getByTestId("notifications-button");
    fireEvent.click(notificationsButton);

    // Should show notification center
    await waitFor(() => {
      expect(screen.getByText("Notifications")).toBeInTheDocument();
    });
  });
});
