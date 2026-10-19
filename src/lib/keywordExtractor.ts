import { STOP_WORDS } from './stopWords';
import {
  PRESERVED_SPECIAL_TOKENS,
  normalizeText,
  restoreTokenDisplay,
} from './textNormalizer';

// Curated high-frequency industry phrases (Gulf & global job markets)
export const KNOWN_INDUSTRY_PHRASES: { phrase: string; display: string; category?: 'technical' | 'tool' | 'domain' | 'soft_skill' }[] = [
  // Finance & Accounting
  { phrase: 'accounts payable', display: 'Accounts Payable', category: 'domain' },
  { phrase: 'accounts receivable', display: 'Accounts Receivable', category: 'domain' },
  { phrase: 'financial reporting', display: 'Financial Reporting', category: 'domain' },
  { phrase: 'general ledger', display: 'General Ledger', category: 'domain' },
  { phrase: 'bank reconciliation', display: 'Bank Reconciliation', category: 'domain' },
  { phrase: 'internal audit', display: 'Internal Audit', category: 'domain' },
  { phrase: 'tax compliance', display: 'Tax Compliance', category: 'domain' },
  { phrase: 'vat filing', display: 'VAT Filing', category: 'domain' },
  { phrase: 'cash flow management', display: 'Cash Flow Management', category: 'domain' },
  { phrase: 'budget forecasting', display: 'Budget Forecasting', category: 'domain' },

  // Supply Chain & Operations
  { phrase: 'inventory management', display: 'Inventory Management', category: 'domain' },
  { phrase: 'purchase orders', display: 'Purchase Orders', category: 'domain' },
  { phrase: 'purchase order', display: 'Purchase Order', category: 'domain' },
  { phrase: 'warehouse operations', display: 'Warehouse Operations', category: 'domain' },
  { phrase: 'supply chain', display: 'Supply Chain', category: 'domain' },
  { phrase: 'procurement management', display: 'Procurement Management', category: 'domain' },
  { phrase: 'vendor management', display: 'Vendor Management', category: 'domain' },
  { phrase: 'logistics coordination', display: 'Logistics Coordination', category: 'domain' },
  { phrase: 'quality assurance', display: 'Quality Assurance', category: 'domain' },
  { phrase: 'quality control', display: 'Quality Control', category: 'domain' },

  // Customer Service & Sales
  { phrase: 'customer service', display: 'Customer Service', category: 'soft_skill' },
  { phrase: 'client relations', display: 'Client Relations', category: 'soft_skill' },
  { phrase: 'account management', display: 'Account Management', category: 'domain' },
  { phrase: 'business development', display: 'Business Development', category: 'domain' },
  { phrase: 'sales forecasting', display: 'Sales Forecasting', category: 'domain' },
  { phrase: 'market research', display: 'Market Research', category: 'domain' },
  { phrase: 'digital marketing', display: 'Digital Marketing', category: 'domain' },
  { phrase: 'content strategy', display: 'Content Strategy', category: 'domain' },

  // Management & HR
  { phrase: 'project management', display: 'Project Management', category: 'domain' },
  { phrase: 'change management', display: 'Change Management', category: 'domain' },
  { phrase: 'stakeholder management', display: 'Stakeholder Management', category: 'soft_skill' },
  { phrase: 'risk assessment', display: 'Risk Assessment', category: 'domain' },
  { phrase: 'talent acquisition', display: 'Talent Acquisition', category: 'domain' },
  { phrase: 'performance management', display: 'Performance Management', category: 'domain' },
  { phrase: 'employee relations', display: 'Employee Relations', category: 'domain' },
  { phrase: 'cross functional leadership', display: 'Cross-functional Leadership', category: 'soft_skill' },
  { phrase: 'problem solving', display: 'Problem Solving', category: 'soft_skill' },
  { phrase: 'critical thinking', display: 'Critical Thinking', category: 'soft_skill' },
  { phrase: 'strategic planning', display: 'Strategic Planning', category: 'domain' },

  // IT, Cloud & Data
  { phrase: 'data analysis', display: 'Data Analysis', category: 'technical' },
  { phrase: 'machine learning', display: 'Machine Learning', category: 'technical' },
  { phrase: 'cloud computing', display: 'Cloud Computing', category: 'technical' },
  { phrase: 'cyber security', display: 'Cyber Security', category: 'technical' },
  { phrase: 'cybersecurity', display: 'Cybersecurity', category: 'technical' },
  { phrase: 'database administration', display: 'Database Administration', category: 'technical' },
  { phrase: 'software development', display: 'Software Development', category: 'technical' },
  { phrase: 'version control', display: 'Version Control', category: 'technical' },
  { phrase: 'agile methodology', display: 'Agile Methodology', category: 'domain' },
  { phrase: 'scrum master', display: 'Scrum Master', category: 'domain' },
  { phrase: 'business intelligence', display: 'Business Intelligence', category: 'domain' },
];

