# Design Notes — Signal Cartography

## Design concept

Signal Cartography treats the portfolio as a living research atlas rather than a
collection of cards. The visual language connects AI/ML research, network
systems, and full-stack engineering through routes, nodes, orbital geometry,
large editorial typography, and compact technical annotation.

The signature moment is the hero's inference field: a lightweight inline SVG
maps several research routes and lets the final focus node follow a fine
pointer. Scroll gives the field depth without hiding information. When reduced
motion is requested, the complete map remains as a deliberate static
composition.

## Key decisions

### Layout

- An asymmetric coordinate marker identifies each section without consuming
  the reading column.
- The hero offsets the three parts of the name along a route instead of using a
  conventional centered headline.
- Projects are staggered evidence bands with persistent catalogue numbers.
- Skills form a capability spectrum; experience and education use connected
  career lanes; publications use a year-led evidence ledger.
- Desktop navigation becomes a compact coordinate index at wide viewports.
  Tablet and mobile retain a full, keyboard-accessible menu.
- Mobile layouts collapse to a single reading path, with touch targets of at
  least 44px on coarse pointers.

### Color and mood

The palette has two modes:

- **Day atlas:** warm mineral paper, deep teal ink, dark cyan, and olive signal.
- **Night atlas:** observatory teal, warm ivory, ion cyan, and luminous
  chartreuse.

All colors are expressed as semantic CSS variables. This preserves the existing
theme toggle and section inversions without branching inside components. The
lowest calculated text contrast is 5.40:1, exceeding WCAG AA for normal text.

### Typography

- **Instrument Serif** — expressive display and identity typography.
- **Space Grotesk** — body copy, controls, and interface text.
- **IBM Plex Mono** — labels, dates, indices, metadata, and technical evidence.

The fonts are loaded through the existing Google Fonts link in `index.html`.
No font package is installed.

### Motion and interaction

- Framer Motion, already present in the project, drives entry transitions,
  layout-aware project filtering, disclosure animation, and the hero signal
  focus.
- CSS handles route pulses, orbit drift, hover state changes, and underline
  drawing.
- Pointer tracking writes only to MotionValues and is disabled for reduced
  motion or non-fine pointers.
- `prefers-reduced-motion: reduce` removes animation, smooth scrolling, and
  transition duration while leaving all content visible.
- The mobile menu traps focus, closes with Escape, restores focus, locks
  background scrolling, and closes automatically when resizing to desktop.

## Content and feature lock

The redesign continues to render the original modules in `src/data/` directly.
Those modules, every image/PDF in `public/` and `src/assets/`, all SEO and
structured-data tags, the Formspree ID, the Vite base path, and the GitHub Pages
workflow are unchanged.

Preserved features include:

- all hash routes and initial deep-link scrolling;
- active-section scroll spy;
- light/dark theme persistence and OS preference tracking;
- project filtering and its screen-reader announcement;
- expandable experience and education details;
- all paper, project, award, resume, contact, and social links;
- contact validation, submitting, success, and failure states;
- skip link, back-to-top control, mobile navigation, and reduced-motion support.

## Libraries

No npm dependency was added or removed. The redesign reuses:

- React and React DOM;
- Vite;
- Tailwind CSS and PostCSS;
- Framer Motion;
- react-icons;
- Formspree React.

The signature field is repository-native SVG and CSS, avoiding a canvas engine,
3D runtime, image download, or additional animation package.

## How to roll back

The original baseline is permanently named by the
`pre-codex-redesign` tag.

### Restore the exact baseline on a new review branch

```bash
git switch -c restore-pre-codex-redesign pre-codex-redesign
```

This creates a new branch at the untouched baseline without changing `main`,
`redesign`, or `redesign-codex`.

### Revert one design piece

Review the atomic commits, then revert only the desired commit:

```bash
git log --oneline pre-codex-redesign..redesign-codex
git revert <commit-sha>
```

Section commits keep markup and scoped section CSS together, so a project,
skills, experience, research, contact, or footer treatment can be reverted
without reverting unrelated sections.

### Compare everything with the restore point

```bash
git diff pre-codex-redesign..redesign-codex
```

No force push, rebase, hard reset, deployment, or modification of the existing
`main` and `redesign` branches is required.

