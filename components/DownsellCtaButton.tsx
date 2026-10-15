"use client";

import { useCallback, useEffect, useState } from "react";
import DownsellModal from "@/components/DownsellModal";

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
  const [modalAberto, setModalAberto] = useState(false);
  const [corCta, setCorCta] = useState<string | undefined>(undefined);
  const fecharModal = useCallback(() => setModalAberto(false), []);

  useEffect(() => {
    let cancelled = false;
    let shown = false;
    let observedButton: Element | null = null;
    let pollId: ReturnType<typeof setInterval>;

    // O botão principal do modal usa a mesma cor do CTA nativo. Lida quando
    // o botão nativo fica visível (CSS da VTurb já aplicado); antes disso o
    // background-color computado pode ainda estar transparente.
    const lerCorDoBotaoNativo = (el: Element) => {
      const cor = getComputedStyle(el).backgroundColor;
      if (cor && cor !== "transparent" && cor !== "rgba(0, 0, 0, 0)") {
        setCorCta(cor);
      }
    };

    const mostrar = () => {
      if (shown || cancelled) return;
      shown = true;
      if (observedButton) lerCorDoBotaoNativo(observedButton);
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

  return (
    <>
      {visivel && (
        <button
          type="button"
          onClick={() => setModalAberto(true)}
          className="mx-auto mt-3 block w-fit cursor-pointer rounded-md bg-gray-400 px-4 py-2 text-center text-xs font-medium text-white shadow-sm transition-colors hover:bg-gray-500 sm:text-sm"
        >
          Agora não é melhor momento, vou passar
        </button>
      )}

      {/* Sempre montado (só escondido por CSS) — ver DownsellModal. */}
      <DownsellModal
        open={modalAberto}
        onClose={fecharModal}
        corBotao={corCta}
      />
    </>
  );
}
