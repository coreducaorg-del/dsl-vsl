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
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
