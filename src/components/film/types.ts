import { FilmProject } from "@/lib/film-data";

export interface FilmSectionProps {
  projects?: FilmProject[];
  className?: string;
}

export interface FilmCardProps {
  project: FilmProject;
  className?: string;
}

export interface TimelineHeaderProps {
  timecode: string;
  tracks?: string;
  className?: string;
}

export interface ClipThumbProps {
  beforeSrc: string;
  afterSrc: string;
  progress: number;
  className?: string;
}

export interface PlayheadIndicatorProps {
  progress: number;
  className?: string;
}