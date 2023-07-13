"use client";

import { Button } from "./Button";
import { InputComponent } from "./Input";
import { PlayersProps } from "@/utils/gameTypes";
import RadioButton from "./RadioButton";
// @ts-ignore
import { setCookie } from "cookies-next";
import supabase from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const JoinGame = () => {
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [gameCode, setGameCode] = useState<string>("");

  const router = useRouter();

  const handleStartGame = async () => {
    setLoading(true);
    setError(false);

    const { data } = await supabase
      .from("game")
      .select()
      .eq("boardId", gameCode);

    if (!data?.[0]) {
      setError(true);
    } else {
      const players = data[0]?.players as PlayersProps[];
      const userId = uuidv4();
      setCookie("userId", userId);
      await supabase
        .from("game")
        .update({
          players: [
            ...players,
            {
              id: userId,
              name: playerName,
              score: 0,
            },
          ],
        })
        .eq("boardId", gameCode);
      router.push(`/game/${gameCode}`);
    }

    setLoading(false);
  };

  return (
    <div className="p-10 max-w-screen text-center">
      <h1 className="text-xl mb-10">Join game</h1>

      <div className="text-left max-w-xs mx-auto my-0">
        <InputComponent
          name="gameCode"
          label="Game code"
          value={gameCode}
          handleChange={(val: string) => setGameCode(val)}
        />

        <InputComponent
          name="playerName"
          label="Player name"
          value={playerName}
          handleChange={(val: string) => setPlayerName(val)}
        />
      </div>

      <div className="max-w-xs flex flex-col mx-auto my-0 mt-10">
        {loading ? (
          <span className="block my-5 text-xl">
            Signed up, we will redirect you to the game...
          </span>
        ) : (
          <Button
            label="Join game"
            onClick={handleStartGame}
            classes="bg-orange-500 hover:bg-orange-700 text-white w-full"
            disabled={!playerName || !gameCode}
          />
        )}

        {error ? (
          <span className="block my-5 text-xl">
            Game code not found, please try again
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
