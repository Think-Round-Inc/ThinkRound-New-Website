
/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CommunityGallery from "./CommunityGallery";

vi.mock("next/font/google", () => ({
  Lato: () => ({ className: "mock-lato" }),
}));

vi.mock("next/image", () => ({
  default: (props: { alt: string }) => (
    <span data-testid="mock-image">{props.alt}</span>
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <span>{children}</span>,
}));

const paintings = [
  {
    _id: "painting-1",
    title: "Sunset",
    artistName: "Artist One",
    dateProduced: "2024",
    description: "A sunset painting",
    category: "Photography ",
    imageUrl: "/sunset.jpg",
    displayImageUrl: "/sunset.jpg",
    thumbnailUrl: "/sunset.jpg",
  },
  {
    _id: "painting-2",
    title: "Forest",
    artistName: "Artist Two",
    dateProduced: "2024",
    description: "A forest painting",
    category: "Painting",
    imageUrl: "/forest.jpg",
    displayImageUrl: "/forest.jpg",
    thumbnailUrl: "/forest.jpg",
  },
];

describe("CommunityGallery", () => {
  it("matches categories after trimming whitespace", () => {
    render(
      <CommunityGallery
        communityName="Test Community"
        communitySlug="test-community"
        groupNumber={1}
        paintings={paintings}
        allCommunities={[]}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /sort by/i }));
    fireEvent.click(screen.getByRole("button", { name: "Photography" }));

    expect(screen.getByText("Currently Sorted By: Photography")).toBeTruthy();
    expect(screen.getByText("1/1")).toBeTruthy();
    expect(screen.getAllByText("Sunset").length).toBeGreaterThan(0);
  });

  it("shows a message when there are no paintings", () => {
    render(
      <CommunityGallery
        communityName="Empty Community"
        communitySlug="empty-community"
        groupNumber={2}
        paintings={[]}
        allCommunities={[]}
      />
    );

    expect(
      screen.getByRole("status").textContent
    ).toContain("No paintings added yet.");
  });
});
