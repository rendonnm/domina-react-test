import type { User } from "@/modules/users/types/users";
import { USER_COLUMNS } from "@/modules/users/constants/UserColumns";

interface UserRowProps {
  user: User;
}

export function UserRow({ user }: UserRowProps) {
  return (
    <tr key={user.id}>
      {USER_COLUMNS.map((column) => {
        return (
          <td key={column.id} className="py-2 px-3 text-nowrap">
            {column.cell(user)}
          </td>
        );
      })}
    </tr>
  );
}
