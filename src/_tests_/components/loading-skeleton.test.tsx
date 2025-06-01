import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LoadingSkeleton } from "@/components/loading-skeleton";

describe("LoadingSkeleton", () => {
  it("renders text skeleton lines", () => {
    const { container } = render(<LoadingSkeleton lines={3} />);
    const skeletons = container.querySelectorAll(".skeleton-text");
    expect(skeletons.length).toBe(3);
  });

  it("renders card skeleton", () => {
    const { container } = render(<LoadingSkeleton type="card" />);
    const card = container.querySelector(".skeleton-card");
    expect(card).toBeInTheDocument();
  });

  it("renders avatar skeleton", () => {
    const { container } = render(<LoadingSkeleton type="avatar" />);
    const avatar = container.querySelector(".skeleton-avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("renders chart skeleton", () => {
    const { container } = render(<LoadingSkeleton type="chart" />);
    const chart = container.querySelector(".skeleton-chart");
    expect(chart).toBeInTheDocument();
  });

  it("renders table skeleton with line count", () => {
    const { container } = render(<LoadingSkeleton type="table" lines={4} />);
    const rows = container.querySelectorAll(".skeleton-avatar.w-8.h-8");
    expect(rows.length).toBe(4); // one per line
  });

  it("renders multiple skeleton sets with count", () => {
    const { container } = render(<LoadingSkeleton count={3} />);
    const sets = container.querySelectorAll(".space-y-2");
    expect(sets.length).toBe(3);
  });

  it("applies custom className", () => {
    const { container } = render(
      <LoadingSkeleton className="custom-class" type="card" />
    );
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });
});
