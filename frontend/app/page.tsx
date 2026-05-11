async function getTalks() {
  try {
    const response = await fetch('http://localhost:3000/talks', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar palestras');
    }

    return response.json();
  } catch (error) {
    console.log(error);

    return [];
  }
}

function groupTalksByDay(talks: any[]) {
  return talks.reduce((groups, talk) => {
    const date = new Date(talk.startTime)
      .toLocaleDateString('pt-BR');

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(talk);

    return groups;
  }, {} as Record<string, any[]>);
}

export default async function Home() {
  const talks = await getTalks();
  const groupedTalks = groupTalksByDay(talks);

  return (
    <main className="min-h-screen bg-white text-zinc-900">

      {/* NAVBAR */}
      <nav className="border-b border-zinc-200 backdrop-blur sticky top-0 bg-white/80 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-xl md:text-2xl font-black text-green-600">
              IFRN Tech
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-zinc-700">

            <a
              href="#home"
              className="hover:text-green-600 transition"
            >
              Home
            </a>

            <a
              href="#programacao"
              className="hover:text-green-600 transition"
            >
              Programação
            </a>

            <a
              href="#streaming"
              className="hover:text-green-600 transition"
            >
              Streaming
            </a>

          </div>

          <button className="bg-green-600 text-white px-4 md:px-5 py-2 rounded-xl font-bold hover:bg-green-500 transition text-sm md:text-base">
            Evento IFRN
          </button>

        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="px-4 md:px-8 py-20 border-b border-zinc-200"
      >
        <div className="max-w-6xl mx-auto">

          <p className="text-green-600 font-semibold mb-4">
            IFRN • Feira Tecnológica 2026
          </p>

          <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl">
            Plataforma Oficial do Evento Tecnológico IFRN
          </h1>

          <p className="text-zinc-600 text-base md:text-xl mt-6 max-w-2xl">
            Programação completa, palestras e transmissão ao vivo
            da Feira Tecnológica e Hackathon do IFRN.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-10">

            <a
              href="#programacao"
              className="bg-green-600 hover:bg-green-500 transition px-6 py-3 rounded-xl font-bold text-white text-center"
            >
              Ver Programação
            </a>

            <a
              href="#streaming"
              className="border border-zinc-300 px-6 py-3 rounded-xl text-center hover:border-green-500 hover:text-green-600 transition"
            >
              Assistir Streaming
            </a>

          </div>
        </div>
      </section>

      {/* PROGRAMAÇÃO */}
      <section
        id="programacao"
        className="px-4 md:px-8 py-20"
      >
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

            <h2 className="text-3xl md:text-4xl font-bold">
              Programação
            </h2>

            <span className="text-zinc-500">
              {talks.length} palestras cadastradas
            </span>

          </div>

          <div className="space-y-16">

            {Object.entries(groupedTalks).map(([day, talks]: any) => (

              <div key={day}>

                <div className="flex items-center gap-4 mb-8">

                  <div className="h-px bg-zinc-200 flex-1"></div>

                  <h3 className="text-xl md:text-2xl font-black text-green-600">
                    {day}
                  </h3>

                  <div className="h-px bg-zinc-200 flex-1"></div>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  {talks.map((talk: any) => (

                    <div
                      key={talk.id}
                      className="bg-zinc-100 border border-zinc-200 rounded-3xl p-6 md:p-8 hover:border-green-500 transition"
                    >

                      <div className="flex justify-between items-start gap-4">

                        <div>
                          <h3 className="text-xl md:text-2xl font-bold">
                            {talk.title}
                          </h3>

                          <p className="text-green-600 mt-2 font-medium">
                            {talk.speaker}
                          </p>
                        </div>

                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap">

                          {new Date(talk.startTime).toLocaleTimeString(
                            'pt-BR',
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}

                        </div>

                      </div>

                      <p className="text-zinc-600 mt-6 leading-relaxed">
                        {talk.description}
                      </p>

                      <div className="mt-8 flex items-center justify-between text-sm">

                        <span className="text-zinc-500">
                          {talk.location}
                        </span>

                        <span className="text-zinc-400">
                          IFRN Tech Event
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>
        </div>
      </section>

      {/* STREAMING */}
      <section
        id="streaming"
        className="px-4 md:px-8 py-20 border-t border-zinc-200"
      >
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

            <span className="text-red-500 font-bold tracking-wide">
              AO VIVO
            </span>

          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Transmissão do Evento
          </h2>

          <p className="text-zinc-600 mb-10 max-w-2xl">
            Acompanhe palestras, apresentações e o hackathon em tempo real
            através da transmissão oficial da Feira Tecnológica IFRN.
          </p>

          <div className="rounded-3xl overflow-hidden border border-zinc-200 shadow-lg">

            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/k22bvxqWsK0"
              title="Streaming IFRN"
              allowFullScreen
              loading="lazy"
            ></iframe>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 px-4 md:px-8 py-10 bg-zinc-50">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <h3 className="text-2xl font-black text-green-600">
              IFRN Tech
            </h3>

            <p className="text-zinc-500 mt-2">
              Plataforma oficial da Feira Tecnológica e Hackathon IFRN 2026.
            </p>

          </div>

          <div className="text-zinc-500 text-sm text-center md:text-right">

            <p>
              Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte
            </p>

            <p className="mt-2">
              © 2026 • Todos os direitos reservados
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}