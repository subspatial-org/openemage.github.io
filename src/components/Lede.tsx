import type { ReactNode } from "react";

/** Opening paragraph of a section — larger, lighter weight than body. */
export function Lede({ children }: { children: ReactNode }) {
  return <p className="prose-lead mt-8 max-w-[560px]">{children}</p>;
}
