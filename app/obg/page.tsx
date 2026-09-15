import Footer from "@/components/Footer";

export default function Obrigado() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Conteúdo principal: sem barra de urgência, sem vídeo — layout
          simples, centralizado vertical e horizontalmente. */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto w-full max-w-[640px] text-center">
          {/* Pequeno traço de destaque em verde, acima do título — o
              "toque de cor" que quebra o preto e branco da página. */}
          <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-[#04a202]" />

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl">
            🎉 Parabéns, sua compra foi{" "}
            <span className="text-[#04a202]">confirmada</span>!
          </h1>

          <p className="mt-5 text-xl font-semibold leading-relaxed text-gray-700 sm:text-2xl">
            Você acaba de dar o primeiro passo pra falar coreano de verdade.
          </p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            <p>
              Enviamos o acesso à sua Área de Membros para o e-mail
              cadastrado na compra. O título do e-mail é &ldquo;Área de
              Membros&rdquo;.
            </p>
            <p>
              Verifique sua caixa de entrada (e também a pasta de spam ou
              promoções, só por garantia).
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-6 text-left shadow-sm sm:px-8 sm:py-7">
            <p className="text-lg font-bold text-black">
              ⚠️ Não encontrou o e-mail?
            </p>
            <p className="mt-2 leading-relaxed text-gray-700">
              Ele pode levar até alguns minutos para chegar. Se após 15
              minutos ele não aparecer, entre em contato com nosso suporte
              pelo{" "}
              {/* Texto simples, sem link de WhatsApp/telefone. */}
              <span className="font-semibold text-black">11957228762</span>.
            </p>
          </div>

          <p className="mt-12 text-xl font-bold leading-relaxed text-black sm:text-2xl">
            Que seja o começo de uma jornada de sucesso no coreano!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
