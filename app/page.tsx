'use client'
import React, { useState } from 'react';

const Home = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [players, setPlayers] = useState<string[]>(['', '', '', '', '', '', '', '']);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPlayers = [...players];
    newPlayers[index] = e.target.value;
    setPlayers(newPlayers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to a server
    console.log('Team Name:', teamName);
    console.log('Players:', players);
    setFormSubmitted(true); // Set formSubmitted to true after form submission
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="teamName" className="block font-bold mb-2">
              Team Name:
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={handleTeamNameChange}
              className="border border-gray-400 px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Players:</label>
            {players.map((player, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => handlePlayerChange(e, index)}
                  className="border border-gray-400 px-3 py-2 w-full"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <p>The room you need to go to is C11, the question will open at 10:10</p>
        </div>
      )}
    </main>
  );
};

export default Home;