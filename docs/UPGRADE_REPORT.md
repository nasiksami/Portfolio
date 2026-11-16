# Upgrade report — nasik.ca

Branch `portfolio-upgrade`, cut from `main` at `b64b515` on 16 Nov 2026.
Nothing has been deployed. Everything below was run against a clean
production build on that date; outputs are quoted or summarised from the
actual runs.

## 1. What changed

- **The site is now readable without JavaScript.** Every page is written to
  static HTML at build time. A plain fetch of the home page used to return an
  empty shell; it now returns about 16,000 characters of text: name, title,
  summary, experience, projects, publications and contact details.
- **Three new pages.** Telecom RAG, Incident Management and Heritage Hive each
  have a case study at `/projects/<name>/`, laid out as problem, contribution,
  architecture, implementation, results and evidence.
- **The title is "AI Software Developer" everywhere:** hero, page title,
  description, social tags and structured data. "AI Team Lead" is gone.
- **Content matches the resume.** Experience uses the resume's wording and
  order; teaching roles are one grouped entry; experience reads 4+ years.
- **Research numbers are quoted from the papers.** One did not survive the
  check: the Telecom RAG "47%" is not in the paper or the thesis, which give
  21.8% → 67.0% (45.2 percentage points). The site now says that. **Your
  resume PDF still says 47%.**
- **Projects are consistent cards** (problem, approach, one result, stack,
  links), with the three flagships first. All seven projects are still there.
- **Publications are grouped by type** and link to the publisher's record,
  with a PDF link where an author copy exists. Awards sit above them.
- **Skills have no proficiency labels** and follow the resume's groups.
- **Search and sharing:** each page has its own title, description, canonical
  URL, social tags and structured data; there is a generated sitemap, a
  1200×630 preview image and a real 404 page.
- **The look is unchanged.** Same palette, type and sky; changes are limited
  to what the content and pre-rendering needed.

## 2. Technical summary

**The original problem.** The app rendered only in the browser
(`ReactDOM.createRoot` into an empty `<div id="root">`). The served HTML held
head tags and a "requires JavaScript" notice, so crawlers that do not run
scripts saw nothing.

**One correction to the brief.** nasik.ca is not on GitHub Pages. The deploy
workflow uploads to **Hostinger** over FTPS on a push to `main`; GitHub Pages
hosts only a crawler-blocked preview at `nasiksami.github.io/Portfolio/`. This
shaped two choices: all paths are relative so one build serves both, and
nasik.ca needs an `.htaccess` line to use the 404 page.

**The solution.** A build-time render, chosen over `vite-react-ssg` and a
headless-browser snapshot because it adds no dependency, needs no router, and
produces markup the client genuinely hydrates (comparison in `AUDIT.md` §6).
`npm run build` now runs:

1. `vite build` → the browser bundle in `dist/`
2. `vite build --ssr src/entry-server.jsx` → the same components for Node
3. `node scripts/prerender.mjs` → `dist/<route>/index.html` for each route,
   plus `sitemap.xml` and `404.html`

**Changes needed to make server and client render the same markup:**

- Scroll reveals and the hero entrance moved from Framer Motion's inline
  styles to CSS behind a `.js` class. Without this, pre-rendered content
  would be invisible without JavaScript and, under reduced motion, would stay
  hidden.
- Stats render their real value first, then count up when scrolled to.
- The sky-pin control reads the stored preference after mount.
- "Show more" on experience entries was removed; all bullets are in the page.
- Images use one page-relative URL on both sides.

**New routes:** `/projects/telecom-rag/`, `/projects/incident-management/`,
`/projects/heritage-hive/`.

**New modules:** `src/site.js` (routes and link helpers), `src/seo.js` (head
tags and JSON-LD), `src/entry-client.jsx`, `src/entry-server.jsx`,
`src/pages/Home.jsx`, `src/pages/CaseStudy.jsx`,
`src/components/FlowDiagram.jsx`, `src/data/caseStudies.js`,
`scripts/prerender.mjs`, `scripts/serve-dist.mjs`, `scripts/og-image.mjs`.

