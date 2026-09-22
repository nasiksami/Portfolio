# Design Notes — Horizon

Third, independent redesign. It shares only content (`src/data/`, untouched)
and the deployment target with "Specimen №" (`redesign`) and "Signal
Cartography" (`redesign-codex`). Branch: `redesign-fable`. Baseline tag:
`pre-fable-redesign`.

## Concept

A Saskatchewan prairie sky read as one continuous document. The page is a
single horizon line. As the visitor scrolls, the sky above it moves through a
full day — pre-dawn, sunrise, noon, afternoon, sunset, night, aurora — and
every colour on the page derives from where on that arc the viewport sits.

Sections are not boxes on a background. Each is three rows: **sky** (the
transparent page background), the **horizon rule**, and **ground** (a surface
that fills from the rule down and dissolves back into the sky at its foot).
The only hard edge on the page is the next horizon.

## Type

| Role | Face | Why |
|---|---|---|
| Display | **Fraunces** (opsz, wght, SOFT, WONK) | A variable "old-style soft" serif. At 144pt optical size with WONK on, the letterforms turn quirky and hand-cut — painted grain-elevator signage rather than a fashion serif. Its SOFT axis rounds terminals, and Horizon drives it from the sky: headings soften through the warm hours and sharpen at night. |
| Text | **Public Sans** | Designed by the US government for forms and long reading. Neutral, humanist, generous x-height, tabular figures for dates and metadata. It is the plain field to Fraunces' weather. |

No monospace face. Metadata is Public Sans in tracked uppercase with tabular
numerals. Sizes are `clamp()`-fluid; the hero name reaches 14rem.

Both faces have **size-adjusted local fallbacks** (ratios measured against the
loaded fonts in Chromium) so text does not reflow when the web fonts arrive.

## The token system

**One input.** `--sky` (0 → 1) is written onto `<html>` by
`src/hooks/useSky.js`. Each section declares the span of the day it covers
with `data-sky-in` / `data-sky-out` (from `ARC` in `src/sky.js`); the writer
interpolates across the section under the viewport centre. Adjacent sections
share boundary values, so the sky is continuous. No React state is involved,
and unchanged values are never rewritten.

**Eight knots.**

| Knot | Arc | Sky | Ground | Ink | Accent | Signal |
|---|---|---|---|---|---|---|
| pre-dawn | 0.00 | `#0e1226` | `#171b33` | `#f3efe6` | `#f0a868` | `#e8d27a` |
| dawn | 0.11 | `#3b2444` | `#382544`* | `#fbf3ea` | `#ffb37a` | `#ffd479` |
| morning | 0.14 | `#f4e7d4` | `#efe8db`* | `#1c2430` | `#9a4512` | `#6b5300` |
| noon | 0.30 | `#e6eff6` | `#f4efe1` | `#14202c` | `#1a5e8c` | `#7d5400` |
| afternoon | 0.46 | `#efe6d6` | `#f2e6cc`* | `#241f1a` | `#8a3f1e` | `#6b5200` |
| dusk | 0.49 | `#7e3a37` | `#773c4a`* | `#fff3ea` | `#ffd08f` | `#ffe6a3` |
| night | 0.78 | `#0a1420` | `#111c29` | `#eef2f4` | `#9fd3ff` | `#ffdc8a` |
| aurora | 1.00 | `#06110f` | `#0c1a17` | `#eef4ee` | `#7ef0c2` | `#c9a6ff` |

\* Ground at the four crossing knots is luminance-matched to the sky by the
generator; without that there is no instant where both pure inks pass on both
surfaces.

**Surfaces blend, ink flips.** `--w0…--w7` are tent-shaped weights (sum = 1
everywhere). Sky, ground, overlay and edge interpolate continuously. Text
cannot: any colour path from dark-on-light to light-on-dark passes through
1:1. So ink uses `--v0…--v7`, the same weights with a hard step at two
**flips** — sunrise `0.12171` and sunset `0.48198` — placed at the centre of
the window where pure white and pure black both clear 4.5:1 on both surfaces.
Within ±0.03 of a flip, secondary inks fold into primary and primary folds to
pure white or black. The two brightness crossings each take 0.03 of the arc,
so the sky spends almost all its time near a verified knot.

**Typed, so cheap.** Every weight, step and channel is registered with
`@property` as a `<number>`, so each resolves once at the root and descendants
inherit a number. Untyped, one `--sky` write cost ~50ms; typed, ~16ms.

**Tokens are triples.** Outputs are RGB channel triples (`--sky-rgb`,
`--ink-rgb`, `--accent-rgb`…), so the Tailwind config keeps the
`rgb(var(--x) / <alpha-value>)` pattern and every opacity modifier works.

**Generated, not hand-edited.** `scripts/sky-tokens.py` holds the knot table.
It verifies every knot, finds the flips, sweeps the grid, and with `--write`
splices the `@property` block and the token block into `src/index.css` between
`GENERATED` markers and updates `src/sky.js`. Re-running it on the committed
tree is a no-op.

```bash
python3 scripts/sky-tokens.py           # report + print the blocks
python3 scripts/sky-tokens.py --write   # regenerate after editing the table
```

### Verified contrast

- Every knot: all five inks ≥ 4.5:1 on sky and ground; on-accent and on-signal
  ≥ 6.49:1.
- Generator sweep, 2001 positions at 0.0005: worst **4.58:1**, none below AA.
- In-browser sweep (Chromium computing the real CSS), same 2001 positions:
  worst **4.589:1** (ink on ground at 0.482), **0 failures**.
- The writer quantises to 0.002, a subset of the swept grid; neither flip lies
  on it.

