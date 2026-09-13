"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll when navigating to hash from another page
  useEffect(() => {
    if (isHomePage && typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const scrollToTarget = () => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      const timer = setTimeout(scrollToTarget, 150);
      return () => clearTimeout(timer);
    }
  }, [isHomePage, pathname]);

  const navLinks = ["Home", "About", "Events", "Team", "Contact"];
  const isVisible = !isHomePage || showNavbar;

  return (
    <>
      <div
        className={`fixed top-5 md:top-8 left-1/2 transform -translate-x-1/2 z-50 bg-[#D9F0DF] rounded-full transition-transform duration-500 font-font3 drop-shadow-2xl shadow-2xl ${isVisible ? "scale-100" : "scale-0"
          }`}
      >
        <nav className="flex items-center justify-center sm:space-x-1 md:space-x-3 text-xs sm:text-base md:text-xl lg:text-2xl text-[#232E26] font-black md:font-black px-10 sm:px-12 md:px-14">
          {/* Logo link */}
          {isHomePage ? (
            <ScrollLink
              to="home"
              spy={true}
              smooth={true}
              offset={-80}
              duration={200}
              className="cursor-pointer"
            >
              <Image
                src={"/assets/arhamlogonoremovebg.png"}
                alt="Arham Logo"
                className="h-10 sm:h-12 md:h-14 py-0.5 md:py-1 w-auto bg-transparent"
                width={50}
                height={50}
              />
            </ScrollLink>
          ) : (
            <Link href="/#home" className="cursor-pointer">
              <Image
                src={"/assets/arhamlogonoremovebg.png"}
                alt="Arham Logo"
                className="h-10 sm:h-12 md:h-14 py-0.5 md:py-1 w-auto bg-transparent"
                width={50}
                height={50}
              />
            </Link>
          )}

          {/* Dynamic Links */}
          {navLinks.map((section) =>
            isHomePage ? (
              <ScrollLink
                key={section}
                to={section.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-80}
                duration={200}
                className="cursor-pointer hover:bg-green-800 hover:text-white px-1.5 py-0.5 rounded-full sm:py-1 sm:px-2 md:py-1.5 md:px-5 lg:px-8 transition-colors duration-200"
              >
                {section}
              </ScrollLink>
            ) : (
              <Link
                key={section}
                href={`/#${section.toLowerCase()}`}
                className="cursor-pointer hover:bg-green-800 hover:text-white px-1.5 py-0.5 rounded-full sm:py-1 sm:px-2 md:py-1.5 md:px-5 lg:px-8 transition-colors duration-200"
              >
                {section}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
}

