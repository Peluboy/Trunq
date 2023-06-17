import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  increment,
} from "firebase/firestore";
import { firestore } from "../utils/Firebase";
import { LinkContext } from "../contexts/LinkContext";
import Redirect from "../components/Redirect";

jest.mock("firebase/firestore", () => ({
  getDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  collection: jest.fn(),
  increment: jest.fn(),
}));

describe("Redirect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders 'Redirecting...' message while loading", async () => {
    render(<Redirect />, { wrapper: MemoryRouter });

    const loadingMessage = screen.getByText("Redirecting... 🚀");
    expect(loadingMessage).toBeInTheDocument();
  });

  test("renders 'Link is invalid' message if link does not exist", async () => {
    // Mock Firestore functions
    getDoc.mockReturnValueOnce({ exists: () => false });

    render(<Redirect />, { wrapper: MemoryRouter });

    await waitFor(() => {
      const errorMessage = screen.getByText("Link is invalid 😣");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("redirects to the long URL if link exists", async () => {
    const longURL = "https://example.com";
    const totalClicks = 10;

    // Mock Firestore functions
    getDoc.mockReturnValueOnce({
      exists: () => true,
      data: () => ({ longURL, totalClicks }),
    });
    doc.mockReturnValueOnce("linkDocRef");
    collection.mockReturnValueOnce("links");
    updateDoc.mockReturnValueOnce();
    increment.mockReturnValueOnce(11);

    render(
      <LinkContext.Provider value={{ updateTotalClicks: jest.fn() }}>
        <Redirect />
      </LinkContext.Provider>
    );

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith("linkDocRef", {
        totalClicks: 11,
      });
      expect(window.location.href).toBe(longURL);
    });
  });
});
