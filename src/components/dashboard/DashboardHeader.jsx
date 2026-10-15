import { useState, useEffect } from "react";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Link2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Logo } from "../Logo";
import api from "@/lib/api";
import { cn, getUserFromToken } from "@/lib/utils";

export function DashboardHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getUserFromToken());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.get("/api/auth/me")
      .then((res) => {
        if (res.data?.user?.name) {
          localStorage.setItem("user_name", res.data.user.name);
          if (res.data.user.email) {
            localStorage.setItem("user_email", res.data.user.email);
          }
          setUser({
            name: res.data.user.name,
            email: res.data.user.email || "",
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    navigate("/signin");
  };

  const getInitials = (name) => {
    if (!name || name.trim() === "") return "U";
    const words = name.trim().split(" ").filter(Boolean);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <RouterLink to="/" className="group">
            <Logo />
          </RouterLink>

          <nav className="ml-8 hidden items-center gap-1 sm:flex" aria-label="Dashboard navigation">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )
              }
            >
              <Link2 size={14} /> Links
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Open account menu"
              className="rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Avatar className="h-8 w-8 ring-1 ring-border transition-shadow hover:ring-foreground">
                <AvatarFallback className="bg-muted text-xs font-medium">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal px-2.5 py-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
