import React, { useState } from 'react';
import { KeywordMatch } from '../types';
import { Check, X, Search, AlertTriangle } from 'lucide-react';

interface KeywordListProps {
  matchedKeywords: KeywordMatch[];
  missingKeywords: KeywordMatch[];
  allKeywords: KeywordMatch[];
}

export const KeywordList: React.FC<KeywordListProps> = ({
  matchedKeywords,
  missingKeywords,
  allKeywords,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'matched' | 'missing'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const displayedKeywords = (
    activeTab === 'all'
      ? allKeywords
      : activeTab === 'matched'
      ? matchedKeywords
      : missingKeywords
  ).filter((k) => k.term.toLowerCase().includes(searchQuery.toLowerCase().trim()));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 card-print space-y-5">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Keyword & Phrase Breakdown
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare terminology extracted from the job posting against your CV text.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-brand-950 font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({allKeywords.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matched')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'matched'
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Matched ({matchedKeywords.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('missing')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'missing'
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Not in CV ({missingKeywords.length})
          </button>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Integrity Reminder:</strong> Terms listed as <em>"Not in CV"</em> represent words found in the job advertisement that were not detected in your CV text. Add a term only if it truthfully describes your authentic experience.
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter keywords by name..."
          className="w-full text-xs text-slate-800 placeholder-slate-400 pl-9 pr-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
      </div>

      {/* Keywords Grid */}
      {displayedKeywords.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          No terms matched your search filter.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 pt-1">
          {displayedKeywords.map((kw) => (
            <div
              key={kw.term}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                kw.matched
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {kw.matched ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              )}
              <span>{kw.term}</span>
              {kw.frequencyInJd > 1 && (
                <span className="text-[10px] text-slate-400 font-mono" title={`Mentioned ${kw.frequencyInJd} times in job advert`}>
                  ×{kw.frequencyInJd}
                </span>
              )}
              {kw.matched && kw.frequencyInCv > 0 && (
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded font-mono" title={`Found in CV ${kw.frequencyInCv} time(s)`}>
                  ✓ in CV
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
