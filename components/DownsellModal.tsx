"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CHECKOUT_URL = "https://pay.hub.la/L6tGmnOPKY3P3mzgptq2";
const COR_BOTAO_PADRAO = "#04a202";

type DownsellModalProps = {
  open: boolean;
  onClose: () => void;
  /** Cor de fundo do botão principal (lida do CTA nativo da VTurb). */
  corBotao?: string;
};

// O modal fica SEMPRE montado no DOM (só escondido por CSS): o script da
// Utmify varre os links apenas no carregamento inicial, então o link de
// checkout e o link de recusa precisam existir desde o primeiro render.
export default function DownsellModal({
  open,
  onClose,
  corBotao = COR_BOTAO_PADRAO,
}: DownsellModalProps) {
  const [checkoutHref, setCheckoutHref] = useState(CHECKOUT_URL);
  const painelRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  // Repassa os parâmetros da URL atual (UTMs) ao checkout.
  useEffect(() => {
    const search = window.location.search;
    if (search) setCheckoutHref(`${CHECKOUT_URL}${search}`);
  }, []);

  useEffect(() => {
    if (!open) return;

    const focoAnterior = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const larguraScrollbar =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (larguraScrollbar > 0) {
      document.body.style.paddingRight = `${larguraScrollbar}px`;
    }
    // Adiado: no primeiro frame o overlay ainda está visibility:hidden
    // (início da transição) e o browser recusaria o foco.
    const focoId = setTimeout(() => fecharRef.current?.focus(), 50);

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focaveis = painelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button"
      );
      if (!focaveis || focaveis.length === 0) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);

    return () => {
      clearTimeout(focoId);
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      focoAnterior?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="downsell-modal-titulo"
        className={`relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white px-5 pb-6 pt-14 shadow-2xl transition-transform duration-200 motion-reduce:transition-none sm:px-8 ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        <button
          ref={fecharRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar pop-up e continuar na página"
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-3xl leading-none text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <h2
          id="downsell-modal-titulo"
          className="text-center text-lg font-bold leading-snug text-black sm:text-xl"
        >
          Espere! Você precisa confirmar que está desistindo para sempre da
          oportunidade de entrar no meu acompanhamento Dominando o Coreano de 2
          anos pelo menor preço já feito até agora: apenas 12x de R$69,90.. uma
          economia de R$300 em relação ao valor original.
        </h2>

        <Link
          href="/down01"
          className="mt-5 block min-h-11 w-full rounded-[10px] border-2 border-[#9CA3AF] bg-white px-6 py-3 text-center text-[15px] font-normal leading-snug text-balance text-gray-600 no-underline transition-colors hover:bg-gray-50 sm:text-base"
        >
          Confirmo que estou desistindo do desconto
        </Link>

        <a
          href={checkoutHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: corBotao }}
          className="mt-3 block w-full rounded-[10px] px-6 py-4 text-center text-lg font-extrabold text-white no-underline shadow-md transition hover:brightness-110 sm:text-xl"
        >
          Adicionar ao Carrinho
        </a>
      </div>
    </div>
  );
}