**Config:** `vite.config.js` (SSR settings), `package.json` (build, preview
and lint scripts; no dependency added or removed), `playwright.config.js`
(tests run against `scripts/serve-dist.mjs`), `.eslintrc.cjs` (Node
environment for scripts). The deploy workflow is unchanged.

## 3. Content corrections

| Content | Before | After | Source |
| --- | --- | --- | --- |
| Title | AI/ML Researcher & Full-Stack Developer | AI Software Developer | Fact sheet 3.1 |
| Hero badge | AI Team Lead at BDM Healthware | AI Software Developer at BDM Healthware | Fact sheet 3.1 |
| BDM title | AI Team Lead (AI Software Developer) | AI Software Developer | Fact sheet 3.3 |
| BDM bullets | Six bullets, older wording | The resume's six bullets | Resume |
| Experience | 3+ years / "over three years" | 4+ years | Fact sheet 3.1 |
| Stats | 8 publications, 3+ years, 9 roles held, 88.4% | 8 publications, 100+ citations, 4+ years, 88.4% | Fact sheet; Scholar showed 140 |
| Telecom RAG result | 47% improvement | From 21.8% to 67.0%, a gain of 45.2 percentage points | Globecom paper, Table III |
| Telecom RAG wording | "multi-modal RAG pipeline" | "RAG pipeline" | Paper skipped tables and images |
| Incident management | +14% minority F1, +12.7% with Phi-2 | 94.98% F1 with RAG-enhanced Phi-3.5 and re-ranking; 79.20% encoder-only | JSAC 2026 |
| Research bullet | "raising F1 by 14%" | Per-paper results, each named with its venue | Papers |
| Tutor | "contributing to a 100% pass rate" | "100+ students tutored" | Fact sheet 3.3 |
| Funding | "over $35,000 in scholarships, research assistantships, and teaching roles" | "$35,000+ in scholarships and assistantships" | Fact sheet 3.4 |
| D.P.O. name | DPO International | D.P.O. International Sdn Bhd | Fact sheet 3.3 |
| Processing time | 37% | 37% (unchanged; already correct) | Fact sheet 3.3 |
| Teaching | Five separate entries | One grouped entry, each title with its dates | Fact sheet 3.3 |
| Silver rank | No detail | Finalist in the top 8 of 414 participants from 59 countries | Fact sheet 3.4 |
| CNSM title | A Token Prioritization Strategy… | A Token-Prioritization Strategy… | Paper |
| ICNC venue | International Workshop on … (CNC) | IEEE International Conference on Computing, Networking and Communications (ICNC), pp. 254–258 | Crossref |
| Publication links | Author PDFs | DOI or publisher record, plus PDF where available | Crossref, repository |
| Scholar link | scholar.google.com/…hl=en&user=… | scholar.google.ca/citations?user=… | Fact sheet 3.1 |
| Project roles | "Lead Researcher & Developer", "Network Research Engineer", etc. | First author, Co-author, Co-developer | Papers, repository |
| "What I do" | Four cards, including research that "ships to production" | Machine Learning, LLMs & RAG, Agentic AI, Healthcare AI | Fact sheet 3.1, 3.7 |
| Waste project | "Shipped with a Streamlit demo app" | Sentence removed | No demo exists to link |
| Skills | Expert / Advanced / Intermediate on every item | No labels; resume groups | Fact sheet 3.6 |
| Heritage Hive | No link | Links to the public repository and a case study | Repository |
| Resume file | `resume.pdf` (older) | `Nasik_Sami_Khan_Resume.pdf` (the supplied PDF, byte-identical) | Supplied file |

## 4. Test results

All run on 16 Nov 2026 against a clean `npm run build`.

**Lint.** `npm run lint` (ESLint over `src` and `scripts`): no errors, no
warnings. No type checking is configured in this project.

**Build.** `npm run build` completed:

```
prerendered / 190.7 kB
prerendered /projects/telecom-rag/ 47.5 kB
prerendered /projects/incident-management/ 45.0 kB
prerendered /projects/heritage-hive/ 42.1 kB
wrote sitemap.xml with 4 URLs
wrote 404.html
```

