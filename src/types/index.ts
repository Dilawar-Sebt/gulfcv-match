export type CvInputMode = 'upload' | 'paste';

export interface KeywordMatch {
  term: string;
  matched: boolean;
  category?: 'technical' | 'tool' | 'domain' | 'soft_skill' | 'general';
  frequencyInJd: number;
  frequencyInCv: number;
}

export interface MatchScoreDetails {
  percentage: number;
  totalJdKeywords: number;
  matchedKeywordsCount: number;
  missingKeywordsCount: number;
  formulaDescription: string;
}

export type SuggestionSeverity = 'tip' | 'improvement' | 'strength';

export interface SuggestionItem {
  id: string;
  category: 'sections' | 'keywords' | 'clarity' | 'metrics' | 'contact';
  title: string;
  description: string;
  evidence: string;
  severity: SuggestionSeverity;
}

export interface AnalysisResult {
  scoreDetails: MatchScoreDetails;
  matchedKeywords: KeywordMatch[];
  missingKeywords: KeywordMatch[];
  allKeywords: KeywordMatch[];
  suggestions: SuggestionItem[];
  detectedSections: {
    experience: boolean;
    education: boolean;
    skills: boolean;
    summary: boolean;
    contact: boolean;
  };
  summaryDraft?: string;
  analyzedAt: string;
}

export interface ValidationState {
  cvError?: string;
  jdError?: string;
  fileError?: string;
}
