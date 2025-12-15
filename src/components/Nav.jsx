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
        <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
          {[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.name} className="relative group">
              <Link
                to={item.path}
                className="transition-colors duration-300 group-hover:text-black"
              >
                {item.name}

                {/* underline */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          {[
            { Icon: UserRoundPen },
            { Icon: CiSearch },
            { Icon: CiHeart },
            { Icon: CiShoppingCart },
          ].map(({ Icon }, index) => (
            <Link
              key={index}
              to="#"
              className="group mx-2 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 "
            >
              <Icon
                size={22}
                strokeWidth={0.9}
                className="text-gray-600 transition-all duration-300 group-hover:text-black group-hover:scale-110 group-hover:-translate-y-[2px]"
              />
            </Link>
          ))}
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
