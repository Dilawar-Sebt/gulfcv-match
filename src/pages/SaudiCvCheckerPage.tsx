import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, CheckCircle2, ShieldAlert, ArrowRight, FileText, Award, Building, Sparkles } from 'lucide-react';

export const SaudiCvCheckerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Landmark className="w-3.5 h-3.5 text-emerald-600" />
          <span>Kingdom of Saudi Arabia (KSA) Career Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Saudi Arabia CV & ATS Optimization Guide (Vision 2030)
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          The Saudi job market is experiencing historic transformation driven by Vision 2030 gigaprojects in Riyadh, Jeddah, NEOM, and the Eastern Province. Learn how to tailor your CV to align with Saudi national regulations and corporate expectations.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" />
            Analyze CV for a Saudi Job Posting
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Critical Saudi Hiring Realities */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Key Requirements for Saudi Job Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Building className="w-5 h-5 text-emerald-700" />
              <span>1. Vision 2030 & Megaproject Vocabulary</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              If applying to PIF portfolio entities, NEOM, Red Sea Global, Diriyah, or Aramco contractors, echo their core values: sustainability, governance, digital transformation, and knowledge transfer to local teams.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Award className="w-5 h-5 text-brand-600" />
              <span>2. Professional Council Accreditations</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Saudi authorities mandate formal registration for regulated professions. State memberships upfront:
              <br />• <strong>SCE</strong> (Saudi Council of Engineers)
              <br />• <strong>SOCPA</strong> (Saudi Organization for Chartered Accountants)
              <br />• <strong>SCFHS</strong> (Health Specialties Commission)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>3. Iqama Transferability & Residency</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For expatriates already based in the Kingdom, clearly denote <em>"Transferable Iqama"</em> or <em>"Ready for Qiwa transfer"</em>. If applying from overseas, mention readiness for relocation to Riyadh, Jeddah, or regional sites.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>4. Bilingual Competency (English & Arabic)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              While English is the dominant corporate language in Riyadh's tech and finance hubs, bilingual fluency is a massive asset for legal, HR, government relations, and vendor coordination roles.
            </p>
          </div>
        </div>
      </section>

      {/* Saudization Context Note */}
      <section className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
        <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          Saudization (Nitaqat) & Candidate Positioning
        </h3>
        <p className="text-xs text-emerald-900 leading-relaxed">
          Under the Ministry of Human Resources and Social Development (MHRSD), companies maintain strict Saudization quotas.
        </p>
        <ul className="text-xs text-emerald-900/90 list-disc list-inside space-y-1">
          <li><strong>Saudi Nationals:</strong> Explicitly mention Saudi nationality in the header to streamline matching against quota-reserved roles.</li>
          <li><strong>Expatriate Candidates:</strong> Emphasize deep technical specialism, leadership in training junior Saudi personnel, and proven execution on complex industrial or digital initiatives.</li>
        </ul>
      </section>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-brand-950 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold">Benchmark Your CV for a Saudi Opportunity</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Compare your CV directly with job requirements from Riyadh, Jeddah, or Khobar adverts. Review matched terms and improvement suggestions locally in your browser.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm transition-colors shadow-md"
        >
          <FileText className="w-4 h-4" />
          Test My CV Now (Free)
        </Link>
      </div>
    </div>
  );
};
