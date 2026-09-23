# Copy proposals — for review

**Status.** Applied to `src/data/`: **A1, P1, P3, E1, P6, P7**. Everything
else is still awaiting a decision. Resolved conflicts: the DPO figure is
**37%** (conflict 1), and P3's feature selection is **Bayesian** (conflict 2).
P6 and P7 went in without the optional result and accuracy figures, and the
book and journal names are plain text because the data files hold plain
strings.

Approve, edit or reject each remaining item by its ID, and only approved
items will be written into the data files.

**Sources.** Every proposed fact comes from something already in the repo:
the data files themselves, or `public/resume.pdf`. Each item names its
source. Anything the repo cannot support is marked **[NEEDS INPUT FROM ME]**.

**Conflicts found.** The resume and the site disagree in six places. I have
not picked a side. Each conflict is marked **[CONFLICT]** where it appears,
and they are all collected at the end.

---

## About

### A1 · Bio, second paragraph — `profile.js` → `bio[1]`

**Before**
> I have collaborated with industry partners including Rogers and the
> Department of National Defence, and earned recognition in global AI/ML
> competitions run by the ITU. My work has delivered measurable results: a 47%
> QA accuracy improvement in telecom RAG systems, a 22% F1 gain in intrusion
> detection, and a 40% improvement in microservices performance at DPO
> International.

**After**
> I have collaborated with industry partners including Rogers and the
> Department of National Defence, and placed in two ITU AI/ML in 5G
> challenges: runner-up in SDN intrusion detection and silver in specialising
> LLMs for telecom. The results are measurable: a 47% gain in telecom
> question-answering accuracy with retrieval-augmented generation, a 22.5%
> F1 gain on the hardest intrusion classes, and a [37% or 40%] cut in
> transaction processing time at DPO International.

**Why.** It names the two ITU placements already listed under awards, and it
states what each metric measured instead of a bare number.
**[CONFLICT]** DPO: this paragraph says 40%, the resume says a 37% reduction
in processing time. **[NEEDS INPUT FROM ME]** Which is right?

### A2 · Bio, first paragraph — `bio[0]`

**Before**
> I am an MSc in Computer Science graduate with a proven record of translating
> advanced AI/ML research into impactful, production-ready solutions. My work
> bridges rigorous academic research and hands-on software engineering,
> helping organizations solve difficult technical problems and accelerate
> growth.

**After**
> I am an AI software developer with an MSc in Computer Science and over three
> years across healthcare, telecom and research. I take AI/ML work from the
> research stage to production: LLM and retrieval-augmented systems, the data
> pipelines behind them, and the software that ships them.

**Why.** It replaces generic claims ("proven record", "accelerate growth")
with the concrete scope stated in the resume summary. "Over three years"
matches the stat tile and the resume.

---

## Projects — `projects.js`

### P1 · Telecom QA RAG System

**Before**
> A telecom-specific multi-modal RAG pipeline combining fine-tuned embedding
> models with LLMs to improve question-answering accuracy over 3GPP
> specification documents.

**After**
> General-purpose LLMs answer poorly over 3GPP specifications, which are long,
> dense and full of domain terms. I built a telecom-specific, multi-modal RAG
> pipeline that pairs fine-tuned embedding models (ColBERT, Matryoshka
> representation learning) with Phi-2 over a ChromaDB store, and fine-tuned
> several open-source LLMs on telecom data. Question-answering accuracy rose
> 47% over the baseline, published at IEEE Globecom Workshops 2024.

**Why.** It adds the problem, the fine-tuning work and the baseline
comparison, all from the resume. The venue comes from `publications.js`.

### P2 · 5G Slice Benchmarking

**Before**
> Simulated and benchmarked 5G network slices using a virtual testbed with
> traffic replay, analysing how slice configuration affects resource
> allocation and performance.

**After**
> [NEEDS INPUT FROM ME: what question the benchmarking answered, and for whom.]
> I built a virtual 5G testbed with free5GC and UERANSIM in Docker, replayed
> traffic through it, and monitored every slice with Prometheus and Grafana to
> see how slice configuration shapes resource allocation and performance.
> [NEEDS INPUT FROM ME: the headline finding or number.]

**Why.** This is the thinnest project, and its impact line, "Benchmarked
resource allocation across slice configurations", repeats the description.
The repo has no result for it, so I can only restructure what is there.
**[NEEDS INPUT FROM ME]** A replacement impact line.

### P3 · LLM-Based Incident Management

**Before**
> Automated multi-label classification of telecom incident management tickets,
> pairing a BERT encoder using relevance-guided feature selection with an
> LLM-based approach to handle noisy text and overlapping impact and cause
> categories.

