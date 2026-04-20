export interface PageFrontmatter {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
}

/** Map page frontmatter into the meta-tag array TanStack Router's head() expects. */
export function frontmatterToMeta(fm: PageFrontmatter) {
  const meta: Array<Record<string, string>> = [{ title: fm.title }];
  if (fm.description) {
    meta.push({ name: "description", content: fm.description });
  }
  meta.push({ property: "og:title", content: fm.ogTitle ?? fm.title });
  if (fm.ogDescription ?? fm.description) {
    meta.push({
      property: "og:description",
      content: (fm.ogDescription ?? fm.description)!,
    });
  }
  return meta;
}
