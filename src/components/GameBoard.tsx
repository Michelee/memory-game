"use client";

import { CardsProps, PlayersProps } from "@/utils/gameTypes";
import React, { useEffect, useState } from "react";

import CardComponent from "@/components/CardComponent";
import supabase from "@/utils/supabase";

interface GameProps {
  gamePlayer: PlayersProps[];
  gameCards: CardsProps[];
  boardId: string;
  userId: string;
}

const Game = ({ gameCards, gamePlayer, boardId, userId }: GameProps) => {
  const [cards, setCards] = useState<CardsProps[]>(gameCards);
  const [players, setPlayers] = useState<PlayersProps[]>(gamePlayer);

  useEffect(() => {
    const channel = supabase
      .channel(`game-${boardId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "game",
          filter: `boardId=eq.${boardId}`,
        },
        (payload) => {
          const playersUpdated: PlayersProps[] = payload.new.players;
          const newCards: CardsProps[] = payload.new.cards;

          const flippedCards = newCards.filter(
            (card) => card.flipped && !card.matched
          );

          setTimeout(async () => {
            if (flippedCards.length === 2) {
              const [firstCard, secondCard] = flippedCards;
              if (firstCard.card === secondCard.card) {
                newCards.forEach((card) => {
                  if (card.card === firstCard.card) {
                    card.matched = true;
                  }
                });
                playersUpdated.forEach((player) => {
                  if (player.id === userId) {
                    player.score += 1;
                  }
                });
              } else {
                newCards.forEach((card) => {
                  if (card.flipped && !card.matched) {
                    card.flipped = false;
                  }
                });
              }

              await supabase
                .from("game")
                .update({ cards: newCards, players: playersUpdated })
                .eq("boardId", boardId);
            }
          }, 1000);

          setCards(newCards);
          setPlayers(playersUpdated);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [boardId, cards, userId]);

  const handleClick = async (index: number) => {
    const newCards = [...cards];
    newCards[index].flipped = true;
    await supabase
      .from("game")
      .update({ cards: newCards })
      .eq("boardId", boardId);
  };

  return (
    <main className="flex flex-col max-w-screen-md min-h-screen p-5 my-0 mx-auto">
      {players.length === 1 ? (
        <div className="my-5 flex justify-between">
          <span className="text-xl">Score</span>
          <span className="text-xl">{players[0].score}</span>
        </div>
      ) : (
        ""
      )}
      <div
        className={`grid gap-2 ${
          cards.length > 16 ? "grid-cols-6" : "grid-cols-4"
        }`}
      >
        {cards.map((props, index) => (
          <CardComponent
            key={index}
            value={props.card}
            flipped={props.flipped}
            matched={props.matched}
            disabled={cards.filter((e) => e.flipped && !e.matched).length === 2}
            handleClick={() => handleClick(index)}
          />
        ))}

        <div className="col-span-full">
          {players.length > 1 ? (
            <div>
              {players.map((player) => (
                <div key={player.id}>
                  <span className="text-xl">{player.name}</span>
                  <span className="text-xl">{player.score}</span>
                </div>
              ))}
            </div>
          ) : ''}
        </div>
      </div>
    </main>
  );
};

export default Game;
