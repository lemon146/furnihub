"use client";

import { useAuth } from "@/context/AuthContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextAlignJustify, UserRoundPen, X } from "lucide-react";
import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import CartDrawer from "../section/CartDrawer";
import WishlistDrawer from "../section/WishlistDrawer";

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
  const { logout, user } = useAuth();

  const navRef = useRef<HTMLElement | null>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".nav-logo", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          menuItemsRef.current,
          {
            opacity: 0,
            y: -10,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".nav-icons",
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        );
    },
    { scope: navRef },
  );

  useGSAP(() => {
    if (mobileMenu) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power3.inOut" },
      );
      gsap.from(".mobile-link", {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.3,
        delay: 0.2,
      });
    }
  }, [mobileMenu]);
  const isLoggedIn = false;

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 md:py-6">
        {/* Desktop & Mobile Logo */}
        <div className="nav-logo flex items-center gap-2 select-none">
          <img src={logo} alt="logo" className="h-8 w-10 object-contain" />
          <h1 className="font-bold text-2xl md:text-3xl tracking-tight text-[#333]">
            Furniro
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-10">
          {navItems.map((item, i) => (
            <li
              key={item.name}
              ref={(el) => {
                if (el) menuItemsRef.current[i] = el;
              }}
            >
              <Link
                to={item.path}
                className="text-sm font-semibold text-[#3A3A3A] hover:text-[#B88E2F] transition-colors duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Action Icons */}
        <div className="hidden lg:flex items-center gap-5">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-[#3A3A3A] hover:text-[#B88E2F]"
              >
                Login
              </Link>
              <span className="text-gray-300">/</span>
              <Link
                to="/register"
                className="text-sm font-semibold text-[#3A3A3A] hover:text-[#B88E2F]"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative group">
              <button className="nav-icons text-[#3A3A3A] hover:text-[#B88E2F]">
                <UserRoundPen size={24} strokeWidth={1.5} />
              </button>

              {/* Profile Dropdown */}
              <div className="absolute right-0 top-full mt-4 w-48 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-gray-50"
                >
                  My Profile
                </Link>
                <Link to="/orders" className="block px-4 py-3 hover:bg-gray-50">
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          <button className="nav-icons text-[#3A3A3A] hover:text-[#B88E2F] active:scale-90">
            <CiSearch size={28} />
          </button>
          <div className="nav-icons">
            <WishlistDrawer />
          </div>
          <div className="nav-icons">
            <CartDrawer />
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-2 text-[#333] active:scale-90 transition-transform"
          onClick={toggleNavbar}
          aria-label="Toggle Menu"
        >
          {mobileMenu ? <X size={28} /> : <TextAlignJustify size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenu && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-8">
              <ul className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <li
                    key={item.name}
                    className="mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    <Link
                      to={item.path}
                      className="text-xl font-bold text-[#3A3A3A] hover:text-[#B88E2F]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mobile-link pt-6 border-t border-gray-100 flex justify-between items-center">
                {!user ? (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className="text-lg font-semibold text-[#3A3A3A]"
                  >
                    Login
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenu(false)}
                    className="p-2 text-[#3A3A3A]"
                  >
                    <UserRoundPen size={26} />
                  </Link>
                )}

                <button className="p-2 text-[#3A3A3A]">
                  <CiSearch size={28} />
                </button>
                <WishlistDrawer />
                <CartDrawer />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
