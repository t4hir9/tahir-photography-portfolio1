import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { PHOTO_FILENAMES, VIDEO_FILENAMES } from "@/lib/media-list";
const GITHUB_BASE = "https://raw.githubusercontent.com/t4hir9/tahir-photography-portfolio1/main/client/public";
function mediaUrl(type, filename) {
    if (import.meta.env.DEV)
        return `/${type}/${filename}`;
    return `${GITHUB_BASE}/${type}/${filename}`;
}
function titleFromFilename(filename) {
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
        queryKey: ["portfolio"],
        queryFn: async () => {
            // Try the database API first
            try {
                const res = await fetch(api.portfolio.list.path);
                if (res.ok) {
                    const dbItems = await res.json();
                    if (dbItems.length > 0) {
                        return dbItems.map((item) => ({
                            ...item,
                            thumbnailUrl: item.thumbnailUrl ?? item.thumbnail_url ?? item.url,
                        }));
                    }
                }
            }
            catch {
                // API unavailable — fall through to manifest
            }
            // Fall back to static manifest (works even with no database)
            let photos = PHOTO_FILENAMES;
            let videos = VIDEO_FILENAMES;
            try {
                const manifestRes = await fetch("/media-manifest.json");
                if (manifestRes.ok) {
                    const manifest = await manifestRes.json();
                    if (manifest.photos?.length > 0)
                        photos = manifest.photos;
                    if (manifest.videos?.length > 0)
                        videos = manifest.videos;
                }
            }
            catch {
                // manifest unavailable — use hardcoded list above
            }
            const firstPhoto = photos[0] ? mediaUrl("photos", photos[0]) : "";
            return [
                ...photos.map((filename, i) => ({
                    id: i + 1,
                    title: titleFromFilename(filename),
                    type: "photo",
                    url: mediaUrl("photos", filename),
                    thumbnailUrl: mediaUrl("photos", filename),
                    category: "Photography",
                })),
                ...videos.map((filename, i) => ({
                    id: photos.length + i + 1,
                    title: titleFromFilename(filename),
                    type: "video",
                    url: mediaUrl("videos", filename),
                    thumbnailUrl: firstPhoto,
                    category: "Videography",
                })),
            ];
        },
    });
}
// ============================================
// ADMIN HOOKS
// ============================================
export function useAdminPortfolio(password) {
    return useQuery({
        queryKey: ["admin-portfolio"],
        enabled: !!password,
        queryFn: async () => {
            const res = await fetch(api.portfolio.list.path, {
                headers: { "X-Admin-Password": password },
            });
            if (!res.ok)
                throw new Error("Failed to fetch");
            return res.json();
        },
    });
}
export function useDeletePortfolioItem(password) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            // Express uses DELETE /api/portfolio/:id; Vercel uses ?id=
            const res = await fetch(`${api.portfolio.list.path}/${id}`, {
                method: "DELETE",
                headers: { "X-Admin-Password": password },
            });
            // Vercel fallback: path params not supported, use query param
            if (res.status === 404 || res.status === 405) {
                const res2 = await fetch(`${api.portfolio.list.path}?id=${id}`, {
                    method: "DELETE",
                    headers: { "X-Admin-Password": password },
                });
                if (!res2.ok && res2.status !== 204)
                    throw new Error("Failed to delete");
                return;
            }
            if (!res.ok && res.status !== 204)
                throw new Error("Failed to delete");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        },
    });
}
// ============================================
// CONTACT HOOKS
// ============================================
export function useContactForm() {
    return useMutation({
        mutationFn: async (data) => {
            const validated = api.contact.create.input.parse(data);
            const res = await fetch(api.contact.create.path, {
                method: api.contact.create.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validated),
            });
            if (!res.ok) {
                if (res.status === 400) {
                    const error = api.contact.create.responses[400].parse(await res.json());
                    throw new Error(error.message);
                }
                throw new Error("Failed to send message");
            }
            return api.contact.create.responses[201].parse(await res.json());
        },
    });
}
