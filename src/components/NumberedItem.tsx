import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface NumberedItemProps {
  num: string;
  title: string;
  /** Optional monospace specification line shown beneath the title. */
  spec?: ReactNode;
  body: ReactNode;
  link?: {
    to: "/data" | "/ai" | "/platform" | "/fellowship" | "/about" | "/contact";
    label: string;
  };
}

export function NumberedItem({ num, title, spec, body, link }: NumberedItemProps) {
  return (
    <div className="grid grid-cols-[48px_1fr] gap-4 md:gap-6 py-10">
      <div className="numbered-item__num">{num}</div>
      <div>
        <h3 className="display-mini">{title}</h3>
        {spec && <div className="mono-inline mt-2">{spec}</div>}
        <p className="prose-body mt-3 max-w-[520px]">{body}</p>
        {link && (
          <Link to={link.to} className="link-arrow mt-4 inline-flex">
            {link.label} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
