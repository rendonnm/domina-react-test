import type { UsersReponse } from "@/modules/users/types/users";
import { TableFilters } from "@/modules/users/components/filters/TableFilters";
import { Pagination } from "@/modules/users/components/pagination/Pagination";
import { TableHead } from "@/modules/users/components/table/TableHead";
import { UserTableContent } from "@/modules/users/components/table/UserTableContent";

interface UsersTableProps {
  users: UsersReponse["users"];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  isError: boolean;
  limit: number;
  searchInput: string;
  handlePage: (newPage: number) => void;
  handleLimit: (newLimit: number) => void;
  handleUserSearch: (userQuery: string) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export function UsersTable({
  users,
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  isError,
  limit,
  searchInput,
  handlePage,
  handleLimit,
  handleUserSearch,
  goToNextPage,
  goToPreviousPage,
}: UsersTableProps) {
  return (
    <>
      <TableFilters
        limit={limit}
        searchInput={searchInput}
        handleLimit={handleLimit}
        handleUserSearch={handleUserSearch}
      />
      <div className="border border-[#d4d4d8] rounded-xl p-4 overflow-scroll h-full">
        <table className="">
          <caption className="sr-only">
            Usuarios de Domina Entrega Total
          </caption>
          <TableHead />
          <tbody>
            <UserTableContent
              users={users}
              isLoading={isLoading}
              isError={isError}
            />
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        handlePage={handlePage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </>
  );
}
