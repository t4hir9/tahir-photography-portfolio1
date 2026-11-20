"use client";

import { useState, useMemo } from "react";
import { DiffPreviewProps } from "./types";
import styles from "./DiffPreview.module.css";

// Mock diff content for demonstration
const mockDiffs: Record<string, string> = {
  "src/components/transitions/IrisTransition.tsx": `+import { useSpring } from "framer-motion";
+import { IrisTransitionProps } from "./types";
+
+export function IrisTransition({ radius, easing, children }: IrisTransitionProps) {
+  const [isOpen, setIsOpen] = useState(false);
+  const spring = useSpring({ radius: isOpen ? radius : 0, config: easing });
+
+  return (
+    <motion.div style={{ clipPath: spring.radius.interpolate(r => \`circle(\${r}px)\`) }}>
+      {children}
+    </motion.div>
+  );
+}`,
  "src/components/transitions/IrisTransition.module.css": `+.iris {
+  position: absolute;
+  inset: 0;
+  border-radius: 50%;
+  transition: clip-path 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
+}
+
+.iris.open {
+  clip-path: circle(var(--radius) at center);
+}`,
  "src/lib/transition-presets.ts": `+export const transitionPresets = {
+  iris: { radius: 800, easing: "spring" },
+  wipe: { direction: "left", easing: "easeInOut" },
+  slide: { distance: "100%", easing: "spring" },
+};`,
};

export function DiffPreview({ files, expanded, onToggle, className = "" }: DiffPreviewProps) {
  return (
    <div className={`${styles.container} ${className}`} role="region" aria-label="Diff preview">
      <button
        className={styles.toggle}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls="diff-content"
      >
        <span className={styles.toggleIcon}>{expanded ? "▼" : "▶"}</span>
        <span>Show diff ({files.length} file{files.length !== 1 ? "s" : ""})</span>
      </button>

      {expanded && (
        <div id="diff-content" data-testid="diff-content" className={styles.content} role="log" aria-live="polite">
          {files.map((file) => (
            <div key={file} className={styles.file}>
              <div className={styles.fileHeader}>
                <span className={styles.fileIcon}>📄</span>
                <code className={styles.filePath}>{file}</code>
              </div>
              <pre className={styles.diff}>
                <code>{mockDiffs[file] || `// Diff for ${file} not available in preview`}</code>
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}