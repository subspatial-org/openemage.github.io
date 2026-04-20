import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";

const navLinks: {
  to: "/data" | "/ai" | "/platform" | "/fellowship" | "/about" | "/contact";
  label: string;
}[] = [
  { to: "/data", label: "Data" },
  { to: "/ai", label: "AI" },
  { to: "/platform", label: "Platform" },
  { to: "/fellowship", label: "Fellowship" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--ink)", color: "rgba(255,255,255,0.82)" }}>
      <div className="container-page py-20">
        <div className="flex flex-col gap-12">
          <div>
            <Wordmark style={{ color: "#ffffff" }} />
            <p
              className="mt-4 text-[15px] leading-relaxed max-w-md"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              Building foundational subcellular spatial intelligence.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <nav
              className="flex flex-wrap items-center gap-x-1 gap-y-2"
              aria-label="Footer"
            >
              {navLinks.map((l, i) => (
                <span key={l.to} className="flex items-center">
                  {i > 0 && (
                    <span
                      className="px-2"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                      aria-hidden="true"
                    >
                      ·
                    </span>
                  )}
                  <Link
                    to={l.to}
                    className="text-[14px] transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    {l.label}
                  </Link>
                </span>
              ))}


            </nav>

            <div className="flex gap-4 text-[14px]">
              <a
                href="https://bsky.app/profile/subspatial.org"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Bluesky
              </a>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
              <a
                href="https://github.com/subspatial-org"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                GitHub
              </a>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col gap-2 text-[13px]"
            style={{ borderTop: "0.5px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
          >
            <span>© 2026 Stichting Subspatial · Utrecht, The Netherlands</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>Formerly OPENEMAGE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