**After**
> Incident tickets in a real Canadian telecom's dataset are noisy and carry
> overlapping impact and cause labels. I built a multi-label pipeline that
> predicts four incident ticket types, using a BERT model with [relevance-guided
> or Bayesian] feature selection that raised minority-class F1 by over 14%.
> A Phi-2 model added a further 12.7% F1 gain.

**Impact, after:** `+14% minority-class F1, +12.7% more with Phi-2 · IEEE JSAC (2026)`

**Why.** The resume gives the dataset, the four ticket types and both F1
gains, which the site currently omits.
**[CONFLICT]** The site says "relevance-guided" feature selection, the resume
says "Bayesian". **[NEEDS INPUT FROM ME]** Which term is right, and is the
resume's "LLM-Driven Telecom Incident Management Classification" the same
project as the JSAC paper? I have assumed it is.

### P4 · Network Ticket Classification

**Before**
> A BERT-based NLP model using token prioritization, data augmentation, and
> class weighting to classify telecom network-change tickets into priority
> categories under severe class imbalance.

**After** — no change to the description.

**Impact, before:** `Improved automated issue triaging accuracy`
**Impact, after:** `[NEEDS INPUT FROM ME: the measured gain] · CNSM 2023`

**Why.** The description is already specific. The impact line has no number,
and the repo has none to give it.

### P5 · Heritage Hive

**Before**
> An e-commerce platform connecting local sellers with global customers, built
> with layered design patterns and AI-powered semantic product search over a
> vector database.

**After**
> [NEEDS INPUT FROM ME: the context, such as a course, client or personal
> project, and the year.] Heritage Hive connects local sellers with customers
> worldwide. I built it in Django with a layered architecture, and added
> semantic product search over a Qdrant vector database, so shoppers can find
> products by meaning rather than exact keywords.
> [NEEDS INPUT FROM ME: any usage or outcome.]

**Why.** It names the vector database from the project's own tech list and
explains what semantic search does for users. The current impact line,
"Enabled global reach for local sellers", has no evidence behind it.
**[NEEDS INPUT FROM ME]** A verifiable impact line, or keep the current one.

### P6 · Cyberbullying Severity Detection

**Before**
> Research comparing BERT, CNN, HAN, RNN, BiLSTM and Text-CNN architectures
> against rule-based NLP baselines to classify the severity of hate speech
> across varied class-balance conditions.

**After**
> A multi-class study of cyberbullying severity. It compares BERT, CNN, HAN,
> RNN, BiLSTM and Text-CNN models against rule-based NLP baselines, across
> datasets with different class balances, to see which architectures hold up
> when severe cases are rare. Published as a chapter in *Securing Social
> Networks in Cyberspace* (CRC Press, 2021).

**Why.** It adds the book and year from `publications.js` and states the
question the study answered. **[NEEDS INPUT FROM ME]** If there is a headline
result, it should replace "to see which architectures hold up".

### P7 · Waste Classification with ML/DL

**Before**
> Classified waste images into multiple categories using Random Forest,
> Decision Tree, SVM and CNN models, applying transfer learning to lift
> detection accuracy. Shipped with a Streamlit demo app.

**After**
> Classified waste images into multiple categories, comparing Random Forest,
> Decision Tree and SVM models against CNNs, then used transfer learning to
> lift accuracy further. Shipped with a Streamlit demo app. The work produced
> two papers in the *International Journal on Perceptive and Cognitive
> Computing* (2020, 2021).

**Why.** It names the journal and years behind the "two peer-reviewed
publications" impact line, from `publications.js`.
**[NEEDS INPUT FROM ME]** The accuracy figure, if you have one.
Separately, the project's paper link points at the 2020 paper only. The 2021
transfer-learning paper is `IJPCC/article/view/213`.

### P8 · New project: Hierarchical Network Intrusion Detection *(optional addition)*

**Before** — not on the site as a project. It appears only as the CNC 2024
publication.

**After**
> title: `Hierarchical Network Intrusion Detection`
> category: `Networks` · role: `Co-author & ML Engineer`
> description: Intrusion datasets are dominated by a few common attacks, so
> rare attacks are the ones models miss. I built a hierarchical system: a CNN
> first sorts traffic into "large" or "small" attack groups, then a
> ResNet-style CNN and a Random Forest classify within each group. On a real
> SD-WAN dataset it reached 92% or better overall F1 and raised the minority
> group's F1 by 22.5%.
> impact: `≥92% overall F1 · +22.5% minority-group F1`
> tech: `CNN`, `ResNet`, `Random Forest`, `Python` · paper: CNC 2024 link

