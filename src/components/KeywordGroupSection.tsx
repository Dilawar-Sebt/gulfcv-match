import React, { useState } from 'react';
import { KeywordCluster } from '../types';
import {
  Wrench,
  Briefcase,
  GraduationCap,
  Users,
  ShieldCheck,
  Check,
  X,
  Search,
  Layers,
  Sparkles,
} from 'lucide-react';

interface KeywordGroupSectionProps {
  clusters: KeywordCluster[];
}

export const KeywordGroupSection: React.FC<KeywordGroupSectionProps> = ({ clusters }) => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getClusterIcon = (id: string) => {
    switch (id) {
      case 'tools':
        return <Wrench className="w-4 h-4 text-blue-600" />;
      case 'domain':
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'certifications':
        return <GraduationCap className="w-4 h-4 text-purple-600" />;
      case 'soft_skills':
        return <Users className="w-4 h-4 text-amber-600" />;
      case 'compliance':
        return <ShieldCheck className="w-4 h-4 text-rose-600" />;
      default:
        return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  const filteredClusters = clusters
    .map((cluster) => {
      const filteredKeywords = cluster.keywords.filter((kw) =>
        kw.term.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      return {
        ...cluster,
        keywords: filteredKeywords,
      };
    })
    .filter((cluster) => {
      if (selectedClusterId !== 'all' && cluster.id !== selectedClusterId) return false;
      return cluster.keywords.length > 0;
    });

  const totalKeywordsCount = clusters.reduce((acc, c) => acc + c.totalCount, 0);
  const totalMatchedCount = clusters.reduce((acc, c) => acc + c.matchedCount, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 card-print">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-50 text-brand-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              JobSprout-Style Keyword Grouping & Skill Clusters
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Categorized breakdown of required competencies so you can pinpoint specific qualification gaps.
          </p>
        </div>

        {/* Global Cluster Stats */}
        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700">
            {clusters.length} Functional Clusters
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 font-bold text-emerald-800">
            {totalMatchedCount} / {totalKeywordsCount} Matched
          </span>
        </div>
      </div>

      {/* Cluster Navigation Chips */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedClusterId('all')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedClusterId === 'all'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Clusters ({clusters.length})</span>
        </button>

        {clusters.map((cluster) => {
          const isSelected = selectedClusterId === cluster.id;
          return (
            <button
              key={cluster.id}
              type="button"
              onClick={() => setSelectedClusterId(cluster.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-brand-900 text-white border-brand-900 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {getClusterIcon(cluster.id)}
              <span>{cluster.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  cluster.matchPercentage >= 70
                    ? isSelected
                      ? 'bg-emerald-400 text-slate-900 font-bold'
                      : 'bg-emerald-100 text-emerald-800'
                    : isSelected
                    ? 'bg-amber-300 text-slate-900 font-bold'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {cluster.matchPercentage}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter keywords across all clusters..."
          className="w-full text-xs text-slate-800 placeholder-slate-400 pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
      </div>

      {/* Grouped Cards View */}
      {filteredClusters.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          No keywords match your search query in this cluster.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClusters.map((cluster) => {
            return (
              <div
                key={cluster.id}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-3"
              >
                {/* Cluster Header & Meter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      {getClusterIcon(cluster.id)}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {cluster.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{cluster.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900">
                        {cluster.matchedCount} of {cluster.totalCount} found
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        {cluster.matchPercentage}% cluster coverage
                      </span>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden shrink-0">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          cluster.matchPercentage >= 70
                            ? 'bg-emerald-500'
                            : cluster.matchPercentage >= 40
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${cluster.matchPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Keywords Tag Grid */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {cluster.keywords.map((kw) => (
                    <div
                      key={kw.term}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        kw.matched
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {kw.matched ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span>{kw.term}</span>
                      {kw.frequencyInJd > 1 && (
                        <span
                          className="text-[10px] text-slate-400 font-mono"
                          title={`Mentioned ${kw.frequencyInJd} times in job description`}
                        >
                          ×{kw.frequencyInJd}
                        </span>
                      )}
                      {kw.matched ? (
                        <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-md font-mono">
                          In CV
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md font-mono">
                          Gap
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
