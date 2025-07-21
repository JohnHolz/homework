import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createPoll } from '../src/services';

export default function CreatePoll() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [choices, setChoices] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createPoll({
        name,
        choices: choices.split(',').map((c) => c.trim()),
        description,
      });
      router.push('/');
    } catch (err) {
      setError('Erro ao criar poll.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Criar Nova Poll</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Choices (separadas por vírgula)"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={choices}
          onChange={(e) => setChoices(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Poll'}
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </div>
  );
}