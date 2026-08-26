export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export type GameMode = "two-player" | "vs-computer";
export type Difficulty = "easy" | "medium" | "unbeatable";

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export interface WinResult {
  winner: Player;
  line: readonly number[];
}

export function calculateWinner(board: Board): WinResult | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

export function getEmptyCells(board: Board): number[] {
  return board.reduce<number[]>((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
}

function opponent(player: Player): Player {
  return player === "X" ? "O" : "X";
}

function minimax(
  board: Board,
  player: Player,
  computer: Player,
  depth: number,
): number {
  const win = calculateWinner(board);
  if (win) return win.winner === computer ? 10 - depth : depth - 10;
  if (isBoardFull(board)) return 0;

  const scores = getEmptyCells(board).map((index) => {
    const next = board.slice();
    next[index] = player;
    return minimax(next, opponent(player), computer, depth + 1);
  });

  return player === computer ? Math.max(...scores) : Math.min(...scores);
}

function getUnbeatableMove(board: Board, computer: Player): number {
  let bestScore = -Infinity;
  let bestMove = getEmptyCells(board)[0];

  for (const index of getEmptyCells(board)) {
    const next = board.slice();
    next[index] = computer;
    const score = minimax(next, opponent(computer), computer, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}

function getRandomMove(board: Board): number {
  const empty = getEmptyCells(board);
  return empty[Math.floor(Math.random() * empty.length)];
}

/** Picks the move a human O opponent needs to win or block, or a fallback. */
function getMediumMove(board: Board, computer: Player): number {
  const human = opponent(computer);

  for (const player of [computer, human]) {
    for (const index of getEmptyCells(board)) {
      const next = board.slice();
      next[index] = player;
      if (calculateWinner(next)?.winner === player) return index;
    }
  }

  if (board[4] === null) return 4;
  return getRandomMove(board);
}

export function getComputerMove(
  board: Board,
  computer: Player,
  difficulty: Difficulty,
): number {
  switch (difficulty) {
    case "easy":
      return getRandomMove(board);
    case "medium":
      return getMediumMove(board, computer);
    case "unbeatable":
      return getUnbeatableMove(board, computer);
  }
}
