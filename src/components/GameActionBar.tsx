import { CardsProps, PlayersProps } from "@/utils/gameTypes";

import React from "react";
import supabase from "@/utils/supabase";
import { useRouter } from "next/navigation";

interface GameActionBarProps {
  boardId: string;
}

export const GameActionBar = ({ boardId }: GameActionBarProps) => {
  const router = useRouter();

  const handleNewGame = async () => {
    const conf = confirm("Are you sure you want to start a new game?");

    if (conf) {
      await supabase.from("game").delete().eq("boardId", boardId);
      router.push("/new-game");
    }
  };

  const handleRestart = async () => {
    const conf = confirm("Are you sure you want to restart game?");

    if (conf) {
      const { data } = await supabase
        .from("game")
        .select()
        .eq("boardId", boardId);
      const newPlayers: PlayersProps[] = data?.[0]?.players;
      newPlayers.forEach((player) => {
        player.score = 0;
      });
      const newCards: CardsProps[] = data?.[0]?.cards;
      newCards.forEach((card) => {
        card.flipped = false;
        card.matched = false;
      });
      await supabase
        .from("game")
        .update({ players: newPlayers, cards: newCards })
        .eq("boardId", boardId);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 sm:mt-0 sm:justify-end sm:items-end sm:absolute sm:top-5 sm:right-0">
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white text-sm py-2 px-4 mr-4 rounded"
        onClick={handleRestart}
      >
        Restart
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
        onClick={handleNewGame}
      >
        New Game
      </button>
    </div>
  );
};
