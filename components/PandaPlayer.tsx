"use client";

import { useEffect, useState, type IframeHTMLAttributes } from "react";

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
    ) => {
      loadWindowScreen: (opts: { panda_id_player: string }) => void;
      setParentWindowUrl: () => void;
      // Tempo atual de reprodução (segundos), mantido atualizado pelo
      // próprio player via postMessage vindo do iframe — não precisa ser
      // lido através de um getter, já vem pronto na instância.
      currentTime: number;
      // Registra um callback que dispara a cada mensagem recebida do
      // player (inclui um tipo "panda_timeupdate", várias vezes por
      // segundo durante a reprodução). Não existe "unsubscribe" na API.
      onEvent: (callback: (event?: { message?: string }) => void) => void;
    };
  }
}

const PANDA_ID_PLAYER = "panda-c0dda076-875f-4304-befb-66af54fd5631";

// Tempo (em segundos) em que o botão de CTA deve aparecer. Fácil de editar:
// basta trocar os minutos/segundos abaixo.
const TEMPO_APARECER_BOTAO_SEGUNDOS = 16 * 60 + 53; // 16min53s - Lead 1

// Link de checkout (Hubla) para onde o botão de CTA leva — o mesmo destino
// final que o botão antigo, gerado pela Panda, já usava.
const CHECKOUT_URL = "https://pay.hub.la/FntcbJmXLnmlDkO73ZaB";

export default function PandaPlayer() {
  // Começa oculto; muda para true quando o vídeo atinge o tempo configurado.
  const [showCtaButton, setShowCtaButton] = useState(false);

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
          p.setParentWindowUrl();

          // Monitora o tempo de reprodução continuamente: o player chama
          // esse callback a cada mensagem recebida do iframe (várias vezes
          // por segundo enquanto o vídeo está tocando; nenhuma mensagem
          // chega enquanto está pausado, então o botão só aparece com
          // reprodução de fato). `p.currentTime` já vem atualizado quando
          // o callback dispara.
          p.onEvent(() => {
            if (p.currentTime >= TEMPO_APARECER_BOTAO_SEGUNDOS) {
              setShowCtaButton(true);
            }
          });
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
    <>
      <div style={{ position: "relative", paddingTop: "177.77777777777777%" }}>
        <iframe {...iframeProps} />
      </div>
      {/* Botão de CTA próprio (não mais injetado pela Panda via
          loadButtonInTime): fica presente no HTML desde o carregamento da
          página — para que o script de UTM da Utmify, que só varre o DOM
          uma vez no load inicial, consiga adicionar os parâmetros de UTM
          ao href — mas visualmente oculto (display: none) até o vídeo
          atingir TEMPO_APARECER_BOTAO_SEGUNDOS. Estilo replicado do botão
          antigo gerado pela Panda: fundo/hover verdes, texto branco
          negrito, cantos arredondados, com os mesmos breakpoints
          responsivos de padding/fonte. */}
      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: showCtaButton ? "flex" : "none", marginTop: 24 }}
        className="mx-auto w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-[10px] bg-[#04a202] px-[58px] py-[19px] text-[19px] font-bold text-white no-underline hover:bg-[#00a30b] hover:text-white max-[700px]:px-[40px] max-[700px]:py-[12px] max-[700px]:text-[16px] max-[400px]:px-[18px] max-[400px]:py-[9px] max-[400px]:text-[12px]"
      >
        Quero falar coreano
      </a>
    </>
  );
}
