import { CardsProps } from "@/utils/gameTypes";
import PlayAlone from "@/components/PlayAlone";
import React from "react";
import { cookies } from "next/headers";
import supabase from "@/utils/supabase";

const PlayAlonePage = async ({ params }: { params: { code: string } }) => {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value || "";

  const { data: cards } = await supabase
    .from("board")
    .select()
    .eq("type", "number")
    .like("board", `%4x4%`);

  return (
    <main className="flex flex-col max-w-screen-md min-h-screen p-5 my-0 mx-auto relative">
      <div className="text-left max-w-screen">
        <h1 className="text-2xl font-bold">memory</h1>
      </div>
      <div className="grid">
        <PlayAlone gameCards={cards?.sort(() => Math.random() - 0.5) || []} />
      </div>
    </main>
  );
};

export default PlayAlonePage;
