"use client"

import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const VendorNavItems = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="pr-3">
          <NavigationMenuLink asChild>
            <Link
              href="/vendors"
              className={`hover:text-orange-600 font-medium text-base ${
                activeLink === "/products" ? "text-orange-600" : ""
              }`}
              onClick={() => handleLinkClick("/vendors")}
            >
              Products
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/vendors"
              className={`hover:text-orange-600 font-medium text-base ${
                activeLink === "/packages" ? "text-orange-600" : ""
              }`}
              onClick={() => handleLinkClick("/packages")}
            >
              Packages
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:text-orange-600 font-medium text-base">
            Create
          </NavigationMenuTrigger>
          <NavigationMenuContent className="">
            <ul className="bg-orange-50 shadow-md w-52 h-24 items-center">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/create/product"
                    className={`block px-4 py-2 hover:bg-orange-100 text-center font-medium text-gray-700 ${
                      activeLink === "/create/product" ? "text-orange-600" : ""
                    }`}
                    onClick={() => handleLinkClick("/create/product")}
                  >
                    Product
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/create/package"
                    className={`block px-4 py-2 hover:bg-orange-100 text-center font-medium text-gray-700 ${
                      activeLink === "/create/package" ? "text-orange-600" : ""
                    }`}
                    onClick={() => handleLinkClick("/create/package")}
                  >
                    Package
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/profile"
              className={`hover:text-orange-600 font-medium text-base ${
                activeLink === "/profile" ? "text-orange-600" : ""
              }`}
              onClick={() => handleLinkClick("/profile")}
            >
              Profile
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default VendorNavItems;
