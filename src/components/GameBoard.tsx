"use client";

import { CardsProps, PlayersProps } from "@/utils/gameTypes";
import React, { useEffect, useState } from "react";

import CardComponent from "@/components/CardComponent";
import Countdown from "./Countdown";
import { GameActionBar } from "./GameActionBar";
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
  const [seconds, setSeconds] = useState(30);

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

          setTimeout(async () => {
            const flippedCards = newCards.filter(
              (card) => card.flipped && !card.matched
            );

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
          setSeconds(payload.new.timer);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [boardId, cards, currentPlayer, userId]);

  const handleTimeOut = async () => {
    const { data } = await supabase
      .from("game")
      .select()
      .eq("boardId", boardId);

    const newPlayers: PlayersProps[] = data?.[0]?.players;
    const newCards: CardsProps[] = data?.[0]?.cards;
    let newCurrentPlayer = data?.[0]?.currentPlayer;

    const playerIndex = newPlayers.findIndex(
      (player) => player.id === newCurrentPlayer
    );

    newCurrentPlayer =
      playerIndex + 1 === newPlayers.length
        ? newPlayers[0].id
        : newPlayers[playerIndex + 1].id;

    newCards.forEach((card) => {
      if (card.flipped && !card.matched) {
        card.flipped = false;
      }
    });

    await supabase
      .from("game")
      .update({
        cards: newCards,
        players: newPlayers,
        currentPlayer: newCurrentPlayer,
        timer: 30,
      })
      .eq("boardId", boardId);

    setCards(newCards);
    setPlayers(newPlayers);
    setCurrentPlayer(newCurrentPlayer);
    setSeconds(30);
  };

  const handleCountdown = async (timer: number) => {
    await supabase
      .from("game")
      .update({
        timer,
      })
      .eq("boardId", boardId);
  };

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
      {players.length === 1 && <GameActionBar boardId={boardId} />}
      {players.length > 1 && (
        <Countdown
          seconds={seconds}
          handleCountdown={handleCountdown}
          setTimeOut={handleTimeOut}
        />
      )}
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
      <div className={`grid grid-row gap-4 md:grid-cols-${players.length}`}>
        {players.length > 1 ? (
          <>
            {players.map((player) => (
              <div
                key={player.id}
                className={`${
                  currentPlayer === player.id
                    ? "bg-orange-500 text-white"
                    : "bg-slate-400 text-slate-800"
                } flex justify-between align-center p-2 md:flex-col md:p-5 rounded-md`}
              >
                <span className="text-md md:mb-4">{player.name}</span>
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