**Automated tests.** `npx playwright test`: **52 passed, 0 failed** (26 tests
on a desktop and a phone profile). They cover the HTML served for each route,
head tags and JSON-LD, the 404 page, trailing-slash redirects, sitemap and
robots, the pages with JavaScript disabled, hydration without console errors,
navigation to a case study and back, images, the resume download, the project
filter, the sky pin and the contact form.

**curl on every route, no JavaScript** (local server on port 4173):

| URL | Status | Type | Size |
| --- | --- | --- | --- |
| `/` | 200 | text/html | 195,331 B |
| `/projects/telecom-rag/` | 200 | text/html | 48,656 B |
| `/projects/incident-management/` | 200 | text/html | 46,110 B |
| `/projects/heritage-hive/` | 200 | text/html | 43,138 B |
| `/projects/telecom-rag` (no slash) | 301 → with slash | | |
| `/no-such-page` | 404, the site's own page | text/html | 2,760 B |
| `/Nasik_Sami_Khan_Resume.pdf` | 200 | application/pdf | 45,459 B |
| `/sitemap.xml` | 200 | application/xml | 4 URLs |
| `/robots.txt` | 200 | text/plain | allows all |
| `/og-image.png` | 200 | image/png | 1200×630 |

**grep on the generated home page** (occurrences): "Nasik Sami Khan" 16,
"AI Software Developer" 15, "Telecom QA RAG System" 3, "Leveraging LLM for
Enhanced Incident Management in Wireless Networks" 4, "BDM Healthware" 6,
"nasiksami@gmail.com" 7. The body holds 15,954 characters of text before any
script runs. Each case-study file has one `h1` and the Problem, Architecture,
Results and Evidence headings.

**Content check against the fact sheet** (all built pages, including head
tags and JSON-LD):

- Absent, 0 occurrences each: "AI Team Lead", "AI Technical Lead", "100% pass
  rate", "47%", "40%", "3+ years", "roles held", "Phi-2 added", "12.7" (in
  text), "from ground levels", "Adminstrat", "Expert", "Intermediate",
  "Proficiency", "Token Prioritization" (unhyphenated), "Full-Stack
  Developer", "in production", "multi-modal", "requires JavaScript",
  `resume.pdf`, `og-image.jpg`.
- Present: 8 publication entries, 7 project cards in the specified order,
  "37%", "94.98%", "79.20%", "Phi-3.5", "21.8%", "67.0%", "45.2 percentage
  points", "$35,000+ in scholarships and assistantships",
  "Token-Prioritization", "D.P.O. International Sdn Bhd", "top 8 of 414
  participants from 59 countries".
- "AI & Technical Lead" appears once, in the BDM bullet about the Vector
  Institute cohort, as a responsibility, exactly as in the fact sheet.
- `noindex` appears once, on `404.html`, which is intended.

**Metadata and JSON-LD.** Each route has one `<title>`, a description, a
canonical on `https://nasik.ca`, Open Graph and Twitter tags with absolute
URLs, and JSON-LD that parses. Home: WebSite, Person (with `sameAs` for
LinkedIn, GitHub and Scholar), ProfilePage, six ScholarlyArticle, one Chapter,
one Thesis. Case studies: BreadcrumbList and WebPage.

**Hydration.** Built once with React in development mode, which reports
server/client mismatches that production ignores. All four routes were loaded
in four modes (default, reduced motion, stored night pin, phone): **0
hydration warnings and 0 errors**. After scrolling each page, 0 reveal
elements were left hidden. The only console output was Framer Motion's
development-only notice that reduced motion is enabled.

**Links.** 97 internal references on the built pages (35 unique): 0 broken;
every `#section` link has a target. External links, fetched with curl:

| Result | Links |
| --- | --- |
| 200 | ITU event, IFIP PDF, IJPCC (both), GitHub profile, Heritage Hive repository and report, thesis handle, Google Scholar, three uregina.ca PDFs, X, Zindi |
| 202 | The four IEEE DOIs. They resolve to the right IEEE Xplore documents; IEEE answers scripted requests with 202 |
| 403 | The CRC Press chapter DOI. It resolves to the Taylor & Francis chapter page, which blocks scripted requests |
| 999 | LinkedIn, which blocks scripted requests |
| 404 | The three `https://nasik.ca/projects/…` canonical URLs, because the pages are not deployed yet |

