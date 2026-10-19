import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, FileText, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'CV Matcher', path: '/' },
    { label: 'UAE CV Guide', path: '/uae-cv-checker' },
    { label: 'Saudi CV Guide', path: '/saudi-cv-checker' },
    { label: 'Keywords Guide', path: '/cv-keyword-checker' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'CV Tips', path: '/cv-tips' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
            aria-label="GulfCV Match Home"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-900 text-white flex items-center justify-center font-bold shadow-sm">
              <FileText className="w-5 h-5 text-brand-300" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-brand-950 flex items-center gap-1.5">
                GulfCV <span className="text-brand-600 font-semibold">Match</span>
              </span>
              <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider -mt-1">
                Local-First ATS Overlap
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  isActive(link.path)
                    ? 'text-brand-900 bg-brand-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Privacy Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>In-Browser Privacy: No File Uploaded</span>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="mb-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Local-First: Your CV never leaves your browser.</span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'text-brand-900 bg-brand-50 font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
            <span>UAE • KSA • Qatar • Kuwait • Oman • Bahrain</span>
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          </div>
        </div>
      )}
    </header>
  );
};
