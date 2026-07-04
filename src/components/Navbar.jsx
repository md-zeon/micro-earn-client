import { LuLogOut, LuMenu, LuX, LuExternalLink } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import Container from "./Container";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Logo from "./Logo";
import AvailableCoins from "./AvailableCoins";
import ThemeController from "./ThemeController";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, isRoleLoading } = useRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-gradient font-medium"
      : "text-foreground/70 hover:text-gradient transition-colors";

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/all-tasks" className={navLinkClass}>
        All Tasks
      </NavLink>
      {user && (
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
      )}
      <NavLink to="/about" className={navLinkClass}>
        About Us
      </NavLink>
      <NavLink to="/contact" className={navLinkClass}>
        Contact Us
      </NavLink>
    </>
  );

  return (
    <Container>
      <nav className="flex items-center justify-between py-3 px-2">
        {/* Mobile menu button + Logo */}
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <LuX className="h-5 w-5" />
            ) : (
              <LuMenu className="h-5 w-5" />
            )}
          </Button>
          <Logo />
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">{navLinks}</div>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <AvailableCoins />
              <ThemeController />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user?.photoURL || ""}
                        alt={user?.displayName || "User"}
                      />
                      <AvatarFallback className="bg-muted">
                        {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex justify-between">
                    <span>Role</span>
                    {isRoleLoading ? (
                      <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                    ) : (
                      <Badge
                        variant="secondary"
                        className="capitalize bg-gradient text-white"
                      >
                        {role}
                      </Badge>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logOut} className="cursor-pointer">
                    <LuLogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <div className="hidden sm:block">
                <ThemeController />
              </div>
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient text-white hover:opacity-90">
                    Register
                  </Button>
                </Link>
              </div>
            </>
          )}
          <a
            href="https://github.com/md-zeon/micro-earn-client"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex"
          >
            <Button variant="outline" size="sm">
              <LuExternalLink className="mr-1 h-3 w-3" />
              GitHub
            </Button>
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border py-4 px-2 flex flex-col gap-3 bg-background">
          {navLinks}
          <a
            href="https://github.com/md-zeon/micro-earn-client"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="sm" className="w-full">
              <LuExternalLink className="mr-1 h-3 w-3" />
              Join As Developer
            </Button>
          </a>
        </div>
      )}
    </Container>
  );
};

export default Navbar;
