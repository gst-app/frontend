import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "@/router";
import { OuterErrorBoundary } from "@/pages/GlobalErrorBoundary";

function App() {
  return (
    <OuterErrorBoundary>
      <RouterProvider router={router} />
    </OuterErrorBoundary>
  );
}

export default App;
