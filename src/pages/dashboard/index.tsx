import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useAuthStore } from "@/stores/auth.store";

const DashboardHome = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-start justify-center gap-6 p-6 text-foreground">
      <h1 className="text-3xl">You’re signed in</h1>
      <p>Welcome, {user?.username}.</p>
      <Button disabled={logout.isPending} onClick={() => logout.mutate()}>
        {logout.isPending ? "Signing out…" : "Log out"}
      </Button>
    </main>
  );
};

export default DashboardHome;
