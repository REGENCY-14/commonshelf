/**
 * Mock catalog data, shaped the way a real catalog API/bot backend
 * plausibly would return it. Used to populate the homepage, results page,
 * and book detail/related views.
 */

export type BookFormat = "epub" | "pdf" | "read-online" | "txt" | "audiobook";

/**
 * A single catalogued source/printing of a work — a Standard Ebooks
 * release, a Project Gutenberg text, an Internet Archive facsimile scan,
 * a related critical/biographical text, etc. The results page (Figma node
 * 23:1526, "Section - Editorial Results List") renders one card per
 * *edition*, not one row per `Book` — several editions can point at the
 * same underlying work (see `middlemarch`'s four curated editions below).
 *
 * Books that don't define `editions` explicitly get a single synthesized
 * edition derived from their own top-level fields (see
 * `getEditionsForBook`), so `/results` still works generically for every
 * title in mock data, not just the Figma-sourced Middlemarch example.
 */
export type Edition = {
  id: string;
  /** 2-3 letter chip pinned to the cover thumbnail's top-right corner, e.g. "SE", "PG", "IA", "BIO". */
  sourceBadgeCode: string;
  /** Visual family for the source pill badge — matches the Figma card's accent color. */
  sourceBadgeVariant: "mint" | "neutral" | "terracotta";
  /** Tailwind bg class for the small corner chip on the cover thumbnail (each source has its own distinct shade in Figma, e.g. Project Gutenberg's blue-gray vs Internet Archive's charcoal). */
  cornerBadgeClassName: string;
  /** Source/edition-type pill text, e.g. "Standard Ebooks", "Critical Companion". */
  sourceLabel: string;
  /** Small caption next to the source pill, e.g. "Release 2.1 • Peer-Reviewed Typography". */
  metaCaption: string;
  /** Edition-specific title (may differ from the parent book's title, e.g. with a subtitle or edition note). */
  title: string;
  /** Dense metadata line under the title, e.g. "George Eliot (Mary Ann Evans) • 1871 • English • 340,000 words". */
  byline: string;
  /** Two-line edition-specific description. */
  description: string;
  /**
   * Real photographic/illustrated cover thumbnail for this specific
   * edition. Only the Figma-sourced Middlemarch editions have one —
   * synthesized editions for every other book fall back to the abstract
   * `GeneratedCover` (via the parent `book`) when this is unset, same as
   * everywhere else in the app that lacks real cover art.
   */
  coverImage?: string;
  /** Format tag pills. `primary` renders with the highlighted mint treatment (the edition's preferred format). */
  formatTags: { label: string; primary?: boolean }[];
  secondaryAction: {
    label: string;
    href: string;
    /** Whether this points off-site (styles the link as muted gray instead of brand green). */
    external?: boolean;
    /** Trailing glyph — Figma varies this per edition (a plain chevron, an external-link arrow, or a magnifier for "Inspect scans"). Defaults to "arrow". */
    icon?: "arrow" | "external-link" | "magnifier";
  };
  primaryAction: {
    label: string;
    href: string;
    icon: "results-book-icon-white" | "results-book-icon-dark" | "results-download" | "results-eye";
    /** Filled mint pill vs. muted gray pill. */
    variant: "mint" | "muted";
  };
};

