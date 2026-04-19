import { AnalysisIntakeForm } from '@/components/intake/analysis-intake-form';

export default function HomePage() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '44px 40px' }}>
      <div style={{ maxWidth: 700 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10, opacity: 0.8 }}>
          Pelham Interiors
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.2 }}>
          Start a new company analysis
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
          Paste a company website and the engine will research the business, rank the strongest Pelham angle and generate a seller-ready brief.
        </p>
        <AnalysisIntakeForm />
      </div>
    </div>
  );
}
