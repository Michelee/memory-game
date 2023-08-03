"use client";

import { Button } from "./Button";
import { useRouter } from "next/navigation";

export const Home = () => {
  const router = useRouter();

  return (
    <div className="max-w-xs mx-auto my-8">
      <Button
        buttonId="join-game"
        label="Join game"
        onClick={() => router.push("/join-game")}
        classes="bg-orange-500 hover:bg-orange-700 text-white w-full mt-8"
      />
      <Button
        buttonId="host-game"
        label="Host game"
        onClick={() => router.push("/new-game")}
        classes="bg-blue-500 hover:bg-blue-700 text-white w-full mt-8"
      />
      <Button
        buttonId="play-alone"
        label="Play alone"
        onClick={() => router.push("/play-alone")}
        classes="bg-green-500 hover:bg-green-700 text-white w-full mt-8"
      />
    </div>
  );
};
