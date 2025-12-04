import type { UsersReponse } from "@/modules/users/types/users";
import { USER_COLUMNS } from "@/modules/users/constants/UserColumns";
import { UserRow } from "@/modules/users/components/table/UserRow";

interface UserTableContentProps {
  users: UsersReponse["users"];
  isLoading: boolean;
  isError: boolean;
}

export function UserTableContent({
  users,
  isLoading,
  isError,
}: UserTableContentProps) {
  if (isLoading) {
    return (
      <tr>
        <td
          colSpan={USER_COLUMNS.length}
          className="py-6 px-3 text-center text-sm text-gray-500"
        >
          Cargando usuarios...
        </td>
      </tr>
    );
  }

  if (isError) {
    return (
      <tr>
        <td
          colSpan={USER_COLUMNS.length}
          className="py-6 px-3 text-center text-sm text-red-500"
        >
          Ocurrió un error al cargar los usuarios. Intenta de nuevo.
        </td>
      </tr>
    );
  }

  if (users.length === 0) {
    return (
      <tr>
        <td
          colSpan={USER_COLUMNS.length}
          className="py-6 px-3 text-center text-sm text-gray-500"
        >
          No se encontraron usuarios.
        </td>
      </tr>
    );
  }

  return users.map((user) => <UserRow key={user.id} user={user} />);
}
