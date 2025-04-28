"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/svg/logo.svg";
import TopBar from "./TopBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomButton from "@/components/common/CustomButton";
import BottomNavbar from "./BottomNavbar";
import PaddingContainer from "../PaddingContainer";
import { TLocation, TSettings } from "@/interfaces";

const NavBar = ({
  locations,
  settings,
}: {
  locations: TLocation[];
  settings: TSettings;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideTopBar(true);
      } else {
        setHideTopBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar (Hidden on Scroll) */}
      <div
        className={`w-full text-sm text-center transition-all duration-300 ${
          hideTopBar
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <TopBar settings={settings} />
      </div>

      {/* Sticky Navbar */}
      <nav
        className={`h-24   shadow-md z-50 flex justify-center items-center bg-white sticky top-0 transition-all duration-300`}
      >
        <PaddingContainer className="flex px-8 justify-between w-full items-center">
          {/* Desktop Menu */}
          <div className="  hidden lg:flex  justify-between items-center w-full">
            {/* Logo */}
            <Link href={"/"}>
              <Image
                className="h-20 w-fit"
                priority
                src={logo}
                alt="logo"
                width={300}
                height={120}
              />
            </Link>
            <div className="flex items-center gap-5">
              <ul className=" text-base xl:text-lg  flex space-x-5">
                {settings?.nav_links?.map((item, index) => (
                  <li key={index} className="relative group">
                    <Link
                      href={`${item.link}`}
                      className={`flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out group: ${
                        pathName === item.link ? "font-bold" : ""
                      }`}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className="group-hover:rotate-180 transition-transform duration-300"
                          size={16}
                        />
                      )}
                    </Link>
                    {item.children && (
                      <ul
                        className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible 
                      text-primary-title  group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform translate-y-2 group-hover:translate-y-0"
                      >
                        {item.children?.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={`${subItem.link}`}
                              className={`block px-4 py-2 text-sm text-white-700  hover:bg-white ${
                                pathName === subItem.link
                                  ? "underline underline-offset-4"
                                  : ""
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <CustomButton href="/consultation">Free Consultation</CustomButton>
          </div>

          {/* Mobile Menu Button */}
          <Link className="lg:hidden " href={"/"}>
            <Image
              className="h-16 w-fit"
              priority
              src={logo}
              alt="logo"
              width={300}
              height={120}
            />
          </Link>
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </PaddingContainer>

        {/* Logo */}

        {/* Mobile Menu */}
        <aside
          className={`fixed inset-0 bg-white z-30 flex flex-col items-center justify-start pt-16 gap-6 transition-transform duration-300 lg:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } h-screen overflow-y-auto`}
        >
          <button
            className="absolute top-6 right-6 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <X size={28} />
          </button>

          {/* Ensure scrolling works */}
          <ul className="text-lg uppercase font-bold flex flex-col gap-5 w-full px-6">
            <Link onClick={() => setIsOpen(false)} href={"/"}>
              <Image className="h-10  w-fit" src={logo} priority alt="logo" />
            </Link>
            <hr className="border-2 border-primary" />
            {settings.nav_links.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer transition-all duration-300 ease-in-out hover:text-primary underline-offset-4"
              >
                <div className="flex items-center gap-2">
                  <Link onClick={() => setIsOpen(false)} href={`${item.link}`}>
                    {item.label}
                  </Link>
                  {item.children && <ChevronDown size={16} />}
                </div>

                {item.children && (
                  <ul className="pl-4 mt-2">
                    {item.children.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          onClick={() => setIsOpen(false)}
                          href={`${subItem.link}`}
                          className="block py-2 text-sm text-gray-700 hover:text-primary hover:underline underline-offset-4"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </nav>
      <BottomNavbar locations={locations} />
    </>
  );
};

export default NavBar;
