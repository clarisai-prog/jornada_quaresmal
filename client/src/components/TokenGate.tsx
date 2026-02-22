import { useEffect, useState } from "react";
import { checkAccess, type AccessStatus } from "../lib/access";

interface TokenGateProps {
  children: React.ReactNode;
}

export function TokenGate({ children }: TokenGateProps) {
  // Em modo dev (localhost), pula a verificação de token para facilitar testes
  const isDev = import.meta.env.DEV;
  const [status, setStatus] = useState<AccessStatus>(isDev ? "granted" : "checking");

  useEffect(() => {
    if (!isDev) {
      checkAccess().then((result) => setStatus(result.status));
    }
  }, [isDev]);

  if (status === "checking") {
    return (
      <div className="gate-screen">
        <div className="gate-spinner" />
        <p>Verificando acesso…</p>
      </div>
    );
  }

  if (status === "granted") {
    return <>{children}</>;
  }

  // Bloqueado
  return (
    <div className="gate-screen gate-blocked">
      <div className="gate-cross">✝</div>
      <h1 className="gate-title">Acesso Restrito</h1>

      {status === "invalid_token" ? (
        <>
          <p className="gate-msg">
            Este link não é válido ou já expirou.
          </p>
          <p className="gate-hint">
            Verifique o e-mail de confirmação da sua compra
            e acesse pelo link original.
          </p>
        </>
      ) : (
        <>
          <p className="gate-msg">
            Esta é uma área exclusiva para compradores.
          </p>
          <p className="gate-hint">
            Acesse pelo link enviado no e-mail de confirmação
            da sua compra na Kiwify.
          </p>
        </>
      )}

      <a
        href="https://kiwify.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="gate-btn"
      >
        Adquirir Acesso
      </a>
    </div>
  );
}
