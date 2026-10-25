import React, { useState, useRef } from 'react';
import { CvInputMode, AnalysisResult } from '../types';
import { CvInputSection } from '../components/CvInputSection';
import { JobDescriptionSection } from '../components/JobDescriptionSection';
import { ScoreGauge } from '../components/ScoreGauge';
import { KeywordGroupSection } from '../components/KeywordGroupSection';
import { SmartTailoringCard } from '../components/SmartTailoringCard';
import { KeywordList } from '../components/KeywordList';
import { SuggestionsCard } from '../components/SuggestionsCard';
import { SummaryDraftCard } from '../components/SummaryDraftCard';
import { PrintReportView } from '../components/PrintReportView';
import { parseCvFile } from '../lib/fileParser';
import { calculateMatch } from '../lib/matcher';
import { groupKeywords, generateTailoringTips } from '../lib/keywordGrouping';
import { generateSuggestions } from '../lib/suggestionsEngine';
import { MIN_INPUT_CHAR_LENGTH } from '../lib/constants';
import {
  Sparkles,
  Printer,
  RotateCcw,
  RefreshCw,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileSearch,
  Lock,
  Layers,
  ChevronDown,
  HelpCircle,
  Award,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Input states
  const [cvMode, setCvMode] = useState<CvInputMode>('upload');
  const [cvText, setCvText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedFileText, setExtractedFileText] = useState('');
  const [jdText, setJdText] = useState('');

  // Execution states
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cvError, setCvError] = useState<string | undefined>();
  const [jdError, setJdError] = useState<string | undefined>();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const resultsRef = useRef<HTMLDivElement>(null);

  // File selection and parsing handler
  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setCvError(undefined);
    setIsParsingFile(true);
    setExtractedFileText('');

    try {
      const text = await parseCvFile(file);
      setExtractedFileText(text);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setCvError(err.message);
      } else {
        setCvError('An unexpected error occurred while reading the document.');
      }
      setSelectedFile(null);
    } finally {
      setIsParsingFile(false);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setExtractedFileText('');
    setCvError(undefined);
  };

  // Main Analysis trigger
  const handleAnalyze = () => {
    // Prevent accidental double submission
    if (isAnalyzing || isParsingFile) return;

    let hasValidationError = false;
    setCvError(undefined);
    setJdError(undefined);

    // 1. Resolve effective CV text
    const effectiveCvText = cvMode === 'upload' ? extractedFileText : cvText;

    if (!effectiveCvText || effectiveCvText.trim().length < MIN_INPUT_CHAR_LENGTH) {
      setCvError(
        cvMode === 'upload'
          ? 'Please select a valid PDF or DOCX file with extractable text, or switch to Paste Text.'
          : 'Please paste your CV text (minimum 15 characters required).'
      );
      hasValidationError = true;
    }

    // 2. Validate Job Description
    if (!jdText || jdText.trim().length < MIN_INPUT_CHAR_LENGTH) {
      setJdError('Please paste the target job description (minimum 15 characters required).');
      hasValidationError = true;
    }

    if (hasValidationError) return;

    setIsAnalyzing(true);

    try {
      // Deterministic matching
      const matchResult = calculateMatch(effectiveCvText, jdText);

      // JobSprout-style Keyword Grouping into Semantic Clusters
      const keywordClusters = groupKeywords(matchResult.allKeywords);

      // JobSprout-style Smart Tailoring & Rewrite Tips
      const tailoringTips = generateTailoringTips(keywordClusters);

      // Suggestions & section detection
      const { suggestions, sections, summaryDraft } = generateSuggestions(
        effectiveCvText,
        matchResult.matchedKeywords,
        matchResult.missingKeywords
      );

      const finalAnalysis: AnalysisResult = {
        scoreDetails: matchResult.scoreDetails,
        matchedKeywords: matchResult.matchedKeywords,
        missingKeywords: matchResult.missingKeywords,
        allKeywords: matchResult.allKeywords,
        keywordClusters,
        tailoringTips,
        suggestions,
        detectedSections: sections,
        summaryDraft,
        analyzedAt: new Date().toISOString(),
      };

      setResult(finalAnalysis);

      // Smooth scroll to results
      setTimeout(() => {
        if (typeof resultsRef.current?.scrollIntoView === 'function') {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch {
      setCvError('An error occurred during analysis. Please check your input and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset / Clear All (strictly purges all memory)
  const handleClearAll = () => {
    setCvText('');
    setSelectedFile(null);
    setExtractedFileText('');
    setJdText('');
    setCvError(undefined);
    setJdError(undefined);
    setResult(null);
  };

  // Analyze Another Job (preserves CV text while resetting JD and results)
  const handleAnalyzeAnotherJob = () => {
    setJdText('');
    setJdError(undefined);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const faqs = [
    {
      q: 'What is GulfCV Match and how does it work?',
      a: 'GulfCV Match is a free, local-first web utility built to compare your CV against target job descriptions for positions in the UAE, Saudi Arabia, Qatar, and the wider Gulf. It extracts keywords, clusters them into functional groups (Tools, Domain, Certifications, Soft Skills, and Regional Compliance), and gives you an exact text-overlap percentage without sending your data to any server.',
    },
    {
      q: 'How does GulfCV Match replicate JobSprout-style keyword grouping?',
      a: 'Like modern AI career platforms such as JobSprout, GulfCV Match does not simply count isolated words. It groups requirements into thematic skill clusters (such as Software Tools, Functional Expertise, and Certifications) and generates actionable STAR-format bullet point tailoring tips to help you fill gaps naturally.',
    },
    {
      q: 'Is GulfCV Match 100% free with no hidden subscriptions?',
      a: 'Yes! GulfCV Match is completely free. There are no paid credits, no subscriptions, no premium paywalls, and no credit card required. You get unlimited CV scans and unlimited PDF report exports.',
    },
    {
      q: 'Does GulfCV Match upload or store my personal resume data?',
      a: 'Never. GulfCV Match is built with a strict Zero-Server architecture. Your PDF or DOCX file is processed entirely in your web browser RAM using client-side WebAssembly and JavaScript. When you close your browser tab or click Clear All, your data is wiped permanently.',
    },
    {
      q: 'Can GulfCV Match optimize CVs for UAE and Saudi Arabia ATS systems?',
      a: 'Yes! We have built-in regional knowledge covering UAE visa statuses, UAE driving licenses, Saudi Vision 2030 keywords, Saudization (Nitaqat), and professional registrations like SCE (Saudi Council of Engineers) and SOCPA.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section - Optimized for "GulfCV Match" SERP Ranking */}
      <section className="text-center space-y-5 max-w-3xl mx-auto px-4 pt-6 no-print">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold shadow-2xs">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>GulfCV Match • Smart ATS Resume Matcher & Keyword Grouping</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          GulfCV Match: Free Local-First <span className="text-brand-600">CV & Job Description Matcher</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Instantly benchmark your CV against target job advertisements in Dubai, Abu Dhabi, Riyadh, and Doha. Powered by intelligent keyword grouping, regional Gulf compliance checks, and 100% in-browser privacy.
        </p>

        {/* Quick Highlights */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> 100% Client-Side Privacy
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-indigo-600" /> JobSprout Keyword Grouping
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-brand-600" /> Instant Match Percentage
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Always 100% Free
          </span>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="form-section max-w-5xl mx-auto px-4 space-y-6 no-print" aria-label="CV Analysis Form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: CV Input */}
          <CvInputSection
            mode={cvMode}
            onModeChange={setCvMode}
            cvText={cvText}
            onCvTextChange={setCvText}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            isParsingFile={isParsingFile}
            error={cvError}
          />

          {/* Column 2: Job Description Input */}
          <JobDescriptionSection
            jdText={jdText}
            onJdTextChange={setJdText}
            error={jdError}
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || isParsingFile}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing with GulfCV Match...
              </>
            ) : isParsingFile ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Extracting Document...
              </>
            ) : (
              <>
                <FileSearch className="w-5 h-5" />
                Analyze My CV with GulfCV Match
              </>
            )}
          </button>

          {(cvText || selectedFile || jdText || result) && (
            <button
              type="button"
              onClick={handleClearAll}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              Clear All
            </button>
          )}
        </div>
      </section>

      {/* Results Dashboard Section */}
      {result && (
        <section
          ref={resultsRef}
          className="results-container max-w-5xl mx-auto px-4 space-y-6 pt-6"
          aria-label="Analysis Results"
        >
          {/* Action Bar for Results */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl no-print shadow-sm">
            <div>
              <span className="text-xs uppercase font-bold text-brand-300 tracking-wider">
                GulfCV Match Completed
              </span>
              <p className="text-sm font-semibold text-slate-200">
                Review your overall score, skill cluster breakdown, and tailoring recommendations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>

              <button
                type="button"
                onClick={handleAnalyzeAnotherJob}
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                <RefreshCw className="w-4 h-4" />
                Analyze Another Job
              </button>
            </div>
          </div>

          {/* Interactive Screen Dashboard */}
          <div className="no-print space-y-6">
            {/* Score Gauge with Formula Breakdown */}
            <ScoreGauge scoreDetails={result.scoreDetails} />

            {/* JobSprout-style Keyword Grouping & Semantic Skill Clusters */}
            <KeywordGroupSection clusters={result.keywordClusters} />

            {/* JobSprout-style AI Tailoring Assistant */}
            <SmartTailoringCard tips={result.tailoringTips} />

            {/* Keyword Breakdown Table */}
            <KeywordList
              matchedKeywords={result.matchedKeywords}
              missingKeywords={result.missingKeywords}
              allKeywords={result.allKeywords}
            />

            {/* Suggestions Engine Output */}
            <SuggestionsCard suggestions={result.suggestions} />

            {/* Editable Summary Draft */}
            {result.summaryDraft && <SummaryDraftCard draft={result.summaryDraft} />}
          </div>

          {/* Print View Component (Visible strictly when printing / saving as PDF) */}
          <PrintReportView result={result} />
        </section>
      )}

      {/* Feature Section targeting "GulfCV Match" on Google SERP */}
      <section className="max-w-5xl mx-auto px-4 pt-12 space-y-8 no-print border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Why Job Seekers Rank GulfCV Match as Their Top Career Utility
          </h2>
          <p className="text-sm text-slate-600">
            Engineered specifically for the recruitment realities of Dubai, Abu Dhabi, Riyadh, and Gulf multinational employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero-Server Privacy Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike cloud-hosted resume matchers that store your personal details, GulfCV Match parses and scores your CV 100% inside your browser RAM.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Semantic Keyword Grouping</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Replicating modern matching algorithms (like JobSprout), keywords are clustered into Tools, Functional Expertise, and Soft Skills rather than raw keyword dumps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Gulf Job Market Alignment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tailored specifically for GCC job boards (LinkedIn, Bayt, Gulf Connexions, Naukrigulf) with custom checks for UAE driving licenses and Vision 2030 skills.
            </p>
          </div>
        </div>
      </section>

      {/* SEO & FAQ Accordion Section for Rich Google SERP Snippets */}
      <section className="max-w-4xl mx-auto px-4 pt-6 space-y-6 no-print">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions About GulfCV Match
          </h2>
          <p className="text-xs text-slate-500">
            Everything you need to know about optimizing your CV for Gulf ATS algorithms.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
