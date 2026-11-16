# Decisions

Decisions taken without stopping to ask, each with its reason. Open
questions that need an answer from you are in `OPEN_QUESTIONS.md`.

## Branching and deployment

| # | Decision | Reason |
| --- | --- | --- |
| 1 | Branch `portfolio-upgrade` from `main` at `b64b515` | `main` is the branch that deploys nasik.ca. `redesign-fable` was at the same commit |
| 2 | Push only `portfolio-upgrade` | The deploy workflow runs only for `main` and `redesign-fable`, so this push deploys nothing |
| 3 | Leave `.github/workflows/deploy.yml` unchanged | It runs `npm run lint`, `npm run build` and `npx playwright test`, which now cover pre-rendering and the new tests without edits |
| 4 | The brief and the root copy of the resume are excluded through `.git/info/exclude` | Keeps them out of commits without adding them to the shared `.gitignore` |

## Pre-rendering

| # | Decision | Reason |
| --- | --- | --- |
| 5 | Build-time render script (Vite SSR build + `scripts/prerender.mjs`), not `vite-react-ssg` or a headless snapshot | No new dependency, one build for both hosts, real hydration. Comparison in `AUDIT.md` §6 |
| 6 | No router library. A route table in `src/site.js`; each page is its own HTML file and links between pages are ordinary links | Four routes do not need client-side routing, and full page loads keep every URL directly loadable and refreshable on a static host |
| 7 | All links and asset paths are relative to the page | nasik.ca serves from `/`, the Pages preview from `/Portfolio/`. Relative paths let one build serve both |
| 8 | `renderToPipeableStream` with `onAllReady`, not `renderToString` | The lazy sections suspend; `renderToString` would write their fallbacks instead of their content |
| 9 | Reveal and the hero entrance moved from Framer Motion to CSS, gated on a `.js` class | Inline `opacity: 0` in server markup would hide content without JavaScript, and under reduced motion would never be undone. CSS keeps server and client markup identical |
| 10 | "Show more" removed from experience entries; all bullets are always shown | Collapsed bullets were absent from the markup. Consolidating the teaching roles shortened the section enough not to need it |
| 11 | Stats render their real value first and count up from zero only when scrolled into view | The pre-rendered page must never say "0" |
| 12 | The sky-pin control renders as "Live" first and reads the stored pin after mount | Server markup cannot know a visitor's stored preference |
| 13 | `404.html` is a self-contained page, not part of the React app | It is served for unknown URLs at any depth, so relative paths cannot work, and it must not depend on the bundle |
| 14 | `npm run preview` now runs `scripts/serve-dist.mjs` | `vite preview` answers unknown URLs with the home page. The new server returns a real 404 and redirects to trailing slashes, as the hosts do, so tests see production behaviour |
| 15 | `public/.htaccess` added | nasik.ca is on Hostinger, where a `404.html` file is not used unless configured. See `OPEN_QUESTIONS.md` item 13 |

## SEO

| # | Decision | Reason |
| --- | --- | --- |
| 16 | Head tags and JSON-LD are generated from the data modules in `src/seo.js` | Metadata cannot drift from what the page says |
| 17 | New 1200×630 `og-image.png`, drawn by `scripts/og-image.mjs`; the old 320×309 `og-image.jpg` removed | No suitable image existed. The card uses the site's palette, typefaces and portrait |
| 18 | `sitemap.xml` is generated at build time; the hand-written one removed | It lists every route in the route table |
| 19 | Book chapter and thesis use the schema.org types `Chapter` and `Thesis`; the six papers use `ScholarlyArticle` | More accurate than calling all eight articles |
| 20 | `sameAs` lists LinkedIn, GitHub and Scholar only | As specified in the brief |

## Content

| # | Decision | Reason |
| --- | --- | --- |
| 21 | Telecom RAG result stated as "from 21.8% to 67.0%, a gain of 45.2 percentage points" | Confirmed in the paper. The brief said to state it precisely once confirmed |
| 22 | The earlier incident-management figures (+14%, +12.7% with Phi-2) removed, not relabelled | The JSAC paper supersedes them; keeping two sets of numbers invites confusion |
| 23 | Incident-management margins not quoted; scores only | The paper states two different sets of margins |
| 24 | Stats row keeps "88.4% MSc grade" beside 8 publications, 100+ citations and 4+ years | It is in the fact sheet (3.4), and keeps the four-post layout. "Roles held" removed |
| 25 | "What I do" rewritten as the four focus areas | The old cards claimed research "ships to production", which the do-not-claim list rules out |
| 26 | Hero shows the focus line under the title, then one sentence | As specified. CTAs are View projects, Download resume, Contact |
| 27 | Resume served as `Nasik_Sami_Khan_Resume.pdf`; `resume.pdf` removed | The brief asked for the old PDF to be removed or replaced. A redirect keeps old links working on nasik.ca |
| 28 | Teaching roles grouped into one entry, "Teaching and academic support", Jan 2023 – Apr 2025 | Span of the five roles. Each keeps its own title and dates |
| 29 | Experience order: BDM, University of Regina (research), D.P.O., DHL, then teaching | Order of section 3.3 |
| 30 | MSc shown as "MSc in Computer Science" with a "Thesis Route" tag | The full title wrapped to four lines in the narrow column |
| 31 | Project roles: "First author", "Co-author", "Co-developer, team of three" | Replaces titles such as "Lead Researcher & Developer" that the sources do not support |
| 32 | No project added or removed. Order: Telecom RAG, Incident Management, Heritage Hive, ticket classification, 5G, cyberbullying, waste | As specified; 5G moved below the flagships |

## Projects and case studies

| # | Decision | Reason |
| --- | --- | --- |
| 33 | Architecture diagrams are HTML ordered lists styled as flow boxes, not SVG | A list is read in order by screen readers and as text by crawlers, and reflows on a phone |
| 34 | Diagrams contain only components named in the paper or repository | As specified |
| 35 | Heritage Hive "Results" lists what the repository contains and states that no figures are published | There are no metrics to quote |
| 36 | Case-study pages use three sky sections (morning, midday, dusk to night) with new arc entries | Reuses the existing visual system without touching the home page's arcs |

## Publications and skills

| # | Decision | Reason |
| --- | --- | --- |
| 37 | Titles link to the DOI or publisher record; a separate "PDF" link is shown where a public author copy exists | Official record first, as specified |
| 38 | Awards placed directly under the section heading, publications below | "Awards near the top of the research section" |
| 39 | A collapsed "More tools" list holds Streamlit, OpenCV, Keras, Entity Framework, Dapper, MySQL, Oracle, HTML, CSS, Java, C++, Postman, Tableau and Power BI | Kept on the page for search, out of the main view. VBA, Heroku, AngularJS, Wireshark, VS Code and Colab dropped |

## UI, accessibility, performance

| # | Decision | Reason |
| --- | --- | --- |
| 40 | No visual redesign | Same identity, as specified. Changes are limited to what content and pre-rendering required |
| 41 | Lighthouse scores not reported | Not installed, and not downloadable in this session. axe-core (already in `node_modules`) and direct timings used instead |
| 42 | The home and case-study pages share one bundle | Splitting by page would save about 30 kB on case studies but add a network round trip before the home page hydrates. Left for later |
| 43 | README's old Lighthouse figures replaced by a pointer to the report | They described the client-rendered site and were not re-measured |

## Commits

| # | Decision | Reason |
| --- | --- | --- |
| 44 | Commits are grouped by topic, and only the branch tip was built and tested | The pre-rendering, content and case-study changes touch the same components, so the intermediate commits are slices of one change and were not verified individually |
