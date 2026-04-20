import { createFileRoute } from "@tanstack/react-router";
import { MDXProvider } from "@mdx-js/react";
import { Layout } from "../components/Layout";
import { mdxComponents } from "../mdx-components";
import Content, { frontmatter } from "../../content/pages/about.mdx";
import { frontmatterToMeta } from "../lib/meta";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: frontmatterToMeta(frontmatter) }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <MDXProvider components={mdxComponents}>
        <Content />
      </MDXProvider>
    </Layout>
  );
}
