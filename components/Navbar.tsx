"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  lang: "et" | "en";
}

const navItemsEt: NavItem[] = [
  { label: "Tutvustus", href: "/et/tutvustus" },
  { label: "Ajalugu", href: "/et/ajalugu" },
  { label: "Korterid", href: "/et/korterid" },
  { label: "Kontakt", href: "/et/kontakt" },
];

const navItemsEn: NavItem[] = [
  { label: "Overview", href: "/en/overview" },
  { label: "History", href: "/en/history" },
  { label: "Apartments", href: "/en/apartments" },
  { label: "Contact", href: "/en/contact" },
];

export default function Navbar({ lang }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = lang === "et" ? navItemsEt : navItemsEn;
  const altLang = lang === "et" ? "en" : "et";
  const altPath = pathname.replace(`/${lang}`, `/${altLang}`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
        scrolled
          ? "bg-stone-950/95 backdrop-blur-md border-b border-stone-800/30 py-4"
          : "bg-transparent py-7"
      }`}
    >
      <nav className="max-w-screen-xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex flex-col leading-none group"
          aria-label="Raua 22 — Avaleht"
        >
          <span
            className="font-serif text-xl font-light tracking-widest text-stone-100 group-hover:text-stone-300 transition-colors duration-300"
          >
            Raua 22
          </span>
          <span className="label-eyebrow text-stone-400 mt-0.5">
            Kadriorg
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-underline font-sans text-xs tracking-widest uppercase transition-colors duration-300 ${
                    isActive
                      ? "text-stone-200 active"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Lang switcher + mobile toggle */}
        <div className="flex items-center gap-6">
          <Link
            href={altPath}
            className="font-sans text-xs tracking-widest uppercase text-stone-500 hover:text-bronze-light transition-colors duration-300 border border-stone-700 hover:border-bronze-light px-3 py-1.5"
            aria-label={`Switch to ${altLang === "et" ? "Estonian" : "English"}`}
          >
            {altLang.toUpperCase()}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-6 bg-stone-300 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-stone-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-stone-300 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-600 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 pt-4 pb-8 flex flex-col gap-6 bg-stone-950/98 border-t border-stone-800/30">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${
                    isActive ? "text-stone-200" : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
