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
    const response = await fetch(
      'https://hackaton-ifrn.onrender.com/talks'
    );

    const data = await response.json();

    setTalks(data);
  }

  useEffect(() => {
    loadTalks();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch(
      'https://hackaton-ifrn.onrender.com/talks',
      {
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
      }
    );

    setTitle('');
    setSpeaker('');
    setDescription('');
    setLocation('');
    setStartTime('');

    loadTalks();
  }

  async function handleDelete(id: number) {
    await fetch(
      `https://hackaton-ifrn.onrender.com/talks/${id}`,
      {
        method: 'DELETE',
      }
    );

    loadTalks();
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">

      {/* NAVBAR */}
      <nav className="border-b border-zinc-200 backdrop-blur sticky top-0 bg-white/80 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-xl md:text-2xl font-black text-green-600">
              IFRN Tech Admin
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-zinc-700">

            <a
              href="/"
              className="hover:text-green-600 transition"
            >
              Página Inicial
            </a>

            <a
              href="/admin"
              className="hover:text-green-600 transition"
            >
              Painel
            </a>

          </div>

          <div className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold">
            Administração
          </div>

        </div>
      </nav>

      {/* CONTEÚDO */}
      <section className="px-4 md:px-8 py-16">

        <div className="max-w-6xl mx-auto">

          <div className="mb-12">

            <p className="text-green-600 font-semibold mb-3">
              Painel Administrativo
            </p>

            <h1 className="text-4xl md:text-5xl font-black">
              Gerenciamento de Palestras
            </h1>

            <p className="text-zinc-600 mt-4 max-w-2xl">
              Cadastre, visualize e remova palestras da programação
              oficial da Feira Tecnológica IFRN.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* FORMULÁRIO */}
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-100 border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm"
            >

              <h2 className="text-2xl font-bold mb-8">
                Nova Palestra
              </h2>

              <div className="space-y-6">

                <div>

                  <label className="block mb-2 font-medium text-zinc-700">
                    Título
                  </label>

                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl p-4 outline-none focus:border-green-500 transition"
                    placeholder="Digite o título da palestra"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium text-zinc-700">
                    Palestrante
                  </label>

                  <input
                    value={speaker}
                    onChange={(e) => setSpeaker(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl p-4 outline-none focus:border-green-500 transition"
                    placeholder="Nome do palestrante"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium text-zinc-700">
                    Descrição
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl p-4 h-32 outline-none focus:border-green-500 transition"
                    placeholder="Descrição da palestra"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium text-zinc-700">
                    Local
                  </label>

                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl p-4 outline-none focus:border-green-500 transition"
                    placeholder="Ex: Auditório Principal"
                  />

                </div>

                <div>

                  <label className="block mb-2 font-medium text-zinc-700">
                    Horário
                  </label>

                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl p-4 outline-none focus:border-green-500 transition"
                  />

                </div>

                <button
                  className="bg-green-600 hover:bg-green-500 transition text-white font-bold px-6 py-4 rounded-xl w-full"
                >
                  Cadastrar Palestra
                </button>

              </div>

            </form>

            {/* LISTAGEM */}
            <div className="bg-zinc-100 border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-2xl font-bold">
                  Palestras Cadastradas
                </h2>

                <span className="text-zinc-500 text-sm">
                  {talks.length} cadastradas
                </span>

              </div>

              <div className="space-y-4">

                {talks.map((talk) => (

                  <div
                    key={talk.id}
                    className="bg-white border border-zinc-200 rounded-2xl p-5 hover:border-green-500 transition"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-xl font-bold">
                          {talk.title}
                        </h3>

                        <p className="text-green-600 mt-1 font-medium">
                          {talk.speaker}
                        </p>

                        <p className="text-zinc-500 text-sm mt-3">
                          {new Date(
                            talk.startTime
                          ).toLocaleString('pt-BR')}
                        </p>

                        <p className="text-zinc-600 mt-3 text-sm">
                          {talk.location}
                        </p>

                      </div>

                      <button
                        onClick={() => handleDelete(talk.id)}
                        className="bg-red-500 hover:bg-red-400 transition text-white px-4 py-2 rounded-xl text-sm font-bold"
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

      </section>

    </main>
  );
}