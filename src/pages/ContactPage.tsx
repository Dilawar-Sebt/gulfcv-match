import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, Send, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
          <span>Support & Feedback</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact & Feedback
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have an idea for a feature, discovered an unhandled keyword, or have feedback about GulfCV Match? We'd love to hear from you.
        </p>
      </div>

      {/* Notice about local development phase */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Local Development Notice:</strong> GulfCV Match is currently running in a local-first development environment. Contact form submissions below demonstrate user feedback interaction without transmitting data to an external server.
        </div>
      </div>

      {/* Form or Confirmation */}
      {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-xl font-bold text-emerald-950">Thank You for Your Feedback!</h2>
          <p className="text-xs text-emerald-800 max-w-md mx-auto">
            Your message was received in this local session. When deployed publicly, your notes will help guide future features and phrase support.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setMessage('');
            }}
            className="mt-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="space-y-1">
            <label htmlFor="contact-name" className="text-xs font-bold text-slate-700">
              Your Name (Optional)
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full text-sm p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-topic" className="text-xs font-bold text-slate-700">
              Topic
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full text-sm p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="Feedback">General Feedback</option>
              <option value="Keyword Suggestion">Suggest a Missing Industry Keyword/Phrase</option>
              <option value="Bug Report">File Parser or UI Issue</option>
              <option value="Partnership">Other Inquiry</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-message" className="text-xs font-bold text-slate-700">
              Your Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your feedback, question, or suggestions here..."
              className="w-full text-sm p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
            Submit Feedback
          </button>
        </form>
      )}

      {/* Frequently Asked Inquiries */}
      <section className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="text-xs font-bold text-slate-900">Does GulfCV Match share my CV with recruiters?</h3>
            <p className="text-xs text-slate-600">
              Never. Because GulfCV Match runs purely inside your browser, no copy of your CV is ever sent to or stored on any server.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="text-xs font-bold text-slate-900">Can I request new Gulf industry keywords?</h3>
            <p className="text-xs text-slate-600">
              Yes! You can suggest phrases via the feedback form above. We routinely expand our curated Gulf industry lexicon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
