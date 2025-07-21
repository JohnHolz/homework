import React, { useEffect, useState } from 'react';
import { getAllPolls, getPollResult } from '../src/services';
import { useRouter } from 'next/router';

interface Poll {
  id: string | number;
  name: string;
  description?: string;
  choices: string[] | Record<string, any>;
}

export default function Home() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [results, setResults] = useState<Record<string, Record<string, number>>>({});
  const router = useRouter();

  useEffect(() => {
    getAllPolls().then(async (polls) => {
      setPolls(polls);
      // Busca resultados para cada poll
      const resObj: Record<string, Record<string, number>> = {};
      for (const poll of polls) {
        const res = await getPollResult(Number(poll.id));
        resObj[poll.id] = res || {};
      }
      setResults(resObj);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center">Voting</h1>
      </header>
      <div className="mb-4 text-right">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600"
          onClick={() => router.push('/create')}
        >
          Create New Poll
        </button>
      </div>
      <ul className="space-y-4">
        {polls.length === 0 && <li>Nenhuma poll encontrada.</li>}
        {polls.map((poll) => (
          <li key={poll.id} className="border rounded-lg p-5 bg-white shadow-lg flex flex-col gap-2">
            <button
              className="w-full text-left"
              onClick={() => router.push(`/vote/${poll.id}`)}
            >
              <div className="font-bold text-lg mb-1">{poll.name}</div>
              <div className="text-sm text-gray-600 mb-2">{poll.description}</div>
              <div className="text-xs mb-2">Opções: {Array.isArray(poll.choices) ? poll.choices.join(', ') : JSON.stringify(poll.choices)}</div>
            </button>
            <div className="mt-2">
              <span className="font-semibold text-gray-700">Resultados:</span>
              <ul className="ml-2">
                {results[poll.id] && Object.entries(results[poll.id]).map(([choice, count]) => (
                  <li key={choice} className="text-xs text-gray-800">{choice}: {count}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}