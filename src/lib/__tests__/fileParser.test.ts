import { describe, it, expect } from 'vitest';
import { validateCvFile } from '../fileParser';

describe('fileParser validation', () => {
  it('rejects null or missing file', () => {
    // @ts-expect-error testing invalid input
    const result = validateCvFile(null);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('No file was provided');
  });

  it('rejects empty files (0 bytes)', () => {
    const emptyFile = new File([], 'resume.pdf', { type: 'application/pdf' });
    const result = validateCvFile(emptyFile);

    expect(result.valid).toBe(false);
    expect(result.error).toContain('empty (0 bytes)');
  });

  it('rejects files larger than 5 MB', () => {
    // Create mock file with size > 5MB
    const largeContent = new Uint8Array(6 * 1024 * 1024);
    const largeFile = new File([largeContent], 'heavy_cv.pdf', { type: 'application/pdf' });
    const result = validateCvFile(largeFile);

    expect(result.valid).toBe(false);
    expect(result.error).toContain('exceeds the maximum allowed limit of 5 MB');
  });

  it('rejects unsupported extensions like .txt, .exe, or .png', () => {
    const txtFile = new File(['Some CV text'], 'cv.txt', { type: 'text/plain' });
    const txtResult = validateCvFile(txtFile);
    expect(txtResult.valid).toBe(false);
    expect(txtResult.error).toContain('Unsupported file extension');

    const imageFile = new File(['image-data'], 'scan.png', { type: 'image/png' });
    const imgResult = validateCvFile(imageFile);
    expect(imgResult.valid).toBe(false);
  });

  it('accepts valid PDF and DOCX files within size limits', () => {
    const validPdf = new File(['valid pdf content'], 'cv_john_doe.pdf', {
      type: 'application/pdf',
    });
    const pdfResult = validateCvFile(validPdf);
    expect(pdfResult.valid).toBe(true);
    expect(pdfResult.extension).toBe('.pdf');

    const validDocx = new File(['valid docx content'], 'resume_jane.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const docxResult = validateCvFile(validDocx);
    expect(docxResult.valid).toBe(true);
    expect(docxResult.extension).toBe('.docx');
  });
});
