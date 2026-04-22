# Tahir Abdullahi Adamu — Photography & Videography Portfolio

A full-stack portfolio website for photographer/videographer Tahir Abdullahi Adamu. Built with React + Express + PostgreSQL and configured for deployment on Vercel with a Neon PostgreSQL database.

## Architecture

- **Frontend**: React (Vite), TailwindCSS, shadcn/ui, TanStack Query, Wouter routing
- **Backend (dev)**: Express server at `server/` — serves the API locally
- **Backend (prod)**: Vercel serverless functions at `api/` — used when deployed to Vercel
- **Database**: PostgreSQL via Drizzle ORM — local Replit DB in dev, Neon DB in production
- **Media**: Photos in `client/public/photos/` (75 files), Videos in `client/public/videos/` (16 files)

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `client/src/pages/Home.tsx` | Hero, featured work, about intro |
| `/portfolio` | `client/src/pages/Portfolio.tsx` | Masonry grid — All Work / Photography / Videography tabs |
| `/about` | `client/src/pages/About.tsx` | Bio and background |
| `/contact` | `client/src/pages/Contact.tsx` | Contact form + info |

## Contact Info

- **Email**: abdultahir779@gmail.com
- **Phone**: 08148630882
- **Instagram/TikTok**: @iamt4hir9

## Key Files

- `server/routes.ts` — Express API routes + dynamic seeding from disk
- `api/portfolio.ts` — Vercel serverless function for portfolio (uses manifest)
- `api/contact.ts` — Vercel serverless function for contact form
- `api/media-list.json` — Pre-generated manifest of all photo/video filenames (committed to git; regenerated on each build)
- `script/build.ts` — Build script: generates manifest → Vite build → esbuild server
- `shared/schema.ts` — Drizzle schema (portfolio_items, messages tables)
- `vercel.json` — Vercel config: static output from dist/public, serverless functions in api/

## Media Seeding

The portfolio is seeded **dynamically from the filesystem**:
- Dev (`server/routes.ts`): scans `client/public/photos/` and `client/public/videos/` on server start
- Prod (`api/portfolio.ts`): reads `api/media-list.json` (pre-built manifest) to seed Neon DB on first request

**Adding new media**: Drop a file into `client/public/photos/` or `client/public/videos/`. In dev, restart the server. For Vercel, push to GitHub — the build regenerates `api/media-list.json` and Vercel reseeds Neon on the first request.

## Vercel Deployment

1. `buildCommand`: `npm run build` — generates `api/media-list.json`, runs Vite, bundles server
2. `outputDirectory`: `dist/public` — served as static files from Vercel CDN
3. `excludeFiles`: `{client/public/**,dist/**}` applied to both API functions — prevents photos/videos from being bundled into the Lambda (keeps function well under the 300MB limit)

### Vercel Environment Variables Required

- `DATABASE_URL` — Neon PostgreSQL connection string
- `SESSION_SECRET` — Session secret

## Development

The workflow `Start application` runs `npm run dev` which starts both the Express backend and Vite dev server on port 5000.
