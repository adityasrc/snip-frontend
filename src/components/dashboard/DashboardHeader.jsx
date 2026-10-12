import { useState } from "react";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";
import { Link as LinkIcon, LogOut, Link2 } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <RouterLink to="/" className="flex items-center gap-2 group transition-opacity hover:opacity-85">
            <div className="bg-primary p-1.5 rounded-lg transition-transform group-hover:-rotate-12">
              <LinkIcon className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-base tracking-tight text-foreground">
              Snip
            </span>
          </RouterLink>

          <nav className="ml-8 hidden items-center gap-1 sm:flex" aria-label="Dashboard navigation">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  isActive
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`
              }
            >
              <Link2 size={14} /> Links
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="Open account menu" className="rounded-full focus:outline-none">
              <Avatar className="h-8 w-8 cursor-pointer ring-1 ring-border transition-all hover:ring-foreground">
                <AvatarFallback className="bg-muted text-foreground text-xs font-medium">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-1 border-border shadow-lg rounded-xl z-[9999] bg-card p-1.5">
              <DropdownMenuLabel className="font-normal px-2.5 py-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium leading-none text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border my-1" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-sm text-red-600 focus:bg-red-50 focus:text-red-700 rounded-lg px-2.5 py-1.5 flex items-center"
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
