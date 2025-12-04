import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UsersTable } from "@/modules/users/components/table/UsersTable";
import { mockUsers } from "@/modules/users/__mocks__/users";

describe("UsersTable", () => {
  const defaultProps = {
    users: mockUsers,
    page: 1,
    totalPages: 5,
    hasNextPage: true,
    hasPreviousPage: false,
    isLoading: false,
    isError: false,
    limit: 10,
    searchInput: "",
    handlePage: vi.fn(),
    handleLimit: vi.fn(),
    handleUserSearch: vi.fn(),
    goToNextPage: vi.fn(),
    goToPreviousPage: vi.fn(),
  };

  it("renders table with user data", () => {
    render(<UsersTable {...defaultProps} />);

    expect(screen.getByText("Nombre de usuario")).toBeDefined();
    expect(screen.getByText("Teléfono")).toBeDefined();
    expect(screen.getByText("Información del usuario")).toBeDefined();
    expect(screen.getByText("Rol")).toBeDefined();
    expect(screen.getByText("Empresa")).toBeDefined();
    expect(screen.getByText("Departamento")).toBeDefined();

    expect(screen.getByText("Emily Johnson")).toBeDefined();
    expect(screen.getByText("Michael Williams")).toBeDefined();
  });

  it("shows loading message when isLoading is true", () => {
    render(<UsersTable {...defaultProps} isLoading={true} users={[]} />);

    expect(screen.getByText("Cargando usuarios...")).toBeDefined();
  });

  it("shows error message when isError is true", () => {
    render(<UsersTable {...defaultProps} isError={true} users={[]} />);

    expect(
      screen.getByText(
        "Ocurrió un error al cargar los usuarios. Intenta de nuevo."
      )
    ).toBeDefined();
  });

  it("shows message when there are no users", () => {
    render(<UsersTable {...defaultProps} users={[]} />);

    expect(screen.getByText("No se encontraron usuarios.")).toBeDefined();
  });
});
