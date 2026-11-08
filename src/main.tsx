import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "@/providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);

// Reload the page if there is a preload error. This can happen if the user has a stale service worker that has cached an old version of the app. The new version of the app will be loaded after the page is reloaded.
window.addEventListener("vite:preloadError", () => window.location.reload());
