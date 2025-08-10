import { getSingletonHighlighter } from "shiki";


let highlighterPromise: ReturnType<typeof getSingletonHighlighter> | null = null;

export async function highlightCode(
  code: string,
  lang: string = "ts",
  theme: string = "nord"
): Promise<string> {
  if (!highlighterPromise) {
    highlighterPromise = getSingletonHighlighter({
      themes: [theme],
      langs: [lang],
    });
  }

  const highlighter = await highlighterPromise;

  return highlighter.codeToHtml(code, {
    lang,
    theme,
  });
}