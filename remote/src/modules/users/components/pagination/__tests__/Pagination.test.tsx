import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination } from "@/modules/users/components/pagination/Pagination";

describe("Pagination", () => {
  it("disables Previous button on first page", () => {
    const handlePage = vi.fn();
    const goToNextPage = vi.fn();
    const goToPreviousPage = vi.fn();

    render(
      <Pagination
        page={1}
        totalPages={5}
        hasNextPage={true}
        hasPreviousPage={false}
        handlePage={handlePage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />
    );

    const prevButton = screen.getByText("Anterior") as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
  });

  it("disables Next button on last page", () => {
    const handlePage = vi.fn();
    const goToNextPage = vi.fn();
    const goToPreviousPage = vi.fn();

    render(
      <Pagination
        page={5}
        totalPages={5}
        hasNextPage={false}
        hasPreviousPage={true}
        handlePage={handlePage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />
    );

    const nextButton = screen.getByText("Siguiente") as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true);
  });
});