**Sub-directory hosting.** The build was also served from `/Portfolio/`, as
the Pages preview does: home and two case studies loaded with 0 failed
requests, 0 broken images, and hydrated.

**Layout.** All four routes at 360, 390, 768, 1024 and 1440 px: no horizontal
scroll, no element past the viewport edge, no clipped text.

**Accessibility.** axe-core 4 (WCAG 2.0/2.1/2.2 A and AA plus best practice)
on all four routes × Live, Day and Night × desktop and phone, 24 runs: **0
violations**. axe marks some contrast checks over gradients as "needs review"
rather than pass or fail; those are not counted. Checked by hand: one `h1`
per page and a heading order with no skipped levels; Tab reaches the skip
link first and every control shows a 2 px focus outline; the skip link moves
to `#main`; form fields are labelled; reveal animation is skipped under
`prefers-reduced-motion`.

**Contact form.** Empty submit: rejected, nothing sent. Invalid email:
"That does not look like a valid email address.", nothing sent. Valid
submit, with the Formspree request intercepted so no real message went out:
name, email and message were posted and the "Message sent" state appeared.

**Resume.** `dist/Nasik_Sami_Khan_Resume.pdf` is byte-identical to the
supplied file and is served as `application/pdf`.

**Performance.** Lighthouse is **not measured**: it is not installed locally
and could not be downloaded in this session. Measured instead with Chromium
through Playwright, on the local server (no compression, so real transfers
will be smaller):

| Profile | Page | FCP | LCP | CLS |
| --- | --- | --- | --- | --- |
| Desktop | Home | 0.32 s | 0.32 s | 0.015 |
| Desktop | Telecom RAG | 0.31 s | 0.65 s | 0.001 |
| Phone, 4× CPU slowdown, 1.6 Mbps | Home | 1.28 s | 1.28 s | 0.008 |
| Phone, 4× CPU slowdown, 1.6 Mbps | Telecom RAG | 0.90 s | 3.89 s | 0.031 |

The case study's slower LCP on the throttled phone is its heading waiting for
the web font. Page weight: home HTML 195 kB (38 kB gzipped); main script
344 kB (112 kB gzipped), about 24 kB more than before; `dist/` is 1.4 MB.

## 5. Open questions

Full list in `OPEN_QUESTIONS.md`. The ones that need you before deploying:

1. **47% on the resume.** The site says 21.8% → 67.0% (45.2 points), from the
   paper. The resume PDF says 47%. Decide which to change.
2. **`.htaccess`.** The deploy will write a new `.htaccess` to the server. If
   one already exists there with other rules, it will be replaced. Check in
   Hostinger's file manager first.
3. **`ecommerce.pem` in the public Heritage Hive repository** looks like a
   private key. The site now links to that repository.

Smaller ones: "multi-modal" and ColBERT against the paper; three labels or
four for incident management; the tutor end date; `www.nasik.ca` not
redirecting; the stray `public_html/public_html/` folder on the server;
resume items not on the site (AegisScan and others); BDM figures to add
later.

## 6. Files changed

53 files against `main`, counting this report (52 files, 2,707 insertions and 780 deletions before it).

**New (19)**

- `docs/AUDIT.md`, `docs/DECISIONS.md`, `docs/OPEN_QUESTIONS.md`,
  `docs/UPGRADE_REPORT.md`
- `src/site.js`, `src/seo.js`, `src/entry-client.jsx`, `src/entry-server.jsx`
- `src/pages/Home.jsx`, `src/pages/CaseStudy.jsx`
- `src/components/FlowDiagram.jsx`, `src/data/caseStudies.js`
- `scripts/prerender.mjs`, `scripts/serve-dist.mjs`, `scripts/og-image.mjs`
- `tests/prerender.spec.js`
- `public/Nasik_Sami_Khan_Resume.pdf`, `public/og-image.png`,
  `public/.htaccess`

**Modified (30)**

- Config: `package.json`, `vite.config.js`, `playwright.config.js`,
  `.eslintrc.cjs`, `.gitignore`, `index.html`, `README.md`
