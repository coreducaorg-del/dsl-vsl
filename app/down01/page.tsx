"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

const CHECKOUT_URL = "https://pay.hub.la/AVB4X3lgxwWW2nouZgV8";

// Cronômetro começa em 11:00 (11 minutos) e conta regressivamente.
const CONTAGEM_INICIAL_SEGUNDOS = 11 * 60;

const PERGUNTAS_FREQUENTES = [
  {
    pergunta: "Por quanto tempo terei acesso?",
    resposta:
      "Você terá acesso ao acompanhamento por 1 ano completo — tempo mais que suficiente para assistir todas as aulas, praticar e atingir a fluência no coreano no seu próprio ritmo.",
  },
  {
    pergunta: "O que está incluso no acompanhamento?",
    resposta:
      "Acesso completo a todo o conteúdo: aulas gravadas (que você pode assistir quantas vezes quiser, no seu tempo) e também às aulas ao vivo, onde você pode tirar dúvidas e praticar em tempo real.",
  },
  {
    pergunta: "E se eu não gostar, posso pedir reembolso?",
    resposta:
      "Sim! Você tem 7 dias de garantia incondicional. Se por qualquer motivo sentir que não é para você, é só entrar em contato que devolvemos 100% do seu dinheiro, sem perguntas.",
  },
  {
    pergunta: "Esse valor é um pagamento único ou recorrente?",
    resposta:
      "É um pagamento único. Você paga uma vez (à vista ou parcelado) e tem acesso garantido pelos 12 meses, sem nenhuma cobrança recorrente ou mensalidade.",
  },
  {
    pergunta: "É confiável?",
    resposta:
      "Sim! O pagamento é processado por uma plataforma segura e reconhecida, seus dados são protegidos, e você ainda conta com 7 dias de garantia — ou seja, o risco é todo nosso, não seu.",
  },
];

