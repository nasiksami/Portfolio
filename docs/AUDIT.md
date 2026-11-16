# Audit — nasik.ca before the upgrade

Read-only audit of the `main` branch at commit `b64b515` (16 Nov 2026), taken
before any change. Findings are split into what was confirmed by running or
reading something, and what is assumed.

## 1. Stack

| | |
| --- | --- |
| Framework | React 18.2, rendered in the browser only (`ReactDOM.createRoot`) |
| Build | Vite 4.5, `base: './'` (relative asset paths) |
| Router | None. One page; navigation is by `#hash` to sections |
| Styling | Tailwind CSS 3.4, plus generated CSS-variable tokens in `src/index.css` |
| Motion | Framer Motion 12 |
| Contact form | Formspree, through `@formspree/react` |
| Tests | Playwright 1.65, 8 smoke tests × 2 device profiles |
| Lint | ESLint 8 with React, hooks and jsx-a11y rules. No type checking is configured |
| Content | Plain JavaScript modules in `src/data/` (`profile`, `experience`, `education`, `projects`, `publications`, `skills`). Components hold no copy |

## 2. Build and deploy

**The brief describes the site as hosted on GitHub Pages with a custom domain.
That is not how it is deployed.** Confirmed from `.github/workflows/deploy.yml`
and from response headers:

- `nasik.ca` is served by **Hostinger** (`platform: hostinger`, `server: hcdn`).
  The workflow uploads `dist/` there over FTPS, **only on a push to `main`**.
- GitHub Pages hosts a **preview copy** at `nasiksami.github.io/Portfolio/`,
  deployed on a push to `main` or `redesign-fable`, with a `robots.txt` that
  blocks crawlers.
- No other branch triggers the workflow, so pushing `portfolio-upgrade`
  deploys nothing.

Consequences for this work: the build must work at a domain root and under
`/Portfolio/`; a GitHub Pages `404.html` alone does not give nasik.ca a 404
page; there is no `CNAME` file and none is needed.

| Item | State before |
| --- | --- |
| Scripts | `dev`, `build` (`vite build`), `preview` (`vite preview`), `lint`, `test` |
| Deploy branch | `main` |
| `CNAME` | Not present, not needed (domain is on Hostinger) |
| `404.html` | Not present. nasik.ca returned Hostinger's default 404 page |
| `robots.txt` | Present, allows all, points to the sitemap |
| `sitemap.xml` | Present, hand-written, one URL |
| Canonical | `https://nasik.ca/` |
| Open Graph image | `og-image.jpg`, 320×309 (the portrait), not the 1200×630 that link previews expect |
| JSON-LD | One `Person` block, `jobTitle` "AI/ML Researcher & Full-Stack Developer" |
| `www.nasik.ca` | Answers 200 with the same site and does not redirect to `nasik.ca` |
| `http://` | Redirects to `https://` (301) |

## 3. Content inventory against the fact sheet

✓ match · ✗ conflict · ? not verifiable

### Identity

| Item | On the site | Fact sheet | |
| --- | --- | --- | --- |
| Title | AI/ML Researcher & Full-Stack Developer | AI Software Developer | ✗ |
| Hero badge | AI Team Lead at BDM Healthware | Must not use "AI Team Lead" | ✗ |
| Summary | "AI Team Lead and published researcher…" | Summary in 3.2 | ✗ |
| Experience | "over three years" / 3+ | 4+ years | ✗ |
| Location, email, phone, LinkedIn, GitHub | As listed | Same | ✓ |
| Scholar link | `scholar.google.com/citations?hl=en&user=…` | `scholar.google.ca/citations?user=…` | ✗ (same profile) |
| Stats | 8 publications, 3+ years, 9 roles held, 88.4% | 8, 100+ citations, 4+ years; remove "roles held" | ✗ |

### Experience (9 entries)

| Entry | | Note |
| --- | --- | --- |
| BDM Healthware, "AI Team Lead (AI Software Developer)", Sep 2025 – Present | ✗ | Title, and six bullets that differ from the resume |
| University of Regina, Graduate Research Assistant, Jan 2023 – May 2025 | ✗ | "raising F1 by 14%" is the superseded incident-management figure |
| Lab Instructor, Jan 2025 – Apr 2025 | ✓ | To be grouped |
| Teaching Assistant, Jan 2023 – Apr 2025 | ✓ | To be grouped |
| CS Skills Tutor, Aug 2023 – Mar 2025 | ✗ | "100% pass rate" must go. End date: site Mar 2025, LinkedIn Apr 2025 |
| Classroom Technical Support, Jan 2024 – Apr 2024 | ✓ | To be grouped |
| Student Research Assistant, May 2023 – Aug 2023 | ✓ | To be grouped |
| DPO International, Software Engineer, Sep 2021 – Jan 2023 | ✗ | Name should be "D.P.O. International Sdn Bhd". 37% is already correct |
| DHL, Software Engineer (Intern), Feb 2021 – Aug 2021 | ✓ | Wording differs from the resume |

The typos named in the brief ("from ground levels", "Adminstrating") were not
on `main`; they had been fixed earlier.

### Education and awards

| Item | | Note |
| --- | --- | --- |
| MSc, 2023 – 2025, 88.40% | ✓ | |
| "over $35,000 in scholarships, research assistantships, and teaching roles" | ✗ | Must read "$35,000+ in scholarships and assistantships" |
| BSc, 2017 – 2021, CGPA 3.62/4.00, Dean's List 6 of 8 | ✓ | |
| Seven awards | ✓ | Silver rank lacked "top 8 of 414 participants from 59 countries" |

### Projects (7)

