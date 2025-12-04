import { PaginationSquare } from "./PaginationSquare";

interface PaginationSquaresProps {
  page: number;
  totalPages: number;
  handlePage: (newPage: number) => void;
}

export function PaginationSquares({
  page,
  totalPages,
  handlePage,
}: PaginationSquaresProps) {
  if (totalPages <= 5) {
    return (
      <section className="flex bg-[#d4d4d8] rounded-lg">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <PaginationSquare
            key={num}
            onClick={() => handlePage(num)}
            actualPage={page}
          >
            {num}
          </PaginationSquare>
        ))}
      </section>
    );
  }

  const pages: (number | string)[] = [1];

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) pages.push("...");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) pages.push("...");

  pages.push(totalPages);

  return (
    <section className="flex bg-[#d4d4d8] rounded-lg">
      {pages.map((num, i) => {
        if (num === "...") {
          return (
            <span
              key={`dots-${i}`}
              className="size-9 flex items-center justify-center text-gray-600"
            >
              ...
            </span>
          );
        }

        return (
          <PaginationSquare
            key={num}
            onClick={() => handlePage(num as number)}
            actualPage={page}
          >
            {num}
          </PaginationSquare>
        );
      })}
    </section>
  );
}
