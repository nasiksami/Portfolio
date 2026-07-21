# Nasik Sami Khan — Portfolio

Personal portfolio for **Nasik Sami Khan**, AI/ML Researcher & Full-Stack Developer.
Live at **[nasik.ca](https://nasik.ca/)**.

> Driving innovation at the intersection of AI, ML, and software engineering.

---

## Tech stack

| Concern   | Choice                                  |
| --------- | --------------------------------------- |
| Framework | React 18 (function components + hooks)  |
| Build     | Vite 4                                  |
| Styling   | Tailwind CSS 3 with CSS-variable tokens |
| Animation | Framer Motion                           |
| Icons     | react-icons (Simple Icons, Feather, FA) |
| Forms     | Formspree                               |
| Linting   | ESLint + react-hooks + jsx-a11y         |

## Getting started

Requires **Node.js 18+**.

```bash
npm install     # install dependencies
npm run dev     # dev server at http://localhost:5173
npm run build   # production build to dist/
npm run preview # serve the production build locally
npm run lint    # ESLint, including accessibility rules
```

## Project structure

```
src/
├── data/            # ← All site content lives here. Edit these, not components.
│   ├── profile.js       name, bio, stats, focus areas, socials, nav
│   ├── projects.js      project cards + filter categories
│   ├── experience.js    professional timeline
│   ├── education.js     degrees + awards/scholarships
│   ├── skills.js        skill groups and proficiency
│   └── publications.js  papers, venues, links
├── components/
│   ├── ui/          Reusable primitives: Section, Reveal, Button, Badge
│   ├── Navbar.jsx   Sticky nav, scroll-spy, theme toggle, mobile menu
│   ├── Footer.jsx
│   ├── Aurora.jsx   Decorative animated hero background
│   ├── SkillIcon.jsx  Slug → icon registry, with monogram fallback
│   ├── SocialLinks.jsx
│   └── BackToTop.jsx
├── hooks/
│   ├── useTheme.js     Dark/light with localStorage + OS preference
│   └── useScrollSpy.js IntersectionObserver-based active section
├── sections/        One component per page section
└── index.css        Theme tokens, base styles, reduced-motion rules
```

### Editing content

All copy and data lives in `src/data/`. Adding a project means appending an
object to `src/data/projects.js` — no component changes required. Skills resolve
their icons by slug through `components/SkillIcon.jsx`; a slug with no
registered icon renders a styled monogram rather than breaking.

## Design system

Colours are **semantic tokens** (`surface-*`, `content-*`, `accent`, `iris`,
`ember`) defined as RGB channel triplets in `src/index.css` and exposed to
Tailwind in `tailwind.config.js`. Because they are CSS variables, toggling the
`.light` class on `<html>` re-themes the entire site with no per-component work.

Dark is the default; `.light` opts into the light theme. An inline script in
`index.html` applies the stored preference before first paint to avoid a flash
of the wrong theme.

**All text tokens meet WCAG 2.1 AA (≥4.5:1) against both the base and raised
surfaces, in both themes.** If you change a colour, re-check the contrast.

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`) and a skip link.
- Section headings wired via `aria-labelledby`.
- Visible focus rings on all interactive elements (`:focus-visible`).
- Project filtering announces results through an `aria-live` region.
- Timeline disclosures use `aria-expanded` / `aria-controls`.
- Form errors use `aria-invalid`, `aria-describedby`, and `role="alert"`, and
  focus moves to the first invalid field on submit.
- `prefers-reduced-motion` disables Framer Motion animations, CSS animation,
  and smooth scrolling.
- Decorative visuals are `aria-hidden`.

## Performance

- Below-the-fold sections are `React.lazy` code-split; the initial chunk carries
  only the hero and about.
- Timeline logos are `loading="lazy"`; the hero portrait is `fetchPriority="high"`.
- Background animation is transform/opacity only, so it stays on the compositor.

## Deployment

Static build — `dist/` deploys to any static host.

**Vercel / Netlify:** connect the repo; build command `npm run build`, output
directory `dist`.

**GitHub Pages:** `vite.config.js` sets `base: './'` for relative asset paths.
Deploy the contents of `dist/`.

After deploying, update `public/sitemap.xml` and the canonical / Open Graph URLs
in `index.html` if the domain changes.

## Contact

- [LinkedIn](https://www.linkedin.com/in/nasiksami)
- [GitHub](https://github.com/nasiksami)
- [Google Scholar](https://scholar.google.com/citations?hl=en&user=NCdDTeEAAAAJ)
- [X](https://x.com/NasikSami)
- [nasiksami@gmail.com](mailto:nasiksami@gmail.com)
