// components/public/header.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  // Ship,
  Menu,
  User,
  Package,
  LogOut,
  LayoutDashboard,
  MapPin,
  Mail,
  Clock,
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
import { Notifications } from "./features/notification/notification";
import { ActiveShipment } from "./features/dashboard/shipments/activeShipment";

// Navigation items definition
const mainNavItems = [
  { href: "/", label: "Home" },
  // { href: "/ship", label: "Ship" },
  { href: "/track", label: "Track" },
  { href: "/services", label: "Services" },
  { href: "/support", label: "Support" },
];

const authNavItems = {
  unauthenticated: [
    { href: "/register", label: "Register" },
    { href: "/login", label: "Login" },
  ],
  authenticated: [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/shipments/history", label: "My Shipments", icon: Package },
    // { href: "/addresses", label: "Saved Addresses", icon: Ship },
  ],
};

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  // Handle scroll for shadow effect and top header visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      {/* Top Header - only visible on large screens */}
      <div
        className={cn(
          "hidden lg:block bg-top-header transition-all duration-300 overflow-hidden",
          isScrolled ? "opacity-0 h-0" : "opacity-100 h-12"
        )}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Left side */}
            <div className="flex gap-10">
              <div className="flex items-center gap-2 text-gray-300 relative">
                <MapPin className="text-secondary" size={20} />
                <span className="text-xs">
                  6512 hillside Brooke ave Las vegas
                </span>
                <div className="absolute -right-5 w-0.5 h-4 bg-gray-500" />
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm relative">
                <Mail className="text-secondary" size={20} />
                <span className="text-xs">admin@amermaxlogistics.org</span>
                <div className="absolute -right-5 w-0.5 h-4 bg-gray-500" />
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm relative">
                <Clock className="text-secondary" size={20} />
                <span className="text-xs">Mon - Sat: 8:00 am - 5:00 pm</span>
              </div>
            </div>
            {/* Right side */}
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2 text-gray-300 text-sm relative">
                <Link href={"/support"} className="hover:underline text-xs">
                  Help Center
                </Link>
                <div className="absolute -right-5 w-0.5 h-4 bg-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex space-x-4">
            {mainNavItems.map((item) => {
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
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="h-6 w-px bg-border" />
        </nav>

        {isAuthenticated ? (
          <div className="hidden lg:flex items-center gap-3 ">
            <Notifications />
            <ActiveShipment />
            <Link
              href="/shipments/create"
              className="bg-secondary text-white font-medium px-3 py-2 rounded-md"
            >
              Create Shipment
            </Link>
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
                      className="flex items-center space-x-2 rounded-md text-sm transition-colors"
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
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-2 ">
            {authNavItems.unauthenticated.map((item, idx) => (
              <Button
                key={item.href}
                variant={idx === 0 ? "ghost" : "default"}
                size="sm"
                className={
                  idx === 0 ? "" : "bg-secondary hover:bg-secondary/80"
                }
                asChild
              >
                <Link href={item.href} className="gap-2">
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        )}

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full overflow-y-auto">
            <div className="flex h-full flex-col justify-between py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <SheetHeader>
                    <SheetTitle>
                      <Logo />
                    </SheetTitle>
                  </SheetHeader>
                </div>
                <div
                  className={cn(
                    "block bg-top-header transition-all duration-300 overflow-hidden m-3 rounded-md"
                  )}
                >
                  <div className="">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-2 text-gray-300 text-sm relative p-2">
                        <MapPin className="text-secondary" size={20} />
                        <span>6512 hillside Brooke ave Las vegas</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm relative p-2">
                        <Mail className="text-secondary" size={20} />
                        <span>admin@amermaxlogistics.org</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm relative p-2">
                        <Clock className="text-secondary" size={20} />
                        <span>Mon - Sat: 8:00 am - 5:00 pm</span>
                      </div>
                    </div>
                  </div>
                </div>
                <nav className="flex flex-col space-y-1">
                  {mainNavItems.map((item) => {
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
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                  {session?.user.role === "ADMIN" && (
                    <Link
                      href={"/dashboard"}
                      className="flex items-center space-x-2 rounded-md text-sm transition-colors px-3 py-1"
                    >
                      <span>Dashboard</span>
                    </Link>
                  )}
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

                      {/* <Notifications /> */}
                      <div className="flex flex-col gap-3 px-3 py-1">
                        <ActiveShipment />

                        <Link
                          href="/shipments/create"
                          className="bg-secondary text-white font-medium px-3 py-2 rounded-md w-52"
                        >
                          Create Shipment
                        </Link>
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
                      {authNavItems.unauthenticated.map((item) => (
                        <SheetClose key={item.href} asChild>
                          <Link
                            href={item.href}
                            className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <span>{item.label}</span>
                          </Link>
                        </SheetClose>
                      ))}
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
