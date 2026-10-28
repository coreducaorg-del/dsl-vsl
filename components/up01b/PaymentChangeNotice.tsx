"use client";

import { useEffect, useState } from "react";

const PAYMENT_CHANGE_URL = "https://hub.la/r/pDbqLy2G7a4TJTxkm2m2";

type PaymentChangeNoticeProps = {
  /** Controlado pelo DownsellCtaButton (mesmo gatilho do botão de recusa). */
  visible: boolean;
};

// Sempre montado no DOM (só escondido por CSS): o script da Utmify varre os
// links apenas no carregamento inicial, então o link precisa existir desde
// o primeiro render.
export default function PaymentChangeNotice({ visible }: PaymentChangeNoticeProps) {
  const [href, setHref] = useState(PAYMENT_CHANGE_URL);

  // Repassa os parâmetros da URL atual (UTMs) ao checkout.
  useEffect(() => {
    const search = window.location.search;
    if (search) setHref(`${PAYMENT_CHANGE_URL}${search}`);
  }, []);

  return (
    <section
      aria-label="Troca de método de pagamento"
      aria-hidden={!visible}
      className={`mx-auto mt-6 w-full max-w-[420px] rounded-3xl bg-[#1f1f1f] px-5 py-6 text-gray-300 sm:px-6 ${
        visible ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center gap-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-8 w-8 shrink-0 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2.5 4 5.5v6c0 4.7 3.2 8.6 8 10 4.8-1.4 8-5.3 8-10v-6l-8-3Z" />
          <path d="M12 8v5" />
          <circle cx="12" cy="16.2" r="0.6" fill="currentColor" />
        </svg>
        <h3 className="text-lg font-bold leading-snug text-gray-100">
          Precisa parcelar em mais vezes?
        </h3>
      </div>

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-300">
        <p>
          1) Se você pagou o produto anterior à vista no cartão (ou em poucas
          parcelas) e agora quer parcelar em mais vezes;
        </p>
        <p>2) Ou se agora quer pagar com 2 cartões;</p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-5 flex min-h-12 w-full max-w-xs items-center justify-center rounded-xl border-2 border-[#4ade80] bg-[#00bd1d] px-4 py-3 text-center text-sm font-bold leading-snug text-balance text-[#0b1f0b] no-underline transition hover:brightness-110 sm:text-base"
      >
        Desejo Trocar o Método de Pagamento
      </a>
    </section>
  );
}
