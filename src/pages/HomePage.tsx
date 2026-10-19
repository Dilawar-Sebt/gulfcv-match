import React, { useState, useRef } from 'react';
import { CvInputMode, AnalysisResult } from '../types';
import { CvInputSection } from '../components/CvInputSection';
import { JobDescriptionSection } from '../components/JobDescriptionSection';
import { ScoreGauge } from '../components/ScoreGauge';
import { KeywordList } from '../components/KeywordList';
import { SuggestionsCard } from '../components/SuggestionsCard';
import { SummaryDraftCard } from '../components/SummaryDraftCard';
import { PrintReportView } from '../components/PrintReportView';
import { parseCvFile } from '../lib/fileParser';
import { calculateMatch } from '../lib/matcher';
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

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto px-4 pt-6 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Local-First ATS Keyword Matcher for the Gulf Region</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Match Your CV Against Any <span className="text-brand-600">Gulf Job Advert</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Instantly check how closely your CV matches the skills and terminology in target job postings across the UAE, Saudi Arabia, Qatar, and Gulf markets. 100% private in your browser.
        </p>

        {/* Quick Highlights */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600" /> Zero Server Storage
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-brand-600" /> Instant Deterministic Math
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Free Public Utility
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
                Analyzing Keywords...
              </>
            ) : isParsingFile ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Extracting Document...
              </>
            ) : (
              <>
                <FileSearch className="w-5 h-5" />
                Analyze My CV
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
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Analysis Completed
              </span>
              <p className="text-sm font-semibold text-slate-200">
                Review your keyword match score and practical recommendations below.
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

      {/* Feature & FAQ Educational Section */}
      <section className="max-w-5xl mx-auto px-4 pt-12 space-y-8 no-print border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Why Gulf Job Seekers Choose GulfCV Match
          </h2>
          <p className="text-sm text-slate-600">
            Designed specifically for competitive job markets in Dubai, Abu Dhabi, Riyadh, Doha, and Kuwait City.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Strict Client-Side Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your resume text and contact information never touch external servers or cloud databases. Processing executes entirely inside your local web browser session.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Deterministic & Honest</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No black-box hallucinations or fabricated rankings. Our algorithm clearly displays every matched term, missing term, and the exact arithmetic formula used.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Multi-Word Phrase Recognition</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detects domain phrases such as Accounts Payable, Inventory Management, VAT Filing, and tools like Power BI, Node.js, and C++.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
