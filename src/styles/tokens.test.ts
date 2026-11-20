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
    "--text-primary",
    "--text-secondary",
    "--accent",
    "--focus-ring",
    "--border-subtle",
    "--font-display",
    "--font-body",
    "--font-mono",
    "--text-display",
    "--text-h1",
    "--text-h2",
    "--text-body",
    "--text-small",
    "--text-mono",
    "--leading-display",
    "--leading-body",
    "--leading-mono",
    "--space-xs",
    "--space-sm",
    "--space-md",
    "--space-lg",
    "--space-xl",
    "--space-2xl",
    "--space-3xl",
    "--space-4xl",
    "--space-5xl",
    "--container-max",
    "--container-max-wide",
    "--container-padding",
    "--gap",
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
    expect(tokens.get("--color-layer-1")).toBe("#141414");
    expect(tokens.get("--color-layer-2")).toBe("#1E1E1E");
    expect(tokens.get("--color-border-subtle")).toBe("rgba(242,242,242,0.12)");
  });

  it("has correct semantic mappings", () => {
    expect(tokens.get("--bg-primary")).toBe("var(--color-void)");
    expect(tokens.get("--bg-elevated")).toBe("var(--color-layer-1)");
    expect(tokens.get("--bg-overlay")).toBe("var(--color-layer-2)");
    expect(tokens.get("--text-primary")).toBe("var(--color-paper)");
    expect(tokens.get("--text-secondary")).toBe("var(--color-muted)");
    expect(tokens.get("--accent")).toBe("var(--color-signal)");
    expect(tokens.get("--focus-ring")).toBe("var(--color-signal)");
    expect(tokens.get("--border-subtle")).toBe("var(--color-border-subtle)");
  });

  it("has correct typography tokens", () => {
    expect(tokens.get("--font-display")).toBe('"Space Grotesk", sans-serif');
    expect(tokens.get("--font-body")).toBe('"DM Sans", sans-serif');
    expect(tokens.get("--font-mono")).toBe('"JetBrains Mono", monospace');
    expect(tokens.get("--text-display")).toBe("clamp(3rem, 8vw, 6rem)");
    expect(tokens.get("--text-h1")).toBe("clamp(2.25rem, 5vw, 3.5rem)");
    expect(tokens.get("--text-h2")).toBe("clamp(1.5rem, 3vw, 2rem)");
  });

  it("has correct spacing tokens", () => {
    expect(tokens.get("--space-xs")).toBe("0.25rem");
    expect(tokens.get("--space-md")).toBe("1rem");
    expect(tokens.get("--space-xl")).toBe("2rem");
    expect(tokens.get("--container-max")).toBe("1200px");
    expect(tokens.get("--container-max-wide")).toBe("1400px");
    expect(tokens.get("--gap")).toBe("clamp(1rem, 2.5vw, 2rem)");
  });
});