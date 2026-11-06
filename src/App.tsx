import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "@/router";
import { OuterErrorBoundary } from "@/pages/GlobalErrorBoundary";
import { useEffect } from "react";
import { initializeAuth } from "@/features/auth/api/initialize-auth";
import { API_CONFIGURATION_ERROR } from "@/lib/api-client";

function App() {
  useEffect(() => {
    if (!API_CONFIGURATION_ERROR) void initializeAuth();
  }, []);
  if (API_CONFIGURATION_ERROR)
    return (
      <main className="flex min-h-dvh items-center justify-center p-6">
        <p role="alert">{API_CONFIGURATION_ERROR}</p>
      </main>
    );
  return (
    <OuterErrorBoundary>
      <RouterProvider router={router} />
    </OuterErrorBoundary>
  );
}

export default App;
