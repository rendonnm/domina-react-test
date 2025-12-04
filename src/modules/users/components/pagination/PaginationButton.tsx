interface PaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}

export function PaginationButton({
  children,
  onClick,
  disabled,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      className="bg-gray-100 h-8 px-3 border border-[#d4d4d8] rounded-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
