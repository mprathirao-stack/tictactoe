import { useEffect, useState } from "react";
import { Bot, RotateCcw, Users } from "lucide-react";
import { Board } from "@/components/tic-tac-toe/board";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  calculateWinner,
  getComputerMove,
  isBoardFull,
  type Board as BoardType,
  type Difficulty,
  type GameMode,
  type Player,
} from "@/lib/tic-tac-toe";

interface GameProps {
  mode: GameMode;
  difficulty: Difficulty;
  humanSymbol: Player;
  onExit: () => void;
}

const COMPUTER_MOVE_DELAY_MS = 500;

export function Game({ mode, difficulty, humanSymbol, onExit }: GameProps) {
  const computerSymbol: Player = humanSymbol === "X" ? "O" : "X";
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const winResult = calculateWinner(board);
  const isDraw = !winResult && isBoardFull(board);
  const isGameOver = Boolean(winResult) || isDraw;
  const isComputerTurn =
    mode === "vs-computer" && currentPlayer === computerSymbol && !isGameOver;

  useEffect(() => {
    if (winResult) {
      setScores((prev) => ({ ...prev, [winResult.winner]: prev[winResult.winner] + 1 }));
    } else if (isDraw) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
    // Only fire once per finished game, when the board settles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winResult?.winner, isDraw]);

  useEffect(() => {
    if (!isComputerTurn) return;

    const timer = setTimeout(() => {
      const move = getComputerMove(board, computerSymbol, difficulty);
      setBoard((prev) => {
        const next = prev.slice();
        next[move] = computerSymbol;
        return next;
      });
      setCurrentPlayer(humanSymbol);
    }, COMPUTER_MOVE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isComputerTurn, board, computerSymbol, humanSymbol, difficulty]);

  function handleCellClick(index: number) {
    if (isGameOver || board[index] || isComputerTurn) return;

    const next = board.slice();
    next[index] = currentPlayer;
    setBoard(next);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function handleNewRound() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  }

  const statusText = winResult
    ? `${winResult.winner} wins!`
    : isDraw
      ? "It's a draw!"
      : mode === "vs-computer" && currentPlayer === computerSymbol
        ? "Computer is thinking..."
        : `${currentPlayer}'s turn`;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          {mode === "vs-computer" ? (
            <Bot className="text-muted-foreground size-5" />
          ) : (
            <Users className="text-muted-foreground size-5" />
          )}
          <CardTitle className="text-lg">
            {mode === "vs-computer" ? "Vs Computer" : "Two Players"}
          </CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Change mode
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <Badge variant="outline">X: {scores.X}</Badge>
          <Badge variant="outline">Draws: {scores.draws}</Badge>
          <Badge variant="outline">O: {scores.O}</Badge>
        </div>

        <p
          className="text-lg font-medium"
          aria-live="polite"
        >
          {statusText}
        </p>

        <Board
          board={board}
          winningLine={winResult?.line ?? null}
          onCellClick={handleCellClick}
          disabled={isGameOver}
        />
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant="secondary" onClick={handleNewRound}>
          <RotateCcw className="size-4" />
          New Round
        </Button>
      </CardFooter>
    </Card>
  );
}
