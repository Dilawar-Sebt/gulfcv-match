import { describe, it, expect } from 'vitest';
import { classifyKeyword, groupKeywords, generateTailoringTips } from '../keywordGrouping';
import { KeywordMatch } from '../../types';

describe('keywordGrouping', () => {
  it('classifies tools, certifications, soft skills, and compliance correctly', () => {
    expect(classifyKeyword('Power BI')).toBe('tools');
    expect(classifyKeyword('Python')).toBe('tools');
    expect(classifyKeyword('Docker')).toBe('tools');
    expect(classifyKeyword('PMP')).toBe('certifications');
    expect(classifyKeyword('Bachelor')).toBe('certifications');
    expect(classifyKeyword('Customer Service')).toBe('soft_skills');
    expect(classifyKeyword('Stakeholder Management')).toBe('soft_skills');
    expect(classifyKeyword('UAE Driving License')).toBe('compliance');
    expect(classifyKeyword('Transferable Iqama')).toBe('compliance');
    expect(classifyKeyword('Accounts Payable')).toBe('domain');
    expect(classifyKeyword('Inventory Management')).toBe('domain');
  });

  it('groups keywords into clusters and computes match percentages accurately', () => {
    const mockKeywords: KeywordMatch[] = [
      { term: 'Python', matched: true, frequencyInJd: 2, frequencyInCv: 2 },
      { term: 'Docker', matched: false, frequencyInJd: 1, frequencyInCv: 0 },
      { term: 'Accounts Payable', matched: true, frequencyInJd: 1, frequencyInCv: 1 },
      { term: 'Financial Reporting', matched: true, frequencyInJd: 1, frequencyInCv: 1 },
      { term: 'VAT Filing', matched: true, frequencyInJd: 1, frequencyInCv: 1 },
      { term: 'Customer Service', matched: false, frequencyInJd: 1, frequencyInCv: 0 },
    ];

    const clusters = groupKeywords(mockKeywords);

    // Tools cluster should have 2 keywords, 1 matched (50%)
    const toolsCluster = clusters.find((c) => c.id === 'tools');
    expect(toolsCluster).toBeDefined();
    expect(toolsCluster?.totalCount).toBe(2);
    expect(toolsCluster?.matchedCount).toBe(1);
    expect(toolsCluster?.matchPercentage).toBe(50);

    // Domain cluster should have 2 keywords, 2 matched (100%)
    const domainCluster = clusters.find((c) => c.id === 'domain');
    expect(domainCluster).toBeDefined();
    expect(domainCluster?.totalCount).toBe(2);
    expect(domainCluster?.matchedCount).toBe(2);
    expect(domainCluster?.matchPercentage).toBe(100);

    // Compliance cluster should have 1 keyword, 1 matched (100%)
    const complianceCluster = clusters.find((c) => c.id === 'compliance');
    expect(complianceCluster).toBeDefined();
    expect(complianceCluster?.totalCount).toBe(1);
    expect(complianceCluster?.matchedCount).toBe(1);
    expect(complianceCluster?.matchPercentage).toBe(100);

    // Soft skills cluster should have 1 keyword, 0 matched (0%)
    const softSkillsCluster = clusters.find((c) => c.id === 'soft_skills');
    expect(softSkillsCluster).toBeDefined();
    expect(softSkillsCluster?.totalCount).toBe(1);
    expect(softSkillsCluster?.matchedCount).toBe(0);
    expect(softSkillsCluster?.matchPercentage).toBe(0);
  });

  it('generates practical tailoring tips for clusters with gaps', () => {
    const mockKeywords: KeywordMatch[] = [
      { term: 'Kubernetes', matched: false, frequencyInJd: 1, frequencyInCv: 0 },
      { term: 'PMP', matched: false, frequencyInJd: 1, frequencyInCv: 0 },
    ];

    const clusters = groupKeywords(mockKeywords);
    const tips = generateTailoringTips(clusters);

    expect(tips.length).toBeGreaterThan(0);
    const toolsTip = tips.find((t) => t.clusterTitle.includes('Tools'));
    expect(toolsTip).toBeDefined();
    expect(toolsTip?.sampleBullet).toContain('Kubernetes');
  });
});
