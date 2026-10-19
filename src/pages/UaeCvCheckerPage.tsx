import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, AlertTriangle, ArrowRight, FileText, Globe, Building2, Car } from 'lucide-react';

export const UaeCvCheckerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>UAE Job Market CV Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          UAE & Dubai CV Format & Keyword Optimization Guide
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          The UAE job market (Dubai, Abu Dhabi, Sharjah, and Free Zones) receives tens of thousands of international applications each week. Understanding local hiring conventions and ATS filtering gives your application clarity and impact.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" />
            Check My CV Against a UAE Job Advert
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* UAE Specific Hiring Realities */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          5 Unique Realities of the UAE Job Market
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Globe className="w-5 h-5 text-brand-600" />
              <span>1. Current Visa Status Transparency</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike Western markets where visa inquiries can be restricted during early screening, UAE recruiters prioritize immediate availability. Explicitly state your visa status in your header: e.g., <em>"Residence Visa (Transferable)"</em>, <em>"Golden Visa"</em>, <em>"Visit/Tourist Visa (Valid until Dec 2026)"</em>, or <em>"Spouse Visa"</em>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <span>2. Free Zone vs. Mainland Context</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hiring protocols vary between DIFC, ADGM, DMCC, Dubai Media City, and mainland Dubai/Abu Dhabi. If applying to mainland firms subject to Emiratisation quotas, emphasize your cross-functional capability in mentoring national team members.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Car className="w-5 h-5 text-amber-600" />
              <span>3. UAE Driving License Mention</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For client-facing, sales, engineering, logistics, and real estate roles in Dubai and Abu Dhabi, holding a <strong>valid UAE driving license</strong> is a common non-negotiable requirement. State it prominently if you hold one.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>4. Currency & Metric Alignment (AED)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quantify budgets, revenue targets, and cost reductions in <strong>AED (Arab Emirates Dirham)</strong> or USD equivalent. UAE hiring managers value demonstrable commercial scale.
            </p>
          </div>
        </div>
      </section>

      {/* Should You Include a Photo in UAE? */}
      <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          The Photo Dilemma in UAE CVs: What to Do?
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          In the UAE, hospitality, luxury retail, and front-desk roles frequently request a professional headshot. However, for <strong>Technology, Finance, Engineering, and Multinational Corporations (MNCs)</strong>, modern recruiters strongly recommend text-first, photo-less CVs.
        </p>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <p className="font-semibold text-slate-900">Why photos can hurt ATS parsing:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Many enterprise ATS tools (Taleo, Workday, Greenhouse) misalign columns when photos occupy text zones.</li>
            <li>Embedded graphics increase file size and can trigger upload warnings.</li>
            <li>Western multinational hiring committees in Dubai increasingly reject CVs with photos to prevent unconscious bias.</li>
          </ul>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-brand-950 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold">Ready to Benchmark Your CV for a UAE Role?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Paste your target Dubai or Abu Dhabi job advert and see instant keyword match percentages, missing requirements, and readability recommendations.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm transition-colors shadow-md"
        >
          <FileText className="w-4 h-4" />
          Open Free CV Matcher
        </Link>
      </div>
    </div>
  );
};
