import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect, useRef } from "react";
import { useLocation } from "wouter";
const Home = lazy(() => import("@/pages/Home"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/not-found"));
const PolicyPage = lazy(() => import("@/pages/PolicyPage"));
import CookieConsent from "@/components/CookieConsent";
function Router() {
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "route-loading", id: "main-content", role: "status", children: "Loading page…" }), children: _jsxs(Switch, { children: [_jsx(Route, { path: "/", component: Home }), _jsx(Route, { path: "/portfolio", component: Portfolio }), _jsx(Route, { path: "/about", component: About }), _jsx(Route, { path: "/contact", component: Contact }), _jsx(Route, { path: "/admin", component: Admin }), _jsx(Route, { path: "/admin/media", component: Admin }), _jsx(Route, { path: "/privacy", component: PolicyPage }), _jsx(Route, { path: "/terms", component: PolicyPage }), _jsx(Route, { path: "/refunds", component: PolicyPage }), _jsx(Route, { path: "/cookies", component: PolicyPage }), _jsx(Route, { component: NotFound })] }) }));
}
function RouteScrollRestoration() {
    const [location] = useLocation();
    const previousLocation = useRef(location);
    useEffect(() => {
        if (previousLocation.current === location) return;
        previousLocation.current = location;
        const frame = window.requestAnimationFrame(() => {
            const hash = window.location.hash.slice(1);
            const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
            if (target) target.scrollIntoView();
            else window.scrollTo(0, 0);
        });
        return () => window.cancelAnimationFrame(frame);
    }, [location]);
    return null;
}
function App() {
    return (_jsx(HelmetProvider, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx("a", { className: "skip-link", href: "#main-content", children: "Skip to content" }), _jsx(Toaster, {}), _jsx(RouteScrollRestoration, {}), _jsx(Router, {}), _jsx(CookieConsent, {})] }) }) }));
}
export default App;
