export default function Loading() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 flex items-center justify-center">

      <div className="text-center">

        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

        <h1 className="text-2xl font-bold">
          Carregando programação...
        </h1>

        <p className="text-zinc-500 mt-3">
          Aguarde enquanto conectamos ao servidor do evento.
        </p>

      </div>

    </main>
  );
}