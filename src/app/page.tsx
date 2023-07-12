import { Home } from "@/components/Home";

export default function MemoryGame() {
  return (
    <main className="flex flex-col max-w-screen-md min-h-screen p-5 my-24 mx-auto">
      <div className="text-left max-w-screen">
        <h1 className="text-2xl font-bold text-center">memory</h1>
        <Home />
      </div>
    </main>
  );
}
