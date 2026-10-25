import { KeywordMatch, KeywordCluster, TailoringTip } from '../types';

// Dictionaries for semantic classification
const TOOLS_SET = new Set([
  'c++', 'c#', 'node.js', '.net', 'react', 'vue.js', 'next.js', 'sql', 'sap', 'erp', 'crm',
  'power bi', 'microsoft excel', 'microsoft word', 'microsoft office', 'ci/cd', 'ui/ux',
  'tcp/ip', 'python', 'docker', 'kubernetes', 'terraform', 'aws', 'azure', 'gcp', 'jira',
  'salesforce', 'git', 'tableau', 'excel', 'word', 'powerpoint', 'figma', 'photoshop',
  'quickbooks', 'tally', 'oracle', 'linux', 'unix', 'html', 'css', 'javascript', 'typescript',
]);

const CERTIFICATIONS_SET = new Set([
  'pmp', 'cpa', 'cfa', 'acca', 'socpa', 'sce', 'scfhs', 'shrm', 'cipd', 'six sigma',
  'scrum master', 'agile methodology', 'bachelor', 'master', 'mba', 'phd', 'diploma',
  'certified', 'certification', 'itil', 'prince2', 'lean',
]);

const SOFT_SKILLS_SET = new Set([
  'customer service', 'client relations', 'stakeholder management', 'problem solving',
  'critical thinking', 'cross functional leadership', 'cross-functional leadership',
  'communication', 'team leadership', 'negotiation', 'conflict resolution', 'time management',
  'adaptability', 'collaboration', 'interpersonal skills', 'presentation',
]);

const COMPLIANCE_SET = new Set([
  'uae driving license', 'driving license', 'transferable iqama', 'saudization', 'nitaqat',
  'golden visa', 'residence visa', 'labor law', 'wps', 'mhrsd', 'vat filing', 'tax compliance',
]);

/**
 * Categorizes a raw keyword term into a specific functional cluster.
 */
export function classifyKeyword(term: string): 'tools' | 'certifications' | 'soft_skills' | 'compliance' | 'domain' {
  const lower = term.toLowerCase().trim();

  if (TOOLS_SET.has(lower) || /^(software|tool|database|programming|system|cloud)/i.test(lower)) {
    return 'tools';
  }
  if (CERTIFICATIONS_SET.has(lower) || /(certification|certified|degree|accreditation)/i.test(lower)) {
    return 'certifications';
  }
  // Domain-specific functional management phrases take precedence over generic soft skills
  if (/(inventory|warehouse|supply chain|logistics|procurement|financial|accounting|audit|risk|contract|product|operations|facility|asset|portfolio|quality|sales|marketing|revenue|business development)\s+management/i.test(lower)) {
    return 'domain';
  }

  if (SOFT_SKILLS_SET.has(lower) || /(leadership|stakeholder management|change management|people management|time management|conflict resolution|communication|relations)/i.test(lower)) {
    return 'soft_skills';
  }
  if (COMPLIANCE_SET.has(lower) || /(visa|iqama|license|regulation|compliance|law)/i.test(lower)) {
    return 'compliance';
  }

  return 'domain';
}

/**
 * Groups a list of keywords into structured semantic clusters.
 */
