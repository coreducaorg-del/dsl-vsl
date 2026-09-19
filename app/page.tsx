import VturbPlayer from "@/components/VturbPlayer";
import Footer from "@/components/Footer";

// Página não deve ser cacheada como estática: a data no topo precisa
// refletir o dia em que o visitante está acessando, não o dia do build.
export const dynamic = "force-dynamic";

function getDataAtualFormatada(): string {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export default function Home() {
  const dataAtual = getDataAtualFormatada();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. BARRA DE URGÊNCIA */}
      <header className="w-full bg-black py-4 px-4 sm:py-5">
        <p className="text-center text-lg font-bold text-white sm:text-xl">
          ESSE VÍDEO SAI DO AR HOJE, {dataAtual}
        </p>
      </header>

      {/* 2. ÁREA DO VÍDEO */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 sm:py-24">
        <div className="relative mx-auto w-full max-w-[420px] overflow-hidden">
          <VturbPlayer />
        </div>
      </main>

      {/* 3. RODAPÉ */}
      <Footer />
    </div>
  );
}
