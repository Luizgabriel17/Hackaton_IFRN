'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');

  const [talks, setTalks] = useState<any[]>([]);

  async function loadTalks() {
    const response = await fetch('http://localhost:3000/talks');

    const data = await response.json();

    setTalks(data);
  }

  useEffect(() => {
    loadTalks();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch('http://localhost:3000/talks', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        title,
        speaker,
        description,
        location,
        startTime: new Date(startTime).toISOString(),
      }),
    });

    setTitle('');
    setSpeaker('');
    setDescription('');
    setLocation('');
    setStartTime('');

    loadTalks();
  }

  async function handleDelete(id: number) {
    await fetch(`http://localhost:3000/talks/${id}`, {
      method: 'DELETE',
    });

    loadTalks();
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-black mb-10">
          Painel Administrativo
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* FORMULÁRIO */}
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6"
          >

            <h2 className="text-2xl font-bold mb-6">
              Nova Palestra
            </h2>

            <div>
              <label className="block mb-2">
                Título
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-800 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2">
                Palestrante
              </label>

              <input
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full bg-zinc-800 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2">
                Descrição
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-800 rounded-xl p-4 h-32"
              />
            </div>

            <div>
              <label className="block mb-2">
                Local
              </label>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-zinc-800 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2">
                Horário
              </label>

              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-zinc-800 rounded-xl p-4"
              />
            </div>

            <button
              className="bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold px-6 py-4 rounded-xl w-full"
            >
              Cadastrar Palestra
            </button>

          </form>

          {/* LISTAGEM */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-8">
              Palestras Cadastradas
            </h2>

            <div className="space-y-4">

              {talks.map((talk) => (

                <div
                  key={talk.id}
                  className="border border-zinc-800 rounded-2xl p-5"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-xl font-bold">
                        {talk.title}
                      </h3>

                      <p className="text-cyan-400 mt-1">
                        {talk.speaker}
                      </p>

                      <p className="text-zinc-500 text-sm mt-3">
                        {new Date(talk.startTime).toLocaleString('pt-BR')}
                      </p>

                    </div>

                    <button
                      onClick={() => handleDelete(talk.id)}
                      className="bg-red-500 hover:bg-red-400 transition px-4 py-2 rounded-xl text-sm font-bold"
                    >
                      Excluir
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}