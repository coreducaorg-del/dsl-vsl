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
        {/* Tags de otimização de performance recomendadas pelo Panda Vídeo */}
        <link
          rel="preload"
          href="https://player-vz-52703098-ed8.tv.pandavideo.com.br/embed/css/plyr.css"
          as="style"
        />
        <link
          rel="preload"
          href="https://player-vz-52703098-ed8.tv.pandavideo.com.br/embed/css/styles.css"
          as="style"
        />
        <link
          rel="preload"
          href="https://player-vz-52703098-ed8.tv.pandavideo.com.br/embed/css/pb.css"
          as="style"
        />
        <link
          rel="preload"
          href="https://config.tv.pandavideo.com.br/vz-52703098-ed8/c0dda076-875f-4304-befb-66af54fd5631.json"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://config.tv.pandavideo.com.br/vz-52703098-ed8/config.json"
          as="fetch"
          crossOrigin="anonymous"
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
