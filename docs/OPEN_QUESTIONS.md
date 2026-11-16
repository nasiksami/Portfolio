# Open questions

Things that need your decision, or that I could not verify. In each case the
site uses the more conservative wording until you decide.

## Conflicts between the fact sheet or resume and a source

1. **Telecom RAG: "47%".** The Globecom paper (Table III) and the thesis
   abstract give a baseline of 21.8% and a best score of 67.0%, and both call
   the gain "45.2%". That is 45.2 percentage points. 47% appears in neither.
   The site now says "from 21.8% to 67.0%, a gain of 45.2 percentage points".
   **The resume PDF still says "47% over baseline"**, so the site and the
   resume disagree on this one figure. Decide which to change.
2. **Telecom RAG: "multi-modal".** The resume calls the pipeline multi-modal.
   The paper says tables and images were skipped. The site does not use the
   word.
3. **Telecom RAG: ColBERT.** The Globecom paper does not mention ColBERT; the
   thesis abstract does (FLAN-T5 with ColBERT retrieval). The site keeps
   ColBERT as a stack tag and attributes it to the thesis in the case study.
   The diagram shows only the paper's components.
4. **Incident management: three labels or four.** The fact sheet and resume
   name network impact, service impact and root cause. The paper predicts
   four attributes, adding resolution. Cards and the experience bullet use the
   resume's three; the case-study diagram lists the paper's four.
5. **Incident management: margins over baselines.** The abstract says 23.59%
   and 29% "on average"; the conclusion says 14.66% over SVM and 19.88% over
   BERT. Because they differ, the site quotes only the scores (94.98%,
   79.20%, and SVM at 80.32%).
6. **Intrusion detection venue.** Crossref and dblp list the paper under the
   2024 International Conference on Computing, Networking and Communications
   (ICNC), pp. 254–258. The old site said "International Workshop on …
   (CNC)". The site now says IEEE ICNC.
7. **Tutor end date.** The site says Mar 2025, LinkedIn says Apr 2025. The
   site keeps Aug 2023 – Mar 2025.

## Not verified

8. **5G Slice Benchmarking.** No paper or repository exists to check it
   against. The existing description is kept, and its result line is a
   statement of what was done, not a figure.
9. **Waste classification: Streamlit demo.** The old text said it "shipped
   with a Streamlit demo app". No demo is linked, so the sentence was removed.
   Streamlit stays in the stack tags.
10. **IJPCC 2021 paper.** No DOI found; the link is the journal's article
    page, as before.
11. **Award dates.** The periods for the FGSR assistantship, the two travel
    awards and the funded scholarship come from the old site; the fact sheet
    gives a date only for the Saskatchewan scholarship.
12. **Publication years in structured data** use the year only, since exact
    dates were not all verified.

## Hosting decisions

13. **`public/.htaccess` is new.** nasik.ca is on Hostinger, so a GitHub
    Pages-style `404.html` is not enough there. The file sets
    `ErrorDocument 404 /404.html` and redirects `/resume.pdf` to the new
    file. **If the server already has an `.htaccess` with other rules, the
    deploy will replace it.** I could not read the server. Check in
    Hostinger's file manager before deploying, and merge any rules you need
    into `public/.htaccess`.
14. **The resume moved** from `/resume.pdf` to
    `/Nasik_Sami_Khan_Resume.pdf`. The redirect in item 13 covers nasik.ca.
    On the GitHub Pages preview the old address will return 404.
15. **`www.nasik.ca` serves the site without redirecting** to `nasik.ca`. The
    canonical tag points search engines at `nasik.ca`, but a redirect set in
    Hostinger's panel would be cleaner. Not changed (no settings were
    touched).
16. **Stray folder on the server.** `public_html/public_html/` from an
    earlier upload is still reachable at `nasik.ca/public_html/`. It holds an
    old copy of the site. Delete it in Hostinger's file manager.

## Content you may want to add

17. **BDM figures.** No metrics, team size or client names are on the site,
    as instructed. Add them to `src/data/experience.js` when you have them.
18. **Resume items not on the site:** AegisScan (co-founder), the alumni
    speaker invitation, VP Culture and International Peer Advisor. They are
    on the resume under Leadership & Community but not in the fact sheet, so
    they were not added.
19. **Screenshots for Heritage Hive.** None are used. The repository has
    images, but I did not take any without your say.
20. **X / Twitter link.** Still shown in the contact list, since it was on
    the site and the fact sheet does not exclude it. It is not in the
    structured data, which lists LinkedIn, GitHub and Scholar as specified.

## Security, outside this repository

21. **`ecommerce.pem` in the public Heritage Hive repository.** The file name
    suggests a private key. I did not open it. If it is a real key, rotate it
    and remove it from the repository's history. The site now links to that
    repository, which makes this more visible.

## Not measured

22. **Lighthouse.** It is not installed locally and downloading it was not
    permitted in this session, so no Lighthouse scores are reported. The
    report gives an axe-core accessibility audit and direct load timings
    instead. To get scores, run Lighthouse from Chrome DevTools against the
    local preview.