**Why.** This is the source of the "22% F1 gain in intrusion detection" in the
About bio, but no project card backs it up. Every detail here comes from the
resume and `publications.js`.
**[NEEDS INPUT FROM ME]** Confirm the role label, and whether PyTorch or
TensorFlow was used. I have left both out.

---

## Experience — `experience.js`

### E1 · Graduate Research Assistant, University of Regina

**Before**, bullet 2:
> Developed NLP and AI systems spanning retrieval-augmented generation,
> agentic AI, and intrusion detection.

**After**, as two bullets:
> Led LLMOps projects using RAG and BERT pipelines for telecom incident
> classification, raising F1 by 14%.

> Built a hierarchical intrusion detection system, combining a CNN with a
> Random Forest, that reached a 92% F1 score.

**Why.** It turns a list of topics into two results, both from the resume.
Agentic AI is dropped because the repo has no example of it.
**[NEEDS INPUT FROM ME]** Keep agentic AI if you have work to point to.

**Add**, as a final bullet:
> Mentored junior researchers in adopting LLM and ML tools, in line with
> industry practice.

**Why.** From the resume.

### E2 · Teaching Assistant

**Before**
> Supported instruction and assessment across nine courses (CS110, CS215,
> CS265, CS330, CS335, CS350, CS372, ENSE 472, ENSE 885BD).

**After** — unchanged until the conflict is resolved.

**[CONFLICT]** The site lists nine courses, and the resume says "11 different
undergrad and graduate courses", counting TA and lab-instructor work
together. **[NEEDS INPUT FROM ME]** Were there other TA courses, or does the
11 include the lab-instructor role?

### E3 · Computer Science Skills Tutor

**Before**, bullet 1:
> Provided one-on-one mentoring to international students from diverse
> backgrounds.

**After**
> Mentored more than 100 undergraduate computer science students one-on-one,
> many of them international students from diverse backgrounds.

**Why.** The resume gives the scale: "over 100 undergrad CS students".
The "100% pass rate" in bullet 2 does not appear in the resume.
**[NEEDS INPUT FROM ME]** Confirm it can stay.

### E4 · Software Engineer, DPO International

**Before**, bullets 2 and 4:
> Implemented scalable software architecture and REST APIs to integrate
> across applications.

> Introduced Elasticsearch to improve application performance.

**After**
> Integrated microservices into transaction processing, cutting processing
> time by [37% or 40%], and built the RESTful APIs that connect them for
> real-time transactions.

> Partnered with vendors to introduce Elasticsearch and RabbitMQ, improving
> search and system reliability.

**Why.** Adds the measured result and the vendor context, from the resume.
**[CONFLICT]** 37% versus 40%, the same question as in A1.
**Also.** The resume describes DPO as a "multinational e-commerce business
company". **[NEEDS INPUT FROM ME]** Show that under the company name?

### E5 · Software Engineer Intern, DHL

**Before**, bullet 3:
> Performed application and system testing, and debugged legacy Excel VBA
> macros.

**After**
> Converted legacy Excel VBA macros into maintainable .NET web applications,
> and resolved IT tickets to keep downtime minimal.

**Why.** The resume describes a conversion, which is a bigger and more
specific result than debugging.
**[CONFLICT]** The site names the employer "DHL Express Malaysia" in
Petaling Jaya. The resume says "DHL Asia Pacific Shared Service Centre" in
Kuala Lumpur, and "BPO Department" rather than "Business Process
Optimization". **[NEEDS INPUT FROM ME]** Which is correct?

### E6 · AI Team Lead, BDM Healthware — no copy change

The site's six bullets are already fuller than the resume's five.
**[CONFLICT]** The site's title is "AI Team Lead (AI Software Developer)",
and the resume's is "AI Software Developer". The site may simply be more
recent. **[NEEDS INPUT FROM ME]** Confirm the title.

### No change proposed

Lab Instructor, Classroom Technical Support, Student Research Assistant, and
both education entries. They are already specific for their scope, and the
repo holds nothing that would add to them.

---

## All conflicts in one place

| # | Where | Site says | Resume says |
|---|---|---|---|
| 1 | About bio, DPO bullet | 40% microservices improvement | 37% reduction in processing time — **resolved: 37%** |
| 2 | Incident management project | relevance-guided feature selection | Bayesian feature selection — **resolved: Bayesian** |
| 3 | Teaching Assistant | nine courses | 11 courses, including lab instructing |
| 4 | DHL employer and location | DHL Express Malaysia, Petaling Jaya | DHL Asia Pacific Shared Service Centre, Kuala Lumpur |
| 5 | BDM title | AI Team Lead (AI Software Developer) | AI Software Developer |
| 6 | Skills tutor | 100% pass rate | not mentioned; over 100 students |
