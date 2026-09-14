"use client";

import { useEffect } from "react";

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

  return (
    <div style={{ position: "relative", paddingTop: "177.77777777777777%" }}>
      <iframe
        id={PANDA_ID_PLAYER}
        src="https://player-vz-52703098-ed8.tv.pandavideo.com.br/embed/?v=c0dda076-875f-4304-befb-66af54fd5631&iosFakeFullscreen=true"
        style={{ border: "none", position: "absolute", top: 0, left: 0 }}
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
        allowFullScreen
        width="100%"
        height="100%"
        fetchPriority="high"
      />
    </div>
  );
}
