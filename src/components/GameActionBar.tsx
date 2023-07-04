import React from 'react';

export const GameActionBar = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Memory</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {}}
      >
        New Game
      </button>
    </div>
  );
}
