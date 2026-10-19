import { KeywordMatch, MatchScoreDetails } from '../types';
import { extractKeywords } from './keywordExtractor';
import { normalizeText, PRESERVED_SPECIAL_TOKENS } from './textNormalizer';

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface MatchAnalysisResult {
  scoreDetails: MatchScoreDetails;
  matchedKeywords: KeywordMatch[];
  missingKeywords: KeywordMatch[];
  allKeywords: KeywordMatch[];
}

/**
 * Calculates a deterministic keyword overlap score between a CV and a Job Description.
 */
export function calculateMatch(cvText: string, jdText: string): MatchAnalysisResult {
  if (!jdText || !jdText.trim()) {
    return {
      scoreDetails: {
        percentage: 0,
        totalJdKeywords: 0,
        matchedKeywordsCount: 0,
        missingKeywordsCount: 0,
        formulaDescription: 'Job description is empty. Unable to compute keyword overlap.',
      },
      matchedKeywords: [],
      missingKeywords: [],
      allKeywords: [],
    };
  }

  // Extract relevant keywords and phrases from the Job Description
  const jdTerms = extractKeywords(jdText);
  const cvNormalized = normalizeText(cvText);

  if (jdTerms.length === 0) {
    return {
      scoreDetails: {
        percentage: 0,
        totalJdKeywords: 0,
        matchedKeywordsCount: 0,
        missingKeywordsCount: 0,
        formulaDescription:
          'No distinct skills or keywords were detected in the target job description. Try pasting a more detailed job advert.',
      },
      matchedKeywords: [],
      missingKeywords: [],
      allKeywords: [],
    };
  }

  const allKeywords: KeywordMatch[] = [];
  const matchedKeywords: KeywordMatch[] = [];
  const missingKeywords: KeywordMatch[] = [];

  for (const term of jdTerms) {
    let isMatched = false;
    let frequencyInCv = 0;

    // Check if this term is a preserved special token (e.g. C++, C#, Power BI)
    const specialToken = PRESERVED_SPECIAL_TOKENS.find(
      (t) => t.canonical.toLowerCase() === term.rawTerm.toLowerCase()
    );

    if (specialToken) {
      const canonicalLower = specialToken.canonical.toLowerCase();
      const tokenRegex = new RegExp(`(?:^|\\s)${canonicalLower}(?:\\s|$)`, 'gi');
      const matches = cvNormalized.match(tokenRegex);
      if (matches && matches.length > 0) {
        isMatched = true;
        frequencyInCv = matches.length;
      }
    } else {
      // Normal word or multi-word phrase matching
      const escaped = escapeRegExp(term.rawTerm);
      const termRegex = new RegExp(`\\b${escaped}\\b`, 'gi');
      const matches = cvNormalized.match(termRegex);
      if (matches && matches.length > 0) {
        isMatched = true;
        frequencyInCv = matches.length;
      }
    }

    const keywordItem: KeywordMatch = {
      term: term.displayTerm,
      matched: isMatched,
      category: term.category,
      frequencyInJd: term.frequency,
      frequencyInCv,
    };

    allKeywords.push(keywordItem);
    if (isMatched) {
      matchedKeywords.push(keywordItem);
    } else {
      missingKeywords.push(keywordItem);
    }
  }

  const totalJdKeywords = allKeywords.length;
  const matchedKeywordsCount = matchedKeywords.length;
  const missingKeywordsCount = missingKeywords.length;

  // Overlap percentage calculation: (matched / total) * 100, clamped [0, 100]
  const rawPercentage = (matchedKeywordsCount / totalJdKeywords) * 100;
  const percentage = Math.max(0, Math.min(100, Math.round(rawPercentage)));

  const formulaDescription = `Calculated as: (${matchedKeywordsCount} matched terms ÷ ${totalJdKeywords} detected terms in job advert) × 100 = ${percentage}%.`;

  return {
    scoreDetails: {
      percentage,
      totalJdKeywords,
      matchedKeywordsCount,
      missingKeywordsCount,
      formulaDescription,
    },
    matchedKeywords,
    missingKeywords,
    allKeywords,
  };
}
