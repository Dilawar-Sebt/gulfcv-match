import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Lock, Globe, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 no-print mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About & Privacy Promise */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg">GulfCV Match</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A private, local-first CV-to-job-description keyword matcher crafted for job seekers across the Gulf region.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero server uploads • Zero data retention</span>
            </div>
          </div>

          {/* Col 2: Country Guides */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-brand-400" /> Regional Guidance
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/uae-cv-checker" className="text-slate-400 hover:text-white transition-colors">
                  UAE & Dubai CV Format Guide
                </Link>
              </li>
              <li>
                <Link to="/saudi-cv-checker" className="text-slate-400 hover:text-white transition-colors">
                  Saudi Arabia & Vision 2030 Guide
                </Link>
              </li>
              <li>
                <Link to="/cv-tips" className="text-slate-400 hover:text-white transition-colors">
                  General Gulf CV Best Practices
                </Link>
              </li>
              <li>
                <Link to="/cv-keyword-checker" className="text-slate-400 hover:text-white transition-colors">
                  Keyword Optimization Demystified
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product & Transparency */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-3">
              Methodology & Tool
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-white transition-colors">
                  How Matching Works (Formula & Logic)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About GulfCV Match
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Use & Beta Notice
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Feedback & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Important Advisory */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wide">
              <AlertCircle className="w-4 h-4 shrink-0" /> Honest Career Advisory
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This tool provides a transparent, deterministic estimate of keyword overlap between your CV text and a job advert. It does not promise interviews, hiring outcomes, or official ATS validation.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} GulfCV Match. Free local career utility.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> In-Browser Execution
            </span>
            <span>•</span>
            <span>Client-Side Processing Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
