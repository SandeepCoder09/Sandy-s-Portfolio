# Sandy Coder Portfolio 2.0

A new creative portfolio experience built with React, Vite, Motion and a custom purple design system.

## Requirements

- Node.js 20.19+ (Node 22+ recommended)
- npm

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

Create a separate Vercel project for this repository and set **Root Directory** to `portfolio-v2`. The original website remains on the existing production project until the new version is reviewed and approved.

## Notes

- The existing site, APIs, blog and payment routes are not modified by this app scaffold.
- Project entries live in `src/data/projects.js`.
- Replace any provisional project screenshots, contact details and copy with verified production content before launch.
- The 3D hero artwork is CSS-based for a fast first render. Three.js dependencies are included for a later optional WebGL scene.