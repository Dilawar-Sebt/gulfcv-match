import React, { useRef, useState } from 'react';
import { CvInputMode } from '../types';
import { MAX_FILE_SIZE_MB, MAX_CV_CHAR_LENGTH } from '../lib/constants';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, ClipboardList } from 'lucide-react';

interface CvInputSectionProps {
  mode: CvInputMode;
  onModeChange: (mode: CvInputMode) => void;
  cvText: string;
  onCvTextChange: (text: string) => void;
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  isParsingFile: boolean;
  error?: string;
}

export const CvInputSection: React.FC<CvInputSectionProps> = ({
  mode,
  onModeChange,
  cvText,
  onCvTextChange,
  selectedFile,
  onFileSelect,
  onFileRemove,
  isParsingFile,
  error,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
      {/* Header and Input Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <label htmlFor="cv-text-input" className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-900 text-white text-xs flex items-center justify-center font-bold">
              1
            </span>
            Provide Your CV
          </label>
          <p className="text-xs text-slate-500 mt-0.5">
            Parsed 100% in your browser. Maximum file size: {MAX_FILE_SIZE_MB}MB.
          </p>
        </div>

        {/* Tab switch */}
        <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs font-medium">
          <button
            type="button"
            onClick={() => onModeChange('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              mode === 'upload'
                ? 'bg-white text-brand-950 font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => onModeChange('paste')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              mode === 'paste'
                ? 'bg-white text-brand-950 font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            Paste Text
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{error}</div>
        </div>
      )}

      {/* Mode 1: File Upload */}
      {mode === 'upload' && (
        <div className="space-y-3">
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragOver
                  ? 'border-brand-500 bg-brand-50/50'
                  : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileInputChange}
                className="hidden"
                id="cv-file-upload"
              />
              <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Click to browse or drop your CV file here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports standard PDF (.pdf) and Word (.docx) up to {MAX_FILE_SIZE_MB}MB
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB •{' '}
                    {isParsingFile ? (
                      <span className="text-brand-600 font-medium">Extracting text...</span>
                    ) : (
                      <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Ready for analysis
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onFileRemove}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                title="Remove file"
                aria-label="Remove uploaded file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Fallback tip for scanned PDFs */}
          <p className="text-[11px] text-slate-400 leading-normal">
            Note: Image-only scans cannot be read by browser text extractors. If your document is scanned, please switch to <strong>Paste Text</strong>.
          </p>
        </div>
      )}

      {/* Mode 2: Paste Text */}
      {mode === 'paste' && (
        <div className="space-y-2">
          <textarea
            id="cv-text-input"
            value={cvText}
            onChange={(e) => onCvTextChange(e.target.value)}
            rows={8}
            maxLength={MAX_CV_CHAR_LENGTH}
            placeholder="Paste your CV text here (e.g. Summary, Work Experience, Skills, Education)..."
            className="w-full text-sm text-slate-800 placeholder-slate-400 p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent font-sans resize-y"
          />
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Minimum 15 characters</span>
            <span>
              {cvText.length.toLocaleString()} / {MAX_CV_CHAR_LENGTH.toLocaleString()} characters
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
