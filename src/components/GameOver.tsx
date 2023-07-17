import { PlayersProps } from "@/utils/gameTypes";

interface GameOverProps {
  playersList: PlayersProps[];
}

export const GameOver = ({ playersList }: GameOverProps) => {
  const players = playersList.sort((a, b) => b.score - a.score);
  const winner = players[0].name;
  const isTied = players[0].score === players[1].score;

  return (
    <div className="my-24 mx-auto text-center">
      <span className="text-4xl mb-12 block capitalize">
        {isTied ? "It's a tie!" : `${winner} Wins!`}
      </span>
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`text-xl flex justify-between items-center my-4 p-4 rounded-md capitalize ${
            index === 0 && !isTied ? "bg-green-500" : ""
          }`}
        >
          <span>
            {player.name}
          </span>
          {player.score} {player.score > 1 ? "pairs" : "pair"}
        </div>
      ))}
    </div>
  );
};
