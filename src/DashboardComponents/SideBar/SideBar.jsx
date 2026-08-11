import React from "react";
import {
  ShoppingCart,
  LayoutDashboard,
  ListOrdered,
  Tag,
  FolderKanban,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Group11166065951 from "../../assets/Group11166065951.png";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/orders", label: "Orders", icon: ListOrdered },
  { to: "/admin/products", label: "Products", icon: Tag },
  { to: "/admin/other", label: "Other", icon: FolderKanban },
];

const SideBar = () => {
  return (
    <aside className="w-[240px] shrink-0 bg-[#1C2536] dark:bg-[#0B111F] text-slate-300 sticky top-0 h-screen overflow-y-auto flex flex-col">
      <div className="flex items-center gap-2 px-6 h-[64px]">
        <img src={Group11166065951} alt="fastcart" className="" />
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
