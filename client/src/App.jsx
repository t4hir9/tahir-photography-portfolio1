import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";
import PolicyPage from "@/pages/PolicyPage";
import CookieConsent from "@/components/CookieConsent";
function Router() {
    return (_jsxs(Switch, { children: [_jsx(Route, { path: "/", component: Home }), _jsx(Route, { path: "/portfolio", component: Portfolio }), _jsx(Route, { path: "/about", component: About }), _jsx(Route, { path: "/contact", component: Contact }), _jsx(Route, { path: "/admin", component: Admin }), _jsx(Route, { path: "/admin/media", component: Admin }), _jsx(Route, { path: "/privacy", component: PolicyPage }), _jsx(Route, { path: "/terms", component: PolicyPage }), _jsx(Route, { path: "/refunds", component: PolicyPage }), _jsx(Route, { path: "/cookies", component: PolicyPage }), _jsx(Route, { component: NotFound })] }));
}
function App() {
    return (_jsx(HelmetProvider, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx("a", { className: "skip-link", href: "#main-content", children: "Skip to content" }), _jsx(Toaster, {}), _jsx(Router, {}), _jsx(CookieConsent, {})] }) }) }));
}
export default App;
