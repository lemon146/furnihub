"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import {
  FaDiscord,
  FaDribbble,
  FaFacebookF,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import Logo from "../assets/images/Logo.png";

const Footers = () => {
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const iconRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer container
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Stagger animation for links
      gsap.from(linksRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Animate social icons with scale & fade
      gsap.from(iconRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-1 mt-10">
      <div className="container mx-auto md:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left">
          {/* Logo */}
          <aside className="flex flex-col items-center sm:items-start">
            <img src={Logo} alt="FurniCo Logo" className="mb-4 w-32" />
            <p className="text-body">
              FurniCo Furniture Ltd.
              <br />
              Coral Gables, FL 33134, USA
            </p>
          </aside>

          {/* Services */}
          <nav>
            <h6 className="footer-title mb-2">Services</h6>
            <ul className="space-y-1">
              {[
                "Custom Furniture",
                "Interior Design",
                "Furniture Delivery",
                "Consultation",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    ref={(el) => (linksRef.current[i] = el)}
                    className="link link-hover text-gray-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav>
            <h6 className="footer-title mb-2">Company</h6>
            <ul className="space-y-1">
              {["About Us", "Contact", "Careers", "Press"].map((item, i) => (
                <li key={i}>
                  <a
                    ref={(el) => (linksRef.current[i + 4] = el)}
                    className="link link-hover text-gray-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav>
            <h6 className="footer-title mb-2">Legal</h6>
            <ul className="space-y-1">
              {["Terms of Use", "Privacy Policy", "Cookie Policy"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      ref={(el) => (linksRef.current[i + 8] = el)}
                      className="link link-hover text-gray-400"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        <hr className="my-6 border-neutral-content/40" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-body">
            © 2023 FurniCo™. All Rights Reserved.
          </span>

          <div className="flex space-x-4">
            {[FaFacebookF, FaDiscord, FaTwitter, FaGithub, FaDribbble].map(
              (Icon, i) => (
                <a
                  key={i}
                  ref={(el) => (iconRef.current[i] = el)}
                  className="text-gray-400 hover:text-heading cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
