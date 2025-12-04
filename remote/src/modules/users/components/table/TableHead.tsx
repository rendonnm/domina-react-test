import { USER_COLUMNS } from "@/modules/users/constants/UserColumns";

interface TableHeaderProps {
  header: string;
}

function TableHeader({ header }: TableHeaderProps) {
  return <th className="pb-2 px-3 text-start text-nowrap">{header}</th>;
}

export function TableHead() {
  return (
    <thead className="border-b border-[#d4d4d8]">
      <tr>
        {USER_COLUMNS.map((column) => {
          return <TableHeader key={column.id} header={column.header} />;
        })}
      </tr>
    </thead>
  );
}
