import {
  LuLogOut,
  LuMenu,
  LuX,
  LuExternalLink,
  LuHandCoins,
} from "react-icons/lu";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, isRoleLoading } = useRole();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
      isActive ? "text-gradient" : "text-foreground/70 hover:text-gradient"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        {({ isActive }) => (
          <>
            Home
            {isActive && (
              <motion.span
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient rounded-full"
              />
            )}
          </>
        )}
      </NavLink>
      <NavLink to="/all-tasks" className={navLinkClass}>
        {({ isActive }) => (
          <>
            All Tasks
            {isActive && (
              <motion.span
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient rounded-full"
              />
            )}
          </>
        )}
      </NavLink>
      {user && (
        <NavLink to="/dashboard" className={navLinkClass}>
          {({ isActive }) => (
            <>
              Dashboard
              {isActive && (
                <motion.span
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient rounded-full"
                />
              )}
            </>
          )}
        </NavLink>
      )}
      <NavLink to="/about" className={navLinkClass}>
        {({ isActive }) => (
          <>
            About Us
            {isActive && (
              <motion.span
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient rounded-full"
              />
            )}
          </>
        )}
      </NavLink>
      <NavLink to="/contact" className={navLinkClass}>
        {({ isActive }) => (
          <>
            Contact Us
            {isActive && (
              <motion.span
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient rounded-full"
              />
            )}
          </>
        )}
      </NavLink>
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4 px-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">{navLinks}</div>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <AvailableCoins />
                <ThemeController />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Button
                        variant="ghost"
                        className="h-9 w-9 rounded-full p-0"
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
                    </motion.div>
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
                    <DropdownMenuItem
                      onClick={logOut}
                      className="cursor-pointer"
                    >
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
                    <Button variant="ghost" className="rounded-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-full bg-gradient text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300">
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
              <Button
                variant="outline"
                size="sm"
                className="rounded-full hidden xl:flex items-center gap-1.5"
              >
                <LuExternalLink className="h-3 w-3" />
                GitHub
              </Button>
            </a>

            {/* Mobile menu trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full"
                >
                  <LuMenu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6 mt-8"
                >
                  <div className="flex flex-col gap-4">{navLinks}</div>

                  {!user && (
                    <div className="flex flex-col gap-3 pt-4 border-t border-border">
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button className="w-full justify-start bg-gradient text-white">
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}

                  <a
                    href="https://github.com/md-zeon/micro-earn-client"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      <LuExternalLink className="h-4 w-4" />
                      Join As Developer
                    </Button>
                  </a>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
