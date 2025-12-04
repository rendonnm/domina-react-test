import { PaginationSquares } from "./PaginationSquares";
import { PaginationButton } from "./PaginationButton";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  handlePage: (newPage: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export function Pagination({
  page,
  totalPages,
  handlePage,
  goToNextPage,
  goToPreviousPage,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  return (
    <footer className="flex justify-between">
      <PaginationSquares
        page={page}
        totalPages={totalPages}
        handlePage={handlePage}
      />
      <section className="flex gap-5">
        <PaginationButton
          onClick={goToPreviousPage}
          disabled={!hasPreviousPage}
        >
          Anterior
        </PaginationButton>

        <PaginationButton onClick={goToNextPage} disabled={!hasNextPage}>
          Siguiente
        </PaginationButton>
      </section>
    </footer>
  );
}
