import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type InsertMessage } from "@shared/routes";

const GITHUB_BASE =
  "https://raw.githubusercontent.com/t4hir9/tahir-photography-portfolio1/main/client/public";

function mediaUrl(type: "photos" | "videos", filename: string): string {
  if (import.meta.env.DEV) return `/${type}/${filename}`;
  return `${GITHUB_BASE}/${type}/${filename}`;
}

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

// ============================================
// PORTFOLIO HOOKS
// ============================================

export function usePortfolio() {
  return useQuery({
    queryKey: ["media-manifest"],
    queryFn: async () => {
      const res = await fetch("/media-manifest.json");
      if (!res.ok) throw new Error("Failed to fetch media");
      const { photos, videos }: { photos: string[]; videos: string[] } =
        await res.json();

      const firstPhoto = photos[0] ? mediaUrl("photos", photos[0]) : "";

      return [
        ...photos.map((filename, i) => ({
          id: i + 1,
          title: titleFromFilename(filename),
          type: "photo" as const,
          url: mediaUrl("photos", filename),
          thumbnailUrl: mediaUrl("photos", filename),
          category: "Photography",
        })),
        ...videos.map((filename, i) => ({
          id: photos.length + i + 1,
          title: titleFromFilename(filename),
          type: "video" as const,
          url: mediaUrl("videos", filename),
          thumbnailUrl: firstPhoto,
          category: "Videography",
        })),
      ];
    },
  });
}

// ============================================
// CONTACT HOOKS
// ============================================

export function useContactForm() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.contact.create.input.parse(data);
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.create.responses[400].parse(
            await res.json()
          );
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
  });
}
