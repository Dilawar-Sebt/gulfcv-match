import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import {
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from './constants';

// Configure pdfjs worker for Vite browser bundle if window is defined
if (typeof window !== 'undefined') {
  try {
    // In Vite, pdfjs worker can be loaded from cdn or bundled worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  } catch {
    // Fallback if cdn configuration is not required or in test
  }
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  extension?: string;
}

/**
 * Validates file size, extension, and MIME type according to PRD constraints.
 */
export function validateCvFile(file: File): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'No file was provided.' };
  }

  // 1. Check for empty file
  if (file.size === 0) {
    return {
      valid: false,
      error: 'The selected file is empty (0 bytes). Please choose a valid document.',
    };
  }

  // 2. Check maximum file size limit (5 MB)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size is ${sizeInMb} MB, which exceeds the maximum allowed limit of ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`,
    };
  }

  // 3. Check extension
  const parts = file.name.split('.');
  if (parts.length < 2) {
    return {
      valid: false,
      error: 'The file has no file extension. Only .pdf and .docx documents are supported.',
    };
  }

  const extension = '.' + parts.pop()!.toLowerCase();
  if (!ALLOWED_FILE_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `Unsupported file extension "${extension}". Please upload a PDF (.pdf) or Microsoft Word (.docx) document.`,
    };
  }

  // 4. Validate MIME type when present
  if (file.type) {
    const isAllowedMime = ALLOWED_MIME_TYPES.includes(file.type);
    const isGenericMime =
      file.type === 'application/octet-stream' || file.type === 'application/x-zip-compressed';

    if (!isAllowedMime && !isGenericMime) {
      if (
        file.type.startsWith('image/') ||
        file.type.startsWith('audio/') ||
        file.type.startsWith('video/')
      ) {
        return {
          valid: false,
          error: `Media files are not supported (${file.type}). Please select a standard PDF or Word document.`,
        };
      }
    }
  }

  return { valid: true, extension };
}

/**
 * Extracts plain text from a DOCX file using mammoth in the browser.
 */
export async function extractDocxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const rawText = result.value ? result.value.trim() : '';

  if (!rawText) {
    throw new Error(
      'No text could be extracted from this Word document. It may be empty or contain only non-text elements.'
    );
  }

  return rawText;
}

/**
 * Extracts plain text from a PDF file using pdfjs in the browser.
 */
export async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  const loadingTask = pdfjsLib.getDocument({
    data: uint8Array,
    useSystemFonts: true,
    isEvalSupported: false,
  });

  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  if (numPages === 0) {
    throw new Error('The PDF document contains no pages.');
  }

  const textPieces: string[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? (item as { str: string }).str : ''))
      .join(' ');

    if (pageText.trim()) {
      textPieces.push(pageText.trim());
    }
  }

  const fullText = textPieces.join('\n\n').trim();

  // Scanned/Image-only PDF check
  if (!fullText || fullText.length < 20) {
    throw new Error(
      'This PDF appears to be a scanned image or photo without extractable text. Please copy and paste your CV text manually using the "Paste CV Text" tab.'
    );
  }

  return fullText;
}

/**
 * High-level parser that validates and extracts text from either PDF or DOCX safely.
 */
export async function parseCvFile(file: File): Promise<string> {
  const validation = validateCvFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid file.');
  }

  try {
    if (validation.extension === '.docx') {
      return await extractDocxText(file);
    } else if (validation.extension === '.pdf') {
      return await extractPdfText(file);
    } else {
      throw new Error(`Unsupported file type: ${validation.extension}`);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      // Re-throw user-facing messages from our extraction checks
      if (
        err.message.includes('scanned image') ||
        err.message.includes('No text could be extracted') ||
        err.message.includes('contains no pages')
      ) {
        throw err;
      }
    }
    // Generic safe error message masking internal exceptions or stack traces
    throw new Error(
      'Unable to parse this document. The file may be password-protected, corrupted, or formatted in an unreadable structure. Please try pasting your text directly.'
    );
  }
}
