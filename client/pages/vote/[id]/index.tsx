import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllPolls, votePoll } from '../../../src/services';

interface Poll {
  id: string | number;
  name: string;
  description?: string;
  choices: string[] | Record<string, any>;
}

export default function Vote() {
  const router = useRouter();
  const { id } = router.query;
  const [poll, setPoll] = useState<Poll | null>(null);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getAllPolls().then((polls) => {
        const found = polls.find((p: Poll) => String(p.id) === String(id));
        setPoll(found || null);
      });
    }
  }, [id]);

  const handleVote = async (choice: string) => {
    setLoading(true);
    const identifier = 'user@email.com';
    await votePoll(Number(id), { identifier, choice, poll_id: Number(id) });
    setVoted(true);
    setLoading(false);
  };

  if (!poll) return <div className="max-w-md mx-auto mt-10">Carregando...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">{poll.name}</h1>
      <p className="mb-6 text-gray-600">{poll.description}</p>
      <div className="flex flex-col gap-3">
        {Array.isArray(poll.choices)
          ? poll.choices.map((choice) => (
              <button
                key={choice}
                className="w-full py-3 px-4 border rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 transition"
                onClick={() => handleVote(choice)}
                disabled={voted || loading}
              >
                {choice}
              </button>
            ))
          : Object.values(poll.choices).map((choice) => (
              <button
                key={choice as string}
                className="w-full py-3 px-4 border rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 transition"
                onClick={() => handleVote(choice as string)}
                disabled={voted || loading}
              >
                {choice as string}
              </button>
            ))}
      </div>
      {voted && <div className="mt-6 text-green-600 font-bold text-center">Voto registrado!</div>}
    </div>
  );
}