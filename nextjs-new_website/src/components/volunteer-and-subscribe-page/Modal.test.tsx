
/**
 * @vitest-environment jsdom
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

afterEach(() => {
  cleanup();
});

describe("Modal", () => {
  it("displays the correct title and message", () => {
    render(
      <Modal
        title="Success"
        message="Your form was submitted successfully."
        textColor="green"
        onClose={vi.fn()}
      />
    );

    expect(
      screen.getByRole("dialog", { name: "Success" })
    ).toBeTruthy();

    expect(
      screen.getByText("Your form was submitted successfully.")
    ).toBeTruthy();
  });

  it("calls onClose when the Close button is clicked", () => {
    const handleClose = vi.fn();

    render(
      <Modal
        title="Error"
        message="Something went wrong."
        textColor="red"
        onClose={handleClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Close" })
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
