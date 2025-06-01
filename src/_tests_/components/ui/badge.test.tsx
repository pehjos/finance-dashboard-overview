import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Badge } from "@/components/ui/badge"; 

describe("Badge component", () => {
  it("renders with default variant", () => {
    const { getByText } = render(<Badge>Default Badge</Badge>);
    const badge = getByText("Default Badge");

    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("bg-primary");
  });

  it("renders with secondary variant", () => {
    const { getByText } = render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = getByText("Secondary Badge");

    expect(badge.className).toContain("bg-secondary");
  });

  it("applies custom className", () => {
    const { getByText } = render(
      <Badge className="custom-class">Badge with Custom Class</Badge>
    );
    const badge = getByText("Badge with Custom Class");

    expect(badge.className).toContain("custom-class");
  });

  it("passes HTML attributes", () => {
    const { getByTestId } = render(
      <Badge data-testid="badge-element">With Test ID</Badge>
    );

    expect(getByTestId("badge-element")).toBeInTheDocument();
  });
});
