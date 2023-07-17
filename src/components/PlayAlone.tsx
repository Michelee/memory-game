"use client";

import { CardsProps, PlayersProps } from "@/utils/gameTypes";
import React, { use, useEffect, useState } from "react";

import CardComponent from "@/components/CardComponent";

interface PlayAloneProps {
  gameCards: CardsProps[];
}

const PlayAlone = ({ gameCards }: PlayAloneProps) => {
  const [cards, setCards] = useState<CardsProps[]>(gameCards);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newCards = [...cards];
    const flippedCards = newCards.filter(
      (card) => card.flipped && !card.matched
    );

    setTimeout(() => {
      if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.card === secondCard.card) {
          newCards.forEach((card) => {
            if (card.card === firstCard.card) {
              card.matched = true;
            }
          });
          setScore(score + 1);
        } else {
          newCards.forEach((card) => {
            if (card.flipped && !card.matched) {
              card.flipped = false;
            }
          });
        }
      }
      setCards(newCards);
    }, 1000);

  }, [cards, score]);

  const handleClick = (index: number) => {
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
  };

  return (
    <div className="flex flex-col max-w-screen-md mb-8 p-5 my-0 mx-auto">
      <div className="my-5 flex justify-between">
        <span className="text-xl">Score</span>
        <span className="text-xl">{score}</span>
      </div>

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
      </div>
    </div>
  );
};

export default PlayAlone;
