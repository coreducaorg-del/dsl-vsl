"use client";

import { useEffect, type IframeHTMLAttributes } from "react";

// `fetchPriority` é um atributo HTML válido e suportado pelos navegadores
// modernos, mas ainda não está tipado em React.IframeHTMLAttributes nesta
// versão do TypeScript/@types/react. Estendemos o tipo apenas aqui, só para
// o <iframe> do player, sem afetar a checagem de tipos do resto do arquivo.
type IframeProps = IframeHTMLAttributes<HTMLIFrameElement> & {
  fetchPriority?: "high" | "low" | "auto";
};

declare global {
  interface Window {
    pandascripttag?: Array<() => void>;
    PandaPlayer?: new (
      id: string,
      options: { onReady: () => void }
    ) => { loadWindowScreen: (opts: { panda_id_player: string }) => void };
  }
}

const PANDA_ID_PLAYER = "panda-c0dda076-875f-4304-befb-66af54fd5631";

export default function PandaPlayer() {
  useEffect(() => {
    // Injeção manual (em vez de next/script) porque o vídeo é o elemento
    // principal/herói da página: precisamos que o carregamento comece o
    // mais cedo possível, e strategy="beforeInteractive" do next/script só
    // tem esse efeito quando declarado no Root Layout — aqui, num Client
    // Component fora do layout raiz, ele é tratado como um script comum
    // (mesmo comportamento de afterInteractive), sem ganho nenhum.
    if (
      !document.querySelector(
        'script[src="https://player.pandavideo.com.br/api.v2.js"]'
      )
    ) {
      const s = document.createElement("script");
      s.src = "https://player.pandavideo.com.br/api.v2.js";
      s.async = true;
      document.head.appendChild(s);
    }

    window.pandascripttag = window.pandascripttag || [];
    window.pandascripttag.push(function () {
      const panda_id_player = PANDA_ID_PLAYER;
      const p = new window.PandaPlayer!(panda_id_player, {
        onReady() {
          p.loadWindowScreen({ panda_id_player });
        },
      });
    });
  }, []);

  const iframeProps: IframeProps = {
    id: PANDA_ID_PLAYER,
    src: "https://player-vz-52703098-ed8.tv.pandavideo.com.br/embed/?v=c0dda076-875f-4304-befb-66af54fd5631&iosFakeFullscreen=true",
    style: { border: "none", position: "absolute", top: 0, left: 0 },
    allow: "accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture",
    allowFullScreen: true,
    width: "100%",
    height: "100%",
    fetchPriority: "high",
  };

  return (
    <div style={{ position: "relative", paddingTop: "177.77777777777777%" }}>
      <iframe {...iframeProps} />
    </div>
  );
}
