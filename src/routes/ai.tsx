import { createFileRoute } from "@tanstack/react-router";
import { MDXProvider } from "@mdx-js/react";
import { Layout } from "../components/Layout";
import { mdxComponents } from "../mdx-components";
import Content, { frontmatter } from "../../content/pages/ai.mdx";
import { frontmatterToMeta } from "../lib/meta";

export const Route = createFileRoute("/ai")({
  head: () => ({ meta: frontmatterToMeta(frontmatter) }),
  component: AIPage,
});

function AIPage() {
  return (
    <Layout>
      <MDXProvider components={mdxComponents}>
        <Content />
      </MDXProvider>
    </Layout>
  );
}
