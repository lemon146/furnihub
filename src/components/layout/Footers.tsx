"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";

const Footers: React.FC = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".footer-el", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="bg-white border-t border-gray-100 pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand Info */}
          <div className="md:col-span-4 footer-el">
            <img src={Logo} alt="Furniro" className="h-8 mb-6 object-contain" />
            <p className="text-[#9F9F9F] text-sm md:text-base leading-relaxed max-w-xs">
              400 University Drive Suite 200 Coral Gables, <br />
              FL 33134 USA
            </p>
            <div className="flex gap-4 mt-6">
              {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map(
                (Icon, i) => (
                  <Icon
                    key={i}
                    className="text-xl text-black hover:text-[#B88E2F] cursor-pointer transition-colors"
                  />
                ),
              )}
            </div>
          </div>

          {/* Links Section */}
          <div className="md:col-span-2 footer-el">
            <h6 className="text-[#9F9F9F] font-medium mb-8">Links</h6>
            <ul className="flex flex-col gap-5 text-sm md:text-base font-bold text-black">
              <li>
                <Link to="/" className="hover:text-[#B88E2F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-[#B88E2F] transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#B88E2F] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#B88E2F] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="md:col-span-2 footer-el">
            <h6 className="text-[#9F9F9F] font-medium mb-8">Help</h6>
            <ul className="flex flex-col gap-5 text-sm md:text-base font-bold text-black">
              <li>
                <Link to="/" className="hover:text-[#B88E2F] transition-colors">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#B88E2F] transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#B88E2F] transition-colors">
                  Privacy Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-4 footer-el">
            <h6 className="text-[#9F9F9F] font-medium mb-8">Newsletter</h6>
            <form className="flex items-center gap-3 border-b border-black pb-1">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[#9F9F9F]"
              />
              <button
                type="submit"
                className="text-sm font-bold uppercase tracking-tight hover:text-[#B88E2F] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-[#D9D9D9] footer-el">
          <p className="text-black text-sm md:text-base">
            2026 Furniro. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
