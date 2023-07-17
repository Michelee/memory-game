import { CardsProps } from "@/utils/gameTypes";
import GameBoard from "@/components/GameBoard";
import React from "react";
import { cookies } from "next/headers";
import supabase from "../../../utils/supabase";

const Game = async ({ params }: { params: { code: string } }) => {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value || "";

  const { data } = await supabase
    .from("game")
    .select()
    .eq("boardId", params.code);

  const cards = data?.[0]?.cards as CardsProps[];
  const players = data?.[0]?.players;
  const currentPlayer = data?.[0]?.currentPlayer;

  return (
    <main className="flex flex-col max-w-screen-md min-h-screen p-5 my-0 mx-auto relative">
      <div className="text-left max-w-screen">
        <h1 className="text-2xl font-bold">memory</h1>
      </div>
      <div className="grid">
        <GameBoard
          gameCards={cards || []}
          gamePlayer={players || []}
          boardId={params.code}
          userId={userId}
          player={currentPlayer}
        />
      </div>
    </main>
  );
};

export default Game;
