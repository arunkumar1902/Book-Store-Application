import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchProduct from "./SearchProduct";
import "@testing-library/jest-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../auth/AuthProvider', () => ({
  useAuth: () => ({
    user: {
      cartDetails: [],
    },
    bookDetails: [
      { id: 1, bookTitle: 'hello world' },
      { id: 2, bookTitle: 'title' }
    ]
  })
}));

describe('search product tests', () => {
  it('renders search item in screen', () => {
    useLocation.mockReturnValue({ state: { searchItem: 'hello' } });

    render(
      <MemoryRouter>
        <SearchProduct />
      </MemoryRouter>
    );

    expect(screen.getByText(/Result based on your search : hello/i)).toBeInTheDocument();
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    expect(screen.queryByText(/title/i)).not.toBeInTheDocument();
  });
});
