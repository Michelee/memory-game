"use client";

import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Home = () => {
  const [showJoinComponent, setShowJoinComponent] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="max-w-xs mx-auto my-8">
      {
        <>
          {showJoinComponent ? (
            <div>asdasd</div>
          ) : (
            <>
              <Button
                label="Join game"
                onClick={() => setShowJoinComponent(true)}
                classes="bg-orange-500 hover:bg-orange-700 text-white w-full mt-8"
              />
              <Button
                label="Host game"
                onClick={() => router.push("/new-game")}
                classes="bg-blue-500 hover:bg-blue-700 text-white w-full mt-8"
              />
              <Button
                label="Play alone"
                onClick={() => router.push("/game    ")}
                classes="bg-green-500 hover:bg-green-700 text-white w-full mt-8"
              />
            </>
          )}
        </>
      }
    </div>
  );
};
