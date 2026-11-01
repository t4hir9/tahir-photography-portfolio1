import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";
const SITE_URL = "https://tahiradamu.vercel.app";
const DEFAULT_IMAGE = "https://raw.githubusercontent.com/t4hir9/tahir-photography-portfolio1/main/client/public/photos/1.jpg";
export function SEO({ title, description, path = "/", image = DEFAULT_IMAGE, type = "website", structuredData, }) {
    const fullUrl = `${SITE_URL}${path}`;
    const fullTitle = title.includes("Tahir")
        ? title
        : `${title} | Tahir Adamu`;
    return (_jsxs(Helmet, { children: [_jsx("title", { children: fullTitle }), _jsx("meta", { name: "description", content: description }), _jsx("link", { rel: "canonical", href: fullUrl }), _jsx("meta", { property: "og:title", content: fullTitle }), _jsx("meta", { property: "og:description", content: description }), _jsx("meta", { property: "og:url", content: fullUrl }), _jsx("meta", { property: "og:type", content: type }), _jsx("meta", { property: "og:image", content: image }), _jsx("meta", { name: "twitter:title", content: fullTitle }), _jsx("meta", { name: "twitter:description", content: description }), _jsx("meta", { name: "twitter:image", content: image }), structuredData && (_jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) }))] }));
}
