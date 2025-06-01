import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

describe("Card component suite", () => {
  it("renders Card with base class", () => {
    const { container } = render(<Card>Card Body</Card>);
    const card = container.firstChild as HTMLElement;

    expect(card).toBeInTheDocument();
    expect(card.className).toContain("bg-card");
    expect(card.className).toContain("text-card-foreground");
  });

  it("renders CardHeader with children", () => {
    const { getByText } = render(<CardHeader>Header</CardHeader>);
    expect(getByText("Header")).toBeInTheDocument();
  });

  it("renders CardTitle with styling", () => {
    const { getByText } = render(<CardTitle>Title</CardTitle>);
    const title = getByText("Title");

    expect(title.className).toContain("text-2xl");
  });

  it("renders CardDescription with muted text", () => {
    const { getByText } = render(<CardDescription>Description</CardDescription>);
    const desc = getByText("Description");

    expect(desc.className).toContain("text-muted-foreground");
  });

  it("renders CardContent with padding", () => {
    const { getByText } = render(<CardContent>Content</CardContent>);
    const content = getByText("Content");

    expect(content.className).toContain("p-6");
  });

  it("renders CardFooter with flex styling", () => {
    const { getByText } = render(<CardFooter>Footer</CardFooter>);
    const footer = getByText("Footer");

    expect(footer.className).toContain("flex");
  });
});
