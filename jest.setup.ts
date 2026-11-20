import "@testing-library/jest-dom";

const style = document.createElement("style");
style.textContent = `
:root {
  --color-void: #0A0A0A;
  --color-paper: #F2F2F2;
  --color-signal: #E63946;
  --color-muted: #6B6B6B;
  --color-layer-1: #141414;
  --color-layer-2: #1E1E1E;
  --color-border-subtle: rgba(242,242,242,0.12);

  --bg-primary: var(--color-void);
  --bg-elevated: var(--color-layer-1);
  --bg-overlay: var(--color-layer-2);
  --text-primary: var(--color-paper);
  --text-secondary: var(--color-muted);
  --accent: var(--color-signal);
  --focus-ring: var(--color-signal);
  --border-subtle: var(--color-border-subtle);

  --font-display: "Space Grotesk", sans-serif;
  --font-body: "DM Sans", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --text-display: clamp(3rem, 8vw, 6rem);
  --text-h1: clamp(2.25rem, 5vw, 3.5rem);
  --text-h2: clamp(1.5rem, 3vw, 2rem);
  --text-body: clamp(1rem, 1.25vw, 1.125rem);
  --text-small: 0.875rem;
  --text-mono: 0.8125rem;

  --leading-display: 1.1;
  --leading-body: 1.6;
  --leading-mono: 1.5;

  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --space-5xl: 8rem;

  --container-max: 1200px;
  --container-max-wide: 1400px;
  --container-padding: clamp(1.5rem, 4vw, 3rem);
  --gap: clamp(1rem, 2.5vw, 2rem);
  --section-padding: clamp(4rem, 10vw, 8rem);
  --stack-gap: clamp(1.5rem, 3vw, 2.5rem);
}
`;
document.head.appendChild(style);