export function groupKeywords(keywords: KeywordMatch[]): KeywordCluster[] {
  const clustersMap: Record<
    string,
    { id: string; title: string; iconName: string; description: string; keywords: KeywordMatch[] }
  > = {
    tools: {
      id: 'tools',
      title: 'Tools & Technologies',
      iconName: 'Wrench',
      description: 'Software applications, programming languages, and enterprise platforms.',
      keywords: [],
    },
    domain: {
      id: 'domain',
      title: 'Domain & Core Functional Skills',
      iconName: 'Briefcase',
      description: 'Industry workflows, business processes, and specialized execution capabilities.',
      keywords: [],
    },
    certifications: {
      id: 'certifications',
      title: 'Certifications & Education',
      iconName: 'GraduationCap',
      description: 'Degrees, professional council memberships, and recognized industry badges.',
      keywords: [],
    },
    soft_skills: {
      id: 'soft_skills',
      title: 'Leadership & Soft Competencies',
      iconName: 'Users',
      description: 'Communication, stakeholder collaboration, and workplace effectiveness.',
      keywords: [],
    },
    compliance: {
      id: 'compliance',
      title: 'Regional & Regulatory Requirements',
      iconName: 'ShieldCheck',
      description: 'Gulf visa statuses, driving licenses, and national labor regulations.',
      keywords: [],
    },
  };

  // Group keywords into their respective clusters
  for (const kw of keywords) {
    const category = classifyKeyword(kw.term);
    clustersMap[category].keywords.push(kw);
  }

  // Calculate metrics for each cluster
  const result: KeywordCluster[] = [];

  for (const key of ['tools', 'domain', 'certifications', 'soft_skills', 'compliance']) {
    const cluster = clustersMap[key];
    if (cluster.keywords.length > 0) {
      const totalCount = cluster.keywords.length;
      const matchedCount = cluster.keywords.filter((k) => k.matched).length;
      const matchPercentage = totalCount > 0 ? Math.round((matchedCount / totalCount) * 100) : 0;

      result.push({
        id: cluster.id,
        title: cluster.title,
        iconName: cluster.iconName,
        description: cluster.description,
        totalCount,
        matchedCount,
        matchPercentage,
        keywords: cluster.keywords,
      });
    }
  }

  return result;
}

/**
 * Generates JobSprout-style smart bullet point tailoring tips based on missing clusters.
 */
export function generateTailoringTips(clusters: KeywordCluster[]): TailoringTip[] {
  const tips: TailoringTip[] = [];

  for (const cluster of clusters) {
    const missing = cluster.keywords.filter((k) => !k.matched).map((k) => k.term);
    if (missing.length === 0) continue;

    const sampleKeywords = missing.slice(0, 3);

    if (cluster.id === 'tools') {
      tips.push({
        clusterTitle: cluster.title,
        missingKeywords: sampleKeywords,
        suggestedAction: `Mention specific tools you have used (such as ${sampleKeywords.join(', ')}) alongside the measurable output they generated.`,
        sampleBullet: `Utilized ${sampleKeywords[0] || 'relevant software'} to automate daily reporting workflows, reducing turnaround time by 30% and eliminating manual errors.`,
      });
    } else if (cluster.id === 'domain') {
      tips.push({
        clusterTitle: cluster.title,
        missingKeywords: sampleKeywords,
        suggestedAction: `Integrate domain workflows (${sampleKeywords.join(', ')}) directly into your past job responsibilities with context.`,
        sampleBullet: `Spearheaded ${sampleKeywords[0] || 'core workflow'} initiatives across regional teams, resulting in a 15% boost in operational efficiency.`,
      });
    } else if (cluster.id === 'certifications') {
      tips.push({
        clusterTitle: cluster.title,
        missingKeywords: sampleKeywords,
        suggestedAction: `If you hold credentials or courses in ${sampleKeywords.join(', ')}, state them prominently in your Education or Certifications section.`,
        sampleBullet: `Certified in ${sampleKeywords[0] || 'target qualification'} with practical application in managing complex multi-stakeholder deliverables.`,
      });
    } else if (cluster.id === 'soft_skills') {
      tips.push({
        clusterTitle: cluster.title,
        missingKeywords: sampleKeywords,
        suggestedAction: `Demonstrate ${sampleKeywords.join(' and ')} through a tangible achievement rather than an isolated buzzword.`,
        sampleBullet: `Partnered with cross-functional leadership and external clients, aligning stakeholder expectations to deliver project milestones 2 weeks ahead of schedule.`,
      });
    } else if (cluster.id === 'compliance') {
      tips.push({
        clusterTitle: cluster.title,
        missingKeywords: sampleKeywords,
        suggestedAction: `Ensure your availability and credentials (${sampleKeywords.join(', ')}) are stated clearly in your resume header.`,
        sampleBullet: `Valid ${sampleKeywords[0] || 'Regional License'} | Available for immediate transfer and regional relocation.`,
      });
    }
  }

  return tips;
}
