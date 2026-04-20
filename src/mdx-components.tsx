import type { ComponentProps } from "react";
import { Link as RouterLink } from "@tanstack/react-router";
import { Section } from "./components/Section";
import { NumberedItem } from "./components/NumberedItem";
import { MetricCallout } from "./components/MetricCallout";
import { EmailCapture } from "./components/EmailCapture";
import { ContactForm } from "./components/ContactForm";
import { MonoInline } from "./components/MonoInline";
import { Lede } from "./components/Lede";

type AnchorProps = ComponentProps<"a">;

// Internal links go through TanStack Router for SPA navigation.
// External links render as plain <a> with safe defaults.
function MdxAnchor({ href, children, ...rest }: AnchorProps) {
  if (!href) return <>{children}</>;
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      // @ts-expect-error — href is typed too broadly for Router, but at runtime
      // it accepts any internal path string.
      <RouterLink to={href} className="link-text">
        {children}
      </RouterLink>
    );
  }
  const isExternal = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      className="link-text"
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Components available inside any .mdx page. Map is scoped per route via
 * <MDXProvider> in the route component.
 */
export const mdxComponents = {
  // Structural
  Section,
  NumberedItem,
  MetricCallout,
  EmailCapture,
  ContactForm,
  Lede,
  MonoInline,

  // Markdown element overrides — keep markdown authoring friendly while
  // giving each element its brand-class styling.
  a: MdxAnchor,
  h1: (p: ComponentProps<"h1">) => <h1 className="display-hero" {...p} />,
  h2: (p: ComponentProps<"h2">) => <h2 className="display-section" {...p} />,
  h3: (p: ComponentProps<"h3">) => <h3 className="display-mini" {...p} />,
  p: (p: ComponentProps<"p">) => <p className="prose-body mt-6 max-w-[560px]" {...p} />,
  strong: (p: ComponentProps<"strong">) => <strong style={{ color: "var(--ink)", fontWeight: 500 }} {...p} />,
  code: (p: ComponentProps<"code">) => <code className="mono-inline" {...p} />,
};

// Type augmentation so `<Content />` prop inference works with our provider.
declare module "mdx/types" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntrinsicComponents {}
}
