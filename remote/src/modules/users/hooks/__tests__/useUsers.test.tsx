import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { getUsers } from "@/modules/users/services/getUsers";
import { mockUsersResponse } from "@/modules/users/__mocks__/users";

vi.mock("@/modules/users/services/getUsers", () => ({
  getUsers: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    );
  };
}

describe("useUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getUsers).mockResolvedValue(mockUsersResponse);
  });

  it("returns initial data correctly", async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.users).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.users).toEqual(mockUsersResponse.users);
    expect(result.current.totalUsers).toBe(2);
    expect(result.current.page).toBe(1);
    expect(result.current.limit).toBe(10);
    expect(result.current.totalPages).toBe(1); // 2 / 10 = 0.2 -> 1
  });

  it("correctly calculates hasNextPage and hasPreviousPage", async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.hasPreviousPage).toBe(false);
  });

  it("provides navigation functions", async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.handlePage).toBe("function");
    expect(typeof result.current.handleLimit).toBe("function");
    expect(typeof result.current.handleUserSearch).toBe("function");
    expect(typeof result.current.goToNextPage).toBe("function");
    expect(typeof result.current.goToPreviousPage).toBe("function");
  });

  it("initializes searchInput with search params value", async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.searchInput).toBe("");
  });
});
