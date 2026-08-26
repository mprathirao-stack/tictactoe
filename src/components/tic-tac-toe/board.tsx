import { Circle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Board as BoardType, Player } from "@/lib/tic-tac-toe";

interface BoardProps {
  board: BoardType;
  winningLine: readonly number[] | null;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

function Mark({ player }: { player: Player }) {
  return player === "X" ? (
    <X className="size-10 text-blue-500 sm:size-12" strokeWidth={2.5} />
  ) : (
    <Circle className="size-10 text-rose-500 sm:size-12" strokeWidth={2.5} />
  );
}

export function Board({ board, winningLine, onCellClick, disabled }: BoardProps) {
  return (
    <div className="grid aspect-square w-full max-w-sm grid-cols-3 gap-2">
      {board.map((cell, index) => {
        const isWinningCell = winningLine?.includes(index) ?? false;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onCellClick(index)}
            disabled={disabled || cell !== null}
            aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ", empty"}`}
            className={cn(
              "bg-card flex items-center justify-center rounded-lg border shadow-sm transition-colors",
              !cell && !disabled && "hover:bg-accent cursor-pointer",
              cell && "cursor-default",
              isWinningCell && "border-primary bg-primary/10",
            )}
          >
            {cell && <Mark player={cell} />}
          </button>
        );
      })}
    </div>
  );
}
