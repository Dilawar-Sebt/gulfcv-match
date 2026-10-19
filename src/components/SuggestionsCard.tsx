import React from 'react';
import { SuggestionItem } from '../types';
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb, Check } from 'lucide-react';

interface SuggestionsCardProps {
  suggestions: SuggestionItem[];
}

export const SuggestionsCard: React.FC<SuggestionsCardProps> = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 card-print space-y-4">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Evidence-Based CV Feedback
            </h3>
            <p className="text-xs text-slate-500">
              Deterministic checks grounded strictly in your extracted plain text.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {suggestions.map((item) => {
          let badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
          let Icon = Lightbulb;

          if (item.severity === 'strength') {
            badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
            Icon = CheckCircle2;
          } else if (item.severity === 'improvement') {
            badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
            Icon = AlertTriangle;
          }

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
            >
              <div className="flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${badgeColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <span className="font-semibold text-slate-700">Observed evidence:</span>
                    <span>{item.evidence}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>Checks evaluate textual clarity and section presence without making assumptions about visual layout or fonts.</span>
      </div>
    </div>
  );
};
