import Footer from "@/components/Footer";

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

          {/* d) VÍDEO */}
          <div className="relative mx-auto mt-8 w-full max-w-[420px] overflow-hidden rounded-lg sm:mt-10">
            {/*
              EMBED DO VÍDEO (VTurb): substituir todo o bloco abaixo pelo
              embed real da VTurb configurado para esta oferta de upsell
              (o mesmo padrão do <vturb-smartplayer> usado em
              components/VturbPlayer.tsx, só que com o id do player desta
              oferta). O botão de CTA já vem embutido nesse embed,
              configurado direto no painel da VTurb — não é necessário
              criar nenhum botão customizado nesta página.
            */}
            <div
              className="flex flex-col items-center justify-center gap-4 px-6 text-center"
              style={{ aspectRatio: "9 / 16", backgroundColor: "#DC2626" }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
                <div
                  className="ml-1 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-[#DC2626]"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm font-semibold text-white sm:text-base">
                PLACEHOLDER DE VÍDEO — Substituir pelo embed da VTurb
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* e) RODAPÉ */}
      <Footer />
    </div>
  );
}
