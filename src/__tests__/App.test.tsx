import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

describe('GulfCV Match Application & Routing', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    window.print = vi.fn();
  });

  it('renders the homepage with brand header and input sections', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getAllByText(/GulfCV/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Match/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Provide Your CV/i)).toBeInTheDocument();
    expect(screen.getByText(/Paste Target Job Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Analyze My CV/i })).toBeInTheDocument();
  });

  it('navigates to UAE CV Guide and displays UAE specific guidance', async () => {
    window.history.pushState({}, '', '/uae-cv-checker');
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /UAE & Dubai CV Format & Keyword Optimization Guide/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Current Visa Status Transparency/i)).toBeInTheDocument();
  });

  it('navigates to Saudi CV Guide and displays Vision 2030 and Saudization guidance', async () => {
    window.history.pushState({}, '', '/saudi-cv-checker');
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Saudi Arabia CV & ATS Optimization Guide/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Vision 2030 & Megaproject Vocabulary/i)).toBeInTheDocument();
  });

  it('navigates to How It Works page and displays mathematical formula', async () => {
    window.history.pushState({}, '', '/how-it-works');
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /How GulfCV Match Computes Your Score/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Match Score \(%\)/i)).toBeInTheDocument();
  });

  it('navigates to Privacy page and confirms zero server upload guarantee', async () => {
    window.history.pushState({}, '', '/privacy');
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Privacy Policy & Data Security/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Zero Server Uploads/i).length).toBeGreaterThan(0);
  });

  it('navigates to Terms page and displays pre-launch disclaimer', async () => {
    window.history.pushState({}, '', '/terms');
    render(<App />);

    expect(screen.getByRole('heading', { name: /Terms of Service/i })).toBeInTheDocument();
    expect(screen.getByText(/Nature of the Service/i)).toBeInTheDocument();
  });
});
