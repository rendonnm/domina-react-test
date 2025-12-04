import { TABLE_LIMITS } from "@/modules/users/constants/tableLimits";

interface TableFiltersProps {
  limit: number;
  searchInput: string;
  handleLimit: (newLimit: number) => void;
  handleUserSearch: (userQuery: string) => void;
}

export function TableFilters({
  limit,
  searchInput,
  handleLimit,
  handleUserSearch,
}: TableFiltersProps) {
  return (
    <section className="flex gap-5 flex-wrap justify-between">
      <label htmlFor="user-search" className="sr-only">
        Buscar por nombre de usuario
        <input
          type="text"
          name="user-search"
          id="user-search"
          placeholder="Buscar por nombre de usuario..."
          className="border bg-[#f4f4f4] border-[#d4d4d8] w-64 py-2 px-2 rounded-lg"
          value={searchInput}
          onChange={(e) => handleUserSearch(e.target.value)}
        />
      </label>
      <label htmlFor="user-limit" className="sr-only">
        Cantidad de registros por página
        <select
          name="user-limit"
          id="user-limit"
          value={limit}
          className="border bg-[#f4f4f4] border-[#d4d4d8] py-2 px-2 rounded-lg text-gray-700"
          onChange={(e) => handleLimit(Number(e.target.value))}
        >
          {TABLE_LIMITS.map((limitOption) => (
            <option key={limitOption} value={limitOption}>
              {limitOption} registros por página
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
