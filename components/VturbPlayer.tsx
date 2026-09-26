"use client";

import { useEffect, useState } from "react";

// <vturb-smartplayer> é um Web Component (Custom Element) da VTurb, não um
// elemento HTML nativo — o TypeScript/React não o reconhece por padrão.
// Com jsx: "react-jsx" (runtime automático), o namespace JSX usado pelo
// compilador vem do módulo "react" (reexportado por react/jsx-runtime), não
// mais de um `declare global` solto — por isso a forma correta de estender
// IntrinsicElements aqui é via `declare module "react"`.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        id?: string;
      };
    }
  }
}

// Tempo máximo (ms) de espera pelo spinner antes de escondê-lo de qualquer
// jeito — fallback de segurança caso o Custom Element nunca seja definido
// (ex.: bloqueio de script por adblock), para não girar pra sempre.
const LOADING_FALLBACK_MS = 8000;

type VturbPlayerProps = {
  /** Id do elemento <vturb-smartplayer> (varia por vídeo/oferta). */
  id: string;
  /** URL do script "player.js" específico deste vídeo, fornecida pelo
   *  painel da VTurb (varia por vídeo/oferta). */
  scriptSrc: string;
};

// Componente reutilizável: qualquer vídeo da VTurb usado no site (VSL
// principal, upsells futuros etc.) passa por aqui, cada um com seu próprio
// `id` e `scriptSrc` — evita duplicar este componente inteiro por vídeo.
export default function VturbPlayer({ id, scriptSrc }: VturbPlayerProps) {
  // Controla o spinner: começa visível, esconde assim que o navegador
  // registrar a classe do Web Component da VTurb (script carregado e
  // executado) — sinal nativo mais confiável de que o player está
  // assumindo o placeholder — ou, no pior caso, após o timeout de fallback.
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    // Mesma checagem usada no PandaPlayer: só injeta o script se ele ainda
    // não estiver na página, evitando duplicação em re-renderizações.
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      document.head.appendChild(s);
    }

    let cancelled = false;
    customElements.whenDefined("vturb-smartplayer").then(() => {
      if (!cancelled) setPlayerReady(true);
    });

    const fallback = setTimeout(() => setPlayerReady(true), LOADING_FALLBACK_MS);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [scriptSrc]);

  return (
    // Wrapper que NÓS controlamos (fora do <vturb-smartplayer>) para
    // sobrepor o spinner com segurança: a VTurb substitui o conteúdo interno
    // do Web Component assim que inicializa, e se o spinner estivesse
    // dentro dele, o React poderia tentar remover um nó que a VTurb já
    // apagou por fora, quebrando a reconciliação. Como sibling, o spinner
    // fica 100% sob controle do React, independente do que a VTurb faça
    // dentro do player.
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <vturb-smartplayer id={id} style={{ display: "block", width: "100%" }}>
        {/* Placeholder: reserva o espaço do vídeo (proporção 9:16) desde o
            primeiro render, evitando layout shift enquanto o player da
            VTurb carrega. */}
        <div
          className="vturb-player-placeholder"
          style={{
            position: "relative",
            width: "100%",
            padding: "177.77777777777777% 0 0",
            zIndex: 0,
            backgroundColor: "black",
          }}
        />
      </vturb-smartplayer>

      {/* Indicador de carregamento: em conexões lentas, sem isso a pessoa
          via só uma caixa preta parada enquanto os ~300KB do player da
          VTurb baixavam — o que pode levar a desistências antes do vídeo
          sequer aparecer. */}
      {!playerReady && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/25 border-t-white" />
        </div>
      )}
    </div>
  );
}
