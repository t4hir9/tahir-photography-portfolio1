export async function codeToHtml(code: string, options: any): Promise<string> {
  return `<pre><code>${escapeHtml(code)}</code></pre>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "&#039;");
}

export function createHighlighter() {
  return { codeToHtml };
}

export function getSingletonHighlighter() {
  return { codeToHtml };
}