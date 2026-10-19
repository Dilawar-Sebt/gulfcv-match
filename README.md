# GulfCV Match — Local-First CV & Job Description Matcher

**GulfCV Match** is a free, local-first browser utility designed to help job seekers in the UAE, Saudi Arabia, and the wider Gulf region inspect and improve how clearly their CV aligns with target job advertisements.

Built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**, it executes 100% in your local web browser with **zero server-side uploads or external API transmission**.

---

## Key Features

- **Local-First Privacy:** CV parsing and keyword extraction run entirely in your browser's RAM using client-side `pdfjs-dist` and `mammoth.js`. Documents never leave your computer.
- **Deterministic Math:** No black-box AI hallucinations or arbitrary scores. Match percentages are based strictly on exact, inspectable text overlap.
- **Symbol & Token Protection:** Safely preserves technical and domain terms like `C++`, `C#`, `Node.js`, `.NET`, `Power BI`, and `Microsoft Excel`.
- **Gulf Domain Lexicon:** Detects common GCC multi-word phrases across accounting (`Accounts Payable`, `VAT Filing`), operations (`Inventory Management`, `Warehouse Operations`), and management (`Stakeholder Management`, `Project Management`).
- **Evidence-Based Feedback:** Transparent checks for section presence, paragraph density, and quantified metrics (`AED`, `SAR`, `%`).
- **Print & PDF Export:** One-click `@media print` layout ready for your browser's *Print to PDF* dialog.
- **Regional Guidance:** Dedicated, in-depth guides for the **UAE** (visas, driving license, mainland vs. free zone) and **Saudi Arabia** (Vision 2030, Saudization, SCE/SOCPA accreditations).

---

## Prerequisites

- **Node.js**: v18.0.0 or later (v22.x recommended)
- **npm**: v9.0.0 or later (or `npm.cmd` on Windows)
- Modern web browser (Chrome, Edge, Firefox, Safari)

---

## Installation & Setup

