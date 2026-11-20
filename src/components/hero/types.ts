export interface HeroProps {
  /** Initial progress (0-1) for the timeline */
  initialProgress?: number;
  /** Called when scrubber progress changes */
  onProgressChange?: (progress: number) => void;
}

export interface TimelineScrubberProps {
  /** Current progress (0-1) */
  progress: number;
  /** Callback when progress changes */
  onScrub: (progress: number) => void;
  /** Whether scrubber is disabled */
  disabled?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Called when scrubbing starts */
  onScrubStart?: () => void;
  /** Called when scrubbing ends */
  onScrubEnd?: () => void;
}

export interface LayerStackProps {
  /** Current progress (0-1) driving all layers */
  progress: number;
  /** Video duration in seconds */
  videoDuration: number;
  /** Total frames in Remotion composition */
  totalFrames: number;
  /** FPS of Remotion composition */
  fps: number;
}

export interface VideoLayerProps {
  /** Current progress (0-1) */
  progress: number;
  /** Video duration in seconds */
  duration: number;
  /** Video source URLs */
  sources: {
    mp4: string;
    webm: string;
  };
  /** Poster image URL */
  poster?: string;
}

export interface OverlayLayerProps {
  /** Current progress (0-1) */
  progress: number;
  /** Total frames in composition */
  totalFrames: number;
  /** FPS of composition */
  fps: number;
  /** Remotion composition component */
  composition: React.ComponentType<any>;
  /** Composition props */
  compositionProps?: Record<string, any>;
}

export interface CodeLayerProps {
  /** Current progress (0-1) */
  progress: number;
  /** Code content to display */
  code: string;
  /** Language for syntax highlighting */
  language?: string;
  /** Lines to highlight as "active" based on progress */
  activeLineRanges?: Array<{ start: number; end: number; progressStart: number; progressEnd: number }>;
}

export interface HeroMetaProps {
  /** Logo image source */
  logoSrc: string;
  /** Tagline text */
  tagline: string;
  /** Scroll indicator text */
  scrollText?: string;
}