import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AnimatedCounter } from "@/components/animated-counter";

describe("AnimatedCounter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial value of 0", () => {
    render(<AnimatedCounter end={100} />);
    
    // Should start at 0
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("animates to end value", async () => {
    render(<AnimatedCounter end={100} duration={100} />);
    
    // Wait for animation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });
    
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("displays prefix and suffix", async () => {
    render(<AnimatedCounter end={100} prefix="$" suffix="%" duration={100} />);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });
    
    expect(screen.getByText("$100%")).toBeInTheDocument();
  });

  it("handles decimal places", async () => {
    render(<AnimatedCounter end={100.55} decimals={2} duration={100} />);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });
    
    expect(screen.getByText("100.55")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AnimatedCounter end={100} className="test-class" />);
    
    expect(container.firstChild).toHaveClass("test-class");
  });
});
