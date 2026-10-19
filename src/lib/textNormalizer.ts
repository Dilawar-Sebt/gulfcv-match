// Special technical & business tokens that must be preserved
export const PRESERVED_SPECIAL_TOKENS: { pattern: RegExp; canonical: string; display: string }[] = [
  { pattern: /\bc\+\+(?=[^a-z0-9]|$)/gi, canonical: '__TOKEN_CPP__', display: 'C++' },
  { pattern: /\bc#(?=[^a-z0-9]|$)/gi, canonical: '__TOKEN_CSHARP__', display: 'C#' },
  { pattern: /(?:^|[\s,;:(])\.net(?=[\s,;:!?)\[\]]|$)/gi, canonical: '__TOKEN_DOTNET__', display: '.NET' },
  { pattern: /\bnode(?:\.js)?(?=[^a-z0-9]|$)/gi, canonical: '__TOKEN_NODEJS__', display: 'Node.js' },
  { pattern: /\bvue(?:\.js)?(?=[^a-z0-9]|$)/gi, canonical: '__TOKEN_VUEJS__', display: 'Vue.js' },
  { pattern: /\bnext(?:\.js)?(?=[^a-z0-9]|$)/gi, canonical: '__TOKEN_NEXTJS__', display: 'Next.js' },
  { pattern: /\breact(?:\.js)?(?=[^a-z0-9]|$)/gi, canonical: '__TOKEN_REACTJS__', display: 'React' },
  { pattern: /\bpower\s*bi\b/gi, canonical: '__TOKEN_POWERBI__', display: 'Power BI' },
  { pattern: /\b(?:ms|microsoft)\s*excel\b/gi, canonical: '__TOKEN_MSEXCEL__', display: 'Microsoft Excel' },
  { pattern: /\b(?:ms|microsoft)\s*word\b/gi, canonical: '__TOKEN_MSWORD__', display: 'Microsoft Word' },
  { pattern: /\b(?:ms|microsoft)\s*office\b/gi, canonical: '__TOKEN_MSOFFICE__', display: 'Microsoft Office' },
  { pattern: /\bci\/cd\b/gi, canonical: '__TOKEN_CICD__', display: 'CI/CD' },
  { pattern: /\bui\/ux\b/gi, canonical: '__TOKEN_UIUX__', display: 'UI/UX' },
  { pattern: /\btcp\/ip\b/gi, canonical: '__TOKEN_TCPIP__', display: 'TCP/IP' },
  { pattern: /\berp\b/gi, canonical: '__TOKEN_ERP__', display: 'ERP' },
  { pattern: /\bcrm\b/gi, canonical: '__TOKEN_CRM__', display: 'CRM' },
  { pattern: /\bsap\b/gi, canonical: '__TOKEN_SAP__', display: 'SAP' },
  { pattern: /\bsql\b/gi, canonical: '__TOKEN_SQL__', display: 'SQL' },
];

/**
 * Normalizes text while preserving special tokens like C++, C#, Node.js, Power BI, etc.
 */
export function normalizeText(text: string): string {
  if (!text) return '';

  let normalized = text;

  // 1. Substitute special tokens with lowercase canonical placeholders
  for (const token of PRESERVED_SPECIAL_TOKENS) {
    normalized = normalized.replace(token.pattern, (match) => {
      // If match has a leading space/delimiter (e.g. from the .net regex) preserve leading spacing
      const hasLeadingSpace = /^\s/.test(match);
      return `${hasLeadingSpace ? ' ' : ''} ${token.canonical.toLowerCase()} `;
    });
  }

  // 2. Lowercase remaining text
  normalized = normalized.toLowerCase();

  // 3. Remove punctuation except alphanumeric characters, underscores (used in tokens), and dashes inside words
  normalized = normalized.replace(/[^a-z0-9_\s-]/g, ' ');

  // 4. Clean stray hyphens
  normalized = normalized.replace(/(^|\s)-+|-+(\s|$)/g, ' ');

  // 5. Normalize multiple whitespace characters to a single space
  normalized = normalized.replace(/\s+/g, ' ').trim();

  return normalized;
}

/**
 * Restores canonical placeholders to their proper display format.
 */
export function restoreTokenDisplay(tokenText: string): string {
  for (const token of PRESERVED_SPECIAL_TOKENS) {
    if (tokenText.toLowerCase() === token.canonical.toLowerCase()) {
      return token.display;
    }
  }

  return tokenText;
}

/**
 * Checks if a token placeholder is present in the text
 */
export function containsCanonicalToken(text: string, canonical: string): boolean {
  const normalized = normalizeText(text);
  const regex = new RegExp(`(^|\\s)${canonical.toLowerCase()}(\\s|$)`, 'i');
  return regex.test(normalized);
}
