import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SEOUpdater } from './components/SEOUpdater';
import { HomePage } from './pages/HomePage';
import { UaeCvCheckerPage } from './pages/UaeCvCheckerPage';
import { SaudiCvCheckerPage } from './pages/SaudiCvCheckerPage';
import { CvKeywordCheckerPage } from './pages/CvKeywordCheckerPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { CvTipsPage } from './pages/CvTipsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SEOUpdater />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-100 selection:text-brand-900">
        <Navbar />
        <main className="flex-1 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/uae-cv-checker" element={<UaeCvCheckerPage />} />
            <Route path="/saudi-cv-checker" element={<SaudiCvCheckerPage />} />
            <Route path="/cv-keyword-checker" element={<CvKeywordCheckerPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/cv-tips" element={<CvTipsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
