import { useState } from "react";
import { Game } from "@/components/tic-tac-toe/game";
import { ModeSelect } from "@/components/tic-tac-toe/mode-select";
import type { Difficulty, GameMode, Player } from "@/lib/tic-tac-toe";

interface GameConfig {
  mode: GameMode;
  difficulty: Difficulty;
  humanSymbol: Player;
}

function App() {
  const [config, setConfig] = useState<GameConfig | null>(null);

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      {config ? (
        <Game
          mode={config.mode}
          difficulty={config.difficulty}
          humanSymbol={config.humanSymbol}
          onExit={() => setConfig(null)}
        />
      ) : (
        <ModeSelect onStart={setConfig} />
      )}
    </div>
  );
}

export default App;
