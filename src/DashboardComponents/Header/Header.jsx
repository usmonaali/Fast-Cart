import React from "react";
import { Bell, ChevronDown } from "lucide-react";
import { getToken } from "../../api/account";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import LanguageToggle from "../../components/LanguageToggle/LanguageToggle";

const Header = () => {
  const user = getToken();
  const displayName = user?.fullName || user?.email || "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="bg-[#1C2536] dark:bg-[#111927] h-[64px] flex items-center justify-between px-6 sticky top-0 z-20 border-b border-[#E5E7EB] dark:border-[#1F2937] transition-colors">
      <input
        className="h-[36px] px-3 bg-transparent rounded-md bg-[#F3F4F6] dark:bg-transparent text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 outline-none w-[280px]"
        type="search"
        placeholder="Search..."
      />

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-slate-100">
          <Bell className="w-5 h-5 text-[#6C737F]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2f6fed]" />
        </button>
        <LanguageToggle />
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-medium">
            {initial}
          </span>
          <span className="text-sm font-medium text-[white] dark:text-white">
            {displayName}
          </span>
          <ChevronDown className="w-4 h-4 text-[#6C737F]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
