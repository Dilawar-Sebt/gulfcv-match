import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Calculator, ArrowRight, FileText, AlertTriangle } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
          <span>Algorithmic Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How GulfCV Match Computes Your Score
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          We believe job seekers deserve absolute honesty. There are no black-box generative hallucinations, secret paywalls, or arbitrary penalties. Here is the exact step-by-step logic and mathematical formula executed locally in your browser.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" />
            Try the Matching Engine
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Step by step Pipeline */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          The 4-Step Analysis Pipeline
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Client-Side Document Parsing & Validation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you upload a PDF or DOCX file, Mozilla's <code>pdfjs-dist</code> or <code>mammoth.js</code> executes directly within your browser runtime. Text streams are extracted into temporary memory. If a PDF is a scanned bitmap without text glyphs, our parser immediately warns you to use the manual paste fallback.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Token Normalization & Symbol Protection</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard punctuation strippers accidentally destroy critical technical terms (turning <code>C++</code> into <code>C</code>, or <code>Node.js</code> into <code>Node js</code>). GulfCV Match uses a token-protection dictionary that shields terms like <code>C++</code>, <code>C#</code>, <code>.NET</code>, <code>Node.js</code>, <code>Power BI</code>, and <code>Microsoft Excel</code> before normalizing case and whitespace.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Phrase Extraction & Stop-Word Filtering</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We extract high-value multi-word domain phrases (e.g., <em>Accounts Payable</em>, <em>Inventory Management</em>, <em>Customer Service</em>, <em>Financial Reporting</em>) and filter out generic recruitment boilerplate words like <em>candidate</em>, <em>responsibilities</em>, <em>experience</em>, and <em>looking</em>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs flex items-center justify-center font-bold">
                4
              </span>
              <span>Deterministic Overlap Calculation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every extracted job keyword is tested against the normalized CV text. We count occurrences and calculate exact ratios without rounding manipulation.
            </p>
          </div>
        </div>
      </section>

      {/* The Formula */}
      <section className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
        <div className="flex items-center gap-2 text-brand-300 text-sm font-semibold uppercase tracking-wider">
          <Calculator className="w-4 h-4" />
          The Mathematical Formula
        </div>
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 font-mono text-center text-sm sm:text-base text-emerald-400">
          Match Score (%) = round( ( Matched Terms ÷ Total Detected JD Terms ) × 100 )
        </div>
        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
          <li><strong>Numerator:</strong> The count of distinct extracted job description keywords present in your CV text.</li>
          <li><strong>Denominator:</strong> Total distinct relevant terms extracted from the job posting.</li>
          <li><strong>Bounds:</strong> Strictly clamped between 0% and 100%. If 0 JD terms are detected, score safely returns 0% with helpful guidance.</li>
        </ul>
      </section>

      {/* Limitations Disclaimer */}
      <section className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
        <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Important Limitations & Honest Advisory
        </h3>
        <p className="text-xs text-amber-900 leading-relaxed">
          Keyword matching is an indicator of terminology alignment, not an evaluation of human competence or leadership potential. A 100% keyword match does not guarantee an interview or job offer, nor does a low score mean you lack skills—it simply means the exact words in the advertisement were not found in your CV text.
        </p>
      </section>
    </div>
  );
};
