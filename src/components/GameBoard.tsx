"use client";

import { CardsProps, PlayersProps } from "@/utils/gameTypes";
import React, { useEffect, useState } from "react";

import CardComponent from "@/components/CardComponent";
import supabase from "@/utils/supabase";

interface GameProps {
  gamePlayer: PlayersProps[];
  gameCards: CardsProps[];
  player: string;
  boardId: string;
  userId: string;
}

const Game = ({
  gameCards,
  gamePlayer,
  boardId,
  player,
  userId,
}: GameProps) => {
  const [cards, setCards] = useState<CardsProps[]>(gameCards);
  const [players, setPlayers] = useState<PlayersProps[]>(gamePlayer);
  const [currentPlayer, setCurrentPlayer] = useState(player);

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
          let newCurrentPlayer = payload.new.currentPlayer;

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

              const playerIndex = playersUpdated.findIndex(
                (player) => player.id === payload.new.currentPlayer
              );
              newCurrentPlayer =
                playerIndex + 1 === playersUpdated.length
                  ? playersUpdated[0].id
                  : playersUpdated[playerIndex + 1].id;

              await supabase
                .from("game")
                .update({
                  cards: newCards,
                  players: playersUpdated,
                  currentPlayer: newCurrentPlayer,
                })
                .eq("boardId", boardId);
            }
          }, 500);

          setCards(newCards);
          setPlayers(playersUpdated);
          setCurrentPlayer(newCurrentPlayer);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [boardId, cards, currentPlayer, userId]);

  const handleClick = async (index: number) => {
    const newCards = [...cards];
    newCards[index].flipped = true;
    await supabase
      .from("game")
      .update({ cards: newCards })
      .eq("boardId", boardId);
  };

  return (
    <>
      <div className="flex flex-col max-w-screen-md mb-8 p-5 my-0 mx-auto">
        {players.length === 1 && (
          <div className="my-5 flex justify-between">
            <span className="text-xl">Score</span>
            <span className="text-xl">{players[0].score}</span>
          </div>
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
              disabled={
                cards.filter((e) => e.flipped && !e.matched).length === 2 ||
                currentPlayer !== userId
              }
              handleClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-evenly gap-2">
        {players.length > 1 ? (
          <>
            {players.map((player) => (
              <div
                key={player.id}
                className={`${
                  currentPlayer === player.id
                    ? "bg-orange-500 text-white"
                    : "bg-slate-400 text-slate-800"
                } flex flex-col p-5 rounded-md basis-1/4`}
              >
                <span className="text-md mb-4">{player.name}</span>
                <span className="text-xl">{player.score}</span>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Game;
