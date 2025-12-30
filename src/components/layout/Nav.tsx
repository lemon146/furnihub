"use client";

import gsap from "gsap";
import { TextAlignJustify, UserRoundPen, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { CiHeart, CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Nav: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const toggleNavbar = () => setMobileMenu(!mobileMenu);

  const navRef = useRef<HTMLElement | null>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const iconRef = useRef<HTMLAnchorElement[]>([]);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      if (logoRef.current) {
        gsap.from(logoRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Desktop menu items stagger
      gsap.from(menuItemsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Desktop icons stagger
      gsap.from(iconRef.current, {
        opacity: 0,
        scale: 0.7,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // Animate mobile menu when it appears
      if (mobileMenu && mobileMenuRef.current) {
        gsap.from(mobileMenuRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, [mobileMenu]);

  return (
    <header ref={navRef}>
      <nav className="flex justify-between items-center flex-wrap md:mx-10 p-4">
        {/* LOGO */}
        <div
          className="logo flex justify-between items-center gap-2"
          ref={logoRef}
        >
          <img src={logo} alt="logo" className="h-9 w-11" />
          <h1 className="font-bold text-3xl md:text-4xl">Furniro</h1>
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
          {navItems.map((item, i) => (
            <li
              key={item.name}
              ref={(el) => {
                if (el) menuItemsRef.current[i] = el;
              }}
              className="relative group"
            >
              <Link
                to={item.path}
                className="transition-colors duration-300 group-hover:text-black"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* DESKTOP ICONS */}
        <div className="hidden lg:flex items-center gap-3">
          {[UserRoundPen, CiSearch, CiHeart, CiShoppingCart].map((Icon, i) => (
            <Link
              key={i}
              to="#"
              ref={(el) => {
                if (el) iconRef.current[i] = el;
              }}
              className="group flex h-10 w-10 items-center justify-center transition-transform duration-300"
            >
              <Icon
                size={26}
                strokeWidth={1}
                className="text-gray-700 group-hover:text-black group-hover:scale-110"
              />
            </Link>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="lg:hidden" onClick={toggleNavbar}>
          {mobileMenu ? <X size={26} /> : <TextAlignJustify size={26} />}
        </button>

        {/* MOBILE DROPDOWN MENU */}
        {mobileMenu && (
          <div
            ref={mobileMenuRef}
            className="md:hidden fixed top-17 left-0 right-0 bg-white shadow-lg p-5 z-50"
          >
            <ul className="flex flex-col items-center gap-5 font-medium text-lg">
              {navItems.map((item) => (
                <li key={item.name} onClick={() => setMobileMenu(false)}>
                  <Link to={item.path} className="hover:text-heading">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* MOBILE ICONS */}
            <div className="mt-6 flex gap-4 justify-center">
              {[UserRoundPen, CiSearch, CiHeart, CiShoppingCart].map(
                (Icon, i) => (
                  <Link
                    key={i}
                    to="#"
                    className="text-gray-600 hover:text-black transition"
                  >
                    <Icon size={26} />
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
