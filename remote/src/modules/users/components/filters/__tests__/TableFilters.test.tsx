import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableFilters } from "@/modules/users/components/filters/TableFilters";

describe("TableFilters", () => {
  const defaultProps = {
    limit: 10,
    searchInput: "",
    handleLimit: vi.fn(),
    handleUserSearch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input and limit selector", () => {
    render(<TableFilters {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(
      "Buscar por nombre de usuario..."
    );
    const limitSelect = screen.getByRole("combobox");

    expect(searchInput).toBeDefined();
    expect(limitSelect).toBeDefined();
  });

  it("displays correct value in search input", () => {
    render(<TableFilters {...defaultProps} searchInput="Test Search" />);

    const searchInput = screen.getByPlaceholderText(
      "Buscar por nombre de usuario..."
    ) as HTMLInputElement;
    expect(searchInput.value).toBe("Test Search");
  });

  it("synchronizes input with searchInput prop value", () => {
    const { rerender } = render(
      <TableFilters {...defaultProps} searchInput="First" />
    );

    let searchInput = screen.getByPlaceholderText(
      "Buscar por nombre de usuario..."
    ) as HTMLInputElement;
    expect(searchInput.value).toBe("First");

    rerender(<TableFilters {...defaultProps} searchInput="Second" />);

    searchInput = screen.getByPlaceholderText(
      "Buscar por nombre de usuario..."
    ) as HTMLInputElement;
    expect(searchInput.value).toBe("Second");
  });
});
