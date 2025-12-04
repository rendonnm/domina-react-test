import { type ReactNode } from "react";
import type { User } from "@/modules/users/types/users";

type UserColumnId =
  | "userInfo"
  | "fullName"
  | "username"
  | "email"
  | "phone"
  | "role"
  | "company"
  | "department"
  | "title"
  | "location"
  | "age";

interface UserColumn {
  id: UserColumnId;
  header: string;
  className?: string;
  cell: (user: User) => ReactNode;
}

export const USER_COLUMNS: UserColumn[] = [
  {
    id: "username",
    header: "Nombre de usuario",
    cell: (user) => user.username,
  },
  {
    id: "phone",
    header: "Teléfono",
    cell: (user) => user.phone,
  },
  {
    id: "userInfo",
    header: "Información del usuario",
    cell: (user) => (
      <div className="flex gap-2">
        <div className="size-14">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="object-cover size-full"
          />
        </div>
        <div>
          <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>
    ),
    className: "w-[56px]",
  },
  {
    id: "role",
    header: "Rol",
    cell: (user) => user.role,
  },
  {
    id: "company",
    header: "Empresa",
    cell: (user) => user.company.name,
  },
  {
    id: "department",
    header: "Departamento",
    cell: (user) => user.company.department,
  },
  {
    id: "title",
    header: "Cargo",
    cell: (user) => user.company.title,
  },
  {
    id: "location",
    header: "Ubicación",
    cell: (user) => `${user.address.city}, ${user.address.country}`,
  },
  {
    id: "age",
    header: "Edad",
    cell: (user) => user.age,
    className: "text-right",
  },
];
