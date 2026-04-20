import type { ReactNode } from "react";

/** Inline monospace — use for units, IDs, codes (e.g. `40 nm / px`, `EXP-2419`). */
export function MonoInline({ children }: { children: ReactNode }) {
  return <span className="mono-inline">{children}</span>;
}
