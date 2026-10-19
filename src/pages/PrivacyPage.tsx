import React from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff, Cpu, AlertCircle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Local-First Data Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy & Data Security
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Most websites treat privacy as an afterthought. GulfCV Match was built from the very first line of code with a strict <strong>Zero-Server Architecture</strong>. Here is our exact technical commitment to how your data is handled.
        </p>
      </div>

      {/* Core Privacy Pillars */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Our 4 Technical Privacy Guarantees
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <ServerOff className="w-5 h-5 text-emerald-600" />
              <span>1. Zero Server Uploads</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you paste text or upload a PDF/DOCX file, the file is read directly in your browser's JavaScript engine (using <code>pdfjs-dist</code> and <code>mammoth.js</code>). No network request is initiated. Your file never crosses the internet to any backend or cloud server.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Lock className="w-5 h-5 text-brand-600" />
              <span>2. No Persistent Storage</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We do not save your CV text, job description, or analysis results to <code>localStorage</code>, <code>sessionStorage</code>, <code>IndexedDB</code>, or browser cookies. Once you close your browser tab or click <strong>Clear All</strong>, all extracted text is immediately purged from RAM.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <EyeOff className="w-5 h-5 text-indigo-600" />
              <span>3. No AI API Data Sharing</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We do not stream your CV text to OpenAI, Anthropic, Google Gemini, or any third-party model provider. Our matching algorithm is 100% deterministic local JavaScript arithmetic.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Cpu className="w-5 h-5 text-amber-600" />
              <span>4. No User Tracking or Analytics on CVs</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We do not track, index, scrape, or log CV text or personal identifiers (names, emails, phone numbers). The developer cannot view your uploaded resumes.
            </p>
          </div>
        </div>
      </section>

      {/* Honest Device Security Reality */}
      <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-slate-600" />
          Honest Security Disclosure: Device-Level Risks
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          While in-browser execution completely eliminates network transmission vulnerabilities, it cannot protect you against malware, spyware, keyloggers, or malicious browser extensions installed on your personal device. Always ensure you run a secure browser and trusted extensions when working with sensitive personal documents.
        </p>
      </section>
    </div>
  );
};
