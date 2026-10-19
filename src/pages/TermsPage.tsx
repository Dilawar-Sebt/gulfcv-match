import React from 'react';
import { Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-amber-600" />
          <span>Informational Legal Notice (Local Development Beta)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Please review these informational terms governing the use of GulfCV Match. This document is provided as a plain-language specification for local development and must be reviewed by legal counsel before any public commercial deployment.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">1. Nature of the Service</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            GulfCV Match is a free, local-first keyword comparison utility. It compares plain text extracted from a user-supplied CV against terms extracted from a user-supplied job description. It is provided strictly for educational and self-inspection purposes.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">2. No Guarantee of Employment or ATS Acceptance</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            GulfCV Match does not guarantee job placement, interview invitations, hiring success, or pass-through rates with any third-party employer, recruitment agency, or Applicant Tracking System (such as Taleo, Workday, SAP, or Greenhouse). Match percentages represent simple text-overlap calculations and do not signify professional endorsement.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">3. User Responsibility & Ethical Use</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Users agree that all representations made on their CVs remain their sole legal and ethical responsibility. Missing keywords surfaced by GulfCV Match should only be added to a CV if they truthfully reflect the user's authentic qualifications, skills, and work history. GulfCV Match explicitly discourages the falsification of credentials or deceptive keyword stuffing.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">4. Disclaimer of Warranties & Limitation of Liability</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            The service is provided on an "as-is" and "as-available" basis without warranties of any kind. Under no circumstances shall the creators of GulfCV Match be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this software.
          </p>
        </section>
      </div>

      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 italic">
        * Status: Beta document draft prepared for local development compliance. Prior to public domain registration and deployment, formal legal review must be completed.
      </div>
    </div>
  );
};
