import jsacCover from '../assets/papers/jsac-2026.webp';
import thesisCover from '../assets/papers/msc-thesis-2025.webp';
import globecomCover from '../assets/papers/globecom-wkshps-2024.webp';
import cncCover from '../assets/papers/cnc-2024.webp';
import cnsmCover from '../assets/papers/cnsm-2023.webp';
import chapterCover from '../assets/papers/crc-chapter-2021.jpg';
import ijpcc2021Cover from '../assets/papers/ijpcc-2021.webp';
import ijpcc2020Cover from '../assets/papers/ijpcc-2020.webp';

// Author name is bolded in the UI by matching this string.
export const authorKey = 'N. S. Khan';

// The order publications are grouped in on the page.
export const publicationGroups = [
  { type: 'Journal', heading: 'Journal articles' },
  { type: 'Conference', heading: 'Conference and workshop papers' },
  { type: 'Book chapter', heading: 'Book chapter' },
  { type: 'Thesis', heading: 'Thesis' },
];

// `href` is the official record: the publisher's DOI, or the journal or
// repository page where there is no DOI. `pdf` is a public author copy, where
// one exists. `cover` is the first page of the paper, rendered once from its
// PDF to a 320px image, or for the book chapter the book's jacket.
// `label` is the short venue tag shown beside the year.
export const publications = [
  {
    title: 'Leveraging LLM for Enhanced Incident Management in Wireless Networks',
    authors: 'M. S. Towhid, N. S. Khan, N. Shahriar, M. Tornatore, R. Boutaba, and A. Saleh',
    venue: 'IEEE Journal on Selected Areas in Communications, vol. 44, pp. 4505–4519',
    year: 2026,
    type: 'Journal',
    label: 'IEEE JSAC',
    href: 'https://doi.org/10.1109/JSAC.2026.3680419',
    pdf: 'https://uregina.ca/~nss373/papers/JSAC_2026.pdf',
    cover: jsacCover,
  },
  {
    title: 'An Approach of Classifying Waste Using Transfer Learning Method',
    authors: 'Z. M. A. Amin, N. S. Khan, and R. Hassan',
    venue: 'International Journal on Perceptive and Cognitive Computing',
    year: 2021,
    type: 'Journal',
    label: 'IJPCC',
    href: 'https://journals.iium.edu.my/kict/index.php/IJPCC/article/view/213',
    cover: ijpcc2021Cover,
  },
  {
    title: 'Waste Management Using Machine Learning and Deep Learning Algorithms',
    authors: 'N. S. Khan, Z. M. A. Amin, and R. Hassan',
    venue: 'International Journal on Perceptive and Cognitive Computing, vol. 6, no. 2, pp. 97–106',
    year: 2020,
    type: 'Journal',
    label: 'IJPCC',
    href: 'https://doi.org/10.31436/ijpcc.v6i2.165',
    cover: ijpcc2020Cover,
  },
  {
    title:
      'Enhancing Large Language Models for Telecom Networks Using Retrieval-Augmented Generation',
    authors: 'N. S. Khan, M. M. Hasan, M. S. Towhid, S. Basnet, and N. Shahriar',
    venue: 'IEEE Globecom Workshops (GC Wkshps)',
    year: 2024,
    type: 'Conference',
    label: 'IEEE Globecom Workshops',
    href: 'https://doi.org/10.1109/GCWkshp64532.2024.11100791',
    pdf: 'https://uregina.ca/~nss373/papers/gc-rag-khan.pdf',
    cover: globecomCover,
  },
  {
    title:
      'Towards Effective Network Intrusion Detection in Imbalanced Datasets: A Hierarchical Approach',
    authors: 'M. S. Towhid, N. S. Khan, M. M. Hasan, and N. Shahriar',
    venue:
      'IEEE International Conference on Computing, Networking and Communications (ICNC), pp. 254–258',
    year: 2024,
    type: 'Conference',
    label: 'IEEE ICNC',
    href: 'https://doi.org/10.1109/ICNC59896.2024.10556133',
    pdf: 'https://uregina.ca/~nss373/papers/CNC_2024.pdf',
    cover: cncCover,
  },
  {
    title:
      'A Token-Prioritization Strategy for Handling Data Imbalance in Network-Change Ticket Classification',
    authors: 'M. S. Towhid, N. S. Khan, N. Shahriar, M. Tornatore, R. Boutaba, and A. Saleh',
    venue: '19th IEEE/ACM/IFIP International Conference on Network and Service Management (CNSM)',
    year: 2023,
    type: 'Conference',
    label: 'IEEE/ACM/IFIP CNSM',
    href: 'https://doi.org/10.23919/CNSM59352.2023.10327831',
    pdf: 'https://dl.ifip.org/db/conf/cnsm/cnsm2023/1570931597.pdf',
    cover: cnsmCover,
  },
  {
    title:
      'Cyberbullying Severity Detection Using Deep Learning Techniques: A Multi-Class Classification over Varied Class Balance Data',
    authors: 'S. Wani, N. S. Khan, Z. M. A. Amin, and Y. Gulzar',
    venue: 'Securing Social Networks in Cyberspace, CRC Press, pp. 163–193',
    year: 2021,
    type: 'Book chapter',
    label: 'CRC Press',
    href: 'https://doi.org/10.1201/9781003134527-11',
    cover: chapterCover,
  },
  {
    title:
      'Enhancing Language Models for Telecom Networks Using Retrieval-Augmented Generation: A Pipeline for Telecom-Specific QA System',
    authors: 'N. S. Khan',
    venue: 'MSc thesis, Faculty of Graduate Studies and Research, University of Regina',
    year: 2025,
    type: 'Thesis',
    label: 'MSc thesis',
    href: 'https://hdl.handle.net/10294/17131',
    cover: thesisCover,
  },
];
