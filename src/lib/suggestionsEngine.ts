import { KeywordMatch, SuggestionItem } from '../types';

export interface SectionDetectionResult {
  experience: boolean;
  education: boolean;
  skills: boolean;
  summary: boolean;
  contact: boolean;
}

export function detectSections(cvText: string): SectionDetectionResult {
  const text = cvText.toLowerCase();

  const experience = /\b(work\s+experience|professional\s+experience|employment\s+history|career\s+history|work\s+history|experience)\b/i.test(
    text
  );
  const education = /\b(education|academic\s+background|qualifications|university|college|bachelor|master|degree|diploma)\b/i.test(
    text
  );
  const skills = /\b(skills|technical\s+skills|core\s+competencies|areas\s+of\s+expertise|proficiencies|technologies)\b/i.test(
    text
  );
  const summary = /\b(professional\s+summary|profile|about\s+me|career\s+objective|summary\s+of\s+qualifications|executive\s+summary)\b/i.test(
    text
  );
  // Safe contact detection: check if email or phone pattern exists without storing or extracting the actual details
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(cvText);
  const hasPhone = /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{8,12}\b/.test(cvText);
  const contact = hasEmail || hasPhone || /\b(contact\s+details|contact\s+information|phone|email|linkedin)\b/i.test(text);

  return {
    experience,
    education,
    skills,
    summary,
    contact,
  };
}

export function generateSuggestions(
  cvText: string,
  matchedKeywords: KeywordMatch[],
  missingKeywords: KeywordMatch[]
): { suggestions: SuggestionItem[]; sections: SectionDetectionResult; summaryDraft?: string } {
  const suggestions: SuggestionItem[] = [];
  const sections = detectSections(cvText);

  // 1. Missing Key Sections
  if (!sections.summary) {
    suggestions.push({
      id: 'section-summary',
      category: 'sections',
      severity: 'improvement',
      title: 'Consider adding a brief Professional Summary',
      description:
        'A 2-3 sentence introductory summary at the top helps Gulf recruiters quickly grasp your core strengths, industry focus, and value proposition.',
      evidence: 'No dedicated "Summary" or "Professional Profile" heading was detected in the text.',
    });
  } else {
    suggestions.push({
      id: 'section-summary-found',
      category: 'sections',
      severity: 'strength',
      title: 'Professional Summary section detected',
      description: 'Your CV includes an introductory summary or profile section.',
      evidence: 'Summary or profile heading found in the CV text.',
    });
  }

  if (!sections.skills) {
    suggestions.push({
      id: 'section-skills',
      category: 'sections',
      severity: 'improvement',
      title: 'Add a dedicated Core Skills or Competencies section',
      description:
        'Listing your primary hard skills, technical tools, and domain expertise in a distinct section makes them immediately scannable for hiring managers and recruiters.',
      evidence: 'No standard "Skills" or "Core Competencies" heading was recognized.',
    });
  }

  if (!sections.experience) {
    suggestions.push({
      id: 'section-experience',
      category: 'sections',
      severity: 'improvement',
      title: 'Highlight Work Experience with clear headings',
      description:
        'Ensure your employment history is clearly labeled (e.g., "Work Experience" or "Professional Experience") with job titles and organization names.',
      evidence: 'Standard work experience heading was not identified in the plain text.',
    });
  }

  if (!sections.contact) {
    suggestions.push({
      id: 'section-contact',
      category: 'contact',
      severity: 'tip',
      title: 'Verify your contact details are accessible',
      description:
        'Double-check that your phone number, email address, and LinkedIn profile are present in plain text rather than inside embedded graphical headers that cannot be read by plain text extractors.',
      evidence: 'Standard phone/email pattern was not detected in the extracted text.',
    });
  }

  // 2. Keyword Alignment Check
  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 5).map((k) => k.term);
    suggestions.push({
      id: 'keywords-missing',
      category: 'keywords',
      severity: 'improvement',
      title: `Keywords from job advert not found in CV: ${topMissing.join(', ')}`,
      description:
        'These specific terms appear in the job description but were not detected in your CV. If you possess genuine hands-on experience with any of these areas, consider explicitly weaving them into your bullet points.',
      evidence: `Missing ${missingKeywords.length} terms found in the job advertisement. (Remember: only add terms that accurately reflect your true experience).`,
    });
  } else if (matchedKeywords.length > 0) {
    suggestions.push({
      id: 'keywords-aligned',
      category: 'keywords',
      severity: 'strength',
      title: 'Strong alignment with detected job keywords',
      description:
        'Your CV explicitly incorporates the primary keywords and phrases extracted from the target job posting.',
      evidence: `Found ${matchedKeywords.length} matching terms.`,
    });
  }

  // 3. Measurable Metrics & Quantifiable Achievements Check
  const metricPattern = /(\d+%\s*|\$\d+|\b\d+\s*(?:aed|sar|usd|million|k|percent|increase|decrease|growth|reduced|saved|revenue)\b)/i;
  const hasMetrics = metricPattern.test(cvText);

  if (!hasMetrics) {
    suggestions.push({
      id: 'clarity-metrics',
      category: 'metrics',
      severity: 'improvement',
      title: 'Strengthen bullet points with measurable impact',
      description:
        'Recruiters in competitive Gulf markets look for quantifiable achievements. Wherever possible, illustrate your responsibilities with concrete results, metrics, percentages, or budgets (e.g., "Increased sales by 18%", "Managed a team of 12", "Reduced processing turnaround time by 3 days").',
      evidence: 'Few or no quantifiable metrics, percentages, or monetary outcomes were detected in the text.',
    });
  } else {
    suggestions.push({
      id: 'clarity-metrics-found',
      category: 'metrics',
      severity: 'strength',
      title: 'Quantified results detected',
      description:
        'Your CV includes specific numbers, percentages, or metrics that help validate the scale and impact of your work.',
      evidence: 'Detected measurable figures and outcome markers in your text.',
    });
  }

  // 4. Readability and Paragraph Density
  const paragraphs = cvText.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const denseParagraphs = paragraphs.filter((p) => {
    const wordCount = p.trim().split(/\s+/).length;
    return wordCount > 75;
  });

  if (denseParagraphs.length > 0) {
    suggestions.push({
      id: 'clarity-density',
      category: 'clarity',
      severity: 'tip',
      title: 'Break down dense paragraphs into concise bullet points',
      description:
        'Long paragraphs can cause recruiters to skim past critical achievements. Converting dense paragraphs into 2-4 focused bullet points starting with strong action verbs enhances readability.',
      evidence: `Found ${denseParagraphs.length} text section(s) with more than 75 continuous words.`,
    });
  }

  // 5. Generate a strictly fact-based editable draft summary if matched keywords exist
  let summaryDraft: string | undefined;
  if (matchedKeywords.length >= 2) {
    const topSkills = matchedKeywords.slice(0, 4).map((k) => k.term);
    summaryDraft = `Results-oriented professional with hands-on expertise in ${topSkills.join(', ')}. Demonstrated experience delivering operational excellence and driving business value. Committed to applying strong core competencies to exceed organizational targets in a fast-paced environment.`;
  }

  return { suggestions, sections, summaryDraft };
}
