"use client";

import {
  Bell,
  Clock,
  LayoutGrid,
  LogOut,
  Mail,
  MapPin,
  Package,
  Settings,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavList } from "./nav/nav.list";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";

export const Header = ({ isLoggedIn = false, user = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mock user data (replace with actual data from your auth system)
  const loggedInUser = user || {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/images/avatar.png",
    activeShipments: 3,
    notifications: 2,
  };

  // Detect scroll position to change header styling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "sticky top-0 left-0 z-20 w-full transition-all duration-300 ease-in-out bg-white",
        scrolled ? "shadow-md" : ""
      )}
    >
      {/* top header  */}
      <div
        className={cn(
          "bg-top-header text-gray-200 transition-all duration-300 ease-in-out overflow-hidden",
          scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
        )}
      >
        <div className="py-[10px] px-[25px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            {/* left side */}
            <ul className="flex flex-wrap items-center gap-4 md:gap-9 text-[12px]">
              <li className="flex items-center relative gap-2">
                <MapPin className="text-secondary" size={18} />
                <p className="hidden sm:block">775 Rolling Green Road</p>
                <p className="sm:hidden">775 RGR</p>
                <div className="absolute h-4 w-[2px] -right-2 md:-right-5 bg-gray-500 hidden sm:block" />
              </li>
              <li className="flex items-center relative gap-2">
                <Mail className="text-secondary" size={18} />
                <p>info@euroswift.com</p>
                <div className="absolute h-4 w-[2px] -right-2 md:-right-5 bg-gray-500 hidden sm:block" />
              </li>
              <li className="flex items-center gap-2">
                <Clock className="text-secondary" size={18} />
                <p className="hidden sm:block">Mon - Sat: 8:00 am - 5:00 pm</p>
                <p className="sm:hidden">8am-5pm</p>
              </li>
            </ul>
            {/* right side  */}
            <ul className="hidden md:flex items-center gap-9 text-sm">
              <li className="flex items-center relative gap-2">
                <Link href={"/help"} className="hover:underline">
                  Help Center
                </Link>
                <div className="absolute h-4 w-[2px] -right-5 bg-gray-500" />
              </li>
              <li className="flex items-center relative gap-2">
                <Link href={"/locations"} className="hover:underline">
                  Find Store
                </Link>
                <div className="absolute h-4 w-[2px] -right-5 bg-gray-500" />
              </li>
              <li className="flex items-center gap-2">
                <p>Follow Us On: </p>
                {/* Add social media icons here */}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* navigation bar */}
      <motion.div
        className="bg-white shadow-sm"
        animate={{
          height: scrolled ? "70px" : "80px",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="">
          <div className="flex items-center justify-between h-full">
            {/* left side  */}
            <motion.div
              className="flex items-center gap-5"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="ml-5">
                <Link href={"/"}>
                  <Image
                    src={"/images/logo.svg"}
                    alt="site logo"
                    width={scrolled ? 130 : 150}
                    height={scrolled ? 130 : 150}
                    className="transition-all duration-300"
                    sizes=""
                  />
                </Link>
              </div>
            </motion.div>
            {/* navigation Items - only visible on desktop */}
            <div className="hidden lg:block">
              <NavList />
            </div>
            {/* right side - desktop  */}
            <motion.div
              className="hidden lg:flex items-center gap-5"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {isLoggedIn ? (
                <>
                  {/* Shipment Quick Status */}
                  <motion.div
                    className="flex items-center mr-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href="/shipments"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                      <Package size={18} className="text-secondary" />
                      <span>Active: {loggedInUser.activeShipments}</span>
                    </Link>
                  </motion.div>

                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="relative"
                        >
                          <Bell size={20} />
                          {loggedInUser.notifications > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 15,
                              }}
                            >
                              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-white">
                                {loggedInUser.notifications}
                              </Badge>
                            </motion.div>
                          )}
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            Shipment #ES42851 Delivered
                          </span>
                          <span className="text-xs text-gray-500">
                            2 hours ago
                          </span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            Shipment #ES42855 In Transit
                          </span>
                          <span className="text-xs text-gray-500">
                            Yesterday
                          </span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link
                          href="/notifications"
                          className="w-full text-center text-xs text-secondary"
                        >
                          View All Notifications
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Quick Actions */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size={"sm"}
                      className="bg-secondary mr-2 hover:bg-secondary hover:opacity-70"
                    >
                      New Shipment
                    </Button>
                  </motion.div>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div
                        className="flex items-center gap-2 cursor-pointer mr-5"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={loggedInUser.avatar} />
                          <AvatarFallback>
                            {loggedInUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block text-sm">
                          <p className="font-medium">{loggedInUser.name}</p>
                        </div>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="mr-2 h-4 w-4" />
                        <span>My Shipments</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>Saved Addresses</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={"ghost"}
                      size={"lg"}
                      className="cursor-pointer"
                    >
                      Register
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size={"lg"}
                      className="bg-secondary mr-5 hover:bg-secondary hover:opacity-70 cursor-pointer"
                    >
                      Login
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Mobile menu toggle */}
            <motion.button
              onClick={toggleMobileMenu}
              className="block lg:hidden cursor-pointer hover:text-secondary transition-colors duration-300 py-[20px] px-[25px] border-r-[1px]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X /> : <LayoutGrid />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="py-4 px-6">
              {/* Mobile Navigation */}
              <div className="py-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Navigation
                </h3>
                {/* Add your NavList mobile version here */}
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="block py-2 text-gray-800 hover:text-secondary"
                  >
                    Home
                  </Link>
                  <Link
                    href="/services"
                    className="block py-2 text-gray-800 hover:text-secondary"
                  >
                    Services
                  </Link>
                  <Link
                    href="/track"
                    className="block py-2 text-gray-800 hover:text-secondary"
                  >
                    Track Shipment
                  </Link>
                  <Link
                    href="/locations"
                    className="block py-2 text-gray-800 hover:text-secondary"
                  >
                    Locations
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-2 text-gray-800 hover:text-secondary"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Mobile User Actions */}
              {isLoggedIn ? (
                <div className="border-t pt-4 mt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={loggedInUser.avatar} />
                      <AvatarFallback>
                        {loggedInUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{loggedInUser.name}</p>
                      <p className="text-xs text-gray-500">
                        {loggedInUser.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Button
                      size="sm"
                      className="bg-secondary hover:bg-secondary hover:opacity-70 w-full"
                    >
                      New Shipment
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <Package size={16} className="mr-1" />
                      My Shipments
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center py-2 text-gray-800 hover:text-secondary"
                    >
                      <User size={16} className="mr-2" /> Profile
                    </Link>
                    <Link
                      href="/addresses"
                      className="flex items-center py-2 text-gray-800 hover:text-secondary"
                    >
                      <MapPin size={16} className="mr-2" /> Saved Addresses
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center py-2 text-gray-800 hover:text-secondary"
                    >
                      <Settings size={16} className="mr-2" /> Settings
                    </Link>
                    <Link
                      href="/logout"
                      className="flex items-center py-2 text-gray-800 hover:text-secondary"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="border-t pt-4 mt-2 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                  <Button className="w-full bg-secondary hover:bg-secondary hover:opacity-70">
                    Login
                  </Button>
                </div>
              )}

              {/* Mobile Contact Info */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Contact Us
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-secondary" />
                    <span>775 Rolling Green Road</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-secondary" />
                    <span>info@euroswift.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-secondary" />
                    <span>Mon - Sat: 8:00 am - 5:00 pm</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
