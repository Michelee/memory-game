import { CardsProps } from "@/utils/gameTypes";
import GameBoard from "@/components/GameBoard";
import PageLayout from "@/components/PageLayout";
import React from "react";
import { cookies } from "next/headers";
import supabase from "@/utils/supabase";

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
    <PageLayout>
      {currentPlayer ? (
        <GameBoard
          gameCards={cards || []}
          gamePlayer={players || []}
          boardId={params.code}
          userId={userId}
          player={currentPlayer}
        />
      ) : (
        <span className="text-2xl inline-block mx-auto my-20">
          Sorry, game not found
        </span>
      )}
    </PageLayout>
  );
};

export default Game;
