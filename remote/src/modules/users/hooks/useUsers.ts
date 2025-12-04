import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/modules/users/services/getUsers";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useUsers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["domina-users", page, limit, search],
    queryFn: () => getUsers(page, limit, search),
  });

  const users = data?.users ?? [];
  const totalUsers = data?.total ?? 0;

  const totalPages = limit > 0 ? Math.ceil(totalUsers / limit) : 1;

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  function handlePage(newPage: number) {
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });
  }

  function goToNextPage() {
    if (!hasNextPage) return;

    setSearchParams((prev) => {
      const currentPage = Number(prev.get("page") || "1");
      prev.set("page", String(currentPage + 1));
      return prev;
    });
  }

  function goToPreviousPage() {
    if (!hasPreviousPage) return;

    setSearchParams((prev) => {
      const currentPage = Number(prev.get("page") || "1");
      prev.set("page", String(Math.max(1, currentPage - 1)));
      return prev;
    });
  }

  function handleLimit(newLimit: number) {
    setSearchParams((prev) => {
      prev.set("limit", String(newLimit));
      prev.set("page", "1");
      return prev;
    });
  }

  function handleUserSearch(userQuery: string) {
    setSearchInput(userQuery);
  }

  useEffect(() => {
    if (searchInput === search) return;

    const timerId = setTimeout(() => {
      setSearchParams((prev) => {
        if (searchInput) {
          prev.set("search", searchInput);
        } else {
          prev.delete("search");
        }
        prev.set("page", "1");
        return prev;
      });
    }, 400);

    return () => clearTimeout(timerId);
  }, [searchInput, search, setSearchParams]);

  return {
    users,
    isLoading,
    isError,
    page,
    totalUsers,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    limit,
    searchInput,
    handlePage,
    handleLimit,
    goToNextPage,
    goToPreviousPage,
    handleUserSearch,
  };
}
