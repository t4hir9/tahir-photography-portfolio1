import fs from "fs";
import path from "path";

describe("Design Tokens (tokens.css)", () => {
  const tokensPath = path.resolve(__dirname, "tokens.css");
  const tokensContent = fs.readFileSync(tokensPath, "utf-8");

  // Extract all --token: value; declarations from :root block
  const rootBlockMatch = tokensContent.match(/:root\s*{([^}]+)}/s);
  const rootBlock = rootBlockMatch ? rootBlockMatch[1] : "";

  const tokenRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
  const tokens = new Map<string, string>();
  let match;
  while ((match = tokenRegex.exec(rootBlock)) !== null) {
    tokens.set(match[1].trim(), match[2].trim());
  }

  const expectedTokens = [
    "--color-void",
    "--color-paper",
    "--color-signal",
    "--color-muted",
    "--color-layer-1",
    "--color-layer-2",
    "--color-border-subtle",
    "--bg-primary",
    "--bg-elevated",
    "--bg-overlay",
    "--bg-tertiary",
    "--text-primary",
    "--text-secondary",
    "--text-muted",
    "--text-inverse",
    "--accent",
    "--focus-ring",
    "--border-subtle",
    "--font-display",
    "--font-body",
    "--font-mono",
    "--text-hero",
    "--text-display",
    "--text-h1",
    "--text-h2",
    "--text-3xl",
    "--text-body",
    "--text-base",
    "--text-small",
    "--text-sm",
    "--text-xs",
    "--text-mono",
    "--leading-tight",
    "--leading-display",
    "--leading-body",
    "--leading-relaxed",
    "--leading-mono",
    "--space-xs",
    "--space-sm",
    "--space-md",
    "--space-base",
    "--space-lg",
    "--space-xl",
    "--space-2xl",
    "--space-3xl",
    "--space-4xl",
    "--space-5xl",
    "--space-hero",
    "--space-section",
    "--gap",
    "--radius-sm",
    "--radius-md",
    "--radius-lg",
    "--radius-full",
    "--transition-fast",
    "--transition-slow",
    "--ease-out",
    "--ease-spring",
    "--duration-fast",
    "--duration-slow",
    "--stagger-delay",
    "--container-max",
    "--container-max-wide",
    "--container-padding",
    "--section-padding",
    "--stack-gap",
  ];

  it("tokens.css contains all expected design tokens", () => {
    expectedTokens.forEach((token) => {
      expect(tokens.has(token)).toBe(true);
    });
  });

  it("has correct color values", () => {
    expect(tokens.get("--color-void")).toBe("#0A0A0A");
    expect(tokens.get("--color-paper")).toBe("#F2F2F2");
    expect(tokens.get("--color-signal")).toBe("#E63946");
    expect(tokens.get("--color-muted")).toBe("#6B6B6B");
    expect(tokens.get("--color-layer-1")).toBe("#111111");
    expect(tokens.get("--color-layer-2")).toBe("#1A1A1A");
    expect(tokens.get("--color-border-subtle")).toBe("rgba(242,242,242,0.08)");
  });

  it("has correct semantic mappings", () => {
    expect(tokens.get("--bg-primary")).toBe("var(--color-void)");
    expect(tokens.get("--bg-elevated")).toBe("var(--color-layer-1)");
    expect(tokens.get("--bg-overlay")).toBe("var(--color-layer-2)");
    expect(tokens.get("--bg-tertiary")).toBe("var(--color-layer-2)");
    expect(tokens.get("--text-primary")).toBe("var(--color-paper)");
    expect(tokens.get("--text-secondary")).toBe("var(--color-muted)");
    expect(tokens.get("--text-muted")).toBe("var(--color-muted)");
    expect(tokens.get("--text-inverse")).toBe("var(--color-void)");
    expect(tokens.get("--accent")).toBe("var(--color-signal)");
    expect(tokens.get("--focus-ring")).toBe("var(--color-signal)");
    expect(tokens.get("--border-subtle")).toBe("var(--color-border-subtle)");
  });

  it("has correct typography tokens", () => {
    expect(tokens.get("--font-display")).toBe('"Space Grotesk", sans-serif');
    expect(tokens.get("--font-body")).toBe('"DM Sans", sans-serif');
    expect(tokens.get("--font-mono")).toBe('"JetBrains Mono", monospace');
    expect(tokens.get("--text-hero")).toBe("clamp(4rem, 12vw, 14rem)");
    expect(tokens.get("--text-display")).toBe("clamp(3rem, 8vw, 6rem)");
    expect(tokens.get("--text-h1")).toBe("clamp(2.5rem, 5vw, 4rem)");
    expect(tokens.get("--text-h2")).toBe("clamp(1.5rem, 3vw, 2rem)");
    expect(tokens.get("--text-3xl")).toBe("clamp(1.5rem, 3vw, 2rem)");
    expect(tokens.get("--text-base")).toBe("clamp(1rem, 1.5vw, 1.125rem)");
    expect(tokens.get("--text-sm")).toBe("0.875rem");
    expect(tokens.get("--text-xs")).toBe("0.75rem");
    expect(tokens.get("--leading-tight")).toBe("1.05");
  });

  it("has correct spacing tokens", () => {
    expect(tokens.get("--space-xs")).toBe("0.25rem");
    expect(tokens.get("--space-md")).toBe("1rem");
    expect(tokens.get("--space-base")).toBe("1rem");
    expect(tokens.get("--space-xl")).toBe("2rem");
    expect(tokens.get("--space-hero")).toBe("clamp(6rem, 15vh, 12rem)");
    expect(tokens.get("--space-section")).toBe("clamp(4rem, 10vw, 8rem)");
    expect(tokens.get("--gap")).toBe("clamp(1rem, 3vw, 2rem)");
    expect(tokens.get("--container-max")).toBe("1200px");
    expect(tokens.get("--container-max-wide")).toBe("1400px");
  });

  it("has correct radius and transition tokens", () => {
    expect(tokens.get("--radius-sm")).toBe("4px");
    expect(tokens.get("--radius-md")).toBe("8px");
    expect(tokens.get("--radius-lg")).toBe("12px");
    expect(tokens.get("--radius-full")).toBe("9999px");
    expect(tokens.get("--transition-fast")).toBe("200ms");
    expect(tokens.get("--transition-slow")).toBe("800ms");
    expect(tokens.get("--ease-out")).toBe("cubic-bezier(0.25, 0.46, 0.45, 0.94)");
    expect(tokens.get("--ease-spring")).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
    expect(tokens.get("--duration-fast")).toBe("200ms");
    expect(tokens.get("--duration-slow")).toBe("800ms");
    expect(tokens.get("--stagger-delay")).toBe("40ms");
    expect(tokens.get("--leading-relaxed")).toBe("1.7");
  });
});