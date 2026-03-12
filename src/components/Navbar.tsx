"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fades in the background and border after scrolling down a bit
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.75]);
  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(201, 169, 110, 0)", "rgba(201, 169, 110, 0.15)"]
  );

  const navLinks = [
    { label: "Overview", scrollValue: 0 },
    { label: "The Craft", scrollValue: 0.20 },
    { label: "Our Process", scrollValue: 0.45 },
    { label: "Signatures", scrollValue: 0.70 },
    { label: "Order", scrollValue: 1.0 },
  ];

  const handleScrollTo = (scrollValue: number) => {
    // Determine target based on document's total scrollable height
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: maxScroll * scrollValue,
      behavior: "smooth"
    });
  };

  if (!isMounted) return null;

  return (
    <motion.nav
      style={{
        backgroundColor: `rgba(8, 7, 5, ${bgOpacity.get()})`,
        backdropFilter: backdropBlur,
        borderBottomWidth: "1px",
        borderColor: borderColor,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 h-16"
    >
      <div className="flex items-center space-x-1">
        <button
          onClick={() => handleScrollTo(0)}
          className="font-serif text-2xl tracking-wide text-cream hover:text-white transition-colors flex items-start"
        >
          <span className="italic">Mitu's Cake Story</span>
          <span className="text-gold-antique text-xs ml-1 mt-1">✦</span>
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleScrollTo(link.scrollValue)}
            className="text-cream-muted hover:text-gold-antique transition-colors duration-300"
          >
            {link.label}
          </button>
        ))}
      </div>

      <div>
        <button
          onClick={() => handleScrollTo(1.0)}
          className="relative px-5 py-2 text-sm font-semibold text-cream bg-transparent border border-gold-antique/40 rounded-full hover:border-gold-champagne/80 hover:shadow-[0_0_15px_rgba(226,200,152,0.3)] transition-all duration-300 group overflow-hidden"
        >
          <span className="relative z-10 transition-colors group-hover:text-white">
            Request Your Cake
          </span>
          <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </button>
      </div>
    </motion.nav>
  );
}
