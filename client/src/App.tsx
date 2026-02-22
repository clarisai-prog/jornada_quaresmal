import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Router } from "wouter";
import { TokenGate } from "./components/TokenGate";


// ─── Code Splitting ───────────────────────────────────────────────────────────
const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const DayView = lazy(() => import("./pages/DayView").then(m => ({ default: m.DayView })));
const InstallSheet = lazy(() =>
  import("./components/InstallSheet").then(m => ({ default: m.InstallSheet }))
);

// ─── Skeleton de carregamento ─────────────────────────────────────────────────
const PageSkeleton: React.FC = () => (
  <div
    style={{
      minHeight: "100dvh",
      background: "#F5F1E8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        border: "3px solid #E8E0D0",
        borderTopColor: "#8B7355",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ─── Service Worker ───────────────────────────────────────────────────────────
function registerSW() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", async () => {
    try {
      // ✅ FIX: path do SW deve incluir a base do GitHub Pages
      // import.meta.env.BASE_URL é preenchido automaticamente pelo Vite
      // com o valor de `base` no vite.config.ts → "/jornada-quaresmal-pwa-v5/"
      const swPath = `${import.meta.env.BASE_URL}service-worker.js`;
      const reg = await navigator.serviceWorker.register(swPath, {
        // scope garante que o SW só controla páginas dentro do repo
        scope: import.meta.env.BASE_URL,
      });
      console.log("[SW] Registrado:", reg.scope);

      // Verificar atualizações a cada 60 minutos
      setInterval(() => reg.update(), 60 * 60 * 1000);

      // Notificar quando nova versão estiver disponível
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            newWorker.postMessage({ type: "SKIP_WAITING" });
          }
        });
      });
    } catch (err) {
      console.warn("[SW] Falha ao registrar:", err);
    }
  });

  // Recarregar quando o SW assumir o controle (após atualização)
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    registerSW();
  }, []);

  return (
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <TokenGate>
        <Suspense fallback={<PageSkeleton />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/dia/:id" component={DayView} />
            <Route>
              <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <h2 style={{ fontFamily: "Playfair Display, serif" }}>Página não encontrada</h2>
                <a href={import.meta.env.BASE_URL} style={{ color: "#8B7355" }}>← Voltar ao início</a>
              </div>
            </Route>
          </Switch>
          <InstallSheet />
        </Suspense>
      </TokenGate>
    </Router>
  );
}

