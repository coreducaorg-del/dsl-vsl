"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Seletor do botão de CTA nativo da VTurb (confirmado via inspeção: fica
// no DOM normal, sem Shadow DOM). O elemento já existe desde o início —
// a VTurb não o cria/remove dinamicamente, apenas o renderiza com
// width/height 0 até o instante configurado no painel (ex: 6min57s).
const NATIVE_CTA_SELECTOR = "a.smartplayer-anchor-button";

// A VTurb não expõe nenhum evento público para "o CTA apareceu", e nem
// ResizeObserver nem MutationObserver (attributes/childList/subtree)
// capturam essa transição nesse player — testado e confirmado: o elemento
// muda de tamanho internamente sem disparar nenhum dos dois. Por isso o
// sinal confiável aqui é polling leve do tamanho renderizado real.
const POLL_INTERVAL_MS = 300;

type DownsellCtaButtonProps = {
  /** Id do elemento <vturb-smartplayer> cujo botão nativo deve ser observado. */
  playerId: string;
};

function estaVisivel(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

export default function DownsellCtaButton({ playerId }: DownsellCtaButtonProps) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let shown = false;
    let observedButton: Element | null = null;
    let pollId: ReturnType<typeof setInterval>;

    const mostrar = () => {
      if (shown || cancelled) return;
      shown = true;
      setVisivel(true);
      clearInterval(pollId);
    };

    const tentarLocalizarBotao = () => {
      if (observedButton) return;
      const player = document.getElementById(playerId);
      const nativeButton = player?.querySelector(NATIVE_CTA_SELECTOR);
      if (nativeButton) observedButton = nativeButton;
    };

    pollId = setInterval(() => {
      if (!observedButton) {
        tentarLocalizarBotao();
        return;
      }
      if (estaVisivel(observedButton)) {
        mostrar();
      }
    }, POLL_INTERVAL_MS);

    // Checagem imediata (sem esperar o primeiro tick) — cobre o caso de um
    // visitante retomando o vídeo já depois do ponto de exibição do CTA.
    tentarLocalizarBotao();
    if (observedButton && estaVisivel(observedButton)) {
      mostrar();
    }

    return () => {
      cancelled = true;
      clearInterval(pollId);
    };
  }, [playerId]);

  if (!visivel) return null;

  return (
    <Link
      href="/down01"
      className="mx-auto mt-3 block w-fit rounded-md bg-gray-400 px-4 py-2 text-center text-xs font-medium text-white no-underline shadow-sm transition-colors hover:bg-gray-500 sm:text-sm"
    >
      Agora não é melhor momento, vou passar
    </Link>
  );
}
