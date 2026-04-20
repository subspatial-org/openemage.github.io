import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwind from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Base path:
//   - Custom domain (e.g. subspatial.org via public/CNAME) → "/"
//   - GitHub Pages project site → "/<repo>/" (set via GITHUB_PAGES_BASE)
// Leave GITHUB_PAGES_BASE unset locally and in the custom-domain workflow.
const base = process.env.GITHUB_PAGES_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [
    tsconfigPaths(),
    // MDX must run before the router plugin so generated routes can import .mdx
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
      }),
    },
    TanStackRouterVite({
      routesDirectory: "src/routes",
      generatedRouteTree: "src/routeTree.gen.ts",
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwind(),
  ],
  server: {
    host: "::",
    port: 8080,
  },
});
