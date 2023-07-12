"use client";

import { Button } from "./Button";
import { Database } from "@/lib/database.types";
import { InputComponent } from "./Input";
import RadioButton from "./RadioButton";
// @ts-ignore
import { hri } from "human-readable-ids";
import { setCookie } from "cookies-next";
import supabase from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const NewGame = () => {
  const [playerName, setPlayerName] = useState("");
  const [theme, setTheme] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [gameCode, setGameCode] = useState<string>("");

  const router = useRouter();

  const createBoardGame = async (boardId: string, userId: string) => {
    const { data: cards } = await supabase
      .from("board")
      .select()
      .eq("type", theme)
      .like("board", `%${size}%`);

    const gameBoard = cards
      ?.map((card) => ({
        card: card.card,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);

    await supabase.from("game").insert({
      boardId,
      players: [
        {
          id: userId,
          name: playerName,
          score: 0,
        },
      ],
      cards: gameBoard,
    });
  };

  const handleStartGame = async () => {
    setLoading(true);

    const userId = uuidv4();
    const boardId = hri.random();

    setGameCode(boardId);
    setCookie("userId", userId);
    await createBoardGame(boardId, userId);
    setLoading(false);
  };

  return (
    <div className="p-10 max-w-screen text-center">
      <h1 className="text-xl mb-10">Start new game</h1>

      {!gameCode && (
        <div className="text-left max-w-xs mx-auto my-0">
          <InputComponent
            name="playerName"
            label="Player name"
            value={playerName}
            handleChange={(val: string) => setPlayerName(val)}
          />

          <h3 className="inline-block my-2 text-left">Cards theme</h3>
          <div className="flex my-3 relative">
            <RadioButton
              label="Numbers"
              name="theme"
              value="number"
              selectedValue={theme}
              handleChange={(val: string) => setTheme(val)}
            />
            <RadioButton
              label="Icons"
              name="theme"
              value="icon"
              selectedValue={theme}
              handleChange={(val: string) => setTheme(val)}
            />
          </div>

          <h3 className="inline-block my-2">Grid size</h3>
          <div className="flex my-3 mx-auto relative">
            <RadioButton
              label="4x4"
              name="size"
              value="4x4"
              selectedValue={size}
              handleChange={(val: string) => setSize(val)}
            />
            <RadioButton
              label="6x6"
              name="size"
              value="6x6"
              selectedValue={size}
              handleChange={(val: string) => setSize(val)}
            />
          </div>
        </div>
      )}

      {gameCode && (
        <div className="max-w-xs mx-auto my-0 text-center">
          <h2 className="text-2xl">Game Code</h2>
          <span className="text-3xl mt-10 block text-orange-500">
            {gameCode}
          </span>
        </div>
      )}

      <div className="max-w-xs flex flex-col mx-auto my-0 mt-10">
        {loading ? (
          <span className="block my-5 text-xl">
            Signed up, now creating game...
          </span>
        ) : gameCode ? (
          <Button
            label="Start game"
            onClick={() => router.push(`/game/${gameCode}`)}
            classes="bg-green-500 hover:bg-green-700 text-white w-full"
            disabled={!gameCode}
          />
        ) : (
          <Button
            label="Host game"
            onClick={handleStartGame}
            classes="bg-blue-500 hover:bg-blue-700 text-white w-full"
            disabled={!playerName || !theme || !size}
          />
        )}
      </div>
    </div>
  );
};
