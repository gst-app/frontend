import { useState } from "react";
import { Bell, CircleHelp, Menu, Search, UserRound } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import DashboardSidebar from "@/components/layouts/parts/DashboardSidebar";
import type { NavItem } from "@/components/layouts/nav.types";
import { useMediaQuery } from "@/hooks/use-media-query";

interface PropTypes {
  items: NavItem[];
}

const DashboardTopbar = ({ items }: PropTypes) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");

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
                <Menu aria-hidden="true" className="shrink-0" size={6} />
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
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-full bg-background/70"
            aria-label="Your profile"
          >
            <UserRound aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
