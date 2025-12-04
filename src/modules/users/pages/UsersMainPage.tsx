import { Chip } from "@/modules/users/components/Chip";
import { UsersTable } from "@/modules/users/components/table/UsersTable";
import { useUsers } from "@/modules/users/hooks/useUsers";

export function UsersMainPage() {
  const {
    users,
    isLoading,
    isError,
    totalUsers,
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    limit,
    searchInput,
    handlePage,
    handleLimit,
    handleUserSearch,
    goToNextPage,
    goToPreviousPage,
  } = useUsers();

  if (isLoading) {
    <p>Cargando...!</p>;
  }

  if (isError) {
    <p>Se ha presentado un error. Por favor provar nuevamente</p>;
  }

  return (
    <section className="w-full h-full flex flex-col gap-5">
      <header className="flex items-center gap-5">
        <h2 className="text-3xl font-bold ">Usuarios</h2>
        <Chip label={`${totalUsers}`} />
      </header>
      <UsersTable
        users={users}
        page={page}
        totalPages={totalPages}
        handlePage={handlePage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        isLoading={isLoading}
        isError={isError}
        limit={limit}
        searchInput={searchInput}
        handleLimit={handleLimit}
        handleUserSearch={handleUserSearch}
      />
    </section>
  );
}
