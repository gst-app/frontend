import { useState } from "react";
import { Bell, CircleHelp, LogOut, Menu, Search, Settings } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Avatar from "@/components/custom/AvatarV1";
import DashboardSidebar from "@/components/layouts/parts/DashboardSidebar";
import type { NavItem } from "@/components/layouts/nav.types";
import { ROUTES } from "@/config/routes";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuthStore } from "@/stores/auth.store";

interface PropTypes {
  items: NavItem[];
}

const DashboardTopbar = ({ items }: PropTypes) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const user = useAuthStore((state) => state.user);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const username = user?.username || "User";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-topbar/95 backdrop-blur-sm">
      <div className="mx-auto grid min-h-16 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:min-h-19 sm:px-6 lg:px-0">
        <div className="flex min-w-0 items-center gap-3 lg:px-5">
          {isMobile && (
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu aria-hidden="true" className="shrink-0 size-5" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[min(21rem,88vw)] border-sidebar-border bg-sidebar-surface p-0"
              >
                <SheetTitle className="sr-only">Main navigation</SheetTitle>
                <DashboardSidebar items={items} onNavigate={() => setMenuOpen(false)} />
              </SheetContent>
            </Sheet>
          )}

          {isMobile ? (
            <NavLink to={items[0]?.href ?? "#"} className="min-w-0">
              <span className="block truncate font-heading text-base font-semibold leading-tight text-foreground">
                GS EXAM
                <br />
                PREP
              </span>
            </NavLink>
          ) : null}

          <label className="relative hidden w-full max-w-sm lg:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-primary/50"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search resources..."
              aria-label="Search resources"
              className="h-10 rounded-full border-transparent bg-background/70 pl-10 active:ring-0! active:outline-0! active:border-0! placeholder:text-[#6B7280]"
            />
          </label>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-1 sm:gap-3 lg:px-6">
          <nav
            aria-label="Learning links"
            className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
          >
            <a href="#courses" className="transition-colors text-foreground/80">
              My Courses
            </a>
            <a href="#library" className="transition-colors text-foreground/80">
              Library
            </a>
          </nav>
          <span className="hidden h-6 w-px bg-border md:block" aria-hidden="true" />
          {isMobile && (
            <Button variant="ghost" size="icon" className="shrink-0" aria-label="Search resources">
              <Search aria-hidden="true" />
            </Button>
          )}
          <span className="hidden items-center gap-2 text-sm font-medium text-primary sm:inline-flex">
            <span className="size-2.5 rounded-full bg-primary/80" aria-hidden="true" />
            Online
          </span>
          <Button variant="ghost" size="icon" className="shrink-0" aria-label="Notifications">
            <Bell aria-hidden="true" size={5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden shrink-0 sm:inline-flex"
            aria-label="Help"
          >
            <CircleHelp aria-hidden="true" />
          </Button>

          <details className="group relative shrink-0">
            <summary
              className="grid size-10 cursor-pointer list-none place-items-center rounded-full bg-background/70 p-0 ring-1 ring-border/70 outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"
              aria-label={`Open account menu for ${username}`}
            >
              <Avatar
                image={user?.profileImage ?? undefined}
                name={username}
                alt={username}
                className="size-9"
              />
            </summary>
            <div
              className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
              role="menu"
              aria-label="Account menu"
            >
              <div className="truncate px-2 py-2 text-sm font-semibold text-foreground">
                {username}
              </div>
              <div className="my-1 h-px bg-border" aria-hidden="true" />
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-full justify-start rounded-sm px-2 text-left font-normal"
                icon={<Settings className="size-4" aria-hidden="true" />}
                render={<NavLink to={ROUTES.STUDENT.PROFILE} role="menuitem" />}
              >
                Profile settings
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-full justify-start rounded-sm px-2 text-left font-normal hover:bg-destructive/10 hover:font-medium hover:text-destructive"
                role="menuitem"
                icon={<LogOut className="size-4 text-destructive" aria-hidden="true" />}
                onClick={() => logout()}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </Button>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