export interface ExtractedTerm {
  rawTerm: string;
  displayTerm: string;
  frequency: number;
  isPhrase: boolean;
  category: 'technical' | 'tool' | 'domain' | 'soft_skill' | 'general';
}

/**
 * Extracts key terms (unigrams, preserved tokens, and multi-word phrases) from input text.
 */
export function extractKeywords(text: string): ExtractedTerm[] {
  if (!text || !text.trim()) return [];

  const termMap = new Map<string, ExtractedTerm>();
  const normalized = normalizeText(text);

  // 1. Detect Preserved Special Tokens (e.g. C++, C#, Node.js, Power BI, SQL)
  for (const token of PRESERVED_SPECIAL_TOKENS) {
    const canonicalLower = token.canonical.toLowerCase();
    const tokenRegex = new RegExp(`(?:^|\\s)${canonicalLower}(?:\\s|$)`, 'g');
    const matches = normalized.match(tokenRegex);
    if (matches && matches.length > 0) {
      termMap.set(canonicalLower, {
        rawTerm: canonicalLower,
        displayTerm: token.display,
        frequency: matches.length,
        isPhrase: false,
        category: 'tool',
      });
    }
  }

  // 2. Extract Known Industry Multi-Word Phrases
  for (const phraseItem of KNOWN_INDUSTRY_PHRASES) {
    const phraseRegex = new RegExp(`\\b${phraseItem.phrase}\\b`, 'gi');
    const matches = text.match(phraseRegex);
    if (matches && matches.length > 0) {
      termMap.set(phraseItem.phrase.toLowerCase(), {
        rawTerm: phraseItem.phrase.toLowerCase(),
        displayTerm: phraseItem.display,
        frequency: matches.length,
        isPhrase: true,
        category: phraseItem.category || 'domain',
      });
    }
  }

  // 3. Extract Dynamic 2-Word and 3-Word N-Grams
  const words = normalized.split(/\s+/).filter((w) => w.length > 0);

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];

    // Skip special token placeholders inside dynamic n-grams
    if (w1.startsWith('__token_') || w2.startsWith('__token_')) continue;

    // Check if both words are meaningful (non-stop, min 3 chars, not pure digits)
    if (
      !STOP_WORDS.has(w1) &&
      !STOP_WORDS.has(w2) &&
      w1.length >= 3 &&
      w2.length >= 3 &&
      !/^\d+$/.test(w1) &&
      !/^\d+$/.test(w2)
    ) {
      const biGram = `${w1} ${w2}`;
      if (!termMap.has(biGram)) {
        const biGramRegex = new RegExp(`\\b${biGram}\\b`, 'g');
        const matches = normalized.match(biGramRegex);
        const count = matches ? matches.length : 1;
        termMap.set(biGram, {
          rawTerm: biGram,
          displayTerm: biGram
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' '),
          frequency: count,
          isPhrase: true,
          category: 'domain',
        });
      }
    }
  }

  // 4. Extract Meaningful Single Words (Unigrams)
  for (const word of words) {
    if (word.startsWith('__token_')) continue;
    if (word.length < 3) continue;
    if (/^\d+$/.test(word)) continue;
    if (STOP_WORDS.has(word)) continue;

    const wordKey = word.toLowerCase();
    if (!termMap.has(wordKey)) {
      const wordRegex = new RegExp(`\\b${wordKey}\\b`, 'g');
      const matches = normalized.match(wordRegex);
      const count = matches ? matches.length : 1;

      const display = word.charAt(0).toUpperCase() + word.slice(1);
      termMap.set(wordKey, {
        rawTerm: wordKey,
        displayTerm: restoreTokenDisplay(display),
        frequency: count,
        isPhrase: false,
        category: 'technical',
      });
    }
  }

  return Array.from(termMap.values()).sort((a, b) => {
    if (b.frequency !== a.frequency) return b.frequency - a.frequency;
    return a.displayTerm.localeCompare(b.displayTerm);
  });
}