function formatarTempo(totalSegundos: number): string {
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

// Cronômetro grande do topo — puramente apresentacional: o tempo vem de
// `Downsell01` via prop, para ficar sempre em sincronia com o mini
// cronômetro do card de preço (os dois leem o mesmo estado, nunca contam
// de forma independente).
function CronometroGrande({ segundosRestantes }: { segundosRestantes: number }) {
  return (
    <div className="mx-auto mt-6 w-fit rounded-2xl bg-[#1F2937] px-8 py-4 text-center shadow-md sm:px-10 sm:py-5">
      <p className="text-xs font-bold uppercase tracking-wide text-white/80">
        Oferta expira em
      </p>
      <p className="mt-1 text-5xl font-black tabular-nums text-white sm:text-6xl">
        {formatarTempo(segundosRestantes)}
      </p>
    </div>
  );
}

// Versão compacta do mesmo cronômetro, ao lado do aviso dentro do card de
// preço. Mesma fonte de verdade (prop), por isso nunca dessincroniza.
function MiniCronometro({ segundosRestantes }: { segundosRestantes: number }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-[#1F2937] px-3 py-1.5 text-sm font-black tabular-nums text-white sm:text-base">
      {formatarTempo(segundosRestantes)}
    </span>
  );
}

function FaqItem({
  pergunta,
  resposta,
  aberto,
  onToggle,
}: {
  pergunta: string;
  resposta: string;
  aberto: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-black sm:text-lg"
      >
        <span>{pergunta}</span>
        <span
          className={`shrink-0 text-xl text-[#DC2626] transition-transform duration-200 ${
            aberto ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {aberto && (
        <p className="pb-4 text-sm leading-relaxed text-gray-700 sm:text-base">
          {resposta}
        </p>
      )}
    </div>
  );
}

export default function Downsell01() {
  const [faqAbertoIndex, setFaqAbertoIndex] = useState<number | null>(null);

  // Estado do cronômetro vive aqui, no componente pai, e é passado como
  // prop para CronometroGrande e MiniCronometro — garante que os dois
  // sempre mostrem exatamente o mesmo valor, nunca dessincronizados.
  const [segundosRestantes, setSegundosRestantes] = useState(
    CONTAGEM_INICIAL_SEGUNDOS
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSegundosRestantes((atual) => {
        if (atual <= 1) {
          // Chegou em zero: limpa o interval e fica parado em 00:00 — não
          // esconde nada, não reinicia, não bloqueia o botão de compra.
          clearInterval(interval);
          return 0;
        }
        return atual - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex flex-1 flex-col items-center px-4 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-[640px]">
          {/* a) SELO SUPERIOR */}
          <div className="flex justify-center px-2">
            <span className="rounded-full border border-[#DC2626]/30 bg-[#DC2626]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#DC2626] sm:px-6 sm:py-2 sm:text-sm">
              ⏰ Meu último convite
            </span>
          </div>

          {/* b) HEADLINE PRINCIPAL */}
          <h1 className="mt-4 text-center text-2xl font-extrabold uppercase leading-tight text-black sm:text-3xl md:text-4xl">
            Essa é a sua última chance de entrar no acompanhamento com{" "}
            <span className="text-[#DC2626]">mais de 50% de desconto!</span>
          </h1>

          {/* c) CRONÔMETRO REGRESSIVO */}
          <CronometroGrande segundosRestantes={segundosRestantes} />

          {/* d) BLOCO DE EMPATIA */}
          <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700 sm:mt-8 sm:text-lg">
            <p>
              Eu sei que as coisas não andam fáceis,{" "}
              <strong className="font-bold text-black">
                e que o dinheiro é um problema
              </strong>{" "}
              (se não, você não estaria aqui).
            </p>
            <p>
              Por isso, somente aqui agora, vou te entregar o mesmo
              acompanhamento, porém com 1 ano de duração — tempo mais que
              suficiente para ver todas as aulas e atingir a fluência no
              coreano.
            </p>
          </div>

          {/* e) SEÇÃO DE GARANTIA — selo em imagem */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-7 text-center sm:mt-8 sm:px-8 sm:py-10">
            <Image
              src="/garantia-7-dias.png"
              alt="Selo de garantia incondicional de 7 dias"
              width={1080}
              height={1350}
              className="mx-auto h-auto w-[220px] sm:w-[280px] md:w-[320px]"
            />
            <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              Você não tem nada a perder. Teste por 7 dias e, se não for
              para você, devolvemos 100% do seu investimento.
            </p>
          </div>

          {/* f) SEÇÃO DE PREÇO — card destacado */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white px-5 py-7 text-center shadow-lg sm:mt-10 sm:px-10 sm:py-10">
            <span className="inline-block rounded-full border border-[#DC2626]/40 bg-[#DC2626]/10 px-4 py-1 text-xs font-bold uppercase tracking-wide text-[#DC2626]">
              Oferta especial
            </span>

            <p className="mt-5 text-lg text-gray-400 line-through sm:text-xl">
              De R$ 997
            </p>

            <div className="mt-3 leading-tight">
              <span className="block text-base font-medium text-gray-600 sm:text-lg">
                Por apenas
              </span>
              <span className="block break-words text-3xl font-black text-[#DC2626] sm:text-4xl md:text-5xl">
                12x de R$ 49,90
              </span>
              <span className="block text-base font-medium text-gray-600 sm:text-lg">
                ou R$ 497 à vista!
              </span>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <p className="text-sm font-medium text-gray-600 sm:text-base">
                ⏰ Somente enquanto o cronômetro nesta página estiver ativo!
              </p>
              <MiniCronometro segundosRestantes={segundosRestantes} />
            </div>
          </div>

          {/* g) BOTÃO DE CTA */}
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-6 block w-full max-w-md animate-[pulse-cta_2.2s_ease-in-out_infinite] rounded-[10px] bg-[#04a202] px-6 py-4 text-center text-base font-extrabold text-white no-underline shadow-md transition-colors hover:bg-[#00a30b] hover:text-white sm:px-8 sm:text-lg md:text-xl"
          >
            QUERO GARANTIR AGORA
          </a>

          {/* h) FAQ */}
          <div className="mt-10 sm:mt-12">
            <h2 className="text-center text-xl font-extrabold text-black sm:text-2xl">
              Perguntas Frequentes
            </h2>
            <div className="mt-4">
              {PERGUNTAS_FREQUENTES.map((item, index) => (
                <FaqItem
                  key={item.pergunta}
                  pergunta={item.pergunta}
                  resposta={item.resposta}
                  aberto={faqAbertoIndex === index}
                  onToggle={() =>
                    setFaqAbertoIndex(faqAbertoIndex === index ? null : index)
                  }
                />
              ))}
            </div>
          </div>

          {/* h.1) SEGUNDO BOTÃO DE CTA — após o FAQ */}
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-8 block w-full max-w-md animate-[pulse-cta_2.2s_ease-in-out_infinite] rounded-[10px] bg-[#04a202] px-6 py-4 text-center text-base font-extrabold text-white no-underline shadow-md transition-colors hover:bg-[#00a30b] hover:text-white sm:mt-10 sm:px-8 sm:text-lg md:text-xl"
          >
            QUERO GARANTIR AGORA
          </a>
        </div>
      </main>

      {/* i) RODAPÉ */}
      <Footer />
    </div>
  );
}
