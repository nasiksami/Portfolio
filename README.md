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
│   ├── ui/          Reusable primitives: Section, Reveal, Button, Tag
│   ├── Navbar.jsx   Sticky nav, scroll-spy, theme toggle, mobile menu
│   ├── Footer.jsx   Colophon + closing wordmark
│   ├── ColumnRules.jsx The visible 12-column hairline grid
│   ├── GridFrame.jsx   Fixed paper-grain layer
│   ├── Marquee.jsx     Credential ticker
│   ├── SkillIcon.jsx   Slug → icon registry, with monogram fallback
│   ├── SocialLinks.jsx
│   └── BackToTop.jsx
├── hooks/
│   ├── useTheme.js       Paper/ink with localStorage + OS preference
│   ├── useScrollSpy.js   Scroll-position-based active section
│   ├── usePointerWidth.js Pointer → variable-font width axis (hero)
│   └── useCountUp.js     Stat numerals, reduced-motion safe
├── sections/        One component per page section
└── index.css        Theme tokens, base styles, reduced-motion rules
```

### Editing content

All copy and data lives in `src/data/`. Adding a project means appending an
object to `src/data/projects.js` — no component changes required. Skills resolve
their icons by slug through `components/SkillIcon.jsx`; a slug with no
registered icon renders a styled monogram rather than breaking.

## Design system — "Specimen №"

A brutalist Swiss editorial specimen sheet: warm newsprint paper and ink black,
one signal colour (vermilion), no rounded corners, no glass, no gradients. A
visible 12-column hairline grid runs the page, sections are numbered records
(`§01`), and typography carries the design — Archivo on its variable **width**
axis at display scale against 12px monospace metadata.

### Tokens and the inversion trick

`src/index.css` declares two raw palettes (`--p-*` paper, `--i-*` ink) that no
component ever references. Semantic tokens (`surface-*`, `content-*`, `edge`,
`accent`, `on-accent`) alias one of them, chosen by two things:

1. the page theme — `.dark` on `<html>` opts into ink (paper is the default);
2. `.invert-surface` on a section — flips it to the **opposite** palette.

Because (2) is defined relative to (1), the paper↔ink alternation down the page
survives the theme toggle with no conditional logic in any component: an
inverted section is ink on a paper page and paper on an ink page.

An inline script in `index.html` applies the stored preference before first
paint to avoid a flash of the wrong theme. The preference is written only when
the visitor actually toggles, so an untouched site keeps following the OS.

**All text tokens meet WCAG 2.1 AA (≥4.5:1) against their own surface, in both
palettes.** If you change a colour, re-check the contrast.

### Typography

`.display` drives Archivo's width and weight axes from `--wdth` / `--wght`, so
any caller can retune a heading (or animate it) without redeclaring the font
stack. Sizes are `.d-hero` / `.d-1` / `.d-2` / `.d-3`, all `clamp()`-fluid.
`.meta` and `.meta-sm` are the monospace metadata voice. `.ledger` is the ruled
list used by Experience, Publications, Skills and Contact — there are no cards.

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`) and a skip link.
- Section headings wired via `aria-labelledby`.
- Visible focus rings on all interactive elements (`:focus-visible`).
- Project filtering announces results through an `aria-live` region.
- Record-ledger disclosures use `aria-expanded` / `aria-controls`.
- Form errors use `aria-invalid`, `aria-describedby`, and `role="alert"`, and
  focus moves to the first invalid field on submit.
- `prefers-reduced-motion` disables Framer Motion animations, CSS animation,
  and smooth scrolling.
- Decorative visuals are `aria-hidden`.

## Performance

- Below-the-fold sections are `React.lazy` code-split; the initial chunk carries
  only the hero and about.
- Ledger logos are `loading="lazy"`; the hero portrait is `fetchPriority="high"`.
- No `backdrop-blur` anywhere; animation is limited to transform, opacity and
  clip-path, so it stays on the compositor.
- The portrait duotone/halftone is pure CSS — no second image asset.
- The paper grain is an inlined SVG data URI, so it costs no network request.

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
