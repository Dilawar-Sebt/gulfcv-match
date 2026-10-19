import { describe, it, expect } from 'vitest';
import { calculateMatch } from '../matcher';

describe('calculateMatch', () => {
  it('handles empty CV input gracefully with 0% score and 0 matched terms', () => {
    const jd = 'Seeking software engineer with Python and Docker skills';
    const result = calculateMatch('', jd);

    expect(result.scoreDetails.percentage).toBe(0);
    expect(result.scoreDetails.matchedKeywordsCount).toBe(0);
    expect(result.scoreDetails.totalJdKeywords).toBeGreaterThan(0);
    expect(result.matchedKeywords.length).toBe(0);
    expect(result.missingKeywords.length).toBe(result.scoreDetails.totalJdKeywords);
  });

  it('handles empty and whitespace-only job description gracefully without divide-by-zero', () => {
    const cv = 'Experienced professional with Python and AWS experience';
    const emptyResult = calculateMatch(cv, '');
    const wsResult = calculateMatch(cv, '     \t\n   ');

    expect(emptyResult.scoreDetails.percentage).toBe(0);
    expect(emptyResult.scoreDetails.totalJdKeywords).toBe(0);
    expect(emptyResult.scoreDetails.formulaDescription).toContain('empty');

    expect(wsResult.scoreDetails.percentage).toBe(0);
    expect(wsResult.scoreDetails.totalJdKeywords).toBe(0);
  });

  it('handles job description with no meaningful keywords without errors', () => {
    const cv = 'Some general text';
    const jd = 'and or the a in on with at';
    const result = calculateMatch(cv, jd);

    expect(result.scoreDetails.percentage).toBe(0);
    expect(result.scoreDetails.totalJdKeywords).toBe(0);
    expect(result.scoreDetails.formulaDescription).toContain('No distinct skills');
  });

  it('computes 100% score when all extracted JD keywords are present in the CV', () => {
    const jd = 'Need proficiency in Python, Docker, and Kubernetes.';
    const cv = 'Senior DevOps specialist with extensive background in Python, Docker, and Kubernetes.';
    const result = calculateMatch(cv, jd);

    expect(result.scoreDetails.percentage).toBe(100);
    expect(result.scoreDetails.matchedKeywordsCount).toBe(result.scoreDetails.totalJdKeywords);
    expect(result.missingKeywords.length).toBe(0);
    expect(result.scoreDetails.percentage).toBeGreaterThanOrEqual(0);
    expect(result.scoreDetails.percentage).toBeLessThanOrEqual(100);
  });

  it('computes 0% score when none of the extracted JD keywords are found in the CV', () => {
    const jd = 'Looking for an experienced Chef with Culinary arts and Pastry baking.';
    const cv = 'Accountant specialized in VAT filing, Tax returns, and Financial auditing.';
    const result = calculateMatch(cv, jd);

    expect(result.scoreDetails.percentage).toBe(0);
    expect(result.scoreDetails.matchedKeywordsCount).toBe(0);
    expect(result.matchedKeywords.length).toBe(0);
    expect(result.missingKeywords.length).toBeGreaterThan(0);
  });

  it('computes correct fractional score between 0% and 100%', () => {
    const jd = 'Requires Python, Docker, Kubernetes, and Terraform.';
    const cv = 'Experienced in Python and Docker.';
    const result = calculateMatch(cv, jd);

    expect(result.scoreDetails.percentage).toBeGreaterThan(0);
    expect(result.scoreDetails.percentage).toBeLessThan(100);
    expect(result.matchedKeywords.length).toBe(result.scoreDetails.matchedKeywordsCount);
    expect(result.missingKeywords.length).toBe(result.scoreDetails.missingKeywordsCount);
    expect(result.scoreDetails.matchedKeywordsCount + result.scoreDetails.missingKeywordsCount).toBe(
      result.scoreDetails.totalJdKeywords
    );
  });

  it('correctly matches multi-word phrases and special tokens like C++, Node.js, and Power BI', () => {
    const jd = 'Role requires accounts payable, customer service, C++, and Power BI.';
    const cv =
      'Proven expertise handling accounts payable workflows and providing excellent customer service. Proficient in C++ and building Power BI visual dashboards.';
    const result = calculateMatch(cv, jd);

    const matchedTerms = result.matchedKeywords.map((k) => k.term);
    expect(matchedTerms).toContain('Accounts Payable');
    expect(matchedTerms).toContain('Customer Service');
    expect(matchedTerms).toContain('C++');
    expect(matchedTerms).toContain('Power BI');
  });

  it('always guarantees score is bounded between 0 and 100', () => {
    const jd = 'React, TypeScript, CSS, HTML, Node.js';
    const cv = 'React, TypeScript, CSS, HTML, Node.js, extra, bonus, tools';
    const result = calculateMatch(cv, jd);

    expect(result.scoreDetails.percentage).toBeGreaterThanOrEqual(0);
    expect(result.scoreDetails.percentage).toBeLessThanOrEqual(100);
    expect(Number.isFinite(result.scoreDetails.percentage)).toBe(true);
  });

  it('provides a transparent formula description in scoreDetails', () => {
    const jd = 'Financial reporting and budgeting';
    const cv = 'Financial reporting specialist';
    const result = calculateMatch(cv, jd);

    expect(result.scoreDetails.formulaDescription).toContain('matched terms ÷');
    expect(result.scoreDetails.formulaDescription).toContain('detected terms in job advert');
  });
});
