import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/modules/users/services/getUsers";
import { useEffect, useState } from "react";
import type { UsersReponse } from "@/modules/users/types/users";

export function useUsers() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");

  const { data, isLoading, isError } = useQuery<UsersReponse>({
    queryKey: ["domina-users", page, limit, search],
    queryFn: () => getUsers(page, limit, search),
  });

  const users = data?.users ?? [];
  const totalUsers = data?.total ?? 0;

  const totalPages = limit > 0 ? Math.ceil(totalUsers / limit) : 1;

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  function handlePage(newPage: number) {
    setPage(newPage);
  }

  function goToNextPage() {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function goToPreviousPage() {
    if (hasPreviousPage) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function handleLimit(newLimit: number) {
    setLimit(newLimit);
    setPage(1);
  }

  function handleUserSearch(userQuery: string) {
    setSearchField(userQuery);
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearch(searchField);
    }, 400);
    return () => clearTimeout(timerId);
  }, [searchField]);

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
    handlePage,
    handleLimit,
    goToNextPage,
    goToPreviousPage,
    handleUserSearch,
  };
}
