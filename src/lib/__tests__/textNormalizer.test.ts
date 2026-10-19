import { describe, it, expect } from 'vitest';
import {
  normalizeText,
  restoreTokenDisplay,
  containsCanonicalToken,
} from '../textNormalizer';

describe('textNormalizer', () => {
  it('returns empty string for empty or whitespace-only input', () => {
    expect(normalizeText('')).toBe('');
    expect(normalizeText('   ')).toBe('');
    expect(normalizeText('\t\n  ')).toBe('');
  });

  it('normalizes case and multiple whitespaces', () => {
    const raw = '   Senior    Software   DEVELOPER  ';
    expect(normalizeText(raw)).toBe('senior software developer');
  });

  it('preserves special programming and business tokens like C++, C#, and Node.js', () => {
    const input = 'Looking for C++, C#, and Node.js with .NET experience';
    const normalized = normalizeText(input);

    expect(normalized).toContain('__token_cpp__');
    expect(normalized).toContain('__token_csharp__');
    expect(normalized).toContain('__token_nodejs__');
    expect(normalized).toContain('__token_dotnet__');
  });

  it('preserves tools like Power BI and MS Excel', () => {
    const input = 'Advanced in Power BI and Microsoft Excel reporting';
    const normalized = normalizeText(input);

    expect(normalized).toContain('__token_powerbi__');
    expect(normalized).toContain('__token_msexcel__');
  });

  it('restores special token canonical placeholders to their display format', () => {
    expect(restoreTokenDisplay('__token_cpp__')).toBe('C++');
    expect(restoreTokenDisplay('__token_csharp__')).toBe('C#');
    expect(restoreTokenDisplay('__token_nodejs__')).toBe('Node.js');
    expect(restoreTokenDisplay('__token_powerbi__')).toBe('Power BI');
    expect(restoreTokenDisplay('Marketing')).toBe('Marketing');
  });

  it('correctly tests token presence using containsCanonicalToken', () => {
    const text = 'Expert in C++ and building low latency systems';
    expect(containsCanonicalToken(text, '__TOKEN_CPP__')).toBe(true);
    expect(containsCanonicalToken(text, '__TOKEN_CSHARP__')).toBe(false);
  });
});