1. Open your terminal in the project directory:
   ```bash
   cd C:\Users\pc\.gemini\antigravity\scratch\gulfcv-match
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   *(On Windows PowerShell with strict execution policy, use `npm.cmd install`)*

---

## Running the Application Locally

Start the Vite development server:
```bash
npm run dev
```

- **Local URL:** [http://localhost:5173](http://localhost:5173)
- **To Stop the Server:** Press `Ctrl + C` in your terminal window.

---

## Testing & Quality Verification

Run the automated test suite with Vitest:
```bash
npm run test
```

To run tests in watch mode:
```bash
npm run test:watch
```

Run TypeScript strict type-checking:
```bash
npx tsc --noEmit
```

Build the production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## Project Structure & Architecture

```
gulfcv-match/
├── index.html                    # Root HTML with SEO metadata and viewport
├── package.json                  # Dependencies, scripts, and package metadata
├── postcss.config.js             # PostCSS Tailwind plugins
├── tailwind.config.js            # Design system, Gulf navy color palette
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite & Vitest configuration
├── src/
│   ├── main.tsx                  # React DOM root entrypoint
│   ├── App.tsx                   # Client-side router and root layout
│   ├── index.css                 # Tailwind directives and print stylesheet
│   ├── types/
│   │   └── index.ts              # Core TypeScript interfaces for matching & UI
│   ├── lib/
│   │   ├── constants.ts          # File size limits (5MB) & text bounds
│   │   ├── stopWords.ts          # Stop words for English and recruitment filler
│   │   ├── textNormalizer.ts     # Normalizer protecting C++, C#, Node.js, Power BI
│   │   ├── keywordExtractor.ts   # Phrase extractor, n-grams, and term frequencies
│   │   ├── matcher.ts            # Deterministic keyword overlap calculation
│   │   ├── suggestionsEngine.ts  # Rule-based suggestions & draft generator
│   │   ├── fileParser.ts         # Client-side PDF & DOCX text extractors
│   │   └── __tests__/            # Core engine unit tests (31 tests)
│   ├── components/
│   │   ├── Navbar.tsx            # Header with navigation & privacy pill
│   │   ├── Footer.tsx            # Trust footer, regional links, legal disclaimer
│   │   ├── ScoreGauge.tsx        # Radial SVG match percentage & formula display
│   │   ├── CvInputSection.tsx    # File drag-and-drop & paste CV input
│   │   ├── JobDescriptionSection.tsx # Job advertisement input textarea
│   │   ├── KeywordList.tsx       # Filterable matched vs not-found terms
│   │   ├── SuggestionsCard.tsx   # Evidence-based CV improvement cards
│   │   ├── SummaryDraftCard.tsx  # Fact-grounded editable summary draft
│   │   └── PrintReportView.tsx   # Print-only report view for PDF export
│   ├── pages/
│   │   ├── HomePage.tsx          # Main tool and workflow container
│   │   ├── UaeCvCheckerPage.tsx  # UAE & Dubai specific CV advice
│   │   ├── SaudiCvCheckerPage.tsx# Saudi Arabia Vision 2030 CV advice
│   │   ├── CvKeywordCheckerPage.tsx # ATS keyword mechanics guide
│   │   ├── HowItWorksPage.tsx    # Mathematical formula & algorithm explanation
│   │   ├── CvTipsPage.tsx        # General resume tips & STAR formula
│   │   ├── AboutPage.tsx         # Mission & privacy commitments
│   │   ├── ContactPage.tsx       # Feedback form & FAQs (no fake emails)
│   │   ├── PrivacyPage.tsx       # Local-first zero server storage disclosure
│   │   └── TermsPage.tsx         # Pre-launch beta terms & legal disclaimer
│   └── __tests__/
│       ├── App.test.tsx          # Route loading and navigation tests
│       └── Workflow.test.tsx     # Full analysis, Clear All, and XSS tests
```

---

## How It Works

### 1. Document Extraction
- **PDF Extraction:** Handled in the browser via `pdfjs-dist`. If a PDF contains no text characters (scanned image or bitmap), the tool flags this immediately and advises switching to **Paste Text**.
- **Word (.docx) Extraction:** Handled via `mammoth.js` using client-side binary array buffers.
- **Validation:** Strict checks on file extension, MIME type, and a maximum size limit of **5 MB**.

### 2. Normalization & Token Shielding
Before punctuation is cleaned, special symbols are replaced with canonical tokens:
- `C++` $\rightarrow$ `__token_cpp__`
- `C#` $\rightarrow$ `__token_csharp__`
- `Node.js` $\rightarrow$ `__token_nodejs__`
- `.NET` $\rightarrow$ `__token_dotnet__`
- `Power BI` $\rightarrow$ `__token_powerbi__`

### 3. The Matching Formula
$$\text{Match Percentage} = \min\left(100, \max\left(0, \text{round}\left(\frac{\text{Matched Terms}}{\text{Total JD Terms}} \times 100\right)\right)\right)$$

- **Zero Division Safety:** If a job description contains no distinct keywords or is empty, the score safely defaults to 0% with clear explanatory guidance.
- **Integrity Notice:** Terms not found in your CV are labeled *"Not in CV text"*, never *"Missing skills"*. Users are reminded to add terms only if they truthfully possess that experience.

---

## Privacy & Security Guarantees

1. **Zero Server Transmission:** Files and text remain strictly inside your browser's JavaScript execution thread.
2. **Ephemeral Memory:** No CV text or job description is stored in `localStorage`, `sessionStorage`, or cookies.
3. **No External APIs:** No CV text is transmitted to OpenAI, Google Gemini, Anthropic, or external telemetry collectors.
4. **XSS Protection:** All user-provided content is rendered as safe text nodes; never via raw HTML injection (`dangerouslySetInnerHTML`).

---

## Known Limitations

- **Scanned/Image-Only PDFs:** Browser-side PDF text extractors cannot perform optical character recognition (OCR) on image scans. Users should copy and paste their resume text manually.
- **Not an Official ATS Certification:** This tool provides a deterministic text-overlap estimate. It is not an official endorsement from Workday, Taleo, SAP, or any recruitment agency.
- **Device-Level Security:** While local execution eliminates network transit risk, it cannot protect against malicious browser extensions or compromised devices.

---

## Development vs. Future Public Launch

- **Current Phase:** Local development MVP running on the developer's computer.
- **Future Public Phase:** Prior to any public deployment, a production domain, terms of service legal review, CDN static hosting, and SEO indexing verification should be completed.
