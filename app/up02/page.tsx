import Footer from "@/components/Footer";
import VturbPlayer from "@/components/VturbPlayer";

export default function Upsell02() {
  return (
    <>
      {/*
        Tags de otimização de performance fornecidas pela VTurb,
        específicas do vídeo desta página (id próprio, diferente da VSL
        principal e dos outros upsells). Renderizadas aqui — não no Root
        Layout — porque só fazem sentido nesta rota; o React/Next.js as
        movem (hoist) automaticamente para o <head> do documento onde quer
        que apareçam na árvore.
      */}
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`,
        }}
      />
      <link
        rel="preload"
        href="https://scripts.converteai.net/dda5cf5d-f047-4bf8-b030-7f12b60b4043/players/6afe72d992aee83660659bde/v4/player.js"
        as="script"
      />
      <link
        rel="preload"
        href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js"
        as="script"
      />
      <link
        rel="preload"
        href="https://cdn.converteai.net/dda5cf5d-f047-4bf8-b030-7f12b60b4043/6afe7230f9043a224ab9d681/main.m3u8"
        as="fetch"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <div className="flex min-h-screen flex-col bg-black">
        {/* 1. FAIXA VERMELHA FINA */}
        <div className="h-2 w-full bg-[#DC2626] sm:h-2.5" />

        <main className="flex flex-1 flex-col items-center px-4 py-10 sm:py-16">
          <div className="mx-auto w-full max-w-[480px]">
            {/* 2. HEADLINE */}
            <h1 className="text-center text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Assista a esse recado e resgate{" "}
              <u className="underline decoration-2 underline-offset-[6px]">
                seu prêmio
              </u>
              !
            </h1>

            {/* 3. VÍDEO */}
            <div className="relative mx-auto mt-5 w-full max-w-[420px] overflow-hidden rounded-lg">
              <VturbPlayer
                id="vid-6afe72d992aee83660659bde"
                scriptSrc="https://scripts.converteai.net/dda5cf5d-f047-4bf8-b030-7f12b60b4043/players/6afe72d992aee83660659bde/v4/player.js"
              />
            </div>
          </div>
        </main>

        {/* 4. RODAPÉ */}
        <Footer />
      </div>
    </>
  );
}