| Project | | Note |
| --- | --- | --- |
| Telecom QA RAG System | ✗ | "47% improvement" is not in the paper; see section 5 |
| 5G Slice Benchmarking | ? | No paper or repository to check against. Listed second, above two flagships |
| LLM-Based Incident Management | ✗ | "+14% … +12.7% with Phi-2" is superseded by the JSAC paper (Phi-3.5, 94.98% F1) |
| Network Ticket Classification | ✓ | "up to 7%" confirmed. No deployment claim present |
| Heritage Hive | ✓ | No link to the public repository |
| Cyberbullying Severity Detection | ✓ | |
| Waste Classification with ML/DL | ? | "Shipped with a Streamlit demo app": no demo is linked |

### Publications (8)

All eight are present. Conflicts: the CNSM title was not hyphenated ("Token
Prioritization"); the ICNC paper was listed as "International Workshop on
Computing, Networking and Communications (CNC)"; links went to author PDFs
rather than publisher records; the list was not grouped by type.

### Skills

Six groups with Expert / Advanced / Intermediate labels on every item (✗), and
several low-signal items in the main view.

## 4. Problems

### Confirmed

1. **The page has no content without JavaScript.** `curl https://nasik.ca/`
   returns a 5 kB document whose body is `<div id="root"></div>` and a
   "requires JavaScript" notice. Name, experience, projects and publications
   are absent. This is the cause of the empty result in search and AI tools.
2. **One URL.** Everything is on `/`, so there are no project pages to index
   or link to.
3. **Head tags describe the old title**, in `<title>`, description, Open Graph,
   Twitter and JSON-LD.
4. **The social preview image is 320×309**, and the Twitter card is `summary`.
5. **No 404 page** on either host for this site.
6. **Experience bullets beyond the first two are not in the DOM** until
   "Show more" is clicked, so even a crawler that runs JavaScript misses them.
7. **Stat values start at "0"** and count up, so a snapshot can record "0".
8. **Reveal animations set `opacity: 0` inline.** Harmless while everything is
   rendered in the browser, but with server-rendered markup it would hide
   content from visitors without JavaScript, and under
   `prefers-reduced-motion` it would leave content hidden for good (React
   does not correct mismatched attributes when hydrating).
9. **`useSkyPin` reads `document` during render**, which would make the first
   client render differ from server markup for visitors with a stored pin.
10. `README.md` reports Lighthouse scores that predate this audit and could
    not be re-measured here (Lighthouse is not installed).

### Assumed, not confirmed

- That nothing on the Hostinger account depends on an existing `.htaccess`.
  It cannot be read from outside (it returns 403, as any `.ht*` file does).
- That `www.nasik.ca` is meant to serve the site rather than redirect.

## 5. Research figures checked against the papers

| Claim on the site | Source says | |
| --- | --- | --- |
| Telecom RAG: "47% improvement" | Globecom paper, Table III: baseline 21.8%, best 67.0% on the private leaderboard. The paper and the thesis abstract both call this "45.20%" / "45.2%"; it is 45.2 percentage points (a relative gain would be about 207%). **47% appears in neither.** | ✗ |
| Telecom RAG: "multi-modal" | The paper skipped tables and images when chunking | ✗ |
| Telecom RAG: ColBERT | Not in the Globecom paper. The thesis abstract describes FLAN-T5 with ColBERT retrieval | ✓ for the thesis |
| Incident management: 79.20% and 94.98% F1 | JSAC abstract and Tables VII and IX | ✓ |
| Incident management: margins over baselines | The abstract says 23.59% and 29% "on average"; the conclusion says 14.66% and 19.88% | Ambiguous, not quoted |
| Incident management: labels predicted | The paper predicts four: network impact, service impact, root cause and resolution | Fact sheet names three |
| Ticket classification: up to 7% higher F1 | CNSM abstract; 7.16% in the results | ✓ |
| Intrusion detection: 92%+ F1, +22.5% on minority classes | ICNC abstract: "above 92%", "22.50%" | ✓ |
| Intrusion detection venue | Crossref: 2024 International Conference on Computing, Networking and Communications (ICNC), pp. 254–258 | ICNC |
| 100+ citations | Google Scholar showed 140 on 16 Nov 2026 | ✓ |

## 6. Pre-rendering options

Constraints: stay on React + Vite; no router today; must work at `/` and
under `/Portfolio/`; static hosting on two hosts; four routes.

| | `vite-react-ssg` | Build-time `renderToPipeableStream` script | Headless-browser snapshot |
| --- | --- | --- | --- |
| How | Replaces the entry point and adds React Router | Vite's own SSR build, then a 100-line Node script writes `dist/<route>/index.html` | Loads each built page in Chromium and saves the DOM |
| Router | Requires adopting React Router | None needed; a route table and a relative-link helper | None |
| Sub-directory hosting | Needs a fixed `base`; the two hosts would need two builds | Relative prefix per page, one build for both hosts | Works |
| Hydration | Real hydration | Real hydration | Snapshots contain post-effect state (animated styles, counted-up numbers), which hydration does not expect |
| New dependencies | 2 (and it pins Vite and React Router versions) | 0 | 0 at runtime, but the build needs a browser on CI |
| Build time | Seconds | About 2 seconds extra | Tens of seconds, and flaky |
| Maintenance | Tied to a small third-party project | Uses only Vite and React APIs | Brittle |

**Recommendation: the build-time render script.** It adds no dependency, keeps
one build for both hosts, and uses React's own server renderer, so what is
written is exactly what the client hydrates. The cost is that components must
render the same on server and client, which items 7–9 above have to be fixed
for anyway.
