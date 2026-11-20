"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import { codeToHtml } from "shiki";
import { CodeLayerProps } from "./types";
import styles from "./CodeLayer.module.css";

interface ShikiLine {
  index: number;
}

export function CodeLayer({ progress, code, language = "tsx", activeLineRanges = [] }: CodeLayerProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const highlight = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: "github-dark",
          transformers: [
            {
              pre(node) {
                if (node.properties) {
                  node.properties.class = [...(node.properties.class as string[] || []), styles.codeBlock].join(" ");
                }
              },
              line(node, line) {
                if (node.properties) {
                  const lineObj = line as number | ShikiLine;
                  const lineNumber = (typeof lineObj === "number" ? lineObj : lineObj.index) + 1;
                  const isActive = activeLineRanges.some(
                    (range) => lineNumber >= range.start && lineNumber <= range.end &&
                              progress >= range.progressStart && progress <= range.progressEnd
                  );
                  if (isActive) {
                    node.properties.class = [...(node.properties.class as string[] || []), styles.activeLine].join(" ");
                  }
                  node.properties["data-line"] = String(lineNumber);
                }
              },
            },
          ],
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Shiki highlighting failed:", error);
        setHighlightedCode('<pre class="' + styles.codeBlock + '"><code>' + escapeHtml(code) + '</code></pre>');
      }
    };

    highlight();
  }, [code, language, progress, activeLineRanges]);

  useEffect(() => {
    const newActiveLine = activeLineRanges.find(
      (range) => progress >= range.progressStart && progress <= range.progressEnd
    )?.start || null;
    setActiveLine(newActiveLine);

    if (codeRef.current && newActiveLine) {
      const lineElement = codeRef.current.querySelector('[data-line="' + newActiveLine + '"]');
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [progress, activeLineRanges]);

  return (
    <div className={styles.codeContainer} aria-label="Code preview">
      <pre
        ref={codeRef}
        className={styles.pre}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      {activeLine && (
        <div className={styles.activeIndicator} aria-live="polite">
          Line {activeLine}
        </div>
      )}
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "&#039;");
}