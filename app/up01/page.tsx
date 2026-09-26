import Footer from "@/components/Footer";
import VturbPlayer from "@/components/VturbPlayer";

// Texto do banner de urgência do topo — fácil de editar. A parte destacada
// ("quase completa") fica separada do resto pra poder ter um peso de fonte
// ainda mais forte que o restante da frase (que já é branco/negrito).
const BANNER_ANTES_DESTAQUE = "Sua compra está ";
const BANNER_DESTAQUE = "quase completa";
const BANNER_DEPOIS_DESTAQUE = "! Assista o vídeo abaixo para entender.";

// Texto menor, logo abaixo do banner — também fácil de editar.
const TEXTO_SECUNDARIO =
  "Não feche esta página! Se não, nunca mais verá ela de novo.";

// Percentual exibido na barra de progresso.
const PROGRESSO_PERCENTUAL = 78;

export default function Upsell01() {
  return (
    <>
      {/*
        Tags de otimização de performance fornecidas pela VTurb,
        específicas do vídeo desta página de upsell (id diferente do vídeo
        da VSL principal, que tem suas próprias tags em app/layout.tsx).
        Renderizadas aqui — não no Root Layout — porque só fazem sentido
        nesta rota; o React/Next.js as movem (hoist) automaticamente para
        o <head> do documento onde quer que apareçam na árvore.
      */}
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`,
        }}
      />
      <link
        rel="preload"
        href="https://scripts.converteai.net/dda5cf5d-f047-4bf8-b030-7f12b60b4043/players/6ab7bcae5f99ef73c248f9ef/v4/player.js"
        as="script"
      />
      <link
        rel="preload"
        href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js"
        as="script"
      />
      <link
        rel="preload"
        href="https://cdn.converteai.net/dda5cf5d-f047-4bf8-b030-7f12b60b4043/6ab7bc743874d0dcedf917cb/main.m3u8"
        as="fetch"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <div className="flex min-h-screen flex-col bg-white">
        <main className="flex flex-1 flex-col items-center px-4 py-10 sm:py-16">
          <div className="mx-auto w-full max-w-[480px]">
            {/* a) BANNER VERMELHO */}
            <div className="flex items-center gap-3 rounded-2xl bg-[#DC2626] px-5 py-4 sm:gap-4 sm:px-6 sm:py-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white sm:h-10 sm:w-10">
                <span className="text-lg font-extrabold text-[#DC2626] sm:text-xl">
                  !
                </span>
              </div>
              <p className="text-sm font-bold leading-snug text-white sm:text-base">
                {BANNER_ANTES_DESTAQUE}
                <span className="font-extrabold underline decoration-2 underline-offset-2">
                  {BANNER_DESTAQUE}
                </span>
                {BANNER_DEPOIS_DESTAQUE}
              </p>
            </div>

            {/* b) TEXTO SECUNDÁRIO */}
            <p className="mt-4 text-center text-sm font-medium text-gray-700 sm:text-base">
              {TEXTO_SECUNDARIO}
            </p>

            {/* c) BARRA DE PROGRESSO */}
            <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-gray-200 sm:h-5">
              <div
                className="flex h-full items-center justify-end rounded-full bg-[#DC2626] pr-2"
                style={{ width: `${PROGRESSO_PERCENTUAL}%` }}
              >
                <span className="text-[10px] font-bold text-white sm:text-xs">
                  {PROGRESSO_PERCENTUAL}%
                </span>
              </div>
            </div>

            {/* d) VÍDEO — embed real da VTurb para esta oferta de upsell.
                O botão de CTA já vem embutido, configurado direto no
                painel da VTurb — não precisa de botão customizado nesta
                página. */}
            <div className="relative mx-auto mt-8 w-full max-w-[420px] overflow-hidden rounded-lg sm:mt-10">
              <VturbPlayer
                id="vid-6ab7bcae5f99ef73c248f9ef"
                scriptSrc="https://scripts.converteai.net/dda5cf5d-f047-4bf8-b030-7f12b60b4043/players/6ab7bcae5f99ef73c248f9ef/v4/player.js"
              />
            </div>
          </div>
        </main>

        {/* e) RODAPÉ */}
        <Footer />
      </div>
    </>
  );
}
