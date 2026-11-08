import type { NavItem } from "@/components/layouts/nav.types";
import DashboardSidebar from "@/components/layouts/parts/DashboardSidebar";
import DashboardTopbar from "@/components/layouts/parts/DashboardTopbar";
import { Outlet } from "react-router";

interface PropTypes {
  navItems: NavItem[];
}

const DashboardLayout = ({ navItems }: PropTypes) => {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar-surface lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <DashboardSidebar items={navItems} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar items={navItems} />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
