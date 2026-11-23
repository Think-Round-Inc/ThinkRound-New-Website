
/**
 * @vitest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
afterEach(() => {
  cleanup();
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <span>{alt}</span>,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}));

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    media: "(min-width: 768px)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe("Navbar mobile menu", () => {
  it("opens and closes the mobile menu", () => {
    render(<Navbar />);

    const openButton = screen.getByRole("button", {
      name: "Open menu",
    });

    expect(openButton.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(openButton);

    const closeButton = screen.getByRole("button", {
      name: "Close menu",
    });

    expect(closeButton.getAttribute("aria-expanded")).toBe("true");
    expect(document.getElementById("mobile-navigation")).not.toBeNull();

    fireEvent.click(closeButton);

    expect(
      screen.getByRole("button", { name: "Open menu" })
        .getAttribute("aria-expanded")
    ).toBe("false");

    expect(document.getElementById("mobile-navigation")).toBeNull();
  });

  it("opens a submenu and closes the menu when a link is selected", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    fireEvent.click(screen.getByRole("button", { name: /about/i }));

    expect(screen.getByRole("dialog", { name: "Mobile submenu" }))
      .toBeTruthy();

    fireEvent.click(screen.getByRole("link", { name: "About Us" }));

    expect(document.getElementById("mobile-navigation")).toBeNull();
  });
});
