import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "@/providers.tsx";

// Reload the page if a lazy page's chunk can't be fetched (usually after a new deploy). Only do this if the user is online, otherwise show the offline page.
window.addEventListener("vite:preloadError", () => {
  if (navigator.onLine) window.location.reload();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