- Data: `src/data/profile.js`, `experience.js`, `education.js`,
  `projects.js`, `publications.js`, `skills.js`
- Sections: `Hero`, `About`, `Experience`, `Projects`, `Publications`,
  `Skills`
- Components: `App.jsx`, `Navbar`, `Footer`, `SkillIcon`, `ui/Reveal`,
  `ui/Section`, `ui/Emphasis`
- Other: `src/hooks/useCountUp.js`, `src/hooks/useSkyPin.js`, `src/sky.js`,
  `src/index.css`

**Removed (4)**

- `src/main.jsx` (replaced by `entry-client.jsx`)
- `public/resume.pdf` (replaced by the new PDF under its new name)
- `public/og-image.jpg` (replaced by `og-image.png`)
- `public/sitemap.xml` (now generated at build time)

Not committed, as instructed: `PORTFOLIO_UPGRADE_BRIEF.md` and the root copy
of the resume PDF.

## 7. Decisions

Forty-four are logged in `DECISIONS.md`. The ones with the widest effect:

- Pre-render with a build-time script, with no router and no new dependency.
- Relative links everywhere, so one build serves nasik.ca and the preview.
- Reveal and hero animation in CSS, so content is visible without JavaScript.
- "Show more" removed from experience; every bullet is in the page.
- The Telecom RAG figure stated as measured in the paper, not as 47%.
- Earlier incident-management figures removed in favour of the JSAC results.
- Margins over baselines not quoted where the paper gives two versions.
- Diagrams as ordered lists, not images.
- `.htaccess` added because nasik.ca is on Hostinger.
- Lighthouse not reported, because it could not be run.
- Commits grouped by topic; only the branch tip was built and tested.

## 8. Branch status

- Branch: `portfolio-upgrade`, pushed to `origin`. No other branch was
  modified, merged into or deleted.
- The commit that adds this report is the tip; `git log origin/portfolio-upgrade -1`
  shows it.
- Pushing this branch deployed nothing: the deploy workflow runs only on
  `main` and `redesign-fable`.
- No pull request was opened, and no repository or Pages setting was changed.

## 9. How to deploy, and how to roll back

**Review locally**

```bash
git fetch origin
git checkout portfolio-upgrade
npm ci
npm test            # builds, then runs the 52 tests
npm run preview     # http://localhost:4173
```

**Before deploying**

1. Decide the three questions in section 5.
2. In Hostinger's file manager, open `public_html` and check whether an
   `.htaccess` exists. If it has rules you need, copy them into
   `public/.htaccess` on this branch and commit.

**Optional: see it on the Pages preview first.** This updates only
`nasiksami.github.io/Portfolio/`, not nasik.ca:

```bash
git push origin portfolio-upgrade:redesign-fable
```

**Deploy to nasik.ca.** `main` has not moved since the branch was cut, so
this is a fast-forward. The existing workflow then lints, builds, runs the
tests and uploads to Hostinger and the preview:

```bash
git push origin portfolio-upgrade:main
```

Watch the run under the repository's Actions tab. The upload removes
`resume.pdf`, `og-image.jpg` and the old `sitemap.xml` from the server and
adds the new files.

**After deploying**

```bash
curl -s https://nasik.ca/ | grep -c "AI Software Developer"      # expect more than 0
curl -s -o /dev/null -w "%{http_code}\n" https://nasik.ca/projects/telecom-rag/   # 200
curl -s -o /dev/null -w "%{http_code}\n" https://nasik.ca/no-such-page            # 404
curl -s -o /dev/null -w "%{http_code}\n" https://nasik.ca/resume.pdf              # 301
```

Then submit `https://nasik.ca/sitemap.xml` in Google Search Console, and
refresh the link preview with LinkedIn's Post Inspector.

**Roll back.** Revert the upgrade on `main` and push; the workflow redeploys
the previous site:

```bash
git checkout main
git pull
git revert --no-edit b64b515..HEAD
git push origin main
```

`b64b515` is the commit `main` was on before the upgrade. If the new
`.htaccess` is the problem, deleting that one file in Hostinger's file
manager restores the previous server behaviour immediately.
