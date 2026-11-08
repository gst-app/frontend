import type { NavItem } from "@/components/layouts/nav.types";
import { BookOpenCheck, GraduationCap } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

interface PropTypes {
  items: NavItem[];
  onNavigate?: () => void;
}

const DashboardSidebar = ({ items, onNavigate }: PropTypes) => {
  return (
    <div className="flex h-full min-h-0 flex-col px-4 py-6 sm:px-5">
      <a href={items[0]?.href ?? "#"} className="flex items-center gap-3 px-1" onClick={onNavigate}>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <GraduationCap className="size-6" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block max-w-37.5 font-heading text-lg lg:text-xl font-semibold leading-tight text-primary">
            The Scholarly Minimalist
          </span>
          <span className="mt-1 block text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground font-manrope">
            Digital Atheneum
          </span>
        </span>
      </a>

      <nav aria-label="Main navigation" className="mt-8 space-y-1">
        {items.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={label}
            to={href}
            end={label === "Dashboard"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `relative flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors font-manrope ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                  : "text-[#111E1999] hover:bg-muted hover:text-foreground font-medium"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className="absolute inset-y-2 left-0 w-1 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <Button
          className="w-full justify-center gap-2 rounded-xl font-bold h-11 text-sm"
          size="default"
        >
          <BookOpenCheck aria-hidden="true" />
          Start Study Session
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
