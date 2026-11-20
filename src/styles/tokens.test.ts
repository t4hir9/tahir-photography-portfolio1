import "@/styles/globals.css";

describe("Design Tokens", () => {
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

  it("renders all design tokens as CSS custom properties on :root", () => {
    const rootStyles = getComputedStyle(document.documentElement);

    expectedTokens.forEach((token) => {
      const value = rootStyles.getPropertyValue(token).trim();
      expect(value).not.toBe("");
      expect(value).not.toBe("initial");
    });
  });

  it("has correct color values", () => {
    const rootStyles = getComputedStyle(document.documentElement);

    expect(rootStyles.getPropertyValue("--color-void").trim().toLowerCase()).toBe("#0a0a0a");
    expect(rootStyles.getPropertyValue("--color-paper").trim().toLowerCase()).toBe("#f2f2f2");
    expect(rootStyles.getPropertyValue("--color-signal").trim().toLowerCase()).toBe("#e63946");
    expect(rootStyles.getPropertyValue("--color-muted").trim().toLowerCase()).toBe("#6b6b6b");
    expect(rootStyles.getPropertyValue("--color-layer-1").trim().toLowerCase()).toBe("#141414");
    expect(rootStyles.getPropertyValue("--color-layer-2").trim().toLowerCase()).toBe("#1e1e1e");
  });

  it("has correct semantic mappings", () => {
    const rootStyles = getComputedStyle(document.documentElement);

    expect(rootStyles.getPropertyValue("--bg-primary").trim()).toBe("var(--color-void)");
    expect(rootStyles.getPropertyValue("--bg-elevated").trim()).toBe("var(--color-layer-1)");
    expect(rootStyles.getPropertyValue("--bg-overlay").trim()).toBe("var(--color-layer-2)");
    expect(rootStyles.getPropertyValue("--text-primary").trim()).toBe("var(--color-paper)");
    expect(rootStyles.getPropertyValue("--text-secondary").trim()).toBe("var(--color-muted)");
    expect(rootStyles.getPropertyValue("--accent").trim()).toBe("var(--color-signal)");
    expect(rootStyles.getPropertyValue("--focus-ring").trim()).toBe("var(--color-signal)");
  });
});