export type Book = {
  id: string;
  title: string;
  author: string;
  /** Short author byline used in dense contexts (autocomplete, result rows). */
  authorShort?: string;
  formats: BookFormat[];
  language: string;
  publicationYear: number;
  callNumber: string;
  /** Library-of-congress-ish subject/category label shown on cover art. */
  subject: string;
  /** Source line shown under the title, e.g. "Standard Ebooks release". */
  sourceLine: string;
  source: "Project Gutenberg" | "Standard Ebooks" | "Internet Archive";
  description: string;
  /** Seed string for the deterministic generated cover. Defaults to id if omitted. */
  coverSeed?: string;
  category: string;
  editionLabel?: string;
  /**
   * Path to a real photographic cover (in /public/covers) for books that
   * have genuine cover art per the Figma source. When present, this is
   * preferred over the abstract `GeneratedCover` everywhere the book's
   * cover renders (homepage sections, result rows, detail page).
   */
  coverImage?: string;

  // --- Book detail page fields (Figma node 22:1168) -----------------------
  // All optional so the route still works generically for every book in
  // mock data; the detail page falls back to sensible derivations (e.g.
  // `description` split into one synopsis paragraph, `publicationYear` for
  // `publishedRange`) when a book doesn't set the richer fields below.

  /** Subtitle/series line in italic under the H1, e.g. "A Study of Provincial Life". */
  subtitle?: string;
  /** Full/birth name shown parenthetically after the author in the byline, e.g. "Mary Anne Evans". */
  authorFullName?: string;
  /** Genre/category tag pills atop the editorial column. First entry renders as the mint "primary" tag. */
  genres?: string[];
  /** Detailed language label for the spec bar, e.g. "English (UK)". Falls back to `language`. */
  languageDetail?: string;
  /** "First published" range for the spec bar, e.g. "1871–1872". Falls back to `publicationYear`. */
  publishedRange?: string;
  /** Approximate word count label, e.g. "~316k words". */
  wordCountLabel?: string;
  /** Approximate reading time label, e.g. "approx. 14h read". */
  readTimeLabel?: string;
  /** Formats label for the spec bar, e.g. "EPUB, PDF, Kindle". */
  formatsLabel?: string;
  /** Two-paragraph "About the Work" synopsis; the second renders visually muted. Falls back to a single `description` paragraph. */
  synopsis?: [string, string];
  /** Approximate EPUB download size shown on the "Download EPUB" button, e.g. "1.8 MB". */
  epubSizeLabel?: string;
  /** Numeric catalog record id shown in the breadcrumb pill + provenance card, e.g. "892". */
  catalogRecordNumber?: string;
  /** Provenance/license short label, e.g. "CC0 / Public Domain 1.0". */
  licenseLabel?: string;
  /** Provenance descriptive paragraph, e.g. the specific source edition digitized. */
  provenanceNote?: string;
  /** Jacket-cover eyebrow text (hero), e.g. "STANDARD OPEN EDITION". Falls back to `editionLabel` or `subject`. */
  jacketEyebrow?: string;
  /** Jacket-cover meta line under the author (hero only), e.g. "1871 • UNABRIDGED". */
  jacketMeta?: string;
  /** Jacket-cover tagline on compact related-work cards, e.g. "THE WEAVER OF RAVELOE". */
  jacketTagline?: string;

  /**
   * Curated multi-source editions for the results page (Figma node
   * 23:1526). Optional — most books fall back to a single synthesized
   * edition via `getEditionsForBook`. Only `middlemarch` has the full
   * hand-authored set sourced from the Figma design.
   */
  editions?: Edition[];
};

export const categories = [
  { slug: "philosophy", label: "Philosophy", icon: "chip-philosophy", count: 412 },
  { slug: "natural-history", label: "Natural History", icon: "chip-natural-history", count: 189 },
  { slug: "poetry-verse", label: "Poetry & Verse", icon: "chip-poetry", count: 530 },
  { slug: "travel-exploration", label: "Travel & Exploration", icon: "chip-travel", count: 245 },
  { slug: "gothic-fiction", label: "Gothic Fiction", icon: "chip-gothic", count: 118 },
  { slug: "essays-letters", label: "Essays & Letters", icon: "chip-essays", count: 360 },
  { slug: "political-economy", label: "Political Economy", icon: "chip-political-economy", count: 152 },
] as const;

