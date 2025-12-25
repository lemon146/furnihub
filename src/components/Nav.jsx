"use client";

import gsap from "gsap";
import { TextAlignJustify, UserRoundPen, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { CiHeart, CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";

const Nav = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleNavbar = () => setMobileMenu(!mobileMenu);

  // Refs for animations
  const navRef = useRef(null);
  const menuItemsRef = useRef([]);
  const iconRef = useRef([]);
  const logoRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      if (logoRef.current) {
        gsap.from(logoRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Desktop menu items stagger
      gsap.from(menuItemsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Desktop icons stagger
      gsap.from(iconRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // Mobile menu slide-in if open on load
      if (mobileMenuRef.current && mobileMenu) {
        gsap.from(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, [mobileMenu]);

  return (
    <header ref={navRef}>
      <nav className="m-2 flex justify-between items-center flex-wrap md:mx-10 p-4">
        <div className="logo flex justify-between items-center" ref={logoRef}>
          <img src={logo} alt="logo" className="h-8 w-10" />
          <h1 className="font-bold text-4xl">Furniro</h1>
        </div>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
          {[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item, i) => (
            <li
              key={item.name}
              className="relative group"
              ref={(el) => (menuItemsRef.current[i] = el)}
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

        {/* Desktop icons */}
        <div className="hidden lg:flex items-center gap-2">
          {[
            { Icon: UserRoundPen },
            { Icon: CiSearch },
            { Icon: CiHeart },
            { Icon: CiShoppingCart },
          ].map(({ Icon }, i) => (
            <Link
              key={i}
              to="#"
              ref={(el) => (iconRef.current[i] = el)}
              className="group mx-2 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
            >
              <Icon
                size={22}
                strokeWidth={0.9}
                className="text-gray-600 transition-all duration-300 group-hover:text-black group-hover:scale-110 group-hover:-translate-y-[2px]"
              />
            </Link>
          ))}
        </div>

        {/* mobile menu toggle */}
        <button
          className="menu lg:hidden cursor-pointer hover-text-neutral"
          onClick={toggleNavbar}
        >
          {mobileMenu ? (
            <X strokeWidth={0.75} />
          ) : (
            <TextAlignJustify strokeWidth={0.75} />
          )}
        </button>

        {/* Mobile menu */}
        {mobileMenu && (
          <div
            ref={mobileMenuRef}
            className="md:hidden fixed top-20 left-0 right-0 bg-white p-3 z-50"
          >
            <ul className="flex flex-col justify-between items-center gap-4 font-medium">
              {["Home", "Shop", "About", "Contact"].map((item, i) => (
                <li key={i}>
                  <Link to="#" className="hover-text-neutral">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2 items-center justify-center">
              {[UserRoundPen, CiSearch, CiHeart, CiShoppingCart].map(
                (Icon, i) => (
                  <Link key={i} to="#" className="mx-4 hover-text-neutral">
                    <Icon size={23} />
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
