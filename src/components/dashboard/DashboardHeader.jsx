import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as LinkIcon, LogOut, BarChart3, BookOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function DashboardHeader() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    if (typeof window === "undefined") return { name: "User", email: "" };
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
          name: payload.name || "User",
          email: payload.email || "",
        };
      } catch {
        return { name: "User", email: "user@snip.app" };
      }
    }
    return { name: "User", email: "" };
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const getInitials = (name) => {
    if (!name || name.trim() === "") return "U";
    const words = name.trim().split(" ").filter(Boolean);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <header className="dashboard-header sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e1e5eb]">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <RouterLink to="/" className="flex items-center gap-2 group transition-opacity hover:opacity-85">
            <div className="bg-[#0a0a0a] p-1.5 rounded-lg transition-transform group-hover:-rotate-12">
              <LinkIcon className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-[16px] tracking-tight text-[#0a0a0a]">
              Snip
            </span>
          </RouterLink>

          <nav className="hidden sm:flex items-center gap-1 ml-4">
            <RouterLink to="/dashboard" className="dashboard-nav-link">Links</RouterLink>
            <RouterLink to="/docs" className="dashboard-nav-link"><BookOpen size={14} /> Docs</RouterLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none rounded-full">
              <Avatar className="h-8 w-8 cursor-pointer ring-1 ring-[#e5e5e5] hover:ring-[#0a0a0a] transition-all">
                <AvatarFallback className="bg-[#f5f5f5] text-[#0a0a0a] text-[12px] font-medium">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-1 border-[#e5e5e5] shadow-[rgba(0,0,0,0.08)_0px_8px_24px_-4px] rounded-xl z-[9999] bg-white p-1.5">
              <DropdownMenuLabel className="font-normal px-2.5 py-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-[13px] font-medium leading-none text-[#0a0a0a]">
                    {user.name}
                  </p>
                  <p className="text-[12px] leading-none text-[#737373]">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#e5e5e5] my-1" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-[13px] text-red-600 focus:bg-red-50 focus:text-red-700 rounded-lg px-2.5 py-1.5 flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
