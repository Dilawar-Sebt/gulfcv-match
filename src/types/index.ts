export type CvInputMode = 'upload' | 'paste';

export type KeywordCategory =
  | 'tools'
  | 'domain'
  | 'certifications'
  | 'soft_skills'
  | 'compliance'
  | 'technical'
  | 'tool'
  | 'soft_skill'
  | 'general';

export interface KeywordMatch {
  term: string;
  matched: boolean;
  category?: KeywordCategory;
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

export interface KeywordCluster {
  id: string;
  title: string;
  iconName: string;
  description: string;
  totalCount: number;
  matchedCount: number;
  matchPercentage: number;
  keywords: KeywordMatch[];
}

export interface TailoringTip {
  clusterTitle: string;
  missingKeywords: string[];
  suggestedAction: string;
  sampleBullet: string;
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
  keywordClusters: KeywordCluster[];
  tailoringTips: TailoringTip[];
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