## Pin the sky

The toggle is a three-button group: **Live** follows the arc; **Day** pins
`--sky` at 0.30; **Night** at 0.78 (starlight, not aurora). Each is an
`aria-pressed` button. localStorage is written **only on click**, under the
existing `theme` key with the existing values, so a visitor who saved `dark`
in an earlier design lands pinned to Night, and `light` lands on Day. Choosing
Live removes the key. An inline script in `index.html` applies the pin before
first paint.

**Changed semantics:** unpinned visitors follow the arc, not the OS colour
scheme. `prefers-color-scheme` no longer applies unless the visitor pins.

**Reduced motion:** `--sky` snaps to the nearest knot for the section in view
instead of gliding, so those visitors only ever see a verified palette. All
CSS animation and transition durations are zeroed, and every Framer Motion
entry, parallax and weather layer falls back to a static composition.

## The horizon, section by section

| § | Section | Arc | Relation to the line | Move |
|---|---|---|---|---|
| 00 | Hero | 0 → sunrise | Name stands on the rule; role, summary and actions on the ground | The portrait is the sun: a disc half below the line that crests as you scroll. Three haze bands drift against the pointer at different depths; a grass fringe leans with pointer velocity. MotionValues only. |
| 01 | About | sunrise → 0.30 | Tagline in the sky, everything else on the ground | Stats stand below the rule as survey posts and count up. Focus areas form a quarter section: NW, NE, SW, SE. |
| 02 | Projects | 0.30 → 0.40 | Filter and skyline in the sky, records on the ground | A skyline of grain elevators, one per visible project, stands on the rule and links to each record. |
| 03 | Skills | 0.40 → sunset | Fully below the line | Six ruled furrows; proficiency is three seeds. |
| 04 | Experience | sunset → 0.66 | Timeline drops from the rule | A plumb line falls from the horizon; entries hang from it. Education sticky beside at wide viewports. |
| 05 | Publications | 0.66 → 0.84 | Sky-heavy | Papers in the night sky with years set large as the first stars; awards as a constellation on the ground. |
| 06 | Contact | 0.84 → 1 | Channels in the sky, form on solid ground | Aurora bands drift across the sky, visible only at the end of the arc. The footer continues the ground; the name stands on a final horizon. |

## Behaviour preserved

Identical logic, redesigned appearance: project filter with `aria-pressed`
and the live-region announcement; layout animation on filter; experience and
education disclosures with `aria-expanded` / `aria-controls`; author bolding;
count-up stats (reduced-motion safe); `Reveal` with the `9999px` top margin;
hash deep-link scrolling; scroll spy; mobile menu focus trap, Escape, focus
restore, scroll lock and desktop auto-close; skip link; back-to-top; contact
validation with focus to the first invalid field, `aria-invalid`,
`aria-describedby`, `role="alert"`, busy, success and failure states.

Unchanged: `src/data/`, every asset, the Formspree ID, `vite.config.js`
`base: './'`, `./resume.pdf`, the Pages workflow, SEO and structured data.

Focus: every interactive element uses a 2px signal-colour outline at 4px
offset, which reads against every sky and survives `overflow: hidden`.

## Lighthouse

Lighthouse 12, Playwright Chromium, static `dist/` served over localhost.

| Build | Preset | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `redesign` (baseline) | mobile | 72 | 100 | 100 | 100 | 5.4 s | 0 | 10 ms |
| `redesign` (baseline) | desktop | 96 | 100 | 100 | 100 | 1.3 s | 0 | 0 ms |
| `redesign-fable` | mobile | **74** | **100** | **100** | **100** | 4.9 s | 0.006 | 10 ms |
| `redesign-fable` | desktop | **96** | **100** | **100** | **100** | 1.3 s | 0.001 | 0 ms |

Both builds carry one zero-weight informational audit,
`label-content-name-mismatch` (the resume link's accessible name differs from
its visible text), which does not affect the score.

## Libraries

No dependency was added or removed. Horizon uses React, Framer Motion
(`useMotionValue`, `useSpring`, `useScroll`, `useTransform`, `useVelocity`),
Tailwind, react-icons and Formspree. The sky is CSS custom properties; the
weather is inline SVG and blurred divs; the aurora is a CSS animation.

## Removed on this branch only

`usePointerWidth.js`, `useTheme.js` (replaced by `useSkyPin.js`),
`GridFrame`, `ColumnRules`, `SignalField`, `Marquee`, `Footer.css` and every
section stylesheet. The old designs' unused global classes do not exist in
this branch's `index.css`, which was written from scratch. Other branches are
untouched.

## Known limits

- The two ink flips are hard cuts by design. Scrolling slowly past sunrise or
  sunset, text colour switches in one frame.
- `README.md` on this branch still describes "Specimen №". It was left alone
  so this branch's diff stays to the redesign itself.

## How to roll back

The baseline is permanently named by the `pre-fable-redesign` tag.

```bash
# See every Horizon commit
git log --oneline pre-fable-redesign..redesign-fable

# Compare everything with the baseline
git diff pre-fable-redesign..redesign-fable

# Restore the exact baseline on a new branch (nothing else changes)
git switch -c restore-pre-fable-redesign pre-fable-redesign

# Revert a single step on redesign-fable
git switch redesign-fable
git revert <commit-sha>

# Abandon the redesign entirely (only after you are sure)
git switch main
git branch -D redesign-fable
```

Section commits keep their markup and any removed stylesheet together, so one
section can be reverted without touching the others. No force push, rebase or
change to `main`, `redesign` or `redesign-codex` is ever required.
