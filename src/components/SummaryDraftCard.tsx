import React, { useState } from 'react';
import { Copy, Check, FileEdit, AlertCircle } from 'lucide-react';

interface SummaryDraftCardProps {
  draft: string;
}

export const SummaryDraftCard: React.FC<SummaryDraftCardProps> = ({ draft }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 card-print space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <FileEdit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Editable Summary Draft
            </h3>
            <span className="text-[11px] text-indigo-600 font-semibold uppercase tracking-wider">
              Generated strictly from provided CV keywords
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors self-start sm:self-auto"
          aria-label="Copy summary draft"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy Draft</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 text-sm text-slate-800 leading-relaxed font-sans italic">
        "{draft}"
      </div>

      <div className="flex items-start gap-2 text-[11px] text-slate-500">
        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
        <span>
          This draft uses only terms confirmed to exist in your CV and target job advert. Review and tailor it to accurately capture your personal tone and achievements before pasting into your CV.
        </span>
      </div>
    </div>
  );
};
