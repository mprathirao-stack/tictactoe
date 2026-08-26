import { Bot, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Difficulty, GameMode, Player } from "@/lib/tic-tac-toe";
import { useState } from "react";

interface ModeSelectProps {
  onStart: (config: {
    mode: GameMode;
    difficulty: Difficulty;
    humanSymbol: Player;
  }) => void;
}

export function ModeSelect({ onStart }: ModeSelectProps) {
  const [mode, setMode] = useState<GameMode>("two-player");
  const [difficulty, setDifficulty] = useState<Difficulty>("unbeatable");
  const [humanSymbol, setHumanSymbol] = useState<Player>("X");

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tic-Tac-Toe</CardTitle>
        <CardDescription>Choose how you want to play</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode("two-player")}
            className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
              mode === "two-player"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-accent"
            }`}
          >
            <Users className="size-6" />
            <span className="text-sm font-medium">Two Players</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("vs-computer")}
            className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
              mode === "vs-computer"
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-accent"
            }`}
          >
            <Bot className="size-6" />
            <span className="text-sm font-medium">Vs Computer</span>
          </button>
        </div>

        {mode === "vs-computer" && (
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground text-xs uppercase">
                Difficulty
              </Label>
              <RadioGroup
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as Difficulty)}
                className="flex flex-col gap-2"
              >
                {(
                  [
                    ["easy", "Easy"],
                    ["medium", "Medium"],
                    ["unbeatable", "Unbeatable"],
                  ] as const
                ).map(([value, label]) => (
                  <div key={value} className="flex items-center gap-2">
                    <RadioGroupItem value={value} id={`difficulty-${value}`} />
                    <Label htmlFor={`difficulty-${value}`}>{label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground text-xs uppercase">
                Play as
              </Label>
              <RadioGroup
                value={humanSymbol}
                onValueChange={(value) => setHumanSymbol(value as Player)}
                className="flex gap-4"
              >
                {(["X", "O"] as const).map((symbol) => (
                  <div key={symbol} className="flex items-center gap-2">
                    <RadioGroupItem value={symbol} id={`symbol-${symbol}`} />
                    <Label htmlFor={`symbol-${symbol}`}>{symbol}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        <Button onClick={() => onStart({ mode, difficulty, humanSymbol })}>
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
}
