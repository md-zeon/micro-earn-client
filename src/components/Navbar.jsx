import { useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Coins,
  ExternalLink,
  House,
  Info,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Mail,
  Menu,
  X,
} from "lucide-react";
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

const navItems = [
  {
    to: "/",
    label: "Home",
    description: "Back to the MicroEarn homepage",
    icon: <House className="size-5" />,
    end: true,
  },
  {
    to: "/all-tasks",
    label: "All Tasks",
    description: "Browse tasks and earn coins",
    icon: <ListTodo className="size-5" />,
  },
  {
    to: "/pricing",
    label: "Pricing",
    description: "Buy coins to post tasks and pay workers",
    icon: <Coins className="size-5" />,
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    description: "Manage tasks, submissions, and payments",
    icon: <LayoutDashboard className="size-5" />,
    requiresAuth: true,
  },
  {
    to: "/about",
    label: "About Us",
    description: "Our mission, values, and journey",
    icon: <Info className="size-5" />,
  },
  {
    to: "/contact",
    label: "Contact Us",
    description: "Support, partnerships, and feedback",
    icon: <Mail className="size-5" />,
  },
];

const desktopLinkClass = ({ isActive }) =>
  `relative px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
    isActive ? "text-gradient" : "text-foreground/70 hover:text-gradient"
  }`;

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, isRoleLoading } = useRole();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  const handleLogout = useCallback(() => {
    logOut();
    setMobileMenuOpen(false);
  }, [logOut]);

  const visibleNavItems = navItems.filter(
    (item) => !item.requiresAuth || user,
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:rounded-full focus:bg-gradient focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/50 bg-background/80 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <Container>
          <nav
            aria-label="Main navigation"
            className={`flex items-center justify-between px-2 transition-all duration-300 ${
              scrolled ? "py-2.5" : "py-4"
            }`}
          >
            <Logo />

            {/* Desktop nav links */}
            <div className="hidden items-center gap-1 lg:flex">
              {visibleNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={desktopLinkClass}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="navbar-indicator"
                          className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gradient"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {user ? (
                <>
                  <AvailableCoins />
                  <ThemeController />
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      nativeButton={false}
                      render={
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative h-10 w-10 rounded-full"
                        >
                          <Button
                            variant="ghost"
                            className="h-10 w-10 rounded-full p-0"
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={user?.photoURL || ""}
                                alt={user?.displayName || "User"}
                              />
                              <AvatarFallback className="bg-muted">
                                {user?.displayName?.charAt(0)?.toUpperCase() ||
                                  "U"}
                              </AvatarFallback>
                            </Avatar>
                          </Button>
                        </motion.div>
                      }
                    />
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
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
                          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-gradient text-white capitalize"
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
                        <LogOut className="mr-2 h-4 w-4" />
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
                      <Button className="rounded-full bg-gradient text-white shadow-lg transition-all duration-300 hover:opacity-90 hover:shadow-xl">
                        Register
                      </Button>
                    </Link>
                  </div>
                </>
              )}

              {/* Mobile menu trigger */}
              <Button
                variant="ghost"
                className="gap-1.5 rounded-full lg:hidden"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="text-xs font-medium">Menu</span>
              </Button>
            </div>
          </nav>
        </Container>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-2xl lg:hidden"
          >
            {/* Mobile header */}
            <Container>
              <div className="flex items-center justify-between px-2 py-4">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                </Button>
              </div>
            </Container>

            {/* Mobile nav items */}
            <div className="flex-1 overflow-y-auto">
              <Container>
                <nav
                  className="mt-4 flex flex-col gap-1"
                  aria-label="Mobile navigation"
                >
                  {visibleNavItems.map((item, i) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.04 * i,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-soft text-emerald-600 dark:text-emerald-400"
                              : "text-foreground/70 hover:bg-muted/60 active:bg-muted"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className="flex items-center gap-4">
                              <span
                                className={`flex size-11 items-center justify-center rounded-xl transition-all duration-300 ${
                                  isActive
                                    ? "bg-gradient text-white shadow-lg shadow-emerald-500/25"
                                    : "bg-muted text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/15"
                                }`}
                              >
                                {item.icon}
                              </span>
                              <div className="flex flex-col">
                                <span className="text-lg font-semibold tracking-tight">
                                  {item.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {item.description}
                                </span>
                              </div>
                            </span>
                            <ArrowRight
                              className={`size-4 transition-all duration-200 ${
                                isActive
                                  ? "translate-x-0 opacity-100"
                                  : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile bottom actions */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.04 * visibleNavItems.length + 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-auto flex flex-col gap-3 pb-10 pt-6"
                >
                  <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/30 px-5 py-3.5">
                    <span className="text-sm font-medium text-foreground/80">
                      Theme
                    </span>
                    <ThemeController />
                  </div>

                  {user ? (
                    <div className="flex flex-col gap-2.5">
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button className="h-12 w-full justify-center rounded-2xl bg-gradient text-white text-sm font-medium shadow-lg shadow-emerald-500/25">
                          Go to Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="h-12 w-full justify-center rounded-2xl text-sm font-medium text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="h-12 w-full justify-center rounded-2xl text-sm font-medium"
                        >
                          Log in
                        </Button>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button className="h-12 w-full justify-center rounded-2xl bg-gradient text-white text-sm font-medium shadow-lg shadow-emerald-500/25">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </Container>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
