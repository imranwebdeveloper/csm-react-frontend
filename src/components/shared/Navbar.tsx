import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Link, NavLink, useLocation } from "react-router";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation(); // ✅ Get current pathname
  const pathname = location.pathname;
  const profile = user?.user;

  return (
    <header className="sticky  top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between  max-w-7xl mx-auto">
        <div className="flex items-center gap-2 md:gap-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <NavLink to="/" className="text-lg font-semibold">
                  ContentHub
                </NavLink>
                <NavLink
                  to="/"
                  className={`${
                    pathname === "/"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  } hover:text-foreground`}
                >
                  Home
                </NavLink>
                {user ? (
                  <NavLink
                    to="/dashboard"
                    className={`${
                      pathname === "/dashboard"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    } hover:text-foreground`}
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className={`${
                        pathname === "/auth/login"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      } hover:text-foreground`}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className={`${
                        pathname === "/auth/register"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      } hover:text-foreground`}
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <Link to="/" className="flex items-center gap-2 font-semibold">
            ContentHub
          </Link>
        </div>

        {/* User Authentication Section */}
        <div className="flex items-center gap-2">
          {profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={profile?.image || ""}
                      alt={profile?.username}
                    />
                    <AvatarFallback>
                      {profile?.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{profile?.username}</p>
                    <p className="text-xs text-muted-foreground">
                      {profile?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/profile`} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
