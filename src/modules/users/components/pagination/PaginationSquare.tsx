export function PaginationSquare({
  children,
  onClick,
  actualPage,
}: {
  children: React.ReactNode;
  onClick: () => void;
  actualPage: number;
}) {
  const isActive = Number(children) === actualPage;
  return (
    <button
      className={`size-9 cursor-pointer hover:opacity-50 ${isActive ? "bg-[#1722FF] text-white rounded-xl shadow-md" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
