import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Button } from "@/components/ui/button"; 
describe("Button component", () => {
  it("renders with default variant and size", () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("h-10");
  });

  it("renders with secondary variant", () => {
    const { getByRole } = render(<Button variant="secondary">Secondary</Button>);
    const button = getByRole("button");

    expect(button).toHaveClass("bg-secondary");
  });

  it("renders with size 'lg'", () => {
    const { getByRole } = render(<Button size="lg">Large</Button>);
    const button = getByRole("button");

    expect(button).toHaveClass("h-11");
  });

  it("renders as a child component when 'asChild' is true", () => {
    const { getByText } = render(
      <Button asChild>
        <a href="#">Link</a>
      </Button>
    );
    const link = getByText("Link");

    expect(link.tagName.toLowerCase()).toBe("a");
  });

  it("disables the button when 'disabled' is passed", () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    const button = getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:pointer-events-none");
  });
});
