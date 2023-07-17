"use client";

import React, { useEffect, useState } from "react";

import { Button } from "./Button";
import CardComponent from "@/components/CardComponent";
import { CardsProps } from "@/utils/gameTypes";
import { useRouter } from "next/navigation";

interface PlayAloneProps {
  gameCards: CardsProps[];
}

const PlayAlone = ({ gameCards }: PlayAloneProps) => {
  const [cards, setCards] = useState<CardsProps[]>(gameCards);
  const [score, setScore] = useState(0);

  const router = useRouter();

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
        setCards(newCards);
      }
    }, 1000);
  }, [cards, score]);

  const handleClick = (index: number) => {
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
  };

  const handleTryAgain = () => {
    const newCards = [...cards];
    newCards.forEach((card) => {
      card.flipped = false;
      card.matched = false;
    });
    setCards(newCards);
    setScore(0);
  };

  return (
    <div className="flex flex-col md:max-w-screen-md mb-8 p-5 my-0 mx-auto">
      {score === 8 ? (
        <div className="items-center flex flex-col my-10">
          <div className="text-2xl inline-block mx-auto my-10">You Win!</div>
          <div className="justify-between flex gap-4">
            <Button
              label="Try Again"
              onClick={handleTryAgain}
              classes="bg-green-500 px-4"
            />

            <Button
              label="Go Home"
              onClick={() => router.push("/")}
              classes="bg-orange-500 px-4"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="my-5 flex justify-between">
            <span className="text-xl">Score</span>
            <span className="text-xl">{score}</span>
          </div>
          <div
            className={`grid gap-4 md:gap-2 ${
              cards.length > 16 ? "grid-cols-6" : "grid-cols-4"
            }`}
          >
            {cards.map((props, index) => (
              <CardComponent
                classes={cards.length > 16 ? "h-12 w-12 md:h-16 md:w-16" : "h-16 w-16"}
                key={index}
                value={props.card}
                flipped={props.flipped}
                matched={props.matched}
                disabled={
                  cards.filter((e) => e.flipped && !e.matched).length === 2
                }
                handleClick={() => handleClick(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayAlone;
