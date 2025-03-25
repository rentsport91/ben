// components/public/header.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  Ship,
  Menu,
  User,
  Package,
  Home,
  // Info,
  // Phone,
  LogIn,
  LogOut,
  // UserPlus,
  // TextQuote,
  LayoutDashboard,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Logo } from "./logo";

// Navigation items definition
const mainNavItems = [
  { href: "/", label: "Home", icon: Home },
  // { href: "/about", label: "About", icon: Info },
  // { href: "/contact", label: "Contact", icon: Phone },
  { href: "/track", label: "Track Shipment", icon: Package },
  // { href: "/quota", label: "Get a Quota", icon: TextQuote },
];

const authNavItems = {
  unauthenticated: [
    { href: "/login", label: "Login", icon: LogIn },
    // { href: "/register", label: "Register", icon: UserPlus },
  ],
  authenticated: [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/shipments/history", label: "My Shipments", icon: Package },
    { href: "/shipments/create", label: "Create Shipment", icon: Ship },
  ],
};

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-shadow duration-200",
        isScrolled ? "shadow-md" : "shadow-none"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex space-x-4">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-secondary"
                        : "text-muted-foreground hover:text-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-secondary"
                        layoutId="navbar-indicator"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-6 w-px bg-border" />

          {isAuthenticated ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="max-w-32 truncate">
                    {session?.user?.name || "Account"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {session.user.role === "ADMIN" && (
                    <Link
                      href={"/dashboard"}
                      className="flex items-center space-x-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                </DropdownMenuItem>

                {authNavItems.authenticated.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive flex gap-2 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              {authNavItems.unauthenticated.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.href}
                    variant={idx === 0 ? "ghost" : "default"}
                    size="sm"
                    className={`${
                      idx === 0 ? "" : "bg-secondary hover:bg-secondary/80"
                    }`}
                    asChild
                  >
                    <Link href={item.href} className="gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full">
            <div className="flex h-full flex-col justify-between py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" className="flex items-center space-x-2">
                        <Ship className="h-5 w-5" />
                        <span className="text-lg font-bold">ShipMaster</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  {/* <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </SheetClose> */}
                </div>

                <nav className="flex flex-col space-y-1">
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}

                  <div className="my-2 h-px w-full bg-border" />

                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          Signed in as
                        </p>
                        <p className="text-sm font-medium truncate">
                          {session?.user?.email ||
                            session?.user?.name ||
                            "User"}
                        </p>
                      </div>

                      {authNavItems.authenticated.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SheetClose key={item.href} asChild>
                            <Link
                              href={item.href}
                              className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </Link>
                          </SheetClose>
                        );
                      })}

                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {authNavItems.unauthenticated.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SheetClose key={item.href} asChild>
                            <Link
                              href={item.href}
                              className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </>
                  )}
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
