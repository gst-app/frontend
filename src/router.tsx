import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SignupPage from "@/pages/SignupPage";
import GlobalErrorBoundary from "@/pages/GlobalErrorBoundary";
import { Outlet, createBrowserRouter } from "react-router";
import { ROUTES } from "@/config/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Outlet />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
