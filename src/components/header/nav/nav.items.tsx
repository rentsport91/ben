"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

type NavItemProps = {
  item:
    | {
        label: string;
        href: string;
        subMenu?: undefined;
      }
    | {
        label: string;
        subMenu: {
          label: string;
          href: string;
        }[];
        href?: undefined;
      };
};

export const NavItem = ({ item: { label, href, subMenu } }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li className="group relative capitalize">
      {subMenu ? (
        <div
          className={cn(
            "flex items-center gap-1 py-[24px] px-[8px] font-semibold group-hover:text-secondary transition-colors duration-300 cursor-pointer text-sm"
          )}
        >
          {label}
          <ChevronDown size={15} />
          <ul className="hidden group-hover:block absolute z-20 -right-10 top-full min-w-60 shadow-md  rounded-lg bg-white">
            {subMenu.map((item, index) => (
              <li key={index} className="p-2 ">
                <Link
                  href={item.href}
                  className={cn(
                    "block text-sm font-semibold text-black px-3 py-2 hover:text-secondary hover:bg-gray-100 rounded-md"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link
          href={href}
          className={cn(
            "py-[24px] px-[14px] font-semibold text-sm group-hover:text-secondary transition-colors duration-300",
            isActive && "text-secondary"
          )}
        >
          {label}
        </Link>
      )}
    </li>
  );
};
