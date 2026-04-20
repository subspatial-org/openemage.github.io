import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Wordmark";

const items: { to: "/data" | "/ai" | "/platform" | "/fellowship" | "/about"; label: string }[] = [
  { to: "/data", label: "Data" },
  { to: "/ai", label: "AI" },
  { to: "/platform", label: "Platform" },
  { to: "/fellowship", label: "Fellowship" },
  { to: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        borderBottom: scrolled ? "0.5px solid var(--hairline)" : "0.5px solid transparent",
      }}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center shrink-0" aria-label="Subspatial home">
          <Wordmark />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-1" aria-label="Primary">
          {items.map((item, i) => (
            <div key={item.to} className="flex items-center">
              {i > 0 && (
                <span
                  className="hidden lg:inline px-1"
                  style={{ color: "var(--ink-ghost)" }}
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
              <Link
                to={item.to}
                className="px-1 lg:px-2 py-1 text-[14px] transition-colors"
                style={{ color: "var(--ink-muted)" }}
                activeProps={{
                  className: "px-1 lg:px-2 py-1 text-[14px]",
                  style: { color: "var(--ink)" },
                }}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden md:block shrink-0">
          <Link to="/contact" className="btn-pill">
            Build with us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden p-2 -mr-2"
          style={{ color: "var(--ink)" }}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: "var(--hairline)", backgroundColor: "var(--paper)" }}
        >
          <nav className="container-page flex flex-col py-6 gap-4" aria-label="Mobile">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[20px]"
                style={{ color: "var(--ink)" }}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-pill self-start mt-2">
              Build with us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
