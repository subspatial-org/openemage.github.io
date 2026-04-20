import type { ReactNode } from "react";

export interface SectionAnchor {
  num?: string;
  label: string;
}

interface SectionProps {
  anchor: SectionAnchor;
  children: ReactNode;
  /** When true, removes top padding (e.g. hero immediately under nav). */
  flushTop?: boolean;
  /** Optional extra class on the inner content column. */
  contentClassName?: string;
  /** Min-height for hero-style sections. */
  minHeightClassName?: string;
}

/**
 * Two-column editorial section. Anchor in left rail (≥768px),
 * collapses to a single line above content on mobile.
 */
export function Section({
  anchor,
  children,
  flushTop = false,
  contentClassName = "",
  minHeightClassName = "",
}: SectionProps) {
  return (
    <section
      className={[
        "container-page",
        "py-20 md:py-28",
        flushTop ? "pt-10 md:pt-16" : "",
        minHeightClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="md:grid md:grid-cols-[96px_1fr] md:gap-8 lg:gap-12">
        {/* Anchor column */}
        <div className="mb-6 md:mb-0 md:pt-2">
          {anchor.num ? (
            <div className="mono-anchor">
              <div>{anchor.num}</div>
              <div>{anchor.label}</div>
            </div>
          ) : (
            <div className="mono-anchor">{anchor.label}</div>
          )}
        </div>

        {/* Content column */}
        <div className={["max-w-[680px]", contentClassName].filter(Boolean).join(" ")}>
          {children}
        </div>
      </div>
    </section>
  );
}
