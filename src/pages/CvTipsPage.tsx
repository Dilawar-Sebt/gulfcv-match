import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, TrendingUp, ArrowRight, FileText, Check } from 'lucide-react';

export const CvTipsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold">
          <Lightbulb className="w-3.5 h-3.5 text-brand-600" />
          <span>Professional Resume Writing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          High-Impact CV Writing Tips for the Gulf Job Market
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          In competitive hiring hubs like Dubai, Abu Dhabi, Riyadh, and Doha, hiring managers review hundreds of CVs per opening. Here is how to structure your resume for maximum clarity and interview conversion.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" />
            Test Your CV Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Tip 1: The Google XYZ Formula */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-brand-900 font-bold text-lg">
          <TrendingUp className="w-5 h-5 text-brand-600" />
          <span>1. Use the "Accomplished [X] by doing [Z], resulting in [Y]" Formula</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Weak bullet points describe passive tasks. High-impact bullet points demonstrate active business results.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
            <span className="font-bold text-rose-700">❌ Passive Task Description:</span>
            <p>"Responsible for managing inventory and purchase orders across the warehouse."</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-bold text-emerald-700">✅ Measurable Business Impact:</span>
            <p>"Streamlined warehouse inventory operations, reducing order fulfillment discrepancies by 22% and saving 180,000 AED annually."</p>
          </div>
        </div>
      </section>

      {/* Tip 2: High-Power Action Verbs */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          2. Replace Overused Buzzwords with Decisive Action Verbs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">Leadership & Strategy</div>
            <p className="text-slate-600">Spearheaded, Orchestrated, Mobilized, Pioneered, Directed</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">Technical & Execution</div>
            <p className="text-slate-600">Engineered, Implemented, Deployed, Automated, Architected</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">Efficiency & Optimization</div>
            <p className="text-slate-600">Accelerated, Consolidated, Optimized, Curtailed, Yielded</p>
          </div>
        </div>
      </section>

      {/* Tip 3: Formatting & Length Standards */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          3. Ideal Page Count & Structural Best Practices
        </h2>
        <ul className="text-xs text-slate-600 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>1 to 2 Pages Maximum:</strong> Mid-level candidates should aim for 2 clean pages. Single-column layouts parse best in ATS engines.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Avoid Tables & Multi-Column Textboxes:</strong> Many PDF parsers read tables left-to-right across columns, jumbling dates with company titles.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Standard Section Headings:</strong> Stick to standard terms like <em>"Work Experience"</em>, <em>"Education"</em>, and <em>"Core Skills"</em> rather than creative variations.</span>
          </li>
        </ul>
      </section>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-brand-950 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold">Audit Your CV with GulfCV Match</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Test your CV against your target job listing right now to identify missing keywords and check section readability.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm transition-colors shadow-md"
        >
          <FileText className="w-4 h-4" />
          Start Free CV Analysis
        </Link>
      </div>
    </div>
  );
};
