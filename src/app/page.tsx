import { NewGame } from "@/components/NewGame";

export default function Home() {
  return (
    <main className="flex flex-col max-w-screen-md min-h-screen p-5 my-0 mx-auto">
      <div className="text-left max-w-screen">
        <h1 className="text-2xl font-bold">memory</h1>
      </div>
      <NewGame />
    </main>
  );
}
