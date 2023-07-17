import { CardsProps } from "@/utils/gameTypes";
import PageLayout from "@/components/PageLayout";
import PlayAlone from "@/components/PlayAlone";
import React from "react";
import supabase from "@/utils/supabase";

const PlayAlonePage = async () => {
  const { data: cards } = await supabase
    .from("board")
    .select()
    .eq("type", "number")
    .like("board", `%4x4%`);

  return (
    <PageLayout>
      <PlayAlone gameCards={cards?.sort(() => Math.random() - 0.5) || []} />
    </PageLayout>
  );
};

export default PlayAlonePage;
