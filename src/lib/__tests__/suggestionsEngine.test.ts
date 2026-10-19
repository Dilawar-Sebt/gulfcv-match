import { describe, it, expect } from 'vitest';
import { detectSections, generateSuggestions } from '../suggestionsEngine';
import { KeywordMatch } from '../../types';

describe('suggestionsEngine', () => {
  it('detects standard CV sections when present', () => {
    const cvText = `
      John Doe
      john.doe@example.com | +971 50 123 4567

      Professional Summary
      Motivated professional with 5 years in marketing.

      Core Skills
      Digital Marketing, SEO, Content Strategy

      Work Experience
      Senior Specialist - XYZ Agency (2020 - Present)

      Education
      Bachelor of Science in Communications
    `;

    const sections = detectSections(cvText);
    expect(sections.summary).toBe(true);
    expect(sections.skills).toBe(true);
    expect(sections.experience).toBe(true);
    expect(sections.education).toBe(true);
    expect(sections.contact).toBe(true);
  });

  it('detects missing sections and generates constructive suggestions', () => {
    const cvText = 'Just some unstructured notes about past jobs without headings.';
    const sections = detectSections(cvText);

    expect(sections.summary).toBe(false);
    expect(sections.skills).toBe(false);
    expect(sections.experience).toBe(false);
    expect(sections.education).toBe(false);

    const { suggestions } = generateSuggestions(cvText, [], []);
    const titles = suggestions.map((s) => s.title);

    expect(titles.some((t) => t.includes('Professional Summary'))).toBe(true);
    expect(titles.some((t) => t.includes('Core Skills'))).toBe(true);
    expect(titles.some((t) => t.includes('Work Experience'))).toBe(true);
  });

  it('detects presence and absence of measurable metrics', () => {
    const withoutMetrics = 'Managed the operations team and coordinated with clients daily.';
    const resultWithout = generateSuggestions(withoutMetrics, [], []);
    expect(resultWithout.suggestions.some((s) => s.id === 'clarity-metrics')).toBe(true);

    const withMetrics = 'Increased client acquisition by 24% and generated 500k AED in annual revenue.';
    const resultWith = generateSuggestions(withMetrics, [], []);
    expect(resultWith.suggestions.some((s) => s.id === 'clarity-metrics-found')).toBe(true);
  });

  it('detects dense paragraphs exceeding readability threshold', () => {
    const longWords = new Array(85).fill('workflow').join(' ');
    const cvText = `Skills\nMarketing\n\nExperience\n${longWords}`;
    const result = generateSuggestions(cvText, [], []);

    expect(result.suggestions.some((s) => s.id === 'clarity-density')).toBe(true);
  });

  it('generates an editable draft summary strictly using provided matched keywords', () => {
    const matched: KeywordMatch[] = [
      { term: 'Financial Reporting', matched: true, frequencyInJd: 2, frequencyInCv: 2 },
      { term: 'Accounts Payable', matched: true, frequencyInJd: 1, frequencyInCv: 1 },
      { term: 'General Ledger', matched: true, frequencyInJd: 1, frequencyInCv: 1 },
    ];

    const result = generateSuggestions('CV text with financial keywords', matched, []);
    expect(result.summaryDraft).toBeDefined();
    expect(result.summaryDraft).toContain('Financial Reporting');
    expect(result.summaryDraft).toContain('Accounts Payable');
  });
});
