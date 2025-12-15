import { TextAlignJustify, UserRoundPen, X } from "lucide-react";
import { useState } from "react";
import { CiHeart, CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";
const Nav = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleNavbar = () => {
    setMobileMenu(!mobileMenu);
  };
  return (
    <header>
      <nav className="m-2 flex justify-between items-center flex-wrap md:mx-10 p-4">
        <div className="logo flex justify-between ">
          <img src={logo} alt="logo" className=" h-8 w-10" />
          <h1 className="font-bold text-4xl">Furniro</h1>
        </div>
        <ul className="hidden lg:flex  justify-between items-center gap-4 font-medium">
          <li className="mx-4">
            <Link to="#" className="hover-text-neutral">
              Home
            </Link>
          </li>
          <li className="mx-4 hover-text-neutral">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="mx-4 hover-text-neutral">
            <Link to="/about">About</Link>
          </li>
          <li className="mx-4">
            <Link to="/contact" className="hover-text-neutral">
              Contact
            </Link>
          </li>
        </ul>
        <div className="hidden lg:flex  gap-2  items-center justify-center">
          <Link to="#" className="mx-4 ">
            <UserRoundPen
              strokeWidth={0.9}
              size={23}
              className="hover-text-neutral"
            />
          </Link>
          <Link to="#" className="mx-4 hover-text-neutral">
            <CiSearch size={23} />
          </Link>
          <Link href="#" className="mx-4 hover-text-neutral">
            <CiHeart size={23} />
          </Link>
          <Link href="#" className="mx-4 hover-text-neutral">
            <CiShoppingCart size={23} />
          </Link>
        </div>
        {/* mobile menu */}
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
        {mobileMenu && (
          <div className="md:hidden fixed top-20 left-0 right-0 bg-white p-3 z-50 ">
            <ul className="flex flex-col justify-between items-center gap-4 font-medium">
              <li className="">
                <Link to="#" className="hover-text-neutral">
                  Home
                </Link>
              </li>
              <li className="mx-4">
                <Link to="/shop" className="hover-text-neutral">
                  Shop
                </Link>
              </li>
              <li className="mx-4">
                <Link to="/about" className="hover-text-neutral">
                  About
                </Link>
              </li>
              <li className="mx-4">
                <Link to="/contact" className="hover-text-neutral">
                  Contact
                </Link>
              </li>
            </ul>
            <div className=" mt-4 flex gap-2 items-center justify-center">
              <Link href="#" className="mx-4 hover-text-neutral">
                <UserRoundPen strokeWidth={0.9} size={23} />
              </Link>
              <Link href="#" className="mx-4 hover-text-neutral">
                <CiSearch size={23} />
              </Link>
              <Link href="#" className="mx-4 hover-text-neutral">
                <CiHeart size={23} />
              </Link>
              <Link href="#" className="mx-4 hover-text-neutral">
                <CiShoppingCart size={23} />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