export const books: Book[] = [
  {
    id: "middlemarch",
    title: "Middlemarch",
    author: "George Eliot",
    formats: ["epub", "pdf", "read-online"],
    language: "English",
    publicationYear: 1871,
    callNumber: "823.8 ELI",
    subject: "Standard Edition",
    sourceLine: "1871 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "poetry-verse",
    coverImage: "/covers/middlemarch.png",
    description:
      "A study of provincial life in the fictional English town of Middlemarch, following the intertwined stories of idealistic Dorothea Brooke and ambitious young doctor Tertius Lydgate. Widely regarded as one of the greatest novels in the English language for its psychological depth and social realism.",
    subtitle: "A Study of Provincial Life",
    authorFullName: "Mary Anne Evans",
    genres: ["Victorian Literature & Social Realism", "Philosophical Fiction", "British Canon"],
    languageDetail: "English (UK)",
    publishedRange: "1871–1872",
    wordCountLabel: "~316k words",
    readTimeLabel: "approx. 14h read",
    formatsLabel: "EPUB, PDF, Kindle",
    synopsis: [
      "Set in the fictitious Midlands town of Middlemarch during 1829–1832, George Eliot's masterpiece is a profound panoramic exploration of idealism, marriage, science, and the complex web of social duty. Through the intertwined lives of the idealistic Dorothea Brooke and the ambitious physician Tertius Lydgate, Eliot creates one of the English language's greatest achievements in psychological realism.",
      `The novel probes the conflict between individual desires and community expectations, weaving themes of political reform, religious belief, and gender roles into an intricate moral fabric. Virginia Woolf famously declared it "one of the few English novels written for grown-up people."`,
    ],
    epubSizeLabel: "1.8 MB",
    catalogRecordNumber: "892",
    licenseLabel: "CC0 / Public Domain 1.0",
    provenanceNote:
      "Free of copyright restrictions globally. Digitized and formatted meticulously from the 1874 Blackwood single-volume cabinet edition.",
    jacketEyebrow: "STANDARD OPEN EDITION",
    jacketMeta: "1871 • UNABRIDGED",
    editions: [
      {
        id: "middlemarch-standard-ebooks",
        sourceBadgeCode: "SE",
        sourceBadgeVariant: "mint",
        cornerBadgeClassName: "bg-brand-teal",
        sourceLabel: "Standard Ebooks",
        metaCaption: "Release 2.1 • Peer-Reviewed Typography",
        title: "Middlemarch: A Study of Provincial Life",
        byline: "George Eliot (Mary Ann Evans) • 1871 • English • 340,000 words",
        description:
          "Set in the fictional Midlands town of Middlemarch during 1829–1832, Eliot's masterpiece explores status, marriage, idealism, religion, and the advent of the Reform Act through deeply textured human characterizations.",
        coverImage: "/covers/middlemarch-se-edition.jpg",
        formatTags: [
          { label: "EPUB", primary: true },
          { label: "AZW3" },
          { label: "KEPUB" },
          { label: "Advanced EPUB" },
        ],
        secondaryAction: { label: "View edition", href: "/books/middlemarch" },
        primaryAction: {
          label: "Read online",
          href: "/books/middlemarch",
          icon: "results-book-icon-white",
          variant: "mint",
        },
      },
      {
        id: "middlemarch-project-gutenberg",
        sourceBadgeCode: "PG",
        sourceBadgeVariant: "neutral",
        cornerBadgeClassName: "bg-[#4f5f77]",
        sourceLabel: "Project Gutenberg",
        metaCaption: "EBook #145 • Digitized Nov 1994",
        title: "Middlemarch",
        byline: "George Eliot • Metadata: Project Gutenberg • Plain Text, HTML, EPUB • 840 KB",
        description:
          "Verbatim transcription of the 1874 single-volume edition. Features clean ASCII transcription, raw UTF-8 text archive, and web-ready HTML with original chapter divisions.",
        coverImage: "/covers/middlemarch-pg-edition.jpg",
        formatTags: [
          { label: "EPUB", primary: true },
          { label: "Plain text" },
          { label: "HTML" },
        ],
        secondaryAction: {
          label: "View mirror",
          href: "https://www.gutenberg.org/ebooks/145",
          external: true,
          icon: "external-link",
        },
        primaryAction: {
          label: "Download (840 KB)",
          href: "https://www.gutenberg.org/ebooks/145",
          icon: "results-download",
          variant: "muted",
        },
      },
      {
        id: "middlemarch-internet-archive",
        sourceBadgeCode: "IA",
        sourceBadgeVariant: "neutral",
        cornerBadgeClassName: "bg-text-secondary",
        sourceLabel: "Internet Archive",
        metaCaption: "Scanned from Harvard University Library",
        title: "Middlemarch (William Blackwood 1874 First Single Volume Edition)",
        byline: "Internet Archive • High-res PDF, DjVu • Scanned from Harvard University Library • 624 pages",
        description:
          "Archival facsimile scan containing original publisher imprint, Victorian typography, page layouts, marginalia, and binding ornaments from the prestigious Harvard University Widener collection.",
        coverImage: "/covers/middlemarch-ia-scan.jpg",
        formatTags: [
          { label: "PDF", primary: true },
          { label: "Facsimile" },
          { label: "DjVu" },
          { label: "Daisy" },
        ],
        secondaryAction: {
          label: "Inspect scans",
          href: "https://archive.org/details/middlemarch",
          external: true,
          icon: "magnifier",
        },
        primaryAction: {
          label: "Page turner",
          href: "https://archive.org/details/middlemarch",
          icon: "results-eye",
          variant: "muted",
        },
      },
      {
        id: "middlemarch-critical-companion",
        sourceBadgeCode: "BIO",
        sourceBadgeVariant: "terracotta",
        cornerBadgeClassName: "bg-[#a04026]",
        sourceLabel: "Critical Companion",
        metaCaption: "Author Correspondence • Public Domain",
        title: "George Eliot's Life as Told in Her Letters and Journals",
        byline: "J.W. Cross (Editor) • 1885 • Public Domain • 3 Volumes Complete",
        description:
          "Compiled by Eliot's husband John Walter Cross, this extensive biographical account includes her correspondence during the composition of Middlemarch, revealing her aesthetic theories and philosophical reflections.",
        coverImage: "/covers/george-eliot-letters.jpg",
        formatTags: [{ label: "EPUB", primary: true }, { label: "PDF" }, { label: "HTML" }],
        secondaryAction: { label: "View details", href: "/books/middlemarch" },
        primaryAction: {
          label: "Read online",
          href: "/books/middlemarch",
          icon: "results-book-icon-dark",
          variant: "muted",
        },
      },
    ],
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Wollstonecraft Shelley",
    authorShort: "M. W. Shelley",
    formats: ["epub", "pdf", "txt"],
    language: "English",
    publicationYear: 1818,
    callNumber: "823.7 SHE",
    subject: "Archival Text",
    sourceLine: "1818 text · Project Gutenberg",
    source: "Project Gutenberg",
    category: "gothic-fiction",
    coverImage: "/covers/frankenstein.png",
    description:
      "Victor Frankenstein, a young scientist, creates a sapient creature in an unorthodox scientific experiment. This 1818 first edition text is the foundational work of science fiction and Gothic horror, exploring themes of creation, responsibility, and isolation.",
  },
  {
    id: "metamorphosis",
    title: "The Metamorphosis",
    author: "Franz Kafka",
    formats: ["epub", "pdf"],
    language: "English",
    publicationYear: 1915,
    callNumber: "833.912 KAF",
    subject: "Gothic Fiction",
    sourceLine: "1915 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "gothic-fiction",
    coverImage: "/covers/metamorphosis.png",
    description:
      "Salesman Gregor Samsa wakes one morning to find himself transformed into a monstrous insect. A foundational work of 20th-century absurdist fiction, exploring alienation, guilt, and the fragility of identity within a family and an economic system.",
  },
  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    formats: ["epub", "pdf"],
    language: "English",
    publicationYear: 1890,
    callNumber: "823.8 WIL",
    subject: "Gothic Fiction",
    sourceLine: "1890 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "gothic-fiction",
    coverImage: "/covers/dorian-gray.png",
    editionLabel: "Standard Ebooks",
    description:
      "Vain young Dorian Gray sells his soul so that a portrait, rather than himself, will age and bear the marks of his sins. Wilde's only novel remains a landmark of Gothic fiction and aestheticist philosophy.",
  },
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    formats: ["epub", "pdf"],
    language: "English",
    publicationYear: 1813,
    callNumber: "823.7 AUS",
    subject: "Illustrated Edition",
    sourceLine: "1813 · Standard Ebooks illustrated release",
    source: "Standard Ebooks",
    category: "essays-letters",
    coverImage: "/covers/pride-and-prejudice.png",
    editionLabel: "Illustrated",
    description:
      "Elizabeth Bennet navigates manners, morality, and marriage in Regency England, sparring with the proud Mr. Darcy. One of the most beloved novels in the English language, prized for its wit and social observation.",
  },
  {
    id: "crime-and-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    formats: ["epub", "pdf", "read-online"],
    language: "English",
    publicationYear: 1866,
    callNumber: "891.73 DOS",
    subject: "New Edition",
    sourceLine: "1866 · Garnett translation, Project Gutenberg",
    source: "Project Gutenberg",
    category: "gothic-fiction",
    coverImage: "/covers/crime-and-punishment.png",
    editionLabel: "Garnett Trans.",
    description:
      "Impoverished former student Raskolnikov murders a pawnbroker and is consumed by guilt and paranoia in the aftermath. A towering psychological study of morality, poverty, and redemption in Tsarist St. Petersburg.",
  },
  {
    id: "mrs-dalloway",
    title: "Mrs Dalloway",
    author: "Virginia Woolf",
    formats: ["epub"],
    language: "English",
    publicationYear: 1925,
    callNumber: "823.912 WOO",
    subject: "Modernist Literature",
    sourceLine: "1925 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "essays-letters",
    coverImage: "/covers/mrs-dalloway.png",
    editionLabel: "Modernist",
    description:
      "A landmark modernist novel detailing a single day in the life of Clarissa Dalloway as she prepares for a party in post-WWI London, rendered through stream-of-consciousness prose that shifts fluidly between characters and time.",
  },
  {
    id: "time-machine",
    title: "The Time Machine",
    author: "H. G. Wells",
    formats: ["epub", "pdf"],
    language: "English",
    publicationYear: 1895,
    callNumber: "823.8 WEL",
    subject: "Science Fiction",
    sourceLine: "1895 · Project Gutenberg",
    source: "Project Gutenberg",
    category: "travel-exploration",
    coverImage: "/covers/time-machine.png",
    description:
      "An unnamed inventor builds a machine that carries him hundreds of thousands of years into the future, into a world divided between the gentle Eloi and the subterranean Morlocks. The novel that popularized time travel as a literary device.",
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights",
    author: "Emily Brontë",
    formats: ["epub", "pdf", "read-online"],
    language: "English",
    publicationYear: 1847,
    callNumber: "823.8 BRO",
    subject: "Gothic Fiction",
    sourceLine: "1847 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "gothic-fiction",
    coverImage: "/covers/wuthering-heights.png",
    description:
      "The turbulent, generation-spanning story of Heathcliff and Catherine Earnshaw's destructive passion, set against the bleak Yorkshire moors. Brontë's only novel and one of the most intense works of English Gothic romanticism.",
  },
  {
    id: "moby-dick",
    title: "Moby Dick",
    author: "Herman Melville",
    formats: ["epub", "pdf", "txt"],
    language: "English",
    publicationYear: 1851,
    callNumber: "813.3 MEL",
    subject: "Adventure & the Sea",
    sourceLine: "1851 · Project Gutenberg",
    source: "Project Gutenberg",
    category: "travel-exploration",
    coverImage: "/covers/moby-dick.png",
    description:
      "Ishmael recounts the monomaniacal quest of Captain Ahab to hunt down Moby Dick, the white whale that destroyed his leg. A sprawling meditation on obsession, fate, and the natural world, now considered a Great American Novel.",
  },
  {
    id: "great-expectations",
    title: "Great Expectations",
    author: "Charles Dickens",
    formats: ["epub", "pdf", "read-online"],
    language: "English",
    publicationYear: 1861,
    callNumber: "823.8 DIC",
    subject: "Victorian Fiction",
    sourceLine: "1861 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "essays-letters",
    coverImage: "/covers/great-expectations.png",
    description:
      "Orphan Pip's journey from humble origins to gentleman's life in Victorian London, encountering Miss Havisham, Estella, and hidden benefactors along the way. One of Dickens's most tightly constructed and enduring novels.",
  },
  {
    id: "souls-of-black-folk",
    title: "The Souls of Black Folk",
    author: "W. E. B. Du Bois",
    formats: ["epub", "pdf", "read-online"],
    language: "English",
    publicationYear: 1903,
    callNumber: "305.8 DUB",
    subject: "Social Sciences",
    sourceLine: "1903 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "essays-letters",
    description:
      "A landmark work of American literature and sociology combining essay, history, and memoir to examine the Black experience in post-Reconstruction America, including the enduring concepts of 'double consciousness' and 'the color line'.",
  },
  {
    id: "essays-first-series",
    title: "Essays: First Series",
    author: "Ralph Waldo Emerson",
    formats: ["epub", "pdf", "txt"],
    language: "English",
    publicationYear: 1841,
    callNumber: "814.3 EME",
    subject: "Philosophy & Letters",
    sourceLine: "1841 · Internet Archive scan",
    source: "Internet Archive",
    category: "philosophy",
    description:
      "Emerson's first collection of essays, including 'Self-Reliance' and 'The Over-Soul', laying the foundation of American Transcendentalism and championing individualism, intuition, and the innate goodness of people and nature.",
  },
  {
    id: "origin-of-species",
    title: "On the Origin of Species",
    author: "Charles Darwin",
    formats: ["epub", "pdf", "read-online"],
    language: "English",
    publicationYear: 1859,
    callNumber: "576.8 DAR",
    subject: "Natural History",
    sourceLine: "1859 first edition · Internet Archive scan",
    source: "Internet Archive",
    category: "natural-history",
    description:
      "Darwin's foundational work introducing the scientific theory of evolution by natural selection, presenting extensive evidence gathered from his travels and correspondence that reshaped biology and human understanding of the natural world.",
  },
  {
    id: "leaves-of-grass",
    title: "Leaves of Grass",
    author: "Walt Whitman",
    formats: ["epub", "pdf", "read-online"],
    language: "English",
    publicationYear: 1855,
    callNumber: "811.3 WHI",
    subject: "Poetry Collection",
    sourceLine: "1855 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "poetry-verse",
    description:
      "A sprawling collection of poetry celebrating democracy, nature, love, and friendship, written in free verse that broke from the formal conventions of the era and profoundly influenced modern American poetry.",
  },
  {
    id: "voyage-of-the-beagle",
    title: "The Voyage of the Beagle",
    author: "Charles Darwin",
    formats: ["epub", "txt"],
    language: "English",
    publicationYear: 1839,
    callNumber: "508 DAR",
    subject: "Travel Journal",
    sourceLine: "1839 · Project Gutenberg",
    source: "Project Gutenberg",
    category: "travel-exploration",
    description:
      "Darwin's vivid travel journal from his five-year voyage aboard HMS Beagle, chronicling the geological and biological observations across South America and the Pacific that would later inform his theory of evolution.",
  },
  {
    id: "wealth-of-nations",
    title: "The Wealth of Nations",
    author: "Adam Smith",
    formats: ["epub", "pdf", "txt"],
    language: "English",
    publicationYear: 1776,
    callNumber: "330.1 SMI",
    subject: "Political Economy",
    sourceLine: "1776 · Internet Archive scan",
    source: "Internet Archive",
    category: "political-economy",
    description:
      "The foundational text of classical economics, introducing concepts including the division of labor, the invisible hand, and free-market theory that continue to shape economic thought today.",
  },
  {
    id: "castle-of-otranto",
    title: "The Castle of Otranto",
    author: "Horace Walpole",
    formats: ["epub", "pdf"],
    language: "English",
    publicationYear: 1764,
    callNumber: "823.6 WAL",
    subject: "Gothic Fiction",
    sourceLine: "1764 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "gothic-fiction",
    description:
      "Widely considered the first Gothic novel, blending medieval romance with supernatural terror to establish the conventions of a genre that would flourish for centuries: secret passages, prophecy, and ancestral curses.",
  },
  {
    id: "letters-to-a-young-poet",
    title: "Letters to a Young Poet",
    author: "Rainer Maria Rilke",
    formats: ["epub", "read-online"],
    language: "English",
    publicationYear: 1929,
    callNumber: "831.9 RIL",
    subject: "Correspondence",
    sourceLine: "1929 translation · Internet Archive scan",
    source: "Internet Archive",
    category: "essays-letters",
    description:
      "A collection of ten letters written by Rilke to a young military cadet and aspiring poet, offering intimate reflections on solitude, love, art, and the creative life that remain touchstones for writers today.",
  },
  {
    id: "walden",
    title: "Walden",
    author: "Henry David Thoreau",
    formats: ["epub", "pdf", "read-online", "txt"],
    language: "English",
    publicationYear: 1854,
    callNumber: "818.3 THO",
    subject: "Philosophy & Nature",
    sourceLine: "1854 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "philosophy",
    description:
      "Thoreau's reflective account of two years spent living simply in a cabin near Walden Pond, a meditation on self-reliance, nature, and deliberate living that became a cornerstone of American nature writing.",
  },
  {
    id: "silas-marner",
    title: "Silas Marner",
    author: "George Eliot",
    formats: ["epub", "pdf"],
    language: "English",
    publicationYear: 1861,
    callNumber: "823.8 ELI",
    subject: "Standard Edition",
    sourceLine: "1861 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "poetry-verse",
    description:
      "Embittered weaver Silas Marner is cast out of his community on a false charge, and finds unexpected redemption raising an orphaned child in the village of Raveloe. A compact, fable-like study of isolation, community, and grace.",
    wordCountLabel: "68k words",
    jacketEyebrow: "1861",
    jacketTagline: "THE WEAVER OF RAVELOE",
  },
  {
    id: "mill-on-the-floss",
    title: "The Mill on the Floss",
    author: "George Eliot",
    formats: ["epub", "pdf"],
    language: "English",
    publicationYear: 1860,
    callNumber: "823.8 ELI",
    subject: "Standard Edition",
    sourceLine: "1860 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "poetry-verse",
    description:
      "Siblings Maggie and Tom Tulliver grow up along the River Floss, their bond tested by family debt, social expectation, and Maggie's yearning for a wider intellectual life. One of Eliot's most autobiographical works.",
    wordCountLabel: "204k words",
    jacketEyebrow: "1860",
    jacketTagline: "MAGGIE & TOM TULLIVER",
  },
  {
    id: "daniel-deronda",
    title: "Daniel Deronda",
    author: "George Eliot",
    formats: ["epub", "pdf", "read-online"],
    language: "English",
    publicationYear: 1876,
    callNumber: "823.8 ELI",
    subject: "Standard Edition",
    sourceLine: "1876 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "poetry-verse",
    description:
      "Eliot's final and most ambitious novel interweaves the story of idealistic Daniel Deronda's search for purpose with Gwendolen Harleth's disastrous marriage, culminating in an unprecedentedly sympathetic portrait of Jewish identity in Victorian fiction.",
    wordCountLabel: "310k words",
    jacketEyebrow: "1876",
    jacketTagline: "FINAL MASTERPIECE",
  },
  {
    id: "adam-bede",
    title: "Adam Bede",
    author: "George Eliot",
    formats: ["epub", "pdf", "txt"],
    language: "English",
    publicationYear: 1859,
    callNumber: "823.8 ELI",
    subject: "Standard Edition",
    sourceLine: "1859 · Standard Ebooks release",
    source: "Standard Ebooks",
    category: "poetry-verse",
    description:
      "George Eliot's debut novel follows carpenter Adam Bede's love for the vain Hetty Sorrel in a rural English village, a pastoral tragedy of seduction, betrayal, and moral reckoning.",
    wordCountLabel: "212k words",
    jacketEyebrow: "1859",
    jacketTagline: "PASTORAL TRAGEDY",
  },
  {
    id: "sonnets-from-the-portuguese",
    title: "Sonnets from the Portuguese",
    author: "Elizabeth Barrett Browning",
    formats: ["epub", "pdf"],
    language: "English",
    publicationYear: 1850,
    callNumber: "821.8 BAR",
    subject: "Poetry Collection",
    sourceLine: "1850 · Project Gutenberg",
    source: "Project Gutenberg",
    category: "poetry-verse",
    description:
      "A sequence of 44 love sonnets written for Robert Browning during their courtship, among the most celebrated love poetry in the English language, including the famous 'How do I love thee? Let me count the ways.'",
  },
];

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}

