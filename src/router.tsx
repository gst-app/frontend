import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SignupPage from "@/pages/SignupPage";
import GlobalErrorBoundary from "@/pages/GlobalErrorBoundary";
import { Outlet, createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth/signup", element: <SignupPage /> },
      { path: "auth/login", element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
