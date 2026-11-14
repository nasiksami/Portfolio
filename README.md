# Nasik Sami Khan — Portfolio

Personal portfolio for **Nasik Sami Khan**, AI/ML Researcher & Full-Stack Developer.
Live at **[nasik.ca](https://nasik.ca/)**, with a preview build at
**[nasiksami.github.io/Portfolio](https://nasiksami.github.io/Portfolio/)**.

> Driving innovation at the intersection of AI, ML, and software engineering.

---

## Tech stack

| Concern   | Choice                                          |
| --------- | ----------------------------------------------- |
| Framework | React 18 (function components + hooks)          |
| Build     | Vite 4                                          |
| Styling   | Tailwind CSS 3 with generated CSS-variable tokens |
| Animation | Framer Motion                                   |
| Type      | Fraunces (display) and Public Sans (text), via Google Fonts |
| Icons     | react-icons (Simple Icons, Feather, FA)         |
| Forms     | Formspree                                       |
| Linting   | ESLint + react-hooks + jsx-a11y                 |

## Getting started

Requires **Node.js 18+**. The token generator needs Python 3, with no packages.

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
│   ├── profile.js       name, bio + bio headings, stats, focus areas, socials, nav order
│   ├── projects.js      project cards + filter categories
│   ├── experience.js    professional timeline
│   ├── education.js     degrees + awards/scholarships
│   ├── skills.js        skill groups and proficiency
│   └── publications.js  papers, thesis, venues, links
├── components/
│   ├── ui/
│   │   ├── Section.jsx    Sky row, horizon rule, ground row; places a section on the day arc
│   │   ├── Emphasis.jsx   Marks metrics and named technologies in running copy
│   │   ├── Reveal.jsx     Scroll-triggered entrance, transform and opacity only
│   │   ├── Button.jsx
│   │   └── Tag.jsx
│   ├── Navbar.jsx      Sticky nav, scroll-spy, sky pin control, mobile menu
│   ├── Footer.jsx      Closing ground and wordmark
│   ├── HorizonRule.jsx The 1px horizon line with its glow
│   ├── Aurora.jsx      Drifting aurora bands behind Contact
│   ├── SkillIcon.jsx   Slug → icon registry, with monogram fallback
│   ├── SocialLinks.jsx
│   └── BackToTop.jsx
├── hooks/
│   ├── useSky.js         Keeps the header chrome on the day arc as you scroll
│   ├── useSkyPin.js      Live / Day / Night pin, persisted in localStorage
│   ├── useScrollSpy.js   Scroll-position-based active section
│   ├── useHashScroll.js  Deep links into lazy sections
│   └── useCountUp.js     Stat numerals, reduced-motion safe
├── sections/        One component per page section
├── sky.js           Day-arc knots, section spans, gradient and palette helpers
└── index.css        Type scale, generated sky tokens, base styles
scripts/
└── sky-tokens.py    Generates and contrast-checks the sky token block
```

The page order is Hero, About, Experience, Publications, Projects, Skills and
Contact. It is set in `App.jsx` and mirrored by `navLinks` in `profile.js`.

### Editing content

All copy and data lives in `src/data/`. Adding a project means appending an
object to `projects.js`, with no component changes. Skills resolve their icons
by slug through `components/SkillIcon.jsx`. A slug with no registered icon
renders a styled monogram rather than breaking.

**Emphasis is automatic.** Metrics such as `47%`, `$35,000` and `10+`, and the
name of any skill or project technology, render in semibold wherever they
appear in project descriptions, experience bullets and the About section. The
term list is built from `skills.js` and each project's `tech` array, so
content needs no markup. Matching is case-sensitive.

**The About profile** pairs each paragraph in `bio` with the heading at the
same position in `bioLabels`. Keep the two arrays in step.

**Publication covers** are optional: a `cover` image on an entry in
`publications.js` shows beside it, linked to the paper. Seven are the paper's
first page, rendered once from its PDF to a 320px WebP in
`src/assets/papers/`. The book chapter uses the book's jacket, and any entry
with `type: 'Book chapter'` is drawn as a book with a spine.

## Design system — "Horizon"

A Saskatchewan prairie sky read as one continuous document. Every section is
three rows: a transparent **sky**, a 1px **horizon rule**, and a **ground**
surface below it. Down the page, the sky moves through one day, from a calm
slate-navy pre-dawn behind the hero, through morning and noon, to sunset,
night, and an aurora behind Contact.

See [`DESIGN_NOTES_FABLE.md`](DESIGN_NOTES_FABLE.md) for the full rationale,
the measurements, and how to roll back.

### The sky and its tokens

- **One input.** A registered `--sky` custom property, from 0 to 1, decides
  every colour. `src/index.css` blends eight palette **keyframes** (pre-dawn,
  dawn, morning, noon, afternoon, dusk, night, aurora) into semantic tokens:
  `surface-*`, `content-*`, `edge`, `accent`, `on-accent`, `signal`,
  `on-signal`.
- **Painted, not animated.** Each section is placed on the arc once, at render,
  by `skyProps()` in `src/sky.js`. Its text palette is the nearest keyframe,
  and its background is a gradient through its stretch of the day, so
  adjacent sections join seamlessly. Scrolling restyles nothing. Only the
  header chrome follows the scroll, through `useSky`.
- **A section's time of day comes from its position,** not its subject.
  Reordering sections keeps the sky continuous, as long as the spans in
  `ARC` in `sky.js` still follow document order.
- **Tailwind-compatible.** Tokens are RGB channel triples, so utilities like
  `bg-surface-base/60` and `text-accent` work as usual.

**Pin the sky.** The header's Live / Day / Night control freezes the arc at
noon or night. It writes to `localStorage` only when the visitor clicks,
under the existing `theme` key, so a preference saved by an earlier design
carries over. An inline script in `index.html` applies it before first paint.
Unpinned visitors follow the arc, not the OS colour scheme.

### Editing the palette

Never edit the numbers between the `GENERATED` markers in `index.css` by hand.
The keyframe colours live in the table at the top of `scripts/sky-tokens.py`:

```bash
python3 scripts/sky-tokens.py           # check every keyframe and print the blocks
python3 scripts/sky-tokens.py --write   # regenerate index.css and sky.js
```

The script verifies WCAG AA for every keyframe and sweeps the whole arc. It
also places the two points where text flips between dark and light ink, at
sunrise and sunset. Re-running it on an unchanged table is a no-op.

### Typography

One modular scale (major third, 1.25) from a fluid base of 17px on phones and
18px on desktop, with 1.65 line-height. The steps are CSS custom properties
mapped onto Tailwind's `text-xs` … `text-4xl`.

| Class | Use |
| ----- | --- |
| `.hero-name` | The name: one line at every width, up to 96px |
| `.d-1` | Section headings, up to ~86px |
| `.d-2` | Project titles, publication years |
| `.d-3` | Entry and group titles |
| `.d-stat` | Stat numerals |
| `.subhead` | Text-face subheads, clearly secondary to display headings |
| `.meta`, `.meta-sm` | Tracked uppercase metadata with tabular figures |

Running text is held to `max-w-prose`, which is 54ch and measures about 61–71
characters a line.

**All text tokens meet WCAG 2.1 AA (≥ 4.5:1)** against every surface they sit
on, at every point of the arc. If you change a colour, run the generator.

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`) and a skip link.
- Section headings wired via `aria-labelledby`.
- Visible focus outlines on all interactive elements (`:focus-visible`).
- Project filtering uses `aria-pressed` and announces results through an
  `aria-live` region.
- Timeline disclosures use `aria-expanded` / `aria-controls`.
- The sky pin is a group of `aria-pressed` buttons with accessible labels.
- The mobile menu traps focus, closes on Escape, restores focus, and locks
  background scroll.
- Form errors use `aria-invalid`, `aria-describedby`, and `role="alert"`, and
  focus moves to the first invalid field on submit.
- `prefers-reduced-motion` disables Framer Motion animations, CSS animation
  and smooth scrolling, and snaps the header chrome to the nearest keyframe.
- Decorative visuals are `aria-hidden`.

## Performance

- Below-the-fold sections are `React.lazy` code-split. The initial chunk
  carries only the hero and About.
- The sky is painted once per section, so scrolling triggers no palette
  restyle. A scripted full-page scroll drops no frames.
- Sky tokens are registered with `@property` as numbers, so each resolves
  once rather than per element.
- The hero entrance is transform-only, so its text counts as painted
  immediately for Largest Contentful Paint.
- Both web fonts have size-adjusted local fallbacks, to limit layout shift
  when they load.
- Timeline logos are `loading="lazy"`, and the hero portrait is
  `fetchPriority="high"`.
- Animation is limited to transform and opacity, and there is no
  `backdrop-filter`.

Lighthouse, last measured on the production build: performance 79 on mobile
and 98 on desktop, and 100 for accessibility and best practices.

## Deployment

Static build: `dist/` deploys to any static host.

**GitHub Pages preview.** `.github/workflows/preview.yml` builds, lints and
publishes to [nasiksami.github.io/Portfolio](https://nasiksami.github.io/Portfolio/)
on every push to **`redesign-fable`**. Pushes to other branches, `main`
included, do not deploy. The branch must also be allowed under Settings →
Environments → `github-pages` → Deployment branches. The preview serves a
`robots.txt` that blocks crawlers, so it never competes with the real domain.

**nasik.ca** is deployed by hand. `vite.config.js` sets `base: './'` for
relative asset paths, so the same build works at a domain root and under a
subdirectory. The resume link is the relative `./resume.pdf` for the same
reason.

**Vercel / Netlify:** connect the repo, with build command `npm run build`
and output directory `dist`.

After a domain change, update `public/sitemap.xml` and the canonical / Open
Graph URLs in `index.html`.

## Contact

- [LinkedIn](https://www.linkedin.com/in/nasiksami)
- [GitHub](https://github.com/nasiksami)
- [Google Scholar](https://scholar.google.com/citations?hl=en&user=NCdDTeEAAAAJ)
- [X](https://x.com/NasikSami)
- [nasiksami@gmail.com](mailto:nasiksami@gmail.com)
