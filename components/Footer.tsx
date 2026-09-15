export default function Footer() {
  return (
    <footer className="w-full bg-black px-4 py-8">
      <p className="text-center text-xs text-gray-400">
        REI DO COREANO © TODOS OS DIREITOS RESERVADOS
      </p>

      <div className="mx-auto mt-4 flex w-full max-w-4xl flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <span className="text-base font-bold text-white">REI DO COREANO</span>

        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-white hover:underline">
            TERMOS DE USO
          </a>
          <a href="#" className="text-sm text-white hover:underline">
            POLÍTICA DE PRIVACIDADE
          </a>
        </div>
      </div>
    </footer>
  );
}
