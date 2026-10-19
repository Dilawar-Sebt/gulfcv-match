import React from 'react';
import { MatchScoreDetails } from '../types';
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface ScoreGaugeProps {
  scoreDetails: MatchScoreDetails;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ scoreDetails }) => {
  const { percentage, matchedKeywordsCount, totalJdKeywords, formulaDescription } = scoreDetails;

  // Determine color and contextual tone
  let strokeColor = '#3b82f6'; // blue default
  let badgeBg = 'bg-blue-50 text-blue-700 border-blue-200';
  let ratingLabel = 'Moderate Overlap';
  let RatingIcon = Info;

  if (percentage >= 75) {
    strokeColor = '#10b981'; // emerald
    badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    ratingLabel = 'Strong Keyword Overlap';
    RatingIcon = CheckCircle2;
  } else if (percentage >= 50) {
    strokeColor = '#2563eb'; // royal blue
    badgeBg = 'bg-blue-50 text-blue-800 border-blue-200';
    ratingLabel = 'Moderate Keyword Overlap';
    RatingIcon = Info;
  } else if (percentage >= 30) {
    strokeColor = '#f59e0b'; // amber
    badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
    ratingLabel = 'Partial Keyword Overlap';
    RatingIcon = AlertTriangle;
  } else {
    strokeColor = '#ef4444'; // rose/red
    badgeBg = 'bg-rose-50 text-rose-800 border-rose-200';
    ratingLabel = 'Low Keyword Overlap';
    RatingIcon = AlertCircle;
  }

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 card-print">
      <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
        {/* Left: Gauge Circle */}
        <div className="relative flex flex-col items-center justify-center shrink-0">
          <svg
            className="w-40 h-40 transform -rotate-90"
            viewBox="0 0 160 160"
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Keyword match score: ${percentage}%`}
          >
            {/* Background Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#e2e8f0"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Progress Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={strokeColor}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {percentage}%
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Match Score
            </span>
          </div>
        </div>

        {/* Right: Breakdown & Formula Details */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badgeBg}`}
            >
              <RatingIcon className="w-3.5 h-3.5" />
              {ratingLabel}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Based on {totalJdKeywords} detected requirements
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Estimated Keyword Overlap Analysis
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Your CV text contains{' '}
              <strong className="text-slate-900 font-semibold">{matchedKeywordsCount}</strong> of the{' '}
              <strong className="text-slate-900 font-semibold">{totalJdKeywords}</strong> skills and
              terms identified in the job advert.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono">
            <div className="font-semibold text-slate-700 font-sans mb-1 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-brand-600" /> Transparent Math:
            </div>
            {formulaDescription}
          </div>

          <p className="text-[11px] text-slate-400 italic">
            * Note: This is an exact text-overlap calculation, not an official ATS ranking or employment guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};
