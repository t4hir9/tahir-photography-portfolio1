import { TechProject } from "@/lib/tech-data";

export interface TechSectionProps {
  projects?: TechProject[];
  className?: string;
}

export interface TechCardProps {
  project: TechProject;
  className?: string;
}

export interface CommitHeaderProps {
  hash: string;
  message: string;
  date: string;
  className?: string;
}

export interface DiffPreviewProps {
  files: string[];
  expanded: boolean;
  onToggle: () => void;
  className?: string;
}

export interface LiveDemoProps {
  compositionName: string;
  className?: string;
}