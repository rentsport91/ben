import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { Logo } from "../logo";

export const MobileNavigation = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-full">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="py-2 space-y-2">
            <SheetClose asChild>
              <Link
                href="/"
                className="block py-2 px-4 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/services"
                className="block py-2 px-4 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Services
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/tracking"
                className="block py-2 px-4 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Track Shipment
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/locations"
                className="block py-2 px-4 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Locations
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/about"
                className="block py-2 px-4 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                About Us
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/contact"
                className="block py-2 px-4 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Contact
              </Link>
            </SheetClose>
          </div>
          <div className="mt-3   px-4">
            <SheetClose asChild>
              <Button asChild className="">
                <Link href="/quote">Get a Quote</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
