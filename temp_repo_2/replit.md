# Overview

This is a personal portfolio website for Abdullahi Tahir Adamu, a React/Next.js developer and cinematographer based in Nigeria. The application showcases professional work, projects, certifications, media content (videos and pictures), and provides contact functionality. Built with Next.js 15.3.3 using the App Router architecture, it features a modern, responsive design with dark mode support and mobile-optimized dropdown menu.

# User Preferences

Preferred communication style: Simple, everyday language.
Mobile-first responsive design with dropdown menus for social links on mobile devices.
White accent colors throughout (no cyan/blue).
Full-width layout with minimal side padding (not centralized).

# Recent Changes (Nov 30, 2025)

- Added responsive dropdown menu for social links in footer (mobile: <md, desktop: md+)
- Fixed about.MP4 video file path (case-sensitive)
- Removed separate "Connect With Me" section from Contact page
- Consolidated all social links (Email, LinkedIn, GitHub, Instagram, Twitter) to footer
- Improved mobile responsiveness across all screen types
- Fixed hydration errors with suppressHydrationWarning on dynamic content
- Footer now uses Radix UI DropdownMenu for accessible mobile navigation

# System Architecture

## Frontend Architecture

**Framework**: Next.js 15.3.3 with App Router
- **Rationale**: Leverages Next.js App Router for modern React patterns, built-in routing, SEO optimization, and server/client component separation
- **Client-side Interactivity**: Uses "use client" directive for interactive components (scrolling effects, navigation, dropdowns)
- **Rendering Strategy**: Mix of server and client components for optimal performance

**UI Component Library**: shadcn/ui with Radix UI primitives
- **Rationale**: Provides accessible, customizable components without runtime overhead
- **Styling Approach**: Tailwind CSS v4 with custom theme variables defined in globals.css
- **Design System**: "new-york" style variant from shadcn/ui for consistent aesthetics
- **Dropdown Menu**: Radix UI DropdownMenu for accessible mobile navigation with icon support

**Responsive Design**:
- Mobile breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile footer: Dropdown menu with "Connect with me" button and chevron icon
- Desktop footer: Inline social links with hover underline animation
- All sections include responsive padding (px-2 sm:px-3 lg:px-4)

**State Management**:
- **Local State**: React useState and useEffect hooks for component-level state
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Problem Addressed**: Need for type-safe, performant form validation without external dependencies

**Theme System**: next-themes
- **Rationale**: Provides seamless dark/light mode switching with system preference detection
- **Implementation**: Custom CSS variables mapped to Tailwind theme for consistent theming

## Page Structure

**Route Organization**:
- `/` - Home page with sections (Hero, About, Work, Certifications, Contact)
- `/projects` - Projects showcase page
- `/sitemap.xml` - Dynamically generated XML sitemap
- `/api/contact` - Contact form submission endpoint

**Component Architecture**:
- Modular section-based components (Navbar, HeroSection, AboutSection, Footer)
- Reusable UI components in `/components/ui` directory
- Custom hooks in `/hooks` directory
- Footer component: Client-side (use client) for dropdown interactivity

## Media & Assets

**Video Handling**:
- `/public/about.MP4` - About section background video (9.3MB)
- Hardware acceleration enabled: WebkitBackfaceVisibility, backfaceVisibility
- Video attributes: autoPlay, loop, muted, playsInline, preload="auto"
- **Note**: File path is case-sensitive (uppercase MP4 extension)

**Photo Slideshow**:
- 65 photos in `/public/photos` directory
- Smooth 300ms fade transitions with 4-second intervals
- Optimized media loading for all devices

## Performance Optimizations

**Scroll Performance**:
- `requestAnimationFrame` for scroll event throttling
- Passive event listeners to improve scroll performance
- **Rationale**: Prevents layout thrashing and ensures smooth scrolling on lower-end devices

**Font Optimization**:
- next/font with Google Fonts (Inter) for automatic font optimization
- Geist font family configured for Vercel deployment

**Build Configuration**:
- Turbopack enabled for faster development builds
- Custom port configuration (5000) with network binding (0.0.0.0)

## SEO Architecture

**Metadata Strategy**:
- Template-based titles for consistent branding
- Comprehensive Open Graph and Twitter Card metadata
- Long-tail keywords: "React developer Nigeria", "Next.js specialist", "video editor cinematographer"
- Canonical URLs and robots directives

**Sitemap Implementation**:
- Custom API route generating XML sitemap
- Prioritized pages with change frequency indicators
- Robots.txt configured to allow crawling while protecting API routes

## Form Handling & Validation

**Validation Layer**:
- Zod schemas for runtime type validation
- @hookform/resolvers for React Hook Form integration
- Contact form endpoint: `/api/contact`

**User Feedback**:
- Sonner toast notifications for success/error states
- **Rationale**: Non-intrusive, accessible notification system

# External Dependencies

## Email Service Integration

**Resend API**:
- **Purpose**: Transactional email delivery for contact form submissions
- **Configuration**: API key stored in environment variable `RESEND_API_KEY`
- **Recipient**: Configurable via `CONTACT_EMAIL` environment variable (defaults to abdultahir779@gmail.com)
- **Implementation**: POST endpoint at `/api/contact/route.js` handles form submissions and sends formatted HTML emails

## UI Framework Dependencies

**Radix UI Components**:
- @radix-ui/react-avatar - User avatar display
- @radix-ui/react-dropdown-menu - Accessible dropdown menus (newly utilized for mobile footer)
- @radix-ui/react-label - Form label components
- @radix-ui/react-select - Select input components
- @radix-ui/react-slot - Component composition utility

**Styling Utilities**:
- class-variance-authority - Type-safe variant styling
- clsx & tailwind-merge - Utility for merging Tailwind classes
- lucide-react - Icon library (Mail, Linkedin, Github, Instagram, Twitter, ChevronDown)

## Development Tools

**Code Quality**:
- ESLint with Next.js configuration
- Custom ESLint configuration via @eslint/eslintrc

**Styling**:
- Tailwind CSS v4 with PostCSS plugin (@tailwindcss/postcss)
- tw-animate-css for animation utilities
- Custom theme configuration via inline @theme directive

## Deployment Considerations

**Hosting**: Optimized for Vercel deployment
- Next.js-specific features like automatic static optimization
- Environment variables for API keys and configuration
- Responsive design ensures optimal display on all device sizes
- Domain: tahiradamu.info
