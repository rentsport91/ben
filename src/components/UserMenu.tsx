import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Box, LogOut, PlusCircle, User } from "lucide-react";

export const UserMenu = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        Account
        {/* <Avatar></Avatar> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem className="px-3 py-2">
          <Link href={"/profile"} className="flex items-center gap-2">
            <User />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/profile"} className="flex items-center gap-2">
            <Box />
            My Shipments
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/profile"} className="flex items-center gap-2">
            <PlusCircle />
            New Shipments
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className="flex items-center gap-2 text-rose-500 font-semibold py-2 ">
            <LogOut className="text-rose-500" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
