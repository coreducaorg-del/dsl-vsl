import type { Metadata } from "next";
import VturbPlayer from "@/components/VturbPlayer";
import Footer from "@/components/Footer";

// Página não deve ser cacheada como estática: a data no topo precisa
// refletir o dia em que o visitante está acessando, não o dia do build.
export const dynamic = "force-dynamic";

// Metadados específicos da página principal (sobrescrevem os genéricos do
// Root Layout só nesta rota) — controlam como o link aparece ao ser
// compartilhado no Facebook, WhatsApp, Instagram etc. Sem og:image por
// enquanto, já que não há uma imagem definida para isso.
export const metadata: Metadata = {
  title: "Método Revelado",
  description: "Último dia pra ver a aula",
  openGraph: {
    title: "Método Revelado",
    description: "Último dia pra ver a aula",
  },
};

function getDataAtualFormatada(): string {
  const hoje = new Date();

  // Calcula sempre no fuso de São Paulo, independente do fuso do servidor
  // (a Vercel roda em UTC) — sem isso, entre ~21h e 23h59 no horário de
  // Brasília o relógio UTC já virou o dia seguinte, e a data exibida ficava
  // um dia à frente do real. Intl.DateTimeFormat nativo, sem libs externas.
  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(hoje);

  const dia = partes.find((p) => p.type === "day")?.value ?? "";
  const mes = partes.find((p) => p.type === "month")?.value ?? "";
  const ano = partes.find((p) => p.type === "year")?.value ?? "";

  return `${dia}/${mes}/${ano}`;
}

export default function Home() {
  const dataAtual = getDataAtualFormatada();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. BARRA DE URGÊNCIA */}
      <header className="w-full bg-[#DC2626] py-4 px-4 sm:py-5">
        <p className="text-center text-lg font-bold text-white sm:text-xl">
          ⚠️ ESSE VÍDEO SAI DO AR HOJE, {dataAtual}
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
