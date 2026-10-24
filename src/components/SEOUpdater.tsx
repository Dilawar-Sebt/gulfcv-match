import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteSEO {
  title: string;
  description: string;
}

const SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: 'GulfCV Match | Free Local-First CV & Job Description Keyword Matcher',
    description:
      'Free, 100% private browser-based CV keyword matcher for job seekers in the UAE, Saudi Arabia, Qatar, and Gulf region. Check ATS keyword overlap with zero server uploads.',
  },
  '/uae-cv-checker': {
    title: 'UAE & Dubai CV Format & ATS Optimization Guide | GulfCV Match',
    description:
      'Master UAE and Dubai CV standards: visa status, UAE driving license, free zone vs mainland hiring, and ATS keyword optimization.',
  },
  '/saudi-cv-checker': {
    title: 'Saudi Arabia CV & Vision 2030 ATS Optimization Guide | GulfCV Match',
    description:
      'Optimize your CV for Saudi Arabia job openings: Vision 2030 gigaprojects, Saudization (Nitaqat), SCE/SOCPA council registrations, and bilingual CV tips.',
  },
  '/cv-keyword-checker': {
    title: 'How CV Keyword Matching Actually Works in ATS Systems | GulfCV Match',
    description:
      'Understand how Applicant Tracking Systems (ATS) index keywords, avoid keyword stuffing penalties, and match job description terminology.',
  },
  '/how-it-works': {
    title: 'How GulfCV Match Computes Your Score (Algorithm & Formula) | GulfCV Match',
    description:
      'Transparent mathematical breakdown of our client-side text normalization, n-gram extraction, and deterministic keyword overlap formula.',
  },
  '/cv-tips': {
    title: 'High-Impact CV Writing Tips for the Gulf Job Market | GulfCV Match',
    description:
      'Action verbs, the Google XYZ impact formula, and formatting guidelines to maximize your interview conversion rate in the Gulf region.',
  },
  '/about': {
    title: 'About GulfCV Match | Zero-Server Privacy Career Utility',
    description:
      'Discover why GulfCV Match was built with a strict local-first, zero-server privacy architecture for job seekers across the GCC.',
  },
  '/contact': {
    title: 'Contact & Feedback | GulfCV Match',
    description:
      'Share feedback, suggest missing industry keywords, or ask questions about GulfCV Match.',
  },
  '/privacy': {
    title: 'Privacy Policy & Local-First Data Security | GulfCV Match',
    description:
      'Accurate explanation of 100% in-browser processing: zero server storage, zero cookies, and zero external AI transmission.',
  },
  '/terms': {
    title: 'Terms of Service (Beta Specification) | GulfCV Match',
    description:
      'Informational terms and legal notice for the GulfCV Match local-first career utility.',
  },
};

export const SEOUpdater: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = SEO_MAP[pathname] || SEO_MAP['/'];

    // Update document title for SERP and browser tabs
    document.title = seo.title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seo.description);

    // Update OpenGraph Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title);
    }

    // Update OpenGraph Description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', seo.description);
    }

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      'href',
      `https://gulfcv-match.vercel.app${pathname === '/' ? '' : pathname}`
    );
  }, [pathname]);

  return null;
};
