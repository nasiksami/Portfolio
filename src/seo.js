import { profile, socials } from './data/profile';
import { publications } from './data/publications';
import { caseStudyBySlug } from './data/caseStudies';
import { SITE_URL } from './site';

// Head tags for each route, written into the page at build time by
// scripts/prerender.mjs. Everything here is derived from the data modules, so
// the metadata cannot drift from what the page says.

const SITE_NAME = profile.name;
const OG_IMAGE = SITE_URL + '/og-image.png';
const OG_IMAGE_ALT = 'Nasik Sami Khan, AI Software Developer';
const PERSON_ID = SITE_URL + '/#person';
const WEBSITE_ID = SITE_URL + '/#website';

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// "<" is escaped so a string can never close the script element early.
const jsonLd = (data) =>
  '<script type="application/ld+json">' + JSON.stringify(data).replace(/</g, '\\u003c') + '</script>';

const sameAs = socials
  .filter((social) => ['linkedin', 'github', 'scholar'].includes(social.icon))
  .map((social) => social.href);

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: profile.name,
  url: SITE_URL + '/',
  image: SITE_URL + '/og-image.png',
  jobTitle: profile.role,
  description: profile.description,
  email: 'mailto:' + profile.email,
  worksFor: { '@type': 'Organization', name: 'BDM Healthware Inc.' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Saskatoon',
    addressRegion: 'SK',
    addressCountry: 'CA',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Regina', sameAs: 'https://www.uregina.ca/' },
    {
      '@type': 'CollegeOrUniversity',
      name: 'International Islamic University Malaysia',
      sameAs: 'https://www.iium.edu.my/',
    },
  ],
  knowsAbout: [
    'Machine Learning',
    'Large Language Models',
    'Retrieval-Augmented Generation',
    'Agentic AI',
    'Healthcare AI',
    'Natural Language Processing',
    'Telecommunications Networks',
  ],
  sameAs,
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL + '/',
  name: SITE_NAME,
  description: profile.description,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

// "N. S. Khan, M. M. Hasan, and N. Shahriar" → ["N. S. Khan", "M. M. Hasan", "N. Shahriar"]
const authorNames = (authors) =>
  authors
    .split(/,\s*(?:and\s+)?|\s+and\s+/)
    .map((name) => name.trim())
    .filter(Boolean);

function article(pub) {
  const isThesis = pub.type === 'Thesis';
  const isChapter = pub.type === 'Book chapter';
  return {
    '@type': isThesis ? 'Thesis' : isChapter ? 'Chapter' : 'ScholarlyArticle',
    name: pub.title,
    headline: pub.title,
    author: authorNames(pub.authors).map((name) =>
      name === 'N. S. Khan' ? { '@id': PERSON_ID } : { '@type': 'Person', name }
    ),
    datePublished: String(pub.year),
    isPartOf: { '@type': isChapter ? 'Book' : 'PublicationIssue', name: pub.venue },
    url: pub.href,
    ...(pub.href.startsWith('https://doi.org/') ? { sameAs: pub.href } : {}),
  };
}

function homeMeta() {
  return {
    title: 'Nasik Sami Khan | AI Software Developer | Applied AI & Machine Learning',
    description:
      'AI Software Developer specializing in machine learning, LLMs, RAG and agentic AI. MSc in Computer Science, 4+ years across healthcare AI, telecom ML research and software engineering, with research in IEEE JSAC and IEEE Globecom.',
    ogType: 'profile',
    graph: [
      website,
      person,
      {
        '@type': 'ProfilePage',
        '@id': SITE_URL + '/#profilepage',
        url: SITE_URL + '/',
        name: 'Nasik Sami Khan | AI Software Developer',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
        inLanguage: 'en',
      },
      ...publications.map(article),
    ],
  };
}

function caseMeta(route) {
  const study = caseStudyBySlug(route.slug);
  const url = SITE_URL + route.path;
  const paper = study.citation && publications.find((pub) => pub.title === study.citation.title);
  return {
    title: study.title + ' | Case study | Nasik Sami Khan',
    description: study.description,
    ogType: 'article',
    graph: [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: SITE_URL + '/#projects' },
          { '@type': 'ListItem', position: 3, name: study.title, item: url },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        url,
        name: study.title,
        description: study.description,
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        inLanguage: 'en',
        ...(paper ? { about: article(paper) } : {}),
      },
      { '@type': 'Person', '@id': PERSON_ID, name: profile.name, url: SITE_URL + '/' },
    ],
  };
}

/** The title, description and structured data for a route. */
export function metaFor(route) {
  return route.page === 'case' ? caseMeta(route) : homeMeta();
}

/**
 * The route-specific block of <head>. `root` is the relative path back to the
 * site root, used only for same-site files (the icon); every URL a crawler
 * needs is absolute on the canonical origin.
 */
export function headFor(route, root) {
  const meta = metaFor(route);
  const url = SITE_URL + route.path;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="author" content="${escapeHtml(profile.name)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="icon" type="image/png" href="${root}logo.png" />`,
    `<link rel="apple-touch-icon" href="${root}logo.png" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:creator" content="@NasikSami" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
    jsonLd({ '@context': 'https://schema.org', '@graph': meta.graph }),
  ].join('\n    ');
}
