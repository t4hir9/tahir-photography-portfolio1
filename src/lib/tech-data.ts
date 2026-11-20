export interface TechProject {
  id: string;
  commitHash: string;
  shortHash: string;
  message: string;
  date: string;
  files: string[];
  compositionName: string;
  description: string;
  githubUrl?: string;
  tags: string[];
}

export const techProjects: TechProject[] = [
  {
    id: "iris-transition",
    commitHash: "a1b2c3d4e5f6789012345678901234567890abcd",
    shortHash: "a1b2c3d",
    message: "Add iris transition component with configurable radius and easing",
    date: "2024-11-15",
    files: [
      "src/components/transitions/IrisTransition.tsx",
      "src/components/transitions/IrisTransition.module.css",
      "src/lib/transition-presets.ts",
    ],
    compositionName: "IrisTransitionDemo",
    description: "Circular reveal transition with spring physics. Used in tip-8 for scene changes.",
    githubUrl: "https://github.com/user/remotion-projects/commit/a1b2c3d",
    tags: ["Remotion", "Transitions", "TypeScript", "Spring Physics"],
  },
  {
    id: "animated-subtitles",
    commitHash: "f6e5d4c3b2a10987654321fedcba09876543210",
    shortHash: "f6e5d4c",
    message: "Implement animated subtitles with karaoke-style word highlighting",
    date: "2024-11-10",
    files: [
      "src/components/subtitles/AnimatedSubtitles.tsx",
      "src/components/subtitles/WordHighlighter.tsx",
      "src/lib/subtitle-parser.ts",
    ],
    compositionName: "AnimatedSubtitlesDemo",
    description: "SRT/ASS parser with per-word timing. Karaoke highlight follows audio waveform.",
    githubUrl: "https://github.com/user/remotion-projects/commit/f6e5d4c",
    tags: ["Remotion", "Subtitles", "Animation", "Parsing"],
  },
  {
    id: "lower-third-system",
    commitHash: "3c2b1a0f9e8d7c6b5a4938271605f4e3d2c1b0a9",
    shortHash: "3c2b1a0",
    message: "Build lower third system with template variants and safe zones",
    date: "2024-11-05",
    files: [
      "src/components/lowerthird/LowerThird.tsx",
      "src/components/lowerthird/templates/*.tsx",
      "src/lib/safe-zones.ts",
    ],
    compositionName: "LowerThirdDemo",
    description: "Template-based lower thirds with title-safe and action-safe zone guides. 4 variants.",
    githubUrl: "https://github.com/user/remotion-projects/commit/3c2b1a0",
    tags: ["Remotion", "Templates", "Broadcast", "Design System"],
  },
  {
    id: "supporting-graphics",
    commitHash: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
    shortHash: "9a8b7c6",
    message: "Create supporting graphics library: charts, diagrams, progress rings",
    date: "2024-10-28",
    files: [
      "src/components/graphics/Charts.tsx",
      "src/components/graphics/ProgressRing.tsx",
      "src/components/graphics/Diagram.tsx",
      "src/lib/chart-data.ts",
    ],
    compositionName: "SupportingGraphicsDemo",
    description: "Data-driven motion graphics: bar charts, line charts, progress rings, flow diagrams.",
    githubUrl: "https://github.com/user/remotion-projects/commit/9a8b7c6",
    tags: ["Remotion", "Data Viz", "Charts", "SVG"],
  },
  {
    id: "opening-sequence",
    commitHash: "b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9",
    shortHash: "b0c1d2e",
    message: "Design opening sequence with logo animation and particle system",
    date: "2024-10-20",
    files: [
      "src/components/opening/OpeningSequence.tsx",
      "src/components/opening/ParticleSystem.tsx",
      "src/lib/particle-physics.ts",
    ],
    compositionName: "OpeningSequenceDemo",
    description: "Logo reveal with particle burst, motion trails, and color palette transition.",
    githubUrl: "https://github.com/user/remotion-projects/commit/b0c1d2e",
    tags: ["Remotion", "Particles", "Logo Animation", "WebGL"],
  },
];