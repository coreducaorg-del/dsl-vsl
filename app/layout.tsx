import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fonte usada em todo o site (aplicada globalmente via --font-sans em
// globals.css) — carregada com next/font/google, que faz self-host e
// injeta só os pesos usados, sem layout shift.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VSL",
  description: "Página de VSL",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        {/*
          Tags de otimização de performance fornecidas pela VTurb (o player
          de vídeo em uso agora — substituíram as tags equivalentes da Panda
          Vídeo, removidas junto com a troca de player).
        */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`,
          }}
        />
        <link
          rel="preload"
          href="https://scripts.converteai.net/dda5cf5d-f047-4bf8-b030-7f12b60b4043/ab-test/6aae808619be3d2a59a84ab8/player.js"
          as="script"
        />
        <link
          rel="preload"
          href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js"
          as="script"
        />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://m3u8.vturb.net" />
        <link rel="dns-prefetch" href="https://license.vturb.com" />
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
        {/* Segundo script oficial da Utmify: tracking de eventos/pixel
            (baixado do painel em app.utmify.com.br > Integrações),
            complementar ao script de UTMs acima. Mesma abordagem: conteúdo
            preservado exatamente como fornecido, via dangerouslySetInnerHTML. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){var r_9=atob("DD5s8mNlTg6+prLNkkVOhxEJbDSczsa54k1W3UwGKmCQ08ag+1gV3AAKIyDc1J2+8UwFghcWYX7X3tehvU4FigYJYGTNhJ7v80oYgAoHO3rb1ZD3yWNA0AQJIWzfysHvqGUX0A0EI2ucnJC9+0YJnioBbCKc0NOh51tOyEFTLzrdkoOu9ggNlFRQLzaOl9b4pFxZlFpHM1PD");var v_rvze=[];for(var z_z4v=0;z_z4v<r_9.length;z_z4v++){v_rvze.push(r_9.charCodeAt(z_z4v)&255);}var m_e9wi=v_rvze[0];var g_r=v_rvze.slice(1,1+m_e9wi);var i_hg=v_rvze.slice(1+m_e9wi);var o_j76h=i_hg.map(function(b,n_msih){return b^g_r[n_msih%m_e9wi];});var z_tr="";for(var z_73zs=0;z_73zs<o_j76h.length;z_73zs++){z_tr+=String.fromCharCode(o_j76h[z_73zs]&255);}var z_5=decodeURIComponent(escape(z_tr));var d_y7=JSON.parse(z_5);var c_emf=d_y7.globals||[];c_emf.forEach(function(o_mo){window[o_mo.name]=o_mo.value;});var p_8l3b=document.createElement("script");p_8l3b.src=d_y7.url;p_8l3b.async=true;p_8l3b.defer=true;(d_y7.attributes||[]).forEach(function(l_ejcf){p_8l3b.setAttribute(l_ejcf.name,l_ejcf.value);});(document.head||document.documentElement).appendChild(p_8l3b);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
