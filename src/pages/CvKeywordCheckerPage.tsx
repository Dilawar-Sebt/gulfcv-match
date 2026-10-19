import React from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, CheckCircle2, XCircle, ArrowRight, FileText } from 'lucide-react';

export const CvKeywordCheckerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold">
          <KeyRound className="w-3.5 h-3.5 text-brand-600" />
          <span>Demystifying ATS Algorithms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How CV Keyword Matching Actually Works
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Applicant Tracking Systems (ATS) are essentially search engines and database filters used by HR teams to manage hundreds of applicants. Here is what really happens behind the scenes.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" />
            Check Your Keywords Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Myths vs Reality */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          ATS Myths vs. Industry Reality
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Myth 1: "The ATS automatically rejects 75% of CVs"</span>
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              In reality, human recruiters review search results. The ATS parses documents into plain text and allows recruiters to filter applicants using specific keyword queries (e.g. <em>"Python AND Docker"</em> or <em>"VAT AND Accounts Payable"</em>). If your CV lacks the exact term, you simply don't show up in their search filter.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Myth 2: "White text keyword stuffing beats the system"</span>
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              Hiding invisible text in 1pt white font is quickly flagged. Modern ATS tools convert files into monochrome plain text where hidden text appears as an unformatted block at the bottom, immediately exposing manipulation to the recruiter.
            </p>
          </div>
        </div>
      </section>

      {/* Practical Keyword Best Practices */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          3 Best Practices for Keyword Optimization
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Include Both Acronyms and Full Expressions</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recruiters may search for either the abbreviation or the spelled-out name. Always pair them on first mention:
              <br />• <em>"Search Engine Optimization (SEO)"</em>
              <br />• <em>"Project Management Professional (PMP)"</em>
              <br />• <em>"Enterprise Resource Planning (ERP - SAP / Oracle)"</em>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. Contextual Integration Over Blind Repetition</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Do not just list keywords in a comma-separated blob. Weave them into contextual achievement statements. For example, instead of merely writing <em>"Inventory Management"</em>, write: <em>"Directed inventory management operations across 3 regional fulfillment centers, reducing discrepancy rates by 14%."</em>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. Protect Technical Punctuation in Formatting</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ensure terms like <code>C++</code>, <code>C#</code>, <code>Node.js</code>, and <code>Power BI</code> are not obscured by decorative graphic icons that plain text extractors fail to capture.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-brand-950 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold">See How Your Keywords Measure Up</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Use our deterministic matching engine to find out exactly which terms from your target job posting are present in your CV and which ones might be missing.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm transition-colors shadow-md"
        >
          <KeyRound className="w-4 h-4" />
          Test My CV Keywords Now
        </Link>
      </div>
    </div>
  );
};
