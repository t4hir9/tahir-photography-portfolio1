export interface FilmProject {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  thumbnailSrc: string;
  beforeGradeSrc: string;
  afterGradeSrc: string;
  timecode: string;
  tags: string[];
  duration: string;
  role: string;
}

export const filmProjects: FilmProject[] = [
  {
    id: "tip-8",
    title: "Tip 8 — Color Grading Workflow",
    description: "Complete DaVinci Resolve color grading workflow from primary correction to creative look. Demonstrates node structure, power grades, and delivery.",
    videoSrc: "/videos/tip-8.mp4",
    thumbnailSrc: "/images/film/tip-8.jpg",
    beforeGradeSrc: "/images/film/tip-8.jpg",
    afterGradeSrc: "/images/film/tip-8.jpg",
    timecode: "01:23:14:12",
    tags: ["Color Grading", "DaVinci Resolve", "Node Structure", "Power Grades"],
    duration: "2m 18s",
    role: "Colorist / Editor",
  },
  {
    id: "tip-7",
    title: "Tip 7 — Matching Camera Log",
    description: "Matching footage from different camera log formats (S-Log3, V-Log, BRAW) into a unified Rec.709 base. Technical LUT workflow.",
    videoSrc: "/videos/tip-7.mp4",
    thumbnailSrc: "/images/film/tip-7.jpg",
    beforeGradeSrc: "/images/film/tip-7.jpg",
    afterGradeSrc: "/images/film/tip-7.jpg",
    timecode: "00:45:08:04",
    tags: ["Color Grading", "Camera Matching", "LUTs", "Technical Workflow"],
    duration: "1m 52s",
    role: "Colorist",
  },
  {
    id: "tip-6",
    title: "Tip 6 — Skin Tone Pipeline",
    description: "Consistent skin tone workflow using vectorscope, hue vs hue curves, and qualifier isolation. Preserves natural texture.",
    videoSrc: "/videos/tip-6.mp4",
    thumbnailSrc: "/images/film/tip-6.jpg",
    beforeGradeSrc: "/images/film/tip-6.jpg",
    afterGradeSrc: "/images/film/tip-6.jpg",
    timecode: "00:31:22:18",
    tags: ["Color Grading", "Skin Tones", "Vectorscope", "Qualifiers"],
    duration: "1m 34s",
    role: "Colorist",
  },
  {
    id: "tip-4",
    title: "Tip 4 — Creative Look Development",
    description: "Building a signature look with serial nodes: contrast, saturation, film emulation, halation, and grain structure.",
    videoSrc: "/videos/tip-4.mp4",
    thumbnailSrc: "/images/film/tip-4.jpg",
    beforeGradeSrc: "/images/film/tip-4.jpg",
    afterGradeSrc: "/images/film/tip-4.jpg",
    timecode: "00:58:11:06",
    tags: ["Color Grading", "Creative Looks", "Film Emulation", "Node Tree"],
    duration: "2m 04s",
    role: "Colorist / Creative Director",
  },
  {
    id: "dele",
    title: "Dele — Short Film Grade",
    description: "Narrative short film color grade: day-for-night, emotional palette shifts, and visual storytelling through color.",
    videoSrc: "/videos/dele.mp4",
    thumbnailSrc: "/images/film/dele.jpg",
    beforeGradeSrc: "/images/film/dele.jpg",
    afterGradeSrc: "/images/film/dele.jpg",
    timecode: "02:14:03:22",
    tags: ["Color Grading", "Narrative", "Day for Night", "Storytelling"],
    duration: "3m 12s",
    role: "Lead Colorist",
  },
];