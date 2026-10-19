import React from 'react';
import { MAX_JD_CHAR_LENGTH } from '../lib/constants';
import { Briefcase, AlertCircle } from 'lucide-react';

interface JobDescriptionSectionProps {
  jdText: string;
  onJdTextChange: (text: string) => void;
  error?: string;
}

export const JobDescriptionSection: React.FC<JobDescriptionSectionProps> = ({
  jdText,
  onJdTextChange,
  error,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <label htmlFor="jd-text-input" className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-900 text-white text-xs flex items-center justify-center font-bold">
              2
            </span>
            Paste Target Job Description
          </label>
          <p className="text-xs text-slate-500 mt-0.5">
            Copy the full job advert from LinkedIn, Bayt, Gulf Connexions, or employer career sites.
          </p>
        </div>
        <Briefcase className="w-5 h-5 text-slate-400 hidden sm:block" />
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{error}</div>
        </div>
      )}

      <div className="space-y-2">
        <textarea
          id="jd-text-input"
          value={jdText}
          onChange={(e) => onJdTextChange(e.target.value)}
          rows={8}
          maxLength={MAX_JD_CHAR_LENGTH}
          placeholder="Paste job description here (responsibilities, required skills, tools, qualifications)..."
          className="w-full text-sm text-slate-800 placeholder-slate-400 p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent font-sans resize-y"
        />
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Minimum 15 characters</span>
          <span>
            {jdText.length.toLocaleString()} / {MAX_JD_CHAR_LENGTH.toLocaleString()} characters
          </span>
        </div>
      </div>
    </div>
  );
};