export function getRelatedBooks(book: Book, limit = 4): Book[] {
  const sameCategory = books.filter((b) => b.id !== book.id && b.category === book.category);
  const rest = books.filter((b) => b.id !== book.id && b.category !== book.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Other works by the same author, for the book detail page's "More by this author" section. */
export function getBooksByAuthor(book: Book, limit = 4): Book[] {
  return books.filter((b) => b.id !== book.id && b.author === book.author).slice(0, limit);
}

/** Total count of catalogued works by an author (used by the "View all N works" link). */
export function countBooksByAuthor(book: Book): number {
  return books.filter((b) => b.author === book.author).length;
}

export function searchBooks(query: string): Book[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.subject.toLowerCase().includes(q)
  );
}

const SOURCE_BADGE: Record<
  Book["source"],
  { code: string; variant: Edition["sourceBadgeVariant"]; cornerClassName: string }
> = {
  "Standard Ebooks": { code: "SE", variant: "mint", cornerClassName: "bg-brand-teal" },
  "Project Gutenberg": { code: "PG", variant: "neutral", cornerClassName: "bg-[#4f5f77]" },
  "Internet Archive": { code: "IA", variant: "neutral", cornerClassName: "bg-text-secondary" },
};

const FORMAT_LABEL: Record<BookFormat, string> = {
  epub: "EPUB",
  pdf: "PDF",
  "read-online": "Read Online",
  txt: "Plain text",
  audiobook: "Audiobook",
};

/**
 * A book with no hand-authored `editions` (i.e. every book except
 * `middlemarch`) gets a single edition synthesized from its own top-level
 * fields, so the results page still renders a real edition card for it —
 * "one card per edition, falling back to one edition per book" rather than
 * hardcoding the richer multi-source shape to Middlemarch alone.
 */
function synthesizeEdition(book: Book): Edition {
  const badge = SOURCE_BADGE[book.source];
  const hasReadOnline = book.formats.includes("read-online");
  const primaryAction: Edition["primaryAction"] = hasReadOnline
    ? { label: "Read online", href: `/books/${book.id}`, icon: "results-eye", variant: "mint" }
    : { label: "Download", href: `/books/${book.id}`, icon: "results-download", variant: "muted" };

  return {
    id: `${book.id}-default`,
    sourceBadgeCode: badge.code,
    sourceBadgeVariant: badge.variant,
    cornerBadgeClassName: badge.cornerClassName,
    sourceLabel: book.source,
    metaCaption: book.sourceLine,
    title: book.title,
    byline: `${book.author} • ${book.publicationYear} • ${book.language}`,
    description: book.description,
    coverImage: book.coverImage,
    formatTags: book.formats.map((f, i) => ({ label: FORMAT_LABEL[f], primary: i === 0 })),
    secondaryAction: { label: "View details", href: `/books/${book.id}` },
    primaryAction,
  };
}

/** All editions for a book — its curated set if defined, otherwise one synthesized edition. */
export function getEditionsForBook(book: Book): Edition[] {
  return book.editions && book.editions.length > 0 ? book.editions : [synthesizeEdition(book)];
}

export type EditionEntry = Edition & { book: Book };

/** Flattens a list of books into their editions, each tagged with its parent book for cover/language/link fallbacks. */
export function getEditionEntries(bookList: Book[]): EditionEntry[] {
  return bookList.flatMap((book) => getEditionsForBook(book).map((edition) => ({ ...edition, book })));
}
