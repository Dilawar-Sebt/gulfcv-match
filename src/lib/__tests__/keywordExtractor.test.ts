import { describe, it, expect } from 'vitest';
import { extractKeywords } from '../keywordExtractor';

describe('keywordExtractor', () => {
  it('returns empty array for empty or whitespace text', () => {
    expect(extractKeywords('')).toEqual([]);
    expect(extractKeywords('   ')).toEqual([]);
    expect(extractKeywords('\n\t  ')).toEqual([]);
  });

  it('filters out common English stop words and recruitment filler', () => {
    const text = 'The ideal candidate must have experience working in a team';
    const keywords = extractKeywords(text);

    // Stop words should not be present as extracted terms
    const rawTerms = keywords.map((k) => k.rawTerm);
    expect(rawTerms).not.toContain('the');
    expect(rawTerms).not.toContain('must');
    expect(rawTerms).not.toContain('have');
    expect(rawTerms).not.toContain('experience');
    expect(rawTerms).not.toContain('team');
  });

  it('extracts multi-word business phrases accurately', () => {
    const text =
      'Responsible for accounts payable, accounts receivable, inventory management, and customer service operations.';
    const keywords = extractKeywords(text);
    const displays = keywords.map((k) => k.displayTerm);

    expect(displays).toContain('Accounts Payable');
    expect(displays).toContain('Accounts Receivable');
    expect(displays).toContain('Inventory Management');
    expect(displays).toContain('Customer Service');
  });

  it('extracts Gulf-relevant phrases like warehouse operations and purchase orders', () => {
    const text = 'Oversee purchase orders, warehouse operations, and financial reporting across the UAE region.';
    const keywords = extractKeywords(text);
    const displays = keywords.map((k) => k.displayTerm);

    expect(displays).toContain('Purchase Orders');
    expect(displays).toContain('Warehouse Operations');
    expect(displays).toContain('Financial Reporting');
  });

  it('extracts preserved technical tokens like C++, Node.js, and Power BI', () => {
    const text = 'Must be proficient in C++, C#, Node.js, and Power BI dashboards';
    const keywords = extractKeywords(text);
    const displays = keywords.map((k) => k.displayTerm);

    expect(displays).toContain('C++');
    expect(displays).toContain('C#');
    expect(displays).toContain('Node.js');
    expect(displays).toContain('Power BI');
  });

  it('deduplicates keywords and counts frequency correctly', () => {
    const text = 'SQL database administration, SQL querying, and writing optimized SQL procedures.';
    const keywords = extractKeywords(text);
    const sqlItem = keywords.find((k) => k.displayTerm === 'SQL');

    expect(sqlItem).toBeDefined();
    expect(sqlItem?.frequency).toBeGreaterThanOrEqual(2);
  });
});
