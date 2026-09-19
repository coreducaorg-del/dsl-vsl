"use client";

import { useEffect } from "react";

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

const VTURB_SCRIPT_SRC =
  "https://scripts.converteai.net/dda5cf5d-f047-4bf8-b030-7f12b60b4043/ab-test/6aae808619be3d2a59a84ab8/player.js";

export default function VturbPlayer() {
  useEffect(() => {
    // Mesma checagem usada no PandaPlayer: só injeta o script se ele ainda
    // não estiver na página, evitando duplicação em re-renderizações.
    if (!document.querySelector(`script[src="${VTURB_SCRIPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = VTURB_SCRIPT_SRC;
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <vturb-smartplayer
      id="ab-6aae808619be3d2a59a84ab8"
      style={{ display: "block", margin: "0 auto", width: "100%" }}
    />
  );
}
