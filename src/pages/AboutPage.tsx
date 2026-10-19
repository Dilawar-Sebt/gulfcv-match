import React from 'react';
import { Link } from 'react-router-dom';
import { Info, HeartHandshake, Eye, FileText, Check } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold">
          <Info className="w-3.5 h-3.5 text-brand-600" />
          <span>Our Mission & Principles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About GulfCV Match
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          GulfCV Match was engineered to solve a common frustration faced by job seekers across the Gulf: submitting applications into corporate applicant tracking systems without knowing whether their CV actually reflects the required terminology.
        </p>
      </div>

      {/* Why Local-First Matters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Why We Built It Local-First
        </h2>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <p className="text-sm text-slate-700 leading-relaxed">
            Your CV is one of the most sensitive personal documents you possess. It contains your legal name, contact numbers, email address, physical location, career trajectory, and educational history.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Most online "resume review" tools silently upload your CV to distant cloud servers, log your text, or route it through third-party AI APIs. GulfCV Match takes the opposite approach: <strong>100% of text parsing, keyword extraction, and score calculation executes on your own device inside your web browser</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Zero server storage</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>No user accounts or logins</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Zero cookies or data logging</span>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Promises */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Our Honest Guarantees
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-600" />
              <span>No Fake Data or Ads</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never fabricate results, display fake user testimonials, or sell deceptive "99% ATS Pass Rate" promises. The score you see is the mathematical overlap of the actual text you provided.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-indigo-600" />
              <span>Free Public Utility</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              GulfCV Match is provided as a transparent, free utility to help professionals in the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman put their best foot forward.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-brand-950 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold">Try GulfCV Match Right Now</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          No sign-up required. Compare your resume against your dream job advert in seconds.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm transition-colors shadow-md"
        >
          <FileText className="w-4 h-4" />
          Launch Free Tool
        </Link>
      </div>
    </div>
  );
};
