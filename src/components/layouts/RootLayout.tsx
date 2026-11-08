import TopProgressBar from "@/components/custom/TopProgressBar";
import { Outlet, useNavigation } from "react-router";

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state !== "idle" && <TopProgressBar />}
      <Outlet />
    </>
  );
}
