import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useCallback, useMemo } from "react";
import { useAdminPortfolio, useDeletePortfolioItem } from "@/hooks/use-portfolio";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Upload, LogOut, Image, Film, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import AdminProjects from "@/pages/AdminProjects";
import { PHOTO_FILENAMES, VIDEO_FILENAMES } from "@/lib/media-list";
const GITHUB_BASE = "https://raw.githubusercontent.com/t4hir9/tahir-photography-portfolio1/main/client/public";
function titleFromFilename(filename) {
    return filename
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();
}
const FALLBACK_ITEMS = [
    ...PHOTO_FILENAMES.map((f, i) => ({
        id: -(i + 1),
        title: titleFromFilename(f),
        type: "photo",
        url: `${GITHUB_BASE}/photos/${f}`,
        thumbnailUrl: `${GITHUB_BASE}/photos/${f}`,
        category: "Photography",
        isStatic: true,
    })),
    ...VIDEO_FILENAMES.map((f, i) => ({
        id: -(PHOTO_FILENAMES.length + i + 1),
        title: titleFromFilename(f),
        type: "video",
        url: `${GITHUB_BASE}/videos/${f}`,
        thumbnailUrl: PHOTO_FILENAMES[0] ? `${GITHUB_BASE}/photos/${PHOTO_FILENAMES[0]}` : "",
        category: "Videography",
        isStatic: true,
    })),
];
// ── Helpers ───────────────────────────────────────────────────────────────────
async function getCloudinarySignature(password) {
    const res = await fetch("/api/cloudinary-signature", {
        headers: { "X-Admin-Password": password },
    });
    if (!res.ok) {
        const { message } = await res.json().catch(() => ({}));
        throw new Error(message || "Failed to get upload signature");
    }
    return res.json();
}
async function uploadToCloudinary(file, sig, onProgress) {
    const isVideo = file.type.startsWith("video/");
    const resource_type = isVideo ? "video" : "image";
    const fd = new FormData();
    fd.append("file", file);
    fd.append("signature", sig.signature);
    fd.append("timestamp", String(sig.timestamp));
    fd.append("api_key", sig.apiKey);
    fd.append("folder", sig.folder);
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/${resource_type}/upload`);
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable)
                onProgress(Math.round((e.loaded / e.total) * 90));
        };
        xhr.onload = () => {
            if (xhr.status === 200) {
                const { secure_url } = JSON.parse(xhr.responseText);
                resolve({ url: secure_url, type: isVideo ? "video" : "photo" });
            }
            else {
                reject(new Error("Cloudinary upload failed"));
            }
        };
        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(fd);
    });
}
async function saveToDatabase(password, item) {
    const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Admin-Password": password,
        },
        body: JSON.stringify(item),
    });
    if (!res.ok)
        throw new Error("Failed to save to database");
    return res.json();
}
// ── Password Gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onAuth }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [checking, setChecking] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        setChecking(true);
        setError("");
        try {
            const res = await fetch("/api/cloudinary-signature", {
                headers: { "X-Admin-Password": value },
            });
            if (res.ok || res.status === 503) {
                onAuth(value);
            }
            else {
                setError("Incorrect password");
            }
        }
        catch {
            setError("Could not connect to server");
        }
        setChecking(false);
    };
    return (_jsx("div", { id: "main-content", className: "min-h-screen bg-black flex items-center justify-center px-4", children: _jsxs("div", { className: "w-full max-w-sm", children: [_jsxs("h1", { className: "text-3xl font-display font-bold text-white tracking-widest mb-2 text-center", children: ["TAHIR", _jsx("span", { className: "text-white/30", children: "ADAMU" })] }), _jsx("p", { className: "text-white/40 text-sm text-center mb-10 tracking-widest uppercase", children: "Admin Panel" }), _jsxs("form", { onSubmit: submit, className: "space-y-4", children: [_jsx("input", { type: "password", placeholder: "Enter admin password", value: value, onChange: (e) => setValue(e.target.value), className: "w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/40 placeholder:text-white/30", autoFocus: true }), error && (_jsx("p", { className: "text-red-400 text-sm text-center", children: error })), _jsx("button", { type: "submit", disabled: !value || checking, className: "w-full bg-white text-black py-3 font-medium tracking-widest uppercase hover:bg-white/90 transition-colors disabled:opacity-50", children: checking ? "Checking…" : "Enter" })] })] }) }));
}
// ── Upload Drop Zone ──────────────────────────────────────────────────────────
function DropZone({ onFiles }) {
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef(null);
    const onDrop = useCallback((e) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/"));
        if (files.length)
            onFiles(files);
    }, [onFiles]);
    return (_jsxs("div", { onDragOver: (e) => { e.preventDefault(); setDragging(true); }, onDragLeave: () => setDragging(false), onDrop: onDrop, onClick: () => inputRef.current?.click(), className: `border-2 border-dashed rounded-sm p-12 text-center cursor-pointer transition-colors ${dragging
            ? "border-white/60 bg-white/10"
            : "border-white/20 hover:border-white/40 hover:bg-white/5"} admin-dropzone`, children: [_jsx(Upload, { className: "w-10 h-10 text-white/40 mx-auto mb-4" }), _jsx("p", { className: "text-white/70 font-medium mb-1", children: "Drop photos & videos here" }), _jsx("p", { className: "text-white/30 text-sm", children: "JPG, PNG, WEBP, MP4, MOV \u2014 multiple files supported" }), _jsx("input", { ref: inputRef, type: "file", multiple: true, accept: "image/*,video/*", className: "hidden", onChange: (e) => {
                    const files = Array.from(e.target.files ?? []);
                    if (files.length)
                        onFiles(files);
                    e.target.value = "";
                } })] }));
}
// ── Media Card ────────────────────────────────────────────────────────────────
function MediaCard({ item, onDelete, }) {
    const thumb = item.thumbnailUrl ?? item.thumbnail_url ?? item.url;
    const isVideo = item.type === "video";
    const isStatic = item.isStatic === true;
    return (_jsxs("div", { className: "relative group bg-white/5 border border-white/10 overflow-hidden", children: [_jsx("div", { className: "aspect-square overflow-hidden", children: isVideo ? (_jsxs("div", { className: "w-full h-full bg-white/5 flex items-center justify-center relative", children: [_jsx("img", { src: thumb, alt: item.title, className: "w-full h-full object-cover opacity-60", onError: (e) => (e.currentTarget.style.display = "none") }), _jsx(Film, { className: "w-8 h-8 text-white/60 absolute" })] })) : (_jsx("img", { src: thumb, alt: item.title, className: "w-full h-full object-cover", loading: "lazy" })) }), _jsxs("div", { className: "p-2 flex items-center justify-between gap-1", children: [_jsx("p", { className: "text-white/70 text-xs truncate flex-1", children: item.title }), isStatic && (_jsx("span", { className: "text-white/30 text-[10px] uppercase tracking-widest shrink-0", children: "Built-in" }))] }), !isStatic && (_jsx("button", { onClick: () => onDelete(item.id), className: "absolute top-2 right-2 bg-black/70 text-white/70 hover:text-red-400 p-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity", title: "Delete", children: _jsx(Trash2, { className: "w-4 h-4" }) }))] }));
}
// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function Admin() {
    const [password, setPassword] = useState("");
    const [uploading, setUploading] = useState([]);
    const [filter, setFilter] = useState("all");
    const { toast } = useToast();
    const { data: dbItems = [], refetch, isLoading } = useAdminPortfolio(password);
    const deleteMutation = useDeletePortfolioItem(password);
    const items = useMemo(() => [...dbItems, ...FALLBACK_ITEMS], [dbItems]);
    const handleAuth = (pw) => setPassword(pw);
    const handleLogout = () => {
        setPassword("");
    };
    const handleDelete = (id) => {
        deleteMutation.mutate(id, {
            onSuccess: () => { refetch(); toast({ title: "Deleted" }); },
            onError: () => toast({ title: "Delete failed", variant: "destructive" }),
        });
    };
    const handleFiles = async (files) => {
        let sig;
        try {
            sig = await getCloudinarySignature(password);
        }
        catch (err) {
            toast({ title: "Cloudinary not configured", description: err.message, variant: "destructive" });
            return;
        }
        for (const file of files) {
            const uid = Math.random().toString(36).slice(2);
            const entry = { id: uid, name: file.name, progress: 0, status: "uploading" };
            setUploading((prev) => [...prev, entry]);
            const update = (patch) => setUploading((prev) => prev.map((u) => (u.id === uid ? { ...u, ...patch } : u)));
            try {
                const { url, type } = await uploadToCloudinary(file, sig, (pct) => update({ progress: pct }));
                update({ progress: 95, status: "saving" });
                const title = file.name
                    .replace(/\.[^.]+$/, "")
                    .replace(/[_-]+/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                    .trim();
                await saveToDatabase(password, {
                    title,
                    type,
                    url,
                    thumbnailUrl: type === "photo" ? url : undefined,
                    category: type === "video" ? "Videography" : "Photography",
                });
                update({ progress: 100, status: "done" });
                setTimeout(() => {
                    setUploading((prev) => prev.filter((u) => u.id !== uid));
                }, 2000);
                refetch();
                toast({ title: `Uploaded: ${title}` });
            }
            catch (err) {
                update({ status: "error", error: err.message });
            }
        }
    };
    if (!password)
        return _jsx(PasswordGate, { onAuth: handleAuth });
    const filtered = items.filter((item) => filter === "all" ? true : item.type === filter);
    const photoCount = items.filter((i) => i.type === "photo").length;
    const videoCount = items.filter((i) => i.type === "video").length;
    return (_jsxs("div", { className: "admin-shell min-h-screen bg-black text-white", children: [_jsx(SEO, { title: "Admin \u2014 Upload Media", description: "Admin panel" }), _jsxs("header", { className: "border-b border-white/10 px-6 py-4 flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("span", { className: "font-display font-bold tracking-widest", children: ["TAHIR", _jsx("span", { className: "text-white/30", children: "ADAMU" })] }), _jsx("span", { className: "text-white/30 text-sm ml-3", children: "/ Admin" })] }), _jsxs("button", { onClick: handleLogout, className: "flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors", children: [_jsx(LogOut, { className: "w-4 h-4" }), " Sign out"] })] }), _jsxs("nav", { className: "admin-section-nav max-w-5xl mx-auto px-6", "aria-label": "Admin sections", children: [_jsx("a", { href: "#media-upload", children: "Upload media" }), _jsx("a", { href: "#media-library", children: "Media library" }), _jsx("a", { href: "#hosted-project-admin", children: "Hosted web projects" })] }), _jsxs("main", { id: "main-content", className: "max-w-5xl mx-auto px-6 py-10 space-y-10", children: [_jsx("div", { className: "grid grid-cols-3 gap-4", children: [
                            { label: "Total Assets", value: items.length, sub: `${dbItems.length} uploaded · ${FALLBACK_ITEMS.length} built-in` },
                            { label: "Photos", value: photoCount, icon: Image, sub: `${dbItems.filter(i => i.type === "photo").length} uploaded · ${FALLBACK_ITEMS.filter(i => i.type === "photo").length} built-in` },
                            { label: "Videos", value: videoCount, icon: Film, sub: `${dbItems.filter(i => i.type === "video").length} uploaded · ${FALLBACK_ITEMS.filter(i => i.type === "video").length} built-in` },
                        ].map(({ label, value, icon: Icon, sub }) => (_jsxs("div", { className: "bg-white/5 border border-white/10 p-5", children: [_jsxs("div", { className: "flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-2", children: [Icon && _jsx(Icon, { className: "w-4 h-4" }), label] }), _jsx("p", { className: "text-3xl font-display font-bold", children: value }), _jsx("p", { className: "text-white/25 text-[10px] mt-1", children: sub })] }, label))) }), _jsxs("section", { id: "media-upload", children: [_jsx("h2", { className: "text-white/50 text-xs uppercase tracking-widest mb-4", children: "Upload New Media" }), _jsx(DropZone, { onFiles: handleFiles }), uploading.length > 0 && (_jsx("div", { className: "mt-4 space-y-2", children: uploading.map((u) => (_jsxs("div", { className: "bg-white/5 border border-white/10 p-3 flex items-center gap-4", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm text-white truncate", children: u.name }), _jsx("div", { className: "mt-1 h-1 bg-white/10 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full transition-all duration-300 ${u.status === "error" ? "bg-red-500" : "bg-white"}`, style: { width: `${u.progress}%` } }) })] }), _jsx("span", { className: `text-xs shrink-0 ${u.status === "error"
                                                ? "text-red-400"
                                                : u.status === "done"
                                                    ? "text-green-400"
                                                    : "text-white/40"}`, children: u.status === "uploading"
                                                ? `${u.progress}%`
                                                : u.status === "saving"
                                                    ? "Saving…"
                                                    : u.status === "done"
                                                        ? "Done ✓"
                                                        : u.error ?? "Error" }), u.status === "error" && (_jsx("button", { onClick: () => setUploading((prev) => prev.filter((x) => x.id !== u.id)), children: _jsx(X, { className: "w-4 h-4 text-white/40" }) }))] }, u.id))) }))] }), _jsxs("section", { id: "media-library", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-white/50 text-xs uppercase tracking-widest", children: "Media Library" }), _jsx("div", { className: "flex gap-4", children: ["all", "photo", "video"].map((t) => (_jsx("button", { onClick: () => setFilter(t), className: `text-xs uppercase tracking-widest pb-1 border-b transition-all ${filter === t
                                                ? "text-white border-white"
                                                : "text-white/30 border-transparent hover:text-white/60"}`, children: t === "photo" ? "Photos" : t === "video" ? "Videos" : "All" }, t))) })] }), isLoading ? (_jsx("div", { className: "flex justify-center py-20", children: _jsx(Loader2, { className: "w-8 h-8 text-white/30 animate-spin" }) })) : filtered.length === 0 ? (_jsx("div", { className: "border border-dashed border-white/10 py-20 text-center text-white/30 text-sm", children: "No items yet. Upload some media above." })) : (_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3", children: filtered.map((item) => (_jsx(MediaCard, { item: item, onDelete: handleDelete }, item.id))) }))] }), _jsx(AdminProjects, { embedded: true })] })] }));
}
