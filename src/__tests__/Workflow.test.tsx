import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

describe('CV Analysis Main User Workflow', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    window.print = vi.fn();
    window.history.pushState({}, '', '/');
  });

  it('validates empty inputs and shows error messages', async () => {
    render(<App />);

    const analyzeBtn = screen.getByRole('button', { name: /Analyze My CV/i });
    fireEvent.click(analyzeBtn);

    expect(
      screen.getByText(/Please select a valid PDF or DOCX file with extractable text, or switch to Paste Text/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please paste the target job description/i)
    ).toBeInTheDocument();
  });

  it('runs analysis successfully and displays score, keywords, and suggestions', async () => {
    render(<App />);

    // 1. Switch to Paste CV tab
    const pasteTabBtn = screen.getByRole('button', { name: /Paste Text/i });
    fireEvent.click(pasteTabBtn);

    const cvTextarea = screen.getByPlaceholderText(/Paste your CV text here/i);
    const jdTextarea = screen.getByPlaceholderText(/Paste job description here/i);

    const cvSample = `
      Professional Summary
      Senior Accountant with 8 years of experience in Dubai.
      Expert in accounts payable, VAT filing, bank reconciliation, and Microsoft Excel.

      Core Skills
      Accounts Payable, VAT Filing, Financial Reporting, General Ledger, Microsoft Excel

      Work Experience
      Lead Accountant - Gulf Trading LLC (2020 - Present)
      - Managed accounts payable workflow and submitted quarterly VAT returns with 100% compliance.
      - Increased reporting turnaround by 25% and saved 150k AED in annual audit overheads.

      Education
      Bachelor of Commerce in Accounting
    `;

    const jdSample = `
      We are hiring a Senior Accountant.
      Requirements:
      - Proficient in accounts payable, accounts receivable, and VAT filing
      - Experience with Microsoft Excel and financial reporting
      - Knowledge of inventory management is a plus
    `;

    fireEvent.change(cvTextarea, { target: { value: cvSample } });
    fireEvent.change(jdTextarea, { target: { value: jdSample } });

    const analyzeBtn = screen.getByRole('button', { name: /Analyze My CV/i });
    fireEvent.click(analyzeBtn);

    // Verify Results Dashboard appears
    await waitFor(() => {
      expect(screen.getByText(/(Analysis|GulfCV Match) Completed/i)).toBeInTheDocument();
      expect(screen.getByText(/Estimated Keyword Overlap Analysis/i)).toBeInTheDocument();
    });

    // Verify matched terms appear
    expect(screen.getAllByText(/Accounts Payable/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Microsoft Excel/i).length).toBeGreaterThan(0);

    // Verify evidence-based suggestions appear
    expect(
      screen.getAllByText(/Quantified results detected/i).length
    ).toBeGreaterThan(0);

    // Verify Print button calls window.print
    const printBtn = screen.getByRole('button', { name: /Print \/ Save PDF/i });
    fireEvent.click(printBtn);
    expect(window.print).toHaveBeenCalledTimes(1);
  });

  it('resets all state when Clear All is clicked', async () => {
    render(<App />);

    const pasteTabBtn = screen.getByRole('button', { name: /Paste Text/i });
    fireEvent.click(pasteTabBtn);

    const cvTextarea = screen.getByPlaceholderText(/Paste your CV text here/i);
    const jdTextarea = screen.getByPlaceholderText(/Paste job description here/i);

    fireEvent.change(cvTextarea, { target: { value: 'Valid test CV text with experience' } });
    fireEvent.change(jdTextarea, { target: { value: 'Valid target job description for testing' } });

    const clearAllBtn = screen.getByRole('button', { name: /Clear All/i });
    fireEvent.click(clearAllBtn);

    expect((cvTextarea as HTMLTextAreaElement).value).toBe('');
    expect((jdTextarea as HTMLTextAreaElement).value).toBe('');
    expect(screen.queryByText(/(Analysis|GulfCV Match) Completed/i)).not.toBeInTheDocument();
  });

  it('renders user text safely without executing HTML/script tags (XSS Prevention)', async () => {
    render(<App />);

    const pasteTabBtn = screen.getByRole('button', { name: /Paste Text/i });
    fireEvent.click(pasteTabBtn);

    const cvTextarea = screen.getByPlaceholderText(/Paste your CV text here/i);
    const jdTextarea = screen.getByPlaceholderText(/Paste job description here/i);

    const maliciousJd = '<script>window.__xss_flag = true;</script><b>Specialist in Cyber Security</b>';
    const safeCv = 'Experienced professional in Cyber Security';

    fireEvent.change(cvTextarea, { target: { value: safeCv } });
    fireEvent.change(jdTextarea, { target: { value: maliciousJd } });

    const analyzeBtn = screen.getByRole('button', { name: /Analyze My CV/i });
    fireEvent.click(analyzeBtn);

    await waitFor(() => {
      expect(screen.getByText(/(Analysis|GulfCV Match) Completed/i)).toBeInTheDocument();
    });

    // Script must NOT have executed
    // @ts-expect-error verifying window flag was not modified
    expect(window.__xss_flag).toBeUndefined();
  });
